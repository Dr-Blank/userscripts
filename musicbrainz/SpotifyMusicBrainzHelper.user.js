// ==UserScript==
// @name        Spotify MusicBrainz Helper
// @version     1.3.0
// @description Adds ISRCHunt, ATisket and Harmony links to Spotify pages for easy access to external tools for adding releases to MusicBrainz
// @author      Dr.Blank
// @license     MIT
// @homepage    https://github.com/Dr-Blank/userscripts/blob/main/musicbrainz/SpotifyMusicBrainzHelper.md
// @downloadURL https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/SpotifyMusicBrainzHelper.user.js
// @updateURL   https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/SpotifyMusicBrainzHelper.user.js
// @match       *://open.spotify.com/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

// External tools Settings
const USE_ISRCHUNT = true;
const USE_HARMONY = true;
const USE_ATISKET = true;

// External tools URLs
const HARMONY = `https://harmony.pulsewidth.org.uk`;
const ATISKET = `https://atisket.pulsewidth.org.uk`;
// change this to your preferred country codes
const COUNTRIES = encodeURIComponent(`GB,US,DE,JP`);
const ISRCHUNT = `https://isrchunt.com`;

function getSpotifyId(url = window.location.href) {
  // Get the current URL if not provided
  var currentUrl = new URL(url);

  // Get the path segments
  var pathSegments = currentUrl.pathname.split("/");

  // Check if the page is an artist, album, track, or playlist
  if (!["artist", "album", "track", "playlist"].includes(pathSegments[1])) {
    return null;
  }
  // Get the Spotify ID
  var id = pathSegments[2];

  // Get the type
  var type = pathSegments[1];

  return { id: id, type: type };
}

function getISRCHuntUrl(url = window.location.href) {
  // Get the artist ID
  var spotifyInfo = getSpotifyId(url);
  // return if null
  if (spotifyInfo === null) {
    return null;
  }

  if (spotifyInfo.type !== "artist" && spotifyInfo.type !== "playlist") {
    return null;
  }

  // encode the url
  url = encodeURIComponent(url);

  var newUrl = `${ISRCHUNT}/?spotifyPlaylist=${url}`;
  return newUrl;
}

function getHarmonyUrl(url = window.location.href) {
  var spotifyInfo = getSpotifyId(url);
  // return if null
  if (spotifyInfo === null) {
    return null;
  }

  if (spotifyInfo.type !== "album") {
    return null;
  }
  // https://harmony.pulsewidth.org.uk/release?url=&gtin=886445809619&region=&musicbrainz=&deezer=&itunes=&spotify=&tidal=
  var newUrl = `${HARMONY}/release?url=${url}&region=${COUNTRIES}&musicbrainz=&deezer=&itunes=&spotify=&tidal=`;
  return newUrl;
}

function getATisketUrl(url = window.location.href) {
  var spotifyInfo = getSpotifyId(url);
  // return if null
  if (spotifyInfo === null) {
    return null;
  }

  if (spotifyInfo.type !== "album") {
    return null;
  }
  var newUrl = `${ATISKET}/?preferred_countries=${COUNTRIES}&spf_id=${spotifyInfo.id}&preferred_vendor=spf`;
  return newUrl;
}

function addButtonToActionBar(
  newUrl,
  buttonText = "External Tool",
  id = "external-tool-button"
) {
  // return if null
  if (newUrl === null) {
    return;
  }
  // Select the element where you want to insert the button
  var element = document.querySelector('button[data-testid="more-button"]');
  // return if null
  if (element === null) {
    return;
  }
  console.log("Adding button for " + newUrl);
  // Create a new button element
  var button = document.createElement("button");

  // Set the properties of the button
  button.textContent = buttonText;
  button.id = id;
  button.className = element.className;
  button.style.paddingInline = "1rem";
  button.style.paddingBlock = "0.5rem";
  button.style.border = "1px solid";
  button.style.borderRadius = "1rem";
  button.style.fontSize = "0.85rem";
  button.style.minBlockSize = "2rem";
  button.onclick = function () {
    window.open(newUrl, "_blank");
  };

  // remove the button if it already exists
  var previousButton = document.getElementById(id);
  if (previousButton !== null) {
    previousButton.remove();
  }
  // Insert the button into the selected element
  element.parentNode.insertBefore(button, element.nextSibling);
}

function addButtonToDiscography(
  newUrl,
  buttonText = "External Tool",
  id = "external-tool-button"
) {
  // return if null
  if (newUrl === null) {
    return;
  }
  // Select the element where you want to insert the button
  var section = document.querySelector('section[data-testid="artist-page"]');
  // return if null
  if (section === null) {
    return;
  }
  console.log("Adding button for " + newUrl);

  // select the first div in the section
  var existingDiv = section.querySelector("div").querySelector("div");

  // find a existing button in the section
  var existingSpotifyButton = existingDiv.querySelector("button");

  // Create a new button element
  var button = document.createElement("button");

  // Set the properties of the button
  button.textContent = buttonText;
  button.id = id;
  button.className = existingSpotifyButton.className;
  button.style.paddingInline = "1rem";
  button.style.paddingBlock = "0.5rem";
  button.style.border = "1px solid";
  button.style.borderRadius = "1rem";
  button.style.fontSize = "0.85rem";
  button.style.minBlockSize = "2rem";
  button.style.marginInline = "1rem";
  button.onclick = function () {
    window.open(newUrl, "_blank");
  };

  // remove the button if it already exists
  var previousButton = document.getElementById(id);
  if (previousButton !== null) {
    previousButton.remove();
  }
  // append the button to the existing div before the existing button
  existingDiv.insertBefore(button, existingSpotifyButton);
}

function addExternalToolButton() {
  // Get the artist ID
  var spotifyInfo = getSpotifyId();
  // return if null
  if (spotifyInfo === null) {
    return;
  }

  if (
    USE_ISRCHUNT &&
    (spotifyInfo.type === "artist" || spotifyInfo.type === "playlist")
  ) {
    addButtonToActionBar(getISRCHuntUrl(), "ISRCHunt", "isrchunt-button");
    addButtonToDiscography(getISRCHuntUrl(), "ISRCHunt", "isrchunt-button");
  } else if (spotifyInfo.type === "album") {
    if (USE_HARMONY) {
      addButtonToActionBar(getHarmonyUrl(), "Harmony", "harmony-button");
      addButtonToDiscography(getHarmonyUrl(), "Harmony", "harmony-button");
    }
    if (USE_ATISKET) {
      addButtonToActionBar(getATisketUrl(), "ATisket", "atisket-button");
      addButtonToDiscography(getATisketUrl(), "ATisket", "atisket-button");
    }
  }
}

window.addEventListener("load", function () {
  this.window.setTimeout(addExternalToolButton, 2000);
});

// every time SPA changes the url we need to add the button again

let oldUrl = window.location.href;
let newUrl = window.location.href;

// every 2 seconds check if the url has changed
setInterval(function () {
  newUrl = window.location.href;
  if (newUrl !== oldUrl) {
    addExternalToolButton();
    oldUrl = newUrl;
  }
}, 1500);
