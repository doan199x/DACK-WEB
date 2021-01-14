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