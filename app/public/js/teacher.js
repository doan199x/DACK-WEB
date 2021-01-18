function toiDanhSachKhoaHoc() {
    location.href = `/teacher`
}
function toiThemKhoaHoc() {
    location.href = `/teacher/add-course`
}

function getPrevPage(preve_value, perPage) {
    location.href = `/teacher?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/teacher?page=${next_value}&perPage=${perPage}`;
}

function timKiemKhoaHoc() {
    var search = document.getElementById('inputTimKiem').value;
    location.href = `/teacher?search=${search}`;
}

function chinhSuaKhoaHoc(courseID) {
    Swal.fire({
        title: 'Bạn muốn chỉnh sửa thông tin hay nội dung khóa học?',
        showDenyButton: true,
        confirmButtonText: `Thông tin`,
        denyButtonText: `Nội dung`,
        confirmButtonColor: `#212121`,
        denyButtonColor: `#212121`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            location.href = `/teacher/update-course-info?courseID=${courseID}`
        } else if (result.isDenied) {
            location.href = `/teacher/update-course-content?courseID=${courseID}`
        }
    })
}