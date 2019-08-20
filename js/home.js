function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
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
//点击标题跳转
let redirect = function (fsession, userName) {
    let oltid = '';
    $(".icon").click(function (e) {
        oltid = e.currentTarget.id;
        window.open('update.html?num=' + oltid, 'iframe1')
    });
};
$(document).ready(function () {
    //获取fsession
    var aCookie = GetCookie('wytSession');
    session = eval('(' + aCookie + ')');
    if (session) {
       if (session.fsession == "undefined") {
           window.open('login.html', '_parent');
           return;
       }
       if (session.User_NM) {
           document.getElementById('user').innerText = session.User_NM;
       }
       else {
           window.open('login.html', '_parent');
           return;
       }
    }
    else {
       window.open('login.html', '_parent');
       return;
    }

    function buildJson() {
        var std = JSON.stringify({});
        var stdTemplate = JSON.parse(std);
        stdTemplate.sts = 0;
        return stdTemplate;
    }
    var mes = '';
    var fsession = session.fsession;
    var userName = session.User_NM;
    _template1 = buildJson();
    var s = ("svr=WS_00009" + "&fsession=" + fsession + "&userName=" + userName);
    var URL = "/webservice/?" + s;
    var form = new FormData();
    form.append("data", (JSON.stringify(_template1)));
    setInterval(test, 30000);
    function test() {
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
            data: form,
            async: true,
            contentType: "application/json",
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                dataObj = result; //返回的result为json格式的数据)
                //mes = dataObj.ret.length;
                //document.getElementById('messge').innerHTML = '未读消息数' + mes;
            }
        })
    }
});
function hide() {
    var a = document.getElementById("hide");
    var div = document.getElementsByClassName("left")[0];
    var iframe = document.getElementsByClassName("center")[0];
    if (a.src == "img/left.png") {
        a.src = "img/right.png";
        div.style.display = "none";
        iframe.style.width = "1870px";
    }
    else {
        a.src = "img/left.png";
        div.style.display = "block";
        iframe.style.width = "1628px";
    }

}
//消息提醒
$(document).ready(function () {
    $("#messge").click(function () {
        let con = '';
        let drop = document.getElementById('drop');
        let shade = document.getElementById('shade');
        shade.style.display = 'inline-block';
        if (drop.style.display === 'none') {
            drop.style.display = 'block'
        } else {
            drop.style.display = 'none'
        }
        var aCookie = GetCookie('wytSession');
        session = eval('(' + aCookie + ')');
        if (session) {
            if (session.fsession == "undefined") {
                window.open('login.html', '_parent');
                return;
            }
        }
        else {
            window.open('login.html', '_parent');
            return;
        }
        function buildJson() {
            var std = JSON.stringify({});
            var stdTemplate = JSON.parse(std);
            stdTemplate.sts = 0;
            return stdTemplate;
        }
        var fsession = session.fsession;
        var userName = session.User_NM;
        _template1 = buildJson();
        var s = ("svr=WS_00009" + "&fsession=" + fsession + "&userName=" + userName);
        var URL = "/webservice/?" + s;
        var form = new FormData();
        form.append("data", (JSON.stringify(_template1)));
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                dataObj = result; //返回的result为json格式的数据
                $.each(dataObj.ret, function (index, item) {
                    if (dataObj.ret[0].id == 0) {
                        con = '';
                        $("#data").html(con);
                    }
                    else {
                        con += "<div class='icon' id=" + item.num + ">"
                            + "<span class='date'>" + item.f_timestamp.substr(0, 4) + '/' + item.f_timestamp.substr(4, 2) + '/' + item.f_timestamp.substr(6, 2) + '&nbsp;' + item.f_timestamp.substr(8, 2) + ':' + item.f_timestamp.substr(10, 2) + ':' + item.f_timestamp.substr(12, 2) + "</span>"
                            + "<span class='operation'>" + item.username + item.operation + item.title + "</span>"
                            + "</div>";
                        $("#data").html(con);
                    }
                });
                redirect(fsession, userName);
                con = '';
            }
        });
    });
    let unread = document.getElementsByClassName("unread")[0];
    let read = document.getElementsByClassName("read")[0];
    $(".unread").click(function (ev) {
        var con = '';
        read.style.backgroundColor = '#c9c9c9';
        read.style.color = '#fff';
        unread.style.backgroundColor = '#fff';
        unread.style.color = '#555';
        function buildJson() {
            var std = JSON.stringify({});
            var stdTemplate = JSON.parse(std);
            stdTemplate.sts = 0;
            return stdTemplate;
        }
        var fsession = session.fsession;
        var userName = session.User_NM;
        _template1 = buildJson();
        var s = ("svr=WS_00009" + "&fsession=" + fsession + "&userName=" + userName);
        var URL = "/webservice/?" + s;
        var form = new FormData();
        form.append("data", (JSON.stringify(_template1)));
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                dataObj = result; //返回的result为json格式的数据
                $.each(dataObj.ret, function (index, item) {
                    if (dataObj.ret[0].id == 0) {
                        con = '';
                        $("#data").html(con);
                    }
                    else {
                        con += "<div class='icon' id=" + item.num + ">"
                            + "<span class='date'>" + item.f_timestamp.substr(0, 4) + '/' + item.f_timestamp.substr(4, 2) + '/' + item.f_timestamp.substr(6, 2) + '&nbsp;' + item.f_timestamp.substr(8, 2) + ':' + item.f_timestamp.substr(10, 2) + ':' + item.f_timestamp.substr(12, 2) + "</span>"
                            + "<span class='operation'>" + item.username + item.operation + item.title + "</span>"
                            + "</div>";
                        $("#data").html(con);
                    }
                });
                redirect(fsession, userName);
                con = '';
            }
        });
        stopBubble(ev);//这样就不会再冒泡给父级了
    });
    $(".read").click(function (ev) {
        var con = '';
        unread.style.backgroundColor = '#c9c9c9';
        unread.style.color = '#fff';
        read.style.backgroundColor = '#fff';
        read.style.color = '#555';
        function buildJson() {
            var std = JSON.stringify({});
            var stdTemplate = JSON.parse(std);
            stdTemplate.sts = 1;
            return stdTemplate;
        }
        var fsession = session.fsession;
        var userName = session.User_NM;
        _template1 = buildJson();
        var s = ("svr=WS_00009" + "&fsession=" + fsession + "&userName=" + userName);
        var URL = "/webservice/?" + s;
        var form = new FormData();
        form.append("data", (JSON.stringify(_template1)));
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                dataObj = result; //返回的result为json格式的数据
                $.each(dataObj.ret, function (index, item) {
                    if (dataObj.ret[0].id == 0) {
                        con = '';
                        $("#data").html(con);
                    }
                    else {
                        con += "<div class='icon' id=" + item.num + ">"
                            + "<span class='date'>" + item.f_timestamp.substr(0, 4) + '/' + item.f_timestamp.substr(4, 2) + '/' + item.f_timestamp.substr(6, 2) + '&nbsp;' + item.f_timestamp.substr(8, 2) + ':' + item.f_timestamp.substr(10, 2) + ':' + item.f_timestamp.substr(12, 2) + "</span>"
                            + "<span class='operation'>" + item.username + item.operation + item.title + "</span>"
                            + "</div>";
                        $("#data").html(con);
                    }
                });
                redirect(fsession, userName);
                con = '';
            }
        });
        stopBubble(ev);//这样就不会再冒泡给父级了
    });
    $("#shade").click(function () {
        let drop = document.getElementById("drop");
        let shade = document.getElementById('shade');
        drop.style.display = 'none';
        shade.style.display = 'none';

    });
});
$(document).ready(function () {
    function buildJson() {
        var std = JSON.stringify({});
        var stdTemplate = JSON.parse(std);
        stdTemplate.sts = 0;
        return stdTemplate;
    }
    let remind = '';
    var fsession = session.fsession;
    var userName = session.User_NM;
    _template1 = buildJson();
    var s = ("svr=WS_00009" + "&fsession=" + fsession + "&userName=" + userName);
    var URL = "/webservice/?" + s;
    var form = new FormData();
    form.append("data", (JSON.stringify(_template1)));
    setInterval(test, 30000);
    function test() {
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                dataObj = result; //返回的result为json格式的数据
                if (dataObj.ret[0].id === 0) {
                    document.getElementsByClassName("remind")[0].style.display = 'none'
                } else {
                    document.getElementsByClassName("remind")[0].style.display = 'inline-block';
                    remind = dataObj.ret.length;
                    document.getElementsByClassName("remind")[0].innerHTML = remind;
                }
            }
        });
    }
});
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    window.open('home.html', '_parent');
}
function hide() {
    var a = document.getElementById("hide");
    var div = document.getElementsByClassName("left")[0];
    var iframe = document.getElementsByClassName("center")[0];
    if (a.src == window.location.origin + "/img/left.png") {
        a.src = window.location.origin + "/img/right.png";
        div.style.display = "none";
        iframe.style.width = "1870px";
    }
    else {
        a.src = window.location.origin + "/img/left.png";
        div.style.display = "block";
        iframe.style.width = "1628px";
    }

}
