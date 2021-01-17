function getPrevPage(preve_value, perPage) {
    location.href = `/admin/teacher?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/admin/teacher?page=${next_value}&perPage=${perPage}`;
}

function themGiaoVien() {
    var tenGiaoVien = document.getElementById('tenGiaoVien').value;
    var emailGiaoVien = document.getElementById('emailGiaoVien').value;
    var matKhau = document.getElementById('matKhau').value;
    var xacNhanMatKhau = document.getElementById('xacNhanMatKhau').value;
    $.ajax({
        url: '/admin/add-teacher',
        type: 'POST',
        data: {
            tenGiaoVien: tenGiaoVien,
            emailGiaoVien: emailGiaoVien,
            matKhau: matKhau,
            xacNhanMatKhau: xacNhanMatKhau
        },
        success: function (result) {
            if (result.status == 1) {
                Swal.fire({
                    title: 'email này đã tồn tại',
                    confirmButtonColor: '#212121',
                })
            } else if (result.status == 2) {
                Swal.fire({
                    title: 'Mật khẩu xác nhận không khớp',
                    confirmButtonColor: '#212121',
                })
            } else if (result.status == 0) {
                Swal.fire({
                    title: 'Đăng kí tài khoản thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = '/admin/teacher'
                })
            } else if (result.status == 3) {
                Swal.fire({
                    title: 'Không được để trống một trong các ô trên',
                    confirmButtonColor: '#212121',
                })
            } else if (result.status == 4) {
                Swal.fire({
                    title: 'email nhập vào không hợp lệ',
                    confirmButtonColor: '#212121',
                })
            } else {
                {
                    Swal.fire({
                        title: 'Lỗi không xác định',
                        confirmButtonColor: '#212121',
                    })
                }
            }
        }
    })
}

function timKiemGiaoVien() {
    var search = document.getElementById('inputTimKiem').value;
    location.href = `/admin/teacher?search=${search}`
}

function khoaGiaoVien(teacherID) {
    $.ajax({
        url: '/admin/ban-teacher',
        type: 'POST',
        data: {
            teacherID: teacherID
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Cấm giáo viên thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/teacher"
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

function moKhoaGiaoVien(teacherID) {
    $.ajax({
        url: '/admin/unban-teacher',
        type: 'POST',
        data: {
            teacherID: teacherID
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Mở tài khoản giáo viên thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/teacher"
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
