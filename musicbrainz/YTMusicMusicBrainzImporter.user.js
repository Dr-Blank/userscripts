// ==UserScript==
// @name        YT Music MusicBrainz Importer
// @version     0.1.1
// @description Helper script for importing releases from YT Music to MusicBrainz
// @author      Dr.Blank
// @license     MIT
// @homepage    https://github.com/Dr-Blank/userscripts/blob/main/musicbrainz/YTMusicMusicBrainzImporter.md
// @downloadURL https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/YTMusicMusicBrainzImporter.user.js
// @updateURL   https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/YTMusicMusicBrainzImporter.user.js
// @match       *://music.youtube.com/playlist*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

MB_SEED = "https://musicbrainz.org/release/add";
MB_LOGO =
  "https://raw.githubusercontent.com/metabrainz/design-system/master/brand/logos/MusicBrainz/SVG/MusicBrainz_logo_square.svg";

// get the release title
function getReleaseTitle() {
  // get the release title
  var releaseTitle = document.querySelector(
    "div.metadata yt-formatted-string.title"
  ).innerText;
  return releaseTitle;
}

console.log(getReleaseTitle());

function getSubtitle() {
  // get the release artist
  var subtitle = document.querySelector(
    "div.metadata yt-formatted-string.subtitle[split-lines]"
  );
  return subtitle;
}

// get the release artist
function getReleaseArtists() {
  var subtitle = getSubtitle();
  // get the all release artists from the a elements
  var releaseArtists = subtitle.querySelectorAll("a");

  // filter links that start with /channel/ or channel/
  releaseArtists = [...releaseArtists].filter((artist) =>
    artist.href.match(/\/?channel\//)
  );
  // return list of artists text
  return [...releaseArtists].map((artist) => artist.innerText);
}

console.log(getReleaseArtists());

// get release type
function getReleaseType() {
  var subtitle = getSubtitle();
  // get the release type from the first span element
  var releaseType = subtitle.querySelector("span:first-child").innerText;
  return releaseType;
}

console.log(getReleaseType());

// get the release date
function getReleaseDate() {
  var subtitle = getSubtitle();
  // get the year from the last span element
  var releaseDate = subtitle.querySelector("span:last-child").innerText;
  return releaseDate;
}

console.log(getReleaseDate());

// get the tracklist from the page
function getTracklist() {
  // get the tracklist
  var tracklist = document.querySelector("#content-wrapper div#contents");

  return tracklist;
}

// get the tracklist from the page
function getTrackTitles() {
  // get the tracklist
  var tracklist = getTracklist().querySelectorAll("a[spellcheck='false']");

  // filter only href starting with /watch?v=
  tracklist = [...tracklist].filter((track) => track.href.match(/\/watch\?v=/));

  // return list of tracks text
  return [...tracklist].map((track) => track.innerText);
}

console.log(getTrackTitles());

// get the track artists
function getTrackArtists() {
  // get the tracklist
  var tracklist = document.querySelector(
    "#content-wrapper #contents #contents"
  );

  // get the track artists yt-formatted-string
  tracklist = tracklist.querySelectorAll(".secondary-flex-columns");

  var artists = [...tracklist].map((track) => track.innerText);

  // for each artist split by , and & and make a list of lists
  artists = [...artists].map((artist) => artist.split(/,|&/));

  // return list of tracks text
  return artists;
}
console.log(getTrackArtists());

// get the track durations
function getTrackDurations() {
  // get the tracklist
  var tracklist = getTracklist();

  // get the track durations
  tracklist = tracklist.querySelectorAll(
    "yt-formatted-string.MUSIC_RESPONSIVE_LIST_ITEM_COLUMN_DISPLAY_PRIORITY_HIGH"
  );

  // filter tracklist only where any of its a href starting with /watch?v=
  durations = [...tracklist];

  // for each track duration make a list of all a.text elements so now we have a list of lists
  durations = [...durations].map((duration) => duration.innerText);

  // return list of tracks text
  return durations;
}

console.log(getTrackDurations());

function getSeedURL() {
  // get the link of yt music page
  var seedURL = document.URL;
  return seedURL;
}

console.log(getSeedURL());

// seed the release
function seedRelease() {
  // get the release title
  var releaseTitle = getReleaseTitle();

  // get the release artist
  var releaseArtists = getReleaseArtists();

  // get the release type
  var releaseType = getReleaseType();

  // get the release date
  var releaseDate = getReleaseDate();

  // get the track titles
  var trackTitles = getTrackTitles();

  // get the track artists
  var trackArtists = getTrackArtists();

  // get the track durations
  var trackDurations = getTrackDurations();

  // create a form
  var form = document.createElement("form");
  form.method = "POST";
  form.action = MB_SEED;
  form.target = "_blank"; // open in a new tab
  form.acceptCharset = "UTF-8";

  // add the necessary inputs to the form
  form.appendChild(createInput("name", releaseTitle));
  form.appendChild(createInput("type", releaseType));
  form.appendChild(createInput("status", "official"));
  form.appendChild(createInput("packaging", "none"));
  // loop through all artists and add them as inputs
  for (var i = 0; i < releaseArtists.length; i++) {
    form.appendChild(
      createInput("artist_credit.names." + i + ".name", releaseArtists[i])
    );
    join_phrase =
      i == releaseArtists.length - 1
        ? ""
        : i == releaseArtists.length - 2
        ? " & "
        : ", ";
    if (join_phrase != "") {
      form.appendChild(
        createInput("artist_credit.names." + i + ".join_phrase", join_phrase)
      );
    }
  }
  form.appendChild(createInput("date.year", releaseDate));
  form.appendChild(createInput("mediums.0.format", "Digital Media"));

  // add inputs for each track
  for (var i = 0; i < trackTitles.length; i++) {
    form.appendChild(
      createInput("mediums.0.track." + i + ".name", trackTitles[i])
    );
    // form.appendChild(createInput('mediums.0.track.' + i + '.artist_credit.names.0.name', trackArtists[i]));
    // loop through all artists and add them as inputs
    for (var j = 0; j < trackArtists[i].length; j++) {
      form.appendChild(
        createInput(
          "mediums.0.track." + i + ".artist_credit.names." + j + ".name",
          trackArtists[i][j]
        )
      );
      // , if not last artist else empty
      // & for second last artist else empty
      join_phrase =
        j == trackArtists[i].length - 1
          ? ""
          : j == trackArtists[i].length - 2
          ? " & "
          : ", ";
      if (join_phrase != "") {
        form.appendChild(
          createInput(
            "mediums.0.track." +
              i +
              ".artist_credit.names." +
              j +
              ".join_phrase",
            join_phrase
          )
        );
      }
    }
    form.appendChild(
      createInput("mediums.0.track." + i + ".length", trackDurations[i])
    );
  }
  form.appendChild(createInput("urls.0.url", getSeedURL()));
  form.appendChild(createInput("urls.0.link_type", "85")); // stream for free
  form.appendChild(
    createInput(
      "edit_note",
      `Imported using YT Music MusicBrainz Importer userscript\nSeed URL: ${getSeedURL()}\n` +
        "Script URL: https://github.com/Dr-Blank/userscripts"
    )
  );

  return form;
}

// helper function to create an input element
function createInput(name, value) {
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}

// add the seed button to the page
function addSeedButton() {
  // get the action bar
  var actionBar = document.querySelector("#top-level-buttons");
  // get first child of action bar
  playButton = actionBar.querySelector("*:first-child");

  // create the seed button
  var seedButton = document.createElement("button");
  seedButton.id = "seed-release-button";
  seedButton.type = "submit";
  seedButton.className = playButton.querySelector("button").className;
  // add the musicbrainz logo
  var img = document.createElement("img");
  img.src = MB_LOGO;
  img.style.height = "2rem";
  img.style.aspectRatio = "1";
  img.style.marginRight = "0.5rem";
  seedButton.appendChild(img);
  var text = document.createTextNode("Seed");
  seedButton.appendChild(text);

  var form = seedRelease();
  form.appendChild(seedButton);

  div = document.createElement("div");
  // copy class from the play button
  div.className = playButton.className;
  div.appendChild(form);

  // add the seed button to the action bar as the first element
  actionBar.insertBefore(div, actionBar.firstChild);
}

addSeedButton();
