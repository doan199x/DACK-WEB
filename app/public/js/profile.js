function setActivePage() {
    var btnPage = 'btn-' + document.getElementById("activePage").value;
    document.getElementById(`${btnPage}`).className = "btn btn-secondary";
}

function hoverActive(btnID){
    if(btnID == 'btn-profile'){
        document.getElementById(`btn-watch-list`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-course-list`).className = "btn btn-outline-secondary";
    } else if (btnID == 'btn-watch-list'){
        document.getElementById(`btn-profile`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-course-list`).className = "btn btn-outline-secondary";
    } else{
        document.getElementById(`btn-profile`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-watch-list`).className = "btn btn-outline-secondary";
    }
}

window.onload = setActivePage();