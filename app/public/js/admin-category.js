function themDanhMuc(postCategoryID) {
    var categoryID = 'categoryID' + postCategoryID;
    var categoryName = document.getElementById(categoryID).value;
    console.log(categoryName);
    $.ajax({
        url: '/admin/category-create',
        type: 'POST',
        data: {
            categoryName: categoryName,
            postCategoryID: postCategoryID
        },
        success: function (result) {
            if (result.result == 'oke') {
                Swal.fire({
                    title: 'Thêm danh mục con thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            }
        }
    })
}

function xoaDanhMuc(categoryID) {
    $.ajax({
        url: '/admin/category-delete',
        type: 'POST',
        data: {
            categoryID: categoryID
        },
        success: function (result) {
            if (result.check == false) {
                Swal.fire({
                    title: 'Xóa danh mục thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            } else {
                Swal.fire({
                    title: 'Không thể xóa vì danh mục đang có khóa học',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            }
        }
    })
}

function suaDanhMucCha(postCategoryID) {
    var idDanhMuc = 'danhMucCha' + postCategoryID;
    postCategoryName = document.getElementById(idDanhMuc).value;
    if (postCategoryName == null || postCategoryName == "") {
        Swal.fire({
            title: 'Vui lòng nhập tên danh mục cha',
            confirmButtonColor: '#212121',
        })
    } else {
        $.ajax({
            url: '/admin/post-category-update',
            type: 'POST',
            data: {
                postCategoryName: postCategoryName,
                postCategoryID: postCategoryID
            },
            success: function (result) {
                if (result.result == 'oke') {
                    Swal.fire({
                        title: 'Sửa danh mục cha thành công',
                        confirmButtonColor: '#212121',
                    }).then(() => {
                        location.href = "/admin/category"
                    })
                }
            }
        })
    }
}

function suaDanhMucCon(categoryID) {
    var idDanhMuc = 'danhMucCon' + categoryID;
    categoryName = document.getElementById(idDanhMuc).value;
    if (categoryName == null || categoryName == "") {
        Swal.fire({
            title: 'Vui lòng nhập tên danh mục con',
            confirmButtonColor: '#212121',
        })
    } else {
        $.ajax({
            url: '/admin/category-update',
            type: 'POST',
            data: {
                categoryName: categoryName,
                categoryID: categoryID
            },
            success: function (result) {
                if (result.result == 'oke') {
                    Swal.fire({
                        title: 'Sửa danh mục con thành công',
                        confirmButtonColor: '#212121',
                    }).then(() => {
                        location.href = "/admin/category"
                    })
                }
            }
        })
    }
}

function xoaDanhMucLon(postCategoryID){
    $.ajax({
        url: '/admin/post-category-delete',
        type: 'POST',
        data: {
            postCategoryID: postCategoryID
        },
        success: function (result) {
            if (result.check == false) {
                Swal.fire({
                    title: 'Xóa danh mục cha thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            } else {
                Swal.fire({
                    title: 'Không thể xóa vì danh mục cha vì đang có khóa học',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            }
        }
    })
}

function themDanhMucCha(){
    var postCategoryName = document.getElementById('postCategoryInput').value;
    $.ajax({
        url: '/admin/post-category-create',
        type: 'POST',
        data: {
            postCategoryName: postCategoryName
        },
        success: function (result) {
            if (result.result == 'oke') {
                Swal.fire({
                    title: 'Thêm danh mục cha thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href = "/admin/category"
                })
            }
        }
    })
}