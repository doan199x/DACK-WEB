function removeWatchList(courseID) {
    $.ajax({
        url: '/student/remove-watch-list',
        method: 'POST',
        data: {
            courseID: courseID
        },
        success: function (result) {
            if (result.result == 'success') {
                var cardID = 'card' + result.courseID;
                document.getElementById(cardID).style.display  = 'none';
            }
        }
    })
}