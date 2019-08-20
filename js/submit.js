let _click = function(){
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
    let _conceal = document.getElementsByClassName("conceal")[0];
    _conceal.style.display = "inline-block";
    //获取fsession
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
    var fsession = session.fsession;
    var userName = session.User_NM;
    _template1 = buildJson();
    var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
    var URL = "/miniprogram/?" + s;
    var form = new FormData();
    form.append("data", (JSON.stringify(_template1)));
    $.ajax({
        type: "post", //请求的方式，也有get请求
        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
        contentType: "application/json",
        data: form,//data是传给后台的字段，后台需要哪些就传入哪些
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function (result) {
            let con = '';
            dataObj = result;
            con+= "<span id='return'>" +"取消"+ "</span>";
            $.each(dataObj.ret, function (index, item) {
                con += "<span class='depts' id=" + item.bm + ">" + item.name + "</span>";
            });
            $('.conceal').html(con);

            $(".depts").click(function (e) {
                let type = e.target.id;
                con = '';
                function GetCookie(key) {
                    var aCookie = document.cookie.split("; ");
                    for (var i = 0; i < aCookie.length; i++) {
                        var aCrumb = aCookie[i].split("=");
                        if (key == aCrumb[0]) {
                            return unescape(aCrumb[1]);
                        }
                    }
                }
                //获取fsession
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
                var fsession = session.fsession;
                var userName = session.User_NM;
                _template1 = buildJson();
                var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                var URL = "/miniprogram/?" + s;
                var form = new FormData();
                form.append("data", (JSON.stringify(_template1)));
                $.ajax({
                    type: "post", //请求的方式，也有get请求
                    url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                    contentType: "application/json",
                    data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                    cache: false,
                    processData: false,
                    contentType: false,
                    dataType: "json", //json格式，后台返回的数据为json格式的。
                    success: function (result) {
                        let con = '';
                        dataObj = result;
                        con+= "<span id='top'>" +"返回"+ "</span>";
                        $.each(dataObj.ret, function (index, item) {
                            con += "<span class='depts1' id=" + item.bm + ">" + item.name + "</span>";
                        });
                        $('.conceal').html(con);
                    }
                });
                function buildJson() {
                    var std = JSON.stringify({});
                    var stdTemplate = JSON.parse(std);
                    stdTemplate.dept = type;
                    return stdTemplate;
                }
            });//第一层进第二层
            $(".depts1").click(function (e) {
                let type1 = e.target.id;
                con = '';
                function GetCookie(key) {
                    var aCookie = document.cookie.split("; ");
                    for (var i = 0; i < aCookie.length; i++) {
                        var aCrumb = aCookie[i].split("=");
                        if (key == aCrumb[0]) {
                            return unescape(aCrumb[1]);
                        }
                    }
                }
                //获取fsession
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
                var fsession = session.fsession;
                var userName = session.User_NM;
                _template1 = buildJson();
                var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                var URL = "/miniprogram/?" + s;
                var form = new FormData();
                form.append("data", (JSON.stringify(_template1)));
                $.ajax({
                    type: "post", //请求的方式，也有get请求
                    url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                    contentType: "application/json",
                    data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                    cache: false,
                    processData: false,
                    contentType: false,
                    dataType: "json", //json格式，后台返回的数据为json格式的。
                    success: function (result) {
                        let con = '';
                        dataObj = result;
                        if (dataObj.ret.id == 0){
                            _conceal.style.display = "none";
                            document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
                        } else {
                            con+= "<span id='top1'>" +"返回"+ "</span>";
                            $.each(dataObj.ret, function (index, item) {
                                con += "<span class='depts2' id=" + item.bm + ">" + item.name + "</span>";
                            });
                            $('.conceal').html(con);
                        }
                    }
                });
                function buildJson() {
                    var std = JSON.stringify({});
                    var stdTemplate = JSON.parse(std);
                    stdTemplate.dept = type1;
                    return stdTemplate;
                }
            });//第二层进第三层
            $(".depts2").click(function (e) {
                _conceal.style.display = "none";
                document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
            });//最后一层
        }
    });
    function buildJson() {
        var std = JSON.stringify({});
        var stdTemplate = JSON.parse(std);
        stdTemplate.dept = '0';
        return stdTemplate;
    }
    $("#return").click(function () {
        _conceal.style.display = 'none';
    });
    $("#top").click(function () {
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
        let _conceal = document.getElementsByClassName("conceal")[0];
        _conceal.style.display = "inline-block";
        //获取fsession
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
        var fsession = session.fsession;
        var userName = session.User_NM;
        _template1 = buildJson();
        var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
        var URL = "/miniprogram/?" + s;
        var form = new FormData();
        form.append("data", (JSON.stringify(_template1)));
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
            contentType: "application/json",
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            cache: false,
            processData: false,
            contentType: false,
            dataType: "json", //json格式，后台返回的数据为json格式的。
            success: function (result) {
                let con = '';
                dataObj = result;
                con+= "<span id='return'>" +"取消"+ "</span>";
                $.each(dataObj.ret, function (index, item) {
                    con += "<span class='depts' id=" + item.bm + ">" + item.name + "</span>";
                });
                $('.conceal').html(con);

                $(".depts").click(function (e) {
                    let type = e.target.id;
                    con = '';
                    function GetCookie(key) {
                        var aCookie = document.cookie.split("; ");
                        for (var i = 0; i < aCookie.length; i++) {
                            var aCrumb = aCookie[i].split("=");
                            if (key == aCrumb[0]) {
                                return unescape(aCrumb[1]);
                            }
                        }
                    }
                    //获取fsession
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
                    var fsession = session.fsession;
                    var userName = session.User_NM;
                    _template1 = buildJson();
                    var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                    var URL = "/miniprogram/?" + s;
                    var form = new FormData();
                    form.append("data", (JSON.stringify(_template1)));
                    $.ajax({
                        type: "post", //请求的方式，也有get请求
                        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                        contentType: "application/json",
                        data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: "json", //json格式，后台返回的数据为json格式的。
                        success: function (result) {
                            let con = '';
                            dataObj = result;
                            con+= "<span id='top'>" +"返回"+ "</span>";
                            $.each(dataObj.ret, function (index, item) {
                                con += "<span class='depts1' id=" + item.bm + ">" + item.name + "</span>";
                            });
                            $('.conceal').html(con);
                        }
                    });
                    function buildJson() {
                        var std = JSON.stringify({});
                        var stdTemplate = JSON.parse(std);
                        stdTemplate.dept = type;
                        return stdTemplate;
                    }
                });//第一层进第二层
                $(".depts1").click(function (e) {
                    let type1 = e.target.id;
                    con = '';
                    function GetCookie(key) {
                        var aCookie = document.cookie.split("; ");
                        for (var i = 0; i < aCookie.length; i++) {
                            var aCrumb = aCookie[i].split("=");
                            if (key == aCrumb[0]) {
                                return unescape(aCrumb[1]);
                            }
                        }
                    }
                    //获取fsession
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
                    var fsession = session.fsession;
                    var userName = session.User_NM;
                    _template1 = buildJson();
                    var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                    var URL = "/miniprogram/?" + s;
                    var form = new FormData();
                    form.append("data", (JSON.stringify(_template1)));
                    $.ajax({
                        type: "post", //请求的方式，也有get请求
                        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                        contentType: "application/json",
                        data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: "json", //json格式，后台返回的数据为json格式的。
                        success: function (result) {
                            let con = '';
                            dataObj = result;
                            if (dataObj.ret.id == 0){
                                _conceal.style.display = "none";
                                document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
                            } else {
                                con+= "<span id='top1'>" +"返回"+ "</span>";
                                $.each(dataObj.ret, function (index, item) {
                                    con += "<span class='depts2' id=" + item.bm + ">" + item.name + "</span>";
                                });
                                $('.conceal').html(con);
                            }
                        }
                    });
                    function buildJson() {
                        var std = JSON.stringify({});
                        var stdTemplate = JSON.parse(std);
                        stdTemplate.dept = type1;
                        return stdTemplate;
                    }
                });//第二层进第三层
                $(".depts2").click(function (e) {
                    _conceal.style.display = "none";
                    document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
                });//最后一层
            }
        });
        function buildJson() {
            var std = JSON.stringify({});
            var stdTemplate = JSON.parse(std);
            stdTemplate.dept = '0';
            return stdTemplate;
        }
    });
    $("#top1").click(function () {
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
        let _conceal = document.getElementsByClassName("conceal")[0];
        _conceal.style.display = "inline-block";
        //获取fsession
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
        var fsession = session.fsession;
        var userName = session.User_NM;
        _template1 = buildJson();
        var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
        var URL = "/miniprogram/?" + s;
        var form = new FormData();
        form.append("data", (JSON.stringify(_template1)));
        $.ajax({
            type: "post", //请求的方式，也有get请求
            url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
            contentType: "application/json",
            data: form,//data是传给后台的字段，后台需要哪些就传入哪些
            cache: false,
            processData: false,
            contentType: false,
            dataType: "json", //json格式，后台返回的数据为json格式的。
            success: function (result) {
                let con = '';
                dataObj = result;
                con+= "<span id='return'>" +"取消"+ "</span>";
                $.each(dataObj.ret, function (index, item) {
                    con += "<span class='depts' id=" + item.bm + ">" + item.name + "</span>";
                });
                $('.conceal').html(con);

                $(".depts").click(function (e) {
                    let type = e.target.id;
                    con = '';
                    function GetCookie(key) {
                        var aCookie = document.cookie.split("; ");
                        for (var i = 0; i < aCookie.length; i++) {
                            var aCrumb = aCookie[i].split("=");
                            if (key == aCrumb[0]) {
                                return unescape(aCrumb[1]);
                            }
                        }
                    }
                    //获取fsession
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
                    var fsession = session.fsession;
                    var userName = session.User_NM;
                    _template1 = buildJson();
                    var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                    var URL = "/miniprogram/?" + s;
                    var form = new FormData();
                    form.append("data", (JSON.stringify(_template1)));
                    $.ajax({
                        type: "post", //请求的方式，也有get请求
                        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                        contentType: "application/json",
                        data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: "json", //json格式，后台返回的数据为json格式的。
                        success: function (result) {
                            let con = '';
                            dataObj = result;
                            con+= "<span id='top'>" +"返回"+ "</span>";
                            $.each(dataObj.ret, function (index, item) {
                                con += "<span class='depts1' id=" + item.bm + ">" + item.name + "</span>";
                            });
                            $('.conceal').html(con);
                        }
                    });
                    function buildJson() {
                        var std = JSON.stringify({});
                        var stdTemplate = JSON.parse(std);
                        stdTemplate.dept = type;
                        return stdTemplate;
                    }
                });//第一层进第二层
                $(".depts1").click(function (e) {
                    let type1 = e.target.id;
                    con = '';
                    function GetCookie(key) {
                        var aCookie = document.cookie.split("; ");
                        for (var i = 0; i < aCookie.length; i++) {
                            var aCrumb = aCookie[i].split("=");
                            if (key == aCrumb[0]) {
                                return unescape(aCrumb[1]);
                            }
                        }
                    }
                    //获取fsession
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
                    var fsession = session.fsession;
                    var userName = session.User_NM;
                    _template1 = buildJson();
                    var s = ("svr=MP_00007" + "&fsession=" + fsession + "&userName=" + userName);
                    var URL = "/miniprogram/?" + s;
                    var form = new FormData();
                    form.append("data", (JSON.stringify(_template1)));
                    $.ajax({
                        type: "post", //请求的方式，也有get请求
                        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
                        contentType: "application/json",
                        data: form,//data是传给后台的字段，后台需要哪些就传入哪些
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: "json", //json格式，后台返回的数据为json格式的。
                        success: function (result) {
                            let con = '';
                            dataObj = result;
                            if (dataObj.ret.id == 0){
                                _conceal.style.display = "none";
                                document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
                            } else {
                                con+= "<span id='top1'>" +"返回"+ "</span>";
                                $.each(dataObj.ret, function (index, item) {
                                    con += "<span class='depts2' id=" + item.bm + ">" + item.name + "</span>";
                                });
                                $('.conceal').html(con);
                            }
                        }
                    });
                    function buildJson() {
                        var std = JSON.stringify({});
                        var stdTemplate = JSON.parse(std);
                        stdTemplate.dept = type1;
                        return stdTemplate;
                    }
                });//第二层进第三层
                $(".depts2").click(function (e) {
                    _conceal.style.display = "none";
                    document.getElementsByClassName("select")[0].innerHTML = e.target.innerHTML;
                });//最后一层
            }
        });
        function buildJson() {
            var std = JSON.stringify({});
            var stdTemplate = JSON.parse(std);
            stdTemplate.dept = type;
            return stdTemplate;
        }
    });
};
$(document).ready(function () {
   $(".select").click(function () {
       _click()
   })
});
// 获取配送人员
$(document).ready(function () {
    var aCookie = GetCookie('wytSession');
    session = eval('(' + aCookie + ')');
    if (session) {
        if (session.fsession == "undefined") {
            window.open('login.html', '_parent');
            return;
        }
        if (session.User_NM) {

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
    var fsession = session.fsession;
    var userName = session.User_NM;
    var s = ("svr=MP_00008" + "&fsession=" + fsession + "&userName=" + userName);
    var URL = "/miniprogram/?" + s;
    $.ajax({
        type: "post", //请求的方式，也有get请求
        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
        contentType: "application/json",
        data: {},//data是传给后台的字段，后台需要哪些就传入哪些
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function (result) {
            var dataObj = result;
            $.each(dataObj.ret.deliver, function (index, item) {
                var option = document.createElement("option");
                $(option).val(item);
                $(option).text(item);
                $('#delivery').append(option);
            })
        }
    });
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
});
//获取标本类别
$(document).ready(function () {
    var aCookie = GetCookie('wytSession');
    session = eval('(' + aCookie + ')');
    if (session) {
        if (session.fsession == "undefined") {
            window.open('login.html', '_parent');
            return;
        }
        if (session.User_NM) {

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
    var fsession = session.fsession;
    var userName = session.User_NM;
    var s = ("svr=MP_00009" + "&fsession=" + fsession + "&userName=" + userName);
    var URL = "/miniprogram/?" + s;
    $.ajax({
        type: "post", //请求的方式，也有get请求
        url: URL, //请求地址，后台提供的,这里我在//本地自己建立了个json的文件做例子
        contentType: "application/json",
        data: {},//data是传给后台的字段，后台需要哪些就传入哪些
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function (result) {
            var dataObj = result;
            $.each(dataObj.ret.sampletype, function (index, item) {
                var option = document.createElement("option");
                $(option).val(item);
                $(option).text(item);
                $('#sort').append(option);
            })
        }
    });
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
});
//录入标本
$(document).ready(function () {
    let _title = document.getElementById("title").value;
    // let _icon = document.getElementsByClassName("icon--icon")[0].innerHTML;
    if (event.keyCode == 13) {
        let con = '';
        con += "<span class='icon--icon'>" + _title + "<span class='delete'>×</span></span>";
        $(".conceal").html(con);
        _title.value = '';
    }
    $(".delete").click(function (e) {
        e.target.parent.style.display = 'none';
    })
});
