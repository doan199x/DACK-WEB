function setActivePage() {
    var btnPage = 'btn-' + document.getElementById("activePage").value;
    document.getElementById(`${btnPage}`).className = "btn btn-secondary";
}

function hoverActive(btnID){
    if(btnID == 'btn-profile'){
        document.getElementById(`btn-watch-list`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-course-list`).className = "btn btn-outline-secondary";
    } else if (btnID == 'btn-watch-list'){
        document.getElementById(`btn-profile`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-course-list`).className = "btn btn-outline-secondary";
    } else{
        document.getElementById(`btn-profile`).className = "btn btn-outline-secondary";
        document.getElementById(`btn-watch-list`).className = "btn btn-outline-secondary";
    }
}

function hocSinhDoiMK(){
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword != confirmPassword) {
        Swal.fire({
            title: 'Mật khẩu và mật khẩu xác nhận không đúng',
            confirmButtonColor: '#212121',
        })
    } else {
        console.log(confirmPassword);
        $.ajax({
            url: '/student/change-password',
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
                        location.href='/student/profile'
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

window.onload = setActivePage();