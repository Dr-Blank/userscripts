// ==UserScript==
// @name        [MB] Open in Harmony
// @version     2025.03.25
// @description Adds a button on release page to open the release in harmony.
// @author      Dr.Blank
// @license     GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage    https://github.com/Dr-Blank/userscripts/blob/main/musicbrainz/AddOpenInHarmonyButton.md
// @downloadURL https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/AddOpenInHarmonyButton.user.js
// @updateURL   https://github.com/Dr-Blank/userscripts/raw/main/musicbrainz/AddOpenInHarmonyButton.user.js
// @match       *://*.musicbrainz.org/recording/*
// @match       *://*.musicbrainz.org/release/*
// @match       *://*.musicbrainz.org/release-group/*
// @exclude      *.org/*/*/*annotat*
// @exclude      *.org/*/*/*create*
// @exclude      *.org/*/*/*delete*
// @exclude      *.org/*/*/*edit*
// @exclude      *.org/*/*/*merge*
// @exclude      *.org/*/*/*remove*
// @exclude      *.org/*/*/*split*
// @exclude      *.org/*/*/add-alias*
// @exclude      *.org/*/*annotat*
// @exclude      *.org/*/*create*
// @exclude      *.org/*/*delete*
// @exclude      *.org/*/*edit*
// @exclude      *.org/*/*merge*
// @exclude      *.org/*/*remove*
// @exclude      *.org/*/*split*
// @exclude      *.org/release/add
// @exclude      *.org/release/add?*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

// External tools URLs
const HARMONY = `https://harmony.pulsewidth.org.uk`;
const ATISKET = `https://atisket.pulsewidth.org.uk`;
