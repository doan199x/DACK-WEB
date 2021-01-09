function HideLessons(chapterID){
    document.getElementById(`li-main${chapterID}`).setAttribute('onclick',`ShowLessons(${chapterID})`);
    document.getElementById(`button-change${chapterID}`).setAttribute('class','fas fa-caret-up fa-lg');

    document.getElementById(`lesson-chapter${chapterID}`).style.display = 'none';
}
function ShowLessons(chapterID){
    document.getElementById(`li-main${chapterID}`).setAttribute(`onclick`,`HideLessons(${chapterID})`);
    document.getElementById(`button-change${chapterID}`).setAttribute('class','fas fa-caret-down fa-lg');
    document.getElementById(`lesson-chapter${chapterID}`).style.display = null;
}