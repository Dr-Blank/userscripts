// ==UserScript==
// @name        Always Focused
// @version     2026.11.13
// @description Keeps shortlink countdown timers running when the window loses focus.
// @author      Dr.Blank
// @license     GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage    https://github.com/Dr-Blank/userscripts/blob/main/shortlinks/AlwaysFocused.md
// @downloadURL https://github.com/Dr-Blank/userscripts/raw/main/shortlinks/AlwaysFocused.user.js
// @updateURL   https://github.com/Dr-Blank/userscripts/raw/main/shortlinks/AlwaysFocused.user.js
// @match       *://latestnewsonline.sbs/*
// @run-at      document-start
// @inject-into page
// @sandbox     raw
// @grant       none
// ==/UserScript==

/* global Document */

(() => {
  'use strict'

  const fixGetter = (target, prop, value) => {
    try {
      Object.defineProperty(target, prop, { get: () => value, configurable: true })
    } catch {}
  }

  fixGetter(Document.prototype, 'hidden', false)
  fixGetter(Document.prototype, 'webkitHidden', false)
  fixGetter(Document.prototype, 'visibilityState', 'visible')
  fixGetter(Document.prototype, 'webkitVisibilityState', 'visible')
  Document.prototype.hasFocus = () => true

  // Capture listeners registered at document-start run before the page's own,
  // so stopping propagation here hides these events from the page.
  const swallow = (event) => event.stopImmediatePropagation()
  const events = ['visibilitychange', 'webkitvisibilitychange', 'blur', 'focusout', 'mouseleave', 'pagehide']
  for (const type of events) {
    window.addEventListener(type, swallow, true)
    document.addEventListener(type, swallow, true)
  }

  // Ignore handlers assigned as properties, e.g. `window.onblur = pause`.
  const handlers = ['onblur', 'onvisibilitychange', 'onmouseleave']
  for (const target of [window, document]) {
    for (const prop of handlers) {
      try {
        Object.defineProperty(target, prop, { get: () => null, set () {}, configurable: true })
      } catch {}
    }
  }
})()
