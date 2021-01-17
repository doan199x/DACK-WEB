function getPrevPage(preve_value, perPage) {
    location.href = `/admin/student?page=${preve_value}&perPage=${perPage}`;
}

function getNextPage(next_value, perPage) {
    location.href = `/admin/student?page=${next_value}&perPage=${perPage}`;
}

function xemHocSinh(studentID) {
    location.href = `/student/profile?studentID=${studentID}`;
}

function suaHocSinh(studentID) {
    location.href = `/student/profile/edit?studentID=${studentID}`;
}

function xoaHocSinh(studentID) {
    $.ajax({
        url: '/admin/delete-student',
        type: 'POST',
        data: {
            studentID: studentID
        },
        success: function(result){
            if(result.status=='ok'){
                location.href="/admin/student";
            }
        }
    })
}

function khoaHocSinh(studentID) {
    $.ajax({
        url:'/admin/ban-student',
        type:'POST',
        data:{
            studentID:studentID
        },
        success: function(result){
            if (result.status == 0){
                Swal.fire({
                    title: 'Cấm học sinh thành công',
                    confirmButtonColor: '#212121',
                }).then(()=>{
                    location.href="/admin/student"
                })
            } else{
                Swal.fire({
                    title: 'Lỗi không xác định',
                    confirmButtonColor: '#212121',
                })
            }
        }
    })
}

function moKhoaHocSinh(studentID) {
    $.ajax({
        url:'/admin/unban-student',
        type:'POST',
        data:{
            studentID:studentID
        },
        success: function(result){
            if (result.status == 0){
                Swal.fire({
                    title: 'Mở tài khoản học sinh thành công',
                    confirmButtonColor: '#212121',
                }).then(()=>{
                    location.href="/admin/student"
                })
            } else{
                Swal.fire({
                    title: 'Lỗi không xác định',
                    confirmButtonColor: '#212121',
                })
            }
        }
    })
}