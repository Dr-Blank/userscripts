# Set format medium to unknown and tick "i don't know"

## [Code](./setMediumUnkown.bookmarklet.js)

```javascript
javascript: (function() {
    formatSelectBox = document.querySelector(
        "select[data-bind=\"value: formatID, attr: { id: 'medium-format-' + uniqueID }\"]"
    );
    if (formatSelectBox) {
        formatSelectBox.selectedIndex = 0;
        var event = new Event("change");
        formatSelectBox.dispatchEvent(event);
        idk = document.getElementById("format-unknown");
        if (idk) {
            idk.click();
            var event = new Event("change");
            idk.dispatchEvent(event);
        }
    }
})();
```
