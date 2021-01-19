function layHTMLDesciprtion(){
    var courseSortDes = tinymce.get("addSortDescription").getContent({format:'text'});
    var courseDes = tinymce.get("addDescription").getContent({format:'text'});
    document.getElementById('courseDes').value = courseDes;
    document.getElementById('courseSortDes').value = courseSortDes;
}

window.onload = function loadDescription() {
    var htmlSortDescription = document.getElementById('htmlSortDescription').value;
    var htmlDescription = document.getElementById('htmlDescription').value;
    tinymce.get("addSortDescription").setContent(htmlSortDescription);
    tinymce.get("addDescription").setContent(htmlDescription);
}