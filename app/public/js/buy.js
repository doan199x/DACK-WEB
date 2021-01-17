window.onload = function checkRegisteredCourse(){
    var check = this.document.getElementById('checkRegisteredCourse').value;
    if (check == 'da dang ki'){
        Swal.fire({
            title: 'Bạn đã đăng kí khóa học này, bạn sẽ được chuyển về trang chi tiết khóa học',
            confirmButtonColor: '#212121',
        }).then(() => {
            location.href = "/course"
        })
    }
}