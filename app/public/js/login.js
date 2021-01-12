function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === "" || password === "") {
        Swal.fire({
            title: 'Email và mật khẩu không được rỗng!',
            confirmButtonColor: '#212121',
        })
    } else {
        $.ajax({
            url: '/login',
            method: 'GET',
            data: {
                email:email,

            },
            success: function(result){
                if (result.ok == true) {
                    Swal.fire({
                        title: 'Cảm ơn bạn đã đánh giá khóa học',
                        confirmButtonColor: '#212121'
                    }).then(() => {
                        window.location.href = `/student/rate?courseID=${courseID}`
                    })
                }
            }
        })
    }
}