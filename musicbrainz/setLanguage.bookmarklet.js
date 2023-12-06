javascript: (function () {
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
