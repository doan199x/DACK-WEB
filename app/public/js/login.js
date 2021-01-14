function login(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === "" || password === "") {
        event.preventDefault();
        Swal.fire({
            title: 'Email và mật khẩu không được rỗng!',
            confirmButtonColor: '#212121',
        })
    }
}
