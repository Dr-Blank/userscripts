// ==UserScript==
// @name        Spotify MusicBrainz Helper
// @version     1.0.0
// @description Adds ISRCHunt and ATisket links to Spotify pages for easy access to external tools for adding releases to MusicBrainz
// @author      Dr.Blank
// @license     MIT
// @homepage    https://github.com/Dr-Blank/userscripts/blob/main/musicbrainz/SpotifyMusicBrainzHelper.md
// @downloadURL https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/SpotifyMusicBrainzHelper.user.js
// @updateURL   https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/SpotifyMusicBrainzHelper.user.js
// @match       *://open.spotify.com/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

const ATISKET = `https://atisket.pulsewidth.org.uk`;
// change this to your preferred country codes
const COUNTRIES = encodeURIComponent(`GB,US,DE`);
const ISRCHUNT = `https://isrchunt.com`;

function getSpotifyId() {
  // Get the current URL
  var currentUrl = new URL(window.location.href);

  // Get the path segments
  var pathSegments = currentUrl.pathname.split("/");

  // Check if the page is an artist, album, track, or playlist
  if (["artist", "album", "track", "playlist"].includes(pathSegments[1])) {
    // Get the Spotify ID
    var id = pathSegments[2];

    // Get the type
    var type = pathSegments[1];

    return { id: id, type: type };
  } else {
    return null;
  }
}

function getISRCHuntUrl(id, type) {
  if (type !== "artist" && type !== "playlist") {
    return null;
  }
  var newUrl = `${ISRCHUNT}/?spotifyPlaylist=https%3A%2F%2Fopen.spotify.com%2F${type}%2F${id}`;
  return newUrl;
}

function getATisketUrl(id, type) {
  if (type !== "album") {
    return null;
  }
  var newUrl = `${ATISKET}/?preferred_countries=${COUNTRIES}&spf_id=${id}&preferred_vendor=spf`;
  return newUrl;
}

function addButtonToActionBar(newUrl, buttonText = "External Tool") {
  // return if null
  if (newUrl === null) {
    return;
  }
  console.log("Adding button for " + newUrl);
  // Select the element where you want to insert the button
  var element = document.querySelector('button[data-testid="more-button"]');
  // Create a new button element
  var button = document.createElement("button");

  // Set the properties of the button
  button.textContent = buttonText;
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

  // Insert the button into the selected element
  element.parentNode.insertBefore(button, element.nextSibling);
}

function addExternalToolButton() {
  // Get the artist ID
  var spotifyInfo = getSpotifyId();
  // return if null
  if (spotifyInfo === null) {
    return;
  }

  // Construct the new URL for the button based on type
  var newUrl = null;
  var buttonText = null;
  if (spotifyInfo.type === "artist" || spotifyInfo.type === "playlist") {
    newUrl = getISRCHuntUrl(spotifyInfo.id, spotifyInfo.type);
    buttonText = "ISRCHunt";
  } else if (spotifyInfo.type === "album") {
    newUrl = getATisketUrl(spotifyInfo.id, spotifyInfo.type);
    buttonText = "ATisket";
  }

  // Add the button
  addButtonToActionBar(newUrl, buttonText);
}

window.addEventListener("load", function () {
  this.window.setTimeout(addExternalToolButton, 2000);
});

// every time SPA changes the url we need to add the button again

// JavaScript
let oldUrl = window.location.href;

setInterval(function () {
  let newUrl = window.location.href;

  if (newUrl !== oldUrl) {
    // The URL has changed!
    console.log("URL changed!");
    addExternalToolButton();
    oldUrl = newUrl;
  }
}, 1000); // Check every second
