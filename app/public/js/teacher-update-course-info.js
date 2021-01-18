window.onload = function loadDescription(){
    var htmlSortDescription = document.getElementById('htmlSortDescription').value;
    var htmlDescription = document.getElementById('htmlDescription').value;
    tinymce.get("addSortDescription").setContent(htmlSortDescription);
    tinymce.get("addDescription").setContent(htmlDescription);
}