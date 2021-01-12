function napTien() {
    location.href = "/admin";
}

function quanLiDanhMuc() {
    location.href = "/admin/category";
}

function themDanhMuc() {
    var categoryName = document.getElementById('categoryName').value;
    $.ajax({
        url: '/admin/category-create',
        type: 'POST',
        data: {
            categoryName: categoryName
        },
        success: function (result) {
            if (result.result == 'oke') {
                Swal.fire({
                    title: 'Thêm danh mục thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href="/admin/category"
                })
            }
        }
    })
}

function xoaDanhMuc(categoryID){
    $.ajax({
        url:'/admin/category-delete',
        type:'POST',
        data:{
            categoryID: categoryID
        },
        success: function (result) {
            if (result.check == false) {
                Swal.fire({
                    title: 'Xóa danh mục thành công',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href="/admin/category"
                })
            }else{
                Swal.fire({
                    title: 'Không thể xóa vì danh mục đang có khóa học',
                    confirmButtonColor: '#212121',
                }).then(() => {
                    location.href="/admin/category"
                })
            }
        }
    })
}