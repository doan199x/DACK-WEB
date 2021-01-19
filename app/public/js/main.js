function muaKhoaHoc(courseID) {
    $.ajax({
        url: '/course/buy',
        method: 'POST',
        data: {
            courseID: courseID
        },
        success: function (result) {
            if (result.status == 1) {
                Swal.fire({
                    title: 'Bạn đã mua khóa học này',
                    confirmButtonColor: '#212121'
                })
            } else if (result.status == 0) {
                Swal.fire({
                    title: 'Cám ơn bạn đã mua khóa học',
                    confirmButtonColor: '#212121'
                }).then(()=>{
                    location.href=`/student/watch?courseID=${result.courseID}`
                })
            } else if (result.status == 0){
                Swal.fire({
                    title: 'Bạn không đủ tiền để mua khóa học',
                    confirmButtonColor: '#212121'
                }) 
            }
        }
    })
}