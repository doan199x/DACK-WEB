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
                    title: 'email email nhập vào không hợp lệ',
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

// function xemGiaoVien(studentID) {
//     location.href = `/student/profile?studentID=${studentID}`;
// }

// function suaGiaoVien(studentID) {
//     location.href = `/student/profile/edit?studentID=${studentID}`;
// }

// function xoaGiaoVien(studentID) {
//     $.ajax({
//         url: '/admin/delete-student',
//         type: 'POST',
//         data: {
//             studentID: studentID
//         },
//         success: function(result){
//             if(result.status=='ok'){
//                 location.href="/admin/student";
//             }
//         }
//     })
// }
