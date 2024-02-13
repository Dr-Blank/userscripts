# Set Language Bookmarklet

## Description

This bookmarklet sets the language of the current release to whatever you want. It's useful for when you're adding a release and you want to set the language to something other than English and is a lot faster than scrolling through the list of languages or typing the language in the select box.

! WARNING: You need to change the language in the code before using it.

## [Code](./setLanguage.bookmarklet.js)

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
