function muaKhoaHoc(courseID){
    $.ajax({
        url:'/course/buy',
        method:'POST',
        data:{
            courseID:courseID
        }
        // success: function(result){
        
        // }
    })
}