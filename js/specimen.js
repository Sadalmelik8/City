//点击标题跳转
$(document).ready(function () {
    let oltid = '';
    $(".sole").click(function (e) {
        oltid = e.target.innerHTML;
        location.href = "particular.html?num=" + oltid;
    });
});

