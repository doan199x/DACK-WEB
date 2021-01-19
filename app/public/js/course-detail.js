function addWatchList(courseID) {
    $.ajax({
        url: '/course/add-watchlist',
        type: 'POST',
        data: {
            courseID: courseID
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Đã thêm khóa học vào danh sách yêu thích',
                    confirmButtonColor: '#212121',
                })
            }
        }
    })
}