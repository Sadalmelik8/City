function preLogin() {
    if (event.keyCode == 13) {
        //获取fsession
        var aCookie = GetCookie('wytSession');
        var fsession = aCookie;
        tohtml = "home.html";
        var username = document.getElementById('nm').value;
        var password = document.getElementById('pw').value;
        var s = "svr=MP_00000&mobile=" + username + "&smscode=" + password + "&fsession=" + fsession;
        var URL = "/miniprogram/?" + s;
        $.ajax({
            type: 'get',
            url: URL,
            datatype: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function (msg) {
                try {
                    if (msg.status == "ok") {
                        var aCookie = '{\'User_NM\':\'' + msg.ret.username;
                        aCookie += '\',\'fsession\':\'' + msg.ret.session + "/'";
                        aCookie += '}';
                        var expdate = new Date();
                        expdate.setTime(expdate.getTime() + (86400 * 1000 * 1));
                        document.cookie = 'wytSession=' + escape(aCookie)
                            + ';expires=' + expdate.toGMTString();
                        window.open(tohtml, '_self');
                    }
                }
                catch (e) { }
            }
        })
    }
}
//获取cookkie
function GetCookie(key) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (key == aCrumb[0]) {
            return unescape(aCrumb[1]);
        }
    }
}
//
var nn = 0;
var tipId;
var tipO;
function start() {
    if (nn > 0) {
        var vv = nn;
        $("#btn").attr("value", vv + '(s)后重新获取'); //更改按钮上的文字
        nn--;
    } else {
        $("#btn").attr("value", " 请重新获取验证码"); //更改按钮上的文字
        window.clearInterval(tipId); //清除循环事件
    }
}
function getclick() {
    $("#btn").attr("onclick", "show()"); //给定点击事件
    window.clearTimeout(tipO);//取消定时事件
}
var tohtml = "";
function show() {
    var rnd = Math.floor(Math.random() * 100000);
    var username = document.getElementById('nm').value;
    var s = "svr=MP_00001&rnd=" + rnd + "&mobile=" + username;
    var URL = "/miniprogram/?" + s;
    $.ajax({
        type: 'get',
        url: URL,
        contentType: "application/json",
        data: {},//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        cache: false,
        processData: false,
        contentType: false,
        success: function (msg) {
            try {
                if (msg.status == "ok") {
                    if (msg.after) {
                        alert(msg.after);
                    }
                    else {
                        document.cookie = 'wytSession=' + msg.ret.fsession;
                    }
                    //document.getElementById('pw').value = msg.ret.smscode;
                }
            }
            catch (e) {
            }
        }
    });
    nn = 60;
    tipId = window.setInterval("start()", 1000); //每隔1秒调用一次start()方法
    $("#btn").removeAttr("onclick");//取消点击事件
    tipO = window.setTimeout("getclick()", 60000);//60秒后给定点击事件
}
$(document).ready(function () {
    $('#dl').click(function () {
        //获取fsession
        var aCookie = GetCookie('wytSession');
        var fsession = aCookie;
        tohtml = "home.html";
        var username = document.getElementById('nm').value;
        var password = document.getElementById('pw').value;
        var s = "svr=MP_00000&mobile=" + username + "&smscode=" + password + "&fsession=" + fsession;
        var URL = "/miniprogram/?" + s;
        $.ajax({
            type: 'get',
            url: URL,
            datatype: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function (msg) {
                try {
                    if (msg.status == "ok") {
                        var aCookie = '{\'User_NM\':\'' + msg.ret.username;
                        aCookie += '\',\'fsession\':\'' + msg.ret.session + "/'";
                        aCookie += '}';
                        var expdate = new Date();
                        expdate.setTime(expdate.getTime() + (86400 * 1000 * 1));
                        document.cookie = 'wytSession=' + escape(aCookie)
                            + ';expires=' + expdate.toGMTString();
                        window.open(tohtml, '_self');
                    }
                }
                catch (e) { }
            }
        })
    });
});


