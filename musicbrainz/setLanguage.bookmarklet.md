# Set Language Bookmarklet

## Description

This bookmarklet sets the language of the current release to whatever you want. It's useful for when you're adding a release and you want to set the language to something other than English and is a lot faster than scrolling through the list of languages or typing the language in the select box.

## Code

```javascript
javascript: (function() {
    var yourObscureLanguage = "Gujarati";
    var selectBox = document.getElementById("language");
    for (var i = 0; i < selectBox.options.length; i++) {

        if (selectBox.options[i].text == yourObscureLanguage) {
            selectBox.selectedIndex = i;
            var event = new Event("change");
            selectBox.dispatchEvent(event);
            break;
        }

    }
})();
```

## Installation

1. Create a new bookmark in your browser.
2. Copy the code and paste it into the URL field of the bookmark.
3. Save the bookmark.
4. Go to a release page on MusicBrainz and click the bookmark.