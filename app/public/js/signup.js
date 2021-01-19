function checkOTP(email){
    let otp = document.getElementById('otp').value;
    console.log(email);
    $.ajax({
        url:'/signup/compare-otp',
        type:'POST',
        data:{
            otp: otp,
            email:email
        },
        success:function(result){
            if(result.status=='done'){
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký tài khoản thành công!',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/login"
                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký tài khoản thất bại!',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/signup"
                })
            }
        }
    })
}

function signup(){
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let confirmpassword = document.getElementById('confirmpassword').value;
    $.ajax({
        url:'/signup',
        type:'POST',
        data:{
            password:password,
            confirmpassword:confirmpassword,
            email:email
        },
        success:function(result){
            if(result.status=='email'){
                Swal.fire({
                    icon: 'error',
                    title: 'Email không được trống!',
                    confirmButtonColor: '#212121',
                })
            }
            else if(result.status=='password'){
                Swal.fire({
                    title: 'Mật khẩu và xác nhận mật khẩu không được trống và phải trùng khớp!',
                    icon: 'error',
                    confirmButtonColor: '#212121',
                })
            }
            else if(result.status=='existed'){
                Swal.fire({ 
                    icon: 'error',
                    title: 'Email đã được đăng ký!',
                    confirmButtonColor: '#212121',
                })
            } else if(result.status=='ok'){
                Swal.fire({
                    icon: 'success',
                    title: 'Vui lòng nhập OTP để kích hoạt tài khoản!',
                    confirmButtonColor: '#212121',
                }).then(()=>{
                    location.href=`/signup/otp?email=${result.email}`;
                })
            }
        }
    })
}