function loadCategory() {
    var postCategoryID = document.getElementById('postCategory').value;
    $.ajax({
        url: '/teacher/get-category',
        type: 'POST',
        data: {
            postCategoryID: postCategoryID
        },
        success: function (result) {
            if (result.status == 0) {
                var select = document.getElementById('category');
                for (i = select.options.length - 1; i >= 0; i--) {
                    select.options[i] = null;
                }
                var category = document.getElementById('category');
                for (var i = 0; i < result.categories.length; i++) {
                    var newNode = document.createElement('option');
                    newNode.appendChild(document.createTextNode(result.categories[i].categoryName));
                    newNode.value = result.categories[i].categoryID;
                    category.appendChild(newNode);
                }
            }
        }
    })
}

function themKhoaHoc(){
    var courseName = document.getElementById("courseName").value;
    var courseSortDes = tinymce.get("addSortDescription").getContent({format:'text'});
    var courseDes = tinymce.get("addDescription").getContent({format:'text'});
    var htmlCourseSortDes = tinymce.get("addSortDescription").getContent();
    var htmlCourseDes = tinymce.get("addDescription").getContent();
    var coursePrice = document.getElementById("coursePrice").value;
    var postCategory = document.getElementById("postCategory").value;
    var category = document.getElementById("category").value;
    $.ajax({
        url: '/teacher/post-course',
        type: 'POST',
        data: {
            courseName: courseName,
            courseSortDes: courseSortDes,
            courseDes: courseDes,
            coursePrice: coursePrice,
            postCategory: postCategory,
            category: category,
            htmlCourseSortDes:htmlCourseSortDes,
            htmlCourseDes:htmlCourseDes
        },
        success: function (result) {
            if (result.status == 0) {
                Swal.fire({
                    title: 'Thêm danh khóa học thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            }
        }
    })
}