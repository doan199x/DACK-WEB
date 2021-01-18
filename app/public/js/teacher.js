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