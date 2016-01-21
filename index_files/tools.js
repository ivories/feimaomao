if (!String.prototype.format)
    String.prototype.format = function ()
    {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number)
        {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };

if (!String.format)
    String.format = function ()
    {
        if (arguments.length == 0) return null;

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++)
        {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };

function microTime()
{
    return Math.round(new Date().getTime());
}

function time()
{
    return Math.round(new Date().getTime()/1000);
}

function toInt(val)
{
    val = parseInt(val);
    return val = isNaN(val) ? 0 : val;
}

function nowDate()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    return year+"-"+month+"-"+day+" "+hh+":"+mm;
}

function _getUserDir(id)
{
    return toInt(toInt(toInt(id/1000)/1000)/1000)+"/"+toInt(id/1000/1000)+"/"+toInt(id/1000);
}

function getUserAvatar(id)
{
    return IMAGES_AVATAR_HOST+_getUserDir(id)+"/"+id;
}

function search_submit()
{
    $("#full_search").val(
        $("#full_search").val() == full_search_text_tips ? "" : $("#full_search").val()
    );
}

function autoHeight(object_name)
{
    var content_display = document.getElementById(object_name);
    if(content_display)
        if(content_display.offsetHeight < 500)
            content_display.style.height = "500px";
}

function colorbox(data,color)
{
    data = !color ? data : '<font color="'+color+'">'+data+'</font>';
    //data = '<div style="background:#ececec; height:18px; width:580px; padding:18px 10px;"><center>'+data+'</center></div>';
    $.colorbox({html:data,opacity:0.2,speed:300,initialWidth:"42",initialHeight:"32"});
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    if(cookieValue == '' || seconds < 0) {
        cookieValue = '';
        seconds = -2592000;
    }
    expires.setTime(expires.getTime() + seconds * 1000);
    domain = !domain ? "" : domain;
    path = !path ? "/" : path;
    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '')
        + (path ? '; path=' + path : '/')
        + (domain ? '; domain=' + domain : '')
        + (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    if(cookie_start == -1) {
        return '';
    } else {
        var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
        return !nounescape ? unescape(v) : v;
    }
}

function floatDivTop(floatID,hideID)
{
    //获取要定位元素距离浏览器顶部的距离
    var navH = $(floatID).offset().top;
    //滚动条事件
    $(window).scroll(function(){
        //获取滚动条的滑动距离
        var scroH = $(this).scrollTop();
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        if(scroH>=navH){
            $(hideID).show();
            $(hideID).css({"position":"fixed"});
        }else if(scroH<navH){
            $(hideID).hide();
        }
    })

}

var dynamicLoading = {
    css: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}
//        function loadFN(){
//            hrefValue = window.location.href; //获取当前页面的地址
//            hrefValue= hrefValue.split("\?")[0];
//            indexUrls = ['http://dafamao.com/','http://www.dafamao.com/','http://dafamao.com/index/','http://www.dafamao.com/index/','http://dafamao.com/index/index/','http://www.dafamao.com/index/index/','http://www.dafamao.com/user/login/'];
//            for(key in indexUrls){
//                if(String(hrefValue)==(indexUrls[key])){
//                    return true;
//                }
//            }
//             return false;
//        }
//        if(loadFN())
//        {
//            dynamicLoading.css("/style/index.css");
//            dynamicLoading.js("/js/jquery.jslides.js");
//        }
//        else
//        {
//            dynamicLoading.css("/style/head.css");
//            dynamicLoading.css("/style/master.css");
//
//        }

var GetQueryString = function (param)
{
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    return r == null ? null : unescape(r[2]);
};