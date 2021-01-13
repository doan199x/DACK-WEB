function getPrevPage(preve_value, perPage) {
    location.href = `/admin/course?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/admin/course?page=${next_value}&perPage=${perPage}`;
}

function deleteCourse(courseID) {
    Swal.fire({
        title: 'Cánh báo!',
        text: "Bạn có chắc sẽ xóa khóa học này chứ",
        icon: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#C82333',
        cancelButtonColor: '#212121',
        confirmButtonText: 'Xóa khóa học',
        cancelButtonText: 'Quay lại'
    }).then(() => {
        $.ajax({
            url: '/admin/delete-course',
            type: 'POST',
            data: {
                courseID: courseID
            },
            success: function (result) {
                if (result.status == 'deleted') {
                    Swal.fire({
                        title: 'Xóa khóa học thành công',
                        confirmButtonColor: '#212121',
                    }).then(() => {
                        location.href = "/admin/course"
                    })
                }
            }
        })
    })
}

function timKiemKhoaHoc(){
    var search = document.getElementById(' inputTimKiem').value;
    location.href=`/admin/course?search=${search}`;
}