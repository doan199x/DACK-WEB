function doiMatKhauGV() {
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword != confirmPassword) {
        Swal.fire({
            title: 'Mật khẩu và mật khẩu xác nhận không đúng',
            confirmButtonColor: '#212121',
        })
    } else {
        $.ajax({
            url: '/teacher/change-password',
            type: 'POST',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            },
            success: function (result) {
                if (result.status == 0) {
                    Swal.fire({
                        title: 'Đổi mật khẩu thành công',
                        confirmButtonColor: '#212121',
                    }).then(()=>{
                        location.href='/teacher/profile'
                    })
                } else if (result.status == 1) {
                    Swal.fire({
                        title: 'Password nhập vào không đúng',
                        confirmButtonColor: '#212121',
                    })
                }
                else {
                    Swal.fire({
                        title: 'Lỗi không xác định',
                        confirmButtonColor: '#212121',
                    })
                }
            }
        })
    }
}