function capNhatKhoaHoc() {
    var courseName = document.getElementById("courseName").value;
    var courseSortDes = tinymce.get("addSortDescription").getContent({ format: 'text' });
    var courseDes = tinymce.get("addDescription").getContent({ format: 'text' });
    var htmlCourseSortDes = tinymce.get("addSortDescription").getContent();
    var htmlCourseDes = tinymce.get("addDescription").getContent();
    var coursePrice = document.getElementById("coursePrice").value;
    var postCategory = document.getElementById("postCategory").value;
    var category = document.getElementById("category").value;
    if (coursePrice == ""){
        Swal.fire({
            title: 'Vui lòng nhập giá khóa học',
            confirmButtonColor: '#212121',
        })
    }else{
        $.ajax({
            url: '/teacher/update-course',
            type: 'POST',
            data: {
                courseName: courseName,
                courseSortDes: courseSortDes,
                courseDes: courseDes,
                coursePrice: coursePrice,
                postCategory: postCategory,
                category: category,
                htmlCourseSortDes: htmlCourseSortDes,
                htmlCourseDes: htmlCourseDes
            },
            success: function (result) {
                if (result.status == 0) {
                    Swal.fire({
                        title: 'Sửa khóa học thành công',
                        confirmButtonColor: '#212121',
                    }).then(() => {
                        location.href = "/teacher"
                    })
                }else{
                    Swal.fire({
                        title: 'Lỗi không xác định',
                        confirmButtonColor: '#212121',
                    }).then(() => {
                        location.href = "/teacher"
                    })
                }
            }
        })
    } 
}


window.onload = function loadDescription() {
    var htmlSortDescription = document.getElementById('htmlSortDescription').value;
    var htmlDescription = document.getElementById('htmlDescription').value;
    tinymce.get("addSortDescription").setContent(htmlSortDescription);
    tinymce.get("addDescription").setContent(htmlDescription);
}