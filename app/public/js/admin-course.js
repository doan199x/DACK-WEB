function getPrevPage(preve_value, perPage) {
    location.href = `/admin/course?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/admin/course?page=${next_value}&perPage=${perPage}`;
}

function banCourse(courseID) {
    Swal.fire({
        title: 'Cánh báo!',
        text: "Bạn có chắc sẽ vô hiệu hóa khóa học này chứ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C82333',
        cancelButtonColor: '#212121',
        confirmButtonText: 'Vô hiệu',
        cancelButtonText: 'Quay lại'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/admin/ban-course',
                type: 'POST',
                data: {
                    courseID: courseID
                },
                success: function (result) {
                    if (result.status == 0) {
                        Swal.fire({
                            title: 'Vô hiệu khóa học thành công',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = "/admin/course"
                        })
                    } else {
                        Swal.fire({
                            title: 'Lỗi không xác định',
                            confirmButtonColor: '#212121',
                        })
                    }
                }
            })
        }
    })
}

function unBanCourse(courseID) {
    Swal.fire({
        title: 'Cánh báo!',
        text: "Bạn có chắc sẽ mở lại khóa học này chứ",
        icon: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#C82333',
        cancelButtonColor: '#212121',
        confirmButtonText: 'mở lại',
        cancelButtonText: 'Quay lại'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/admin/unban-course',
                type: 'POST',
                data: {
                    courseID: courseID
                },
                success: function (result) {
                    if (result.status == 0) {
                        Swal.fire({
                            title: 'Mở lại khóa học thành công',
                            confirmButtonColor: '#212121',
                        }).then(() => {
                            location.href = "/admin/course"
                        })
                    } else {
                        Swal.fire({
                            title: 'Lỗi không xác định',
                            confirmButtonColor: '#212121',
                        })
                    }
                }
            })
        }
    })
}

function timKiemKhoaHoc() {
    var search = document.getElementById('inputTimKiem').value;
    location.href = `/admin/course?search=${search}`;
}