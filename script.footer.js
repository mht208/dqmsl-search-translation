
function main() {
  getVersion(function() {
    loadData();
    translate();
  });
}

if (window.top === window) {
  document.addEventListener("DOMContentLoaded", function(event) {
    main();
  });
}
