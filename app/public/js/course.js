function getPrevPage(preve_value, perPage) {
    location.href = `/course?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/course?page=${next_value}&perPage=${perPage}`;
}

function searchCourse(){
    const search = document.getElementById('search').value;
    location.href=`/course/find?search=${search}`;
}

function HideLessons(chapterID) {
    document.getElementById(`li-main${chapterID}`).setAttribute('onclick', `ShowLessons(${chapterID})`);
    document.getElementById(`button-change${chapterID}`).setAttribute('class', 'fas fa-caret-up fa-lg');

    document.getElementById(`lesson-chapter${chapterID}`).style.display = 'none';
}
function ShowLessons(chapterID) {
    document.getElementById(`li-main${chapterID}`).setAttribute(`onclick`, `HideLessons(${chapterID})`);
    document.getElementById(`button-change${chapterID}`).setAttribute('class', 'fas fa-caret-down fa-lg');
    document.getElementById(`lesson-chapter${chapterID}`).style.display = null;
}
