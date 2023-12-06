# Clear Redundant OSTs in Title

## Purpose

This bookmarklet will clear the redundant OSTs in the title of the release and Add it as meta-data.

! WARNING: Mostly for Soundtracks of Indian Movies which have a lot of redundant OSTs in the title and are complete albums for the movie.

## [Code](./redudantOST.bookmarklet.js)

```javascript
javascript: (function() {
    var isSoundtrack = false;
    var releaseTitle = $("#name");
    var title = releaseTitle.val();
    var newTitle = title.replace(" (Original Motion Picture Soundtrack)", "");
    if (title.includes(" (Original Motion Picture Soundtrack)")) {
        releaseTitle.val(newTitle).change();
        $("#release-group").val(newTitle).change();
        isSoundtrack = true;
    }
    if (isSoundtrack) {
        $("#primary-type").val(1).change();
        $("#secondary-types").val(2).change();
    }
})();
```
