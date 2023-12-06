javascript: (function () {
  var isSoundtrack = false;
  var releaseTitle = $("#name");
  var title = releaseTitle.val();
  var newTitle = title.replace(" (Original Motion Picture Soundtrack)", "");
  if (title.includes(" (Original Motion Picture Soundtrack)")) {
    releaseTitle.val(newTitle).change();
    $("#release-group").val(newTitle).change();
    isSoundtrack = true;
  }
  setTimeout(() => {
    if (isSoundtrack) {
      $("#primary-type").val(1).change();
      $("#secondary-types").val(2).change();
    }
  }, 300);
})();
