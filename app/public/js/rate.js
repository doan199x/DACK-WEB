$(function () {

    $(document).on({
        mouseover: function (event) {
            $(this).find('.far').addClass('star-over');
            $(this).prevAll().find('.far').addClass('star-over');
        },
        mouseleave: function (event) {
            $(this).find('.far').removeClass('star-over');
            $(this).prevAll().find('.far').removeClass('star-over');
        }
    }, '.rate');
    $(document).on('click', '.rate', function () {
        if (!$(this).find('.star').hasClass('rate-active')) {
            $(this).siblings().find('.star').addClass('far').removeClass('fas rate-active');
            $(this).find('.star').addClass('rate-active fas').removeClass('far star-over');
            $(this).prevAll().find('.star').addClass('fas').removeClass('far star-over');
            var stars = $(this)[0].control.id;
            $('#NOstars').val(stars.substring(4));
        } else {
            var stars = $(this)[0].control.id;
            $('#NOstars').val(stars.substring(4));
        }
    });
});

function rate() {
    var NoStars = document.getElementById('NOstars').value;
    var courseID = document.getElementById('courseID').value;
    var studentID = document.getElementById('studentID').value;
    var comment = document.getElementById('commentRate').value;
    if (NoStars == 'chuadanhgia') {
        Swal.fire({
            title: 'Vui lòng nhập số sao đánh giá cho khóa học',
            confirmButtonColor: '#212121',
        })
    } else {
        $.ajax({
            url: '/student/rate',
            method: 'POST',
            data: {
                courseID: courseID,
                studentID: studentID,
                NoStars: NoStars,
                comment: comment
            },
            success: function(result){
                if (result.ok == true) {
                    Swal.fire({
                        title: 'Cảm ơn bạn đã đánh giá khóa học',
                        confirmButtonColor: '#212121'
                    }).then(() => {
                        window.location.href = `/student/rate?courseID=${courseID}`
                    })
                }
            }
        })
    }
}

window.onload = function sendRatedMessage() {
    var checkRated = document.getElementById('checkRated').value;
    if (checkRated == 'true') {
        Swal.fire({
            title: 'Bạn đã đánh giá cho khóa học này',
            confirmButtonColor: '#212121'
        })
    }
}
