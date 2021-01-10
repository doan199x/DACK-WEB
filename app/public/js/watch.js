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

function changeLesson(lessonID) {
    // location.href = `/student/watch?courseID=${courseID}&lessonID=${lessonID}`;
    $.ajax({
        url: '/student/get-video',
        method: 'POST',
        data: {
            lessonID: lessonID,
        },
        success: function (result) {
            document.getElementById("video-source").innerHTML = `
            <video controls crossorigin playsinline poster="/img/thumbnail/video-thumbnail-default.jpg" width="730px" height="410px" id="player">
            <source src="${result.videoPath}" type="video/mp4" size="1080"></video>`;
            const player = new Plyr('#player');
            window.player = player;
            function on(selector, type, callback) {
                document.querySelector(selector).addEventListener(type, callback, false);
            }
            on('#js-rewind', 'click', () => {
                player.rewind();
            });
            var postLessonID = document.getElementById('postLessonID').value;
            document.getElementById(`li${postLessonID}`).setAttribute('class', 'list-group-item');
            document.getElementById(`li${lessonID}`).setAttribute('class', 'list-group-item lesson-active');
            document.getElementById('postLessonID').value = lessonID;

            document.getElementById("lessonName").innerHTML = result.lessonName;
        }
    })
}

function fowardLesson(lessonIDMax) {
    var currentLessonID = document.getElementById('postLessonID').value;
    if (currentLessonID == lessonIDMax) {

    } else {
        var newLessonID = parseInt(currentLessonID) + 1;
        changeLesson(newLessonID);
    }
}

function backwardLesson(lessonIDMin) {
    var currentLessonID = document.getElementById('postLessonID').value;
    if (currentLessonID == lessonIDMin) {

    } else {
        var newLessonID = parseInt(currentLessonID) - 1;
        changeLesson(newLessonID);
    }
}

window.onload = function showMessage() {
    if (document.getElementById("registered").value == '1') {
        Swal.fire({
            title:'Bạn chưa đăng kí khóa học này, bạn chỉ có thể xem một số chương do giáo viên cung cấp miễn phí',
            confirmButtonColor: '#212121'
        })
    }
}