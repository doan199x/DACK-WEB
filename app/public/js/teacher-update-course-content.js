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