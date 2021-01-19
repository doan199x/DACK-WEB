function getPrevPage(preve_value, perPage) {
    location.href = `/course?page=${preve_value}&perPage=${perPage}`;
    var url = new URL(window.location.href);
    var sortOption = url.searchParams.get('sortOption');
    var search = url.searchParams.get('search');
    var pathname = url.pathname;
    if (search == null){
        search="";
    }
    if(sortOption == null){
        location.href = `${pathname}?page=${preve_value}&perPage=${perPage}&search=${search}`;
    }else{
        location.href = `${pathname}?page=${preve_value}&perPage=${perPage}&search=${search}&sortOption=${sortOption}`;
    }
}

function getNextPage(next_value, perPage) {
    var url = new URL(window.location.href);
    var sortOption = url.searchParams.get('sortOption');
    var search = url.searchParams.get('search');
    var pathname = url.pathname;
    if (search == null){
        search="";
    }
    if(sortOption == null){
        location.href = `${pathname}?page=${next_value}&perPage=${perPage}&search=${search}`;
    }else{
        location.href = `${pathname}?page=${next_value}&perPage=${perPage}&search=${search}&sortOption=${sortOption}`;
    }
}

function searchCourse(){
    const search = document.getElementById('search').value;
    const rate = document.getElementById('rate_check').value;
    const price = document.getElementById('price_check').value;
    let option;
    if (rate === "yes" && price === "yes") option = 1;
    else if (rate === "yes" && price === "no") option = 2;
    else if (rate === "no" && price === "yes") option = 3;
    else option = 4;
    location.href=`/course/find?search=${search}&sortOption=${option}`;
}
function priceChecked (){
    if (document.getElementById("price_check").value === "no")
    document.getElementById("price_check").value = "yes";
   else document.getElementById("price_check").value = "no";
}
function rateChecked (){
   if (document.getElementById("rate_check").value === "no")
   document.getElementById("rate_check").value = "yes";
   else document.getElementById("rate_check").value = "no";
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