# Always Focused

Shortlink "blog step" pages pause their countdown timer when you move to another window. This script makes the page believe it is always visible and focused, so the timer keeps running in the background.

Install: [AlwaysFocused](https://github.com/Dr-Blank/userscripts/raw/main/shortlinks/AlwaysFocused.user.js)

## What it does

- Reports `document.hidden` as `false`, `document.visibilityState` as `visible` and `document.hasFocus()` as `true`.
- Hides `blur`, `focusout`, `mouseleave`, `pagehide` and `visibilitychange` events from the page.
- Ignores `onblur`, `onvisibilitychange` and `onmouseleave` handlers the page assigns.

It does not skip the timer. Most of these sites check the wait on the server, so the countdown still has to finish.

## Adding a site

The script only runs on listed domains, because faking focus everywhere breaks sites that rely on it (videos that pause when you switch away, for example). To add a domain, add a line to the header:

```js
// @match       *://example.sbs/*
```

## If a timer still pauses

The page detects focus some other way. Open devtools, go to Debugger, enable the Event Listener Breakpoints for focus and visibility, then move the cursor away. The breakpoint shows the code that pauses the timer.

## Compatibility

Tested with Violentmonkey on Firefox. It needs to run in the page context at `document-start`; `@inject-into page` (Violentmonkey) and `@sandbox raw` (Tampermonkey) request that.
