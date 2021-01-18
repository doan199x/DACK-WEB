function deleteLesson(lessonID) {
    var courseID = document.getElementById('inputCourseID').value;
    Swal.fire({
        title: 'Cánh báo!',
        text: "Bạn xác nhận sẽ xóa bài học này chứ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C82333',
        cancelButtonColor: '#212121',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Quay lại'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/teacher/delete-lesson',
                type: 'POST',
                data: {
                    lessonID: lessonID
                },
                success: function (result) {
                    if (result.status == 0) {
                        Swal.fire({
                            title: 'Xóa khóa học thành công',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = `/teacher/update-course-content?courseID=${courseID}`
                        })
                    } else {
                        Swal.fire({
                            title: 'Lỗi không xác định',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = `/teacher/update-course-content?courseID=${courseID}`
                        })
                    }
                }
            })
        }
    })
}

function deleteChapter(chapterID) {
    var courseID = document.getElementById('inputCourseID').value;
    Swal.fire({
        title: 'Cánh báo!',
        text: "Bạn xác nhận sẽ xóa chương học này chứ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C82333',
        cancelButtonColor: '#212121',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Quay lại'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/teacher/delete-chapter',
                type: 'POST',
                data: {
                    chapterID: chapterID
                },
                success: function (result) {
                    if (result.status == 0) {
                        Swal.fire({
                            title: 'Xóa khóa học thành công',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = `/teacher/update-course-content?courseID=${courseID}`
                        })
                    } else {
                        Swal.fire({
                            title: 'Lỗi không xác định',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = `/teacher/update-course-content?courseID=${courseID}`
                        })
                    }
                }
            })
        }
    })
}

function themChuongHoc(courseID) {
    chapterName = document.getElementById('chapterName').value;
    $.ajax({
        url: '/teacher/add-chapter',
        type: 'POST',
        data: {
            chapterName: chapterName,
            courseID: courseID
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Thêm chương học thành công'
                }).then(() => {
                    location.href = `/teacher/update-course-content?courseID=${courseID}`
                })
            } else {
                Swal.fire({
                    title: 'Lỗi không xác định'
                }).then(() => {
                    location.href = `/teacher/update-course-content?courseIdD=${courseID}`
                })
            }
        }
    })
}

function editChapter(chapterID) {
    var courseID = document.getElementById('inputCourseID').value;
    var chapterName = 'chapterName' + chapterID;
    var chapterName = document.getElementById(chapterName).value;
    var isOutline = 'isOutline' + chapterID;
    var isOutline = document.getElementById(isOutline).checked;
    $.ajax({
        url: '/teacher/edit-chapter',
        type: 'POST',
        data: {
            chapterName: chapterName,
            isOutline: isOutline,
            chapterID: chapterID
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Sửa chương học thành công'
                }).then(() => {
                    location.href = `/teacher/update-course-content?courseID=${courseID}`
                })
            } else {
                Swal.fire({
                    title: 'Lỗi không xác định'
                }).then(() => {
                    location.href = `/teacher/update-course-content?courseIdD=${courseID}`
                })
            }
        }
    })
}

window.onload = function checkVideo() {
    var url = new URL(window.location.href);
    var result = url.searchParams.get('result');
    if (result == 'failed') {
        Swal.fire({
            title: 'Thêm lỗi',
            confirmButtonColor: '#212121',
        })
    } else if (result == 'passed') {
        Swal.fire({
            title: 'Thêm thành công',
            confirmButtonColor: '#212121',
        })
    }
}