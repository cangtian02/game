var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 方便类的单列使用
var Single = (function () {
    function Single() {
    }
    Single.getInstance = function () {
        var Class = this;
        if (!Class._instance) {
            Class._instance = new Class();
        }
        return Class._instance;
    };
    return Single;
}());
__reflect(Single.prototype, "Single");
// 绘制位图
function createBitmapByName(name) {
    var result = new egret.Bitmap();
    result.texture = RES.getRes(name);
    return result;
}
// 绘制文本
function createTextFieldByName(text) {
    var result = new egret.TextField();
    result.text = text;
    return result;
}
// 删除节点下的所有节点
function commonRemoveChild(box) {
    var len = box.$children.length;
    for (var i = len - 1; i >= 0; i--) {
        box.removeChild(box.$children[i]);
    }
}
/**
 * 获取url中的值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}
// 存储cookie
function setCookie(keyname, value, expires) {
    if (expires < 0) {
        document.cookie = keyname + "=" + value + ";expires=-1;path=/";
    }
    else {
        var date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        document.cookie = keyname + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
    }
}
// 获取cookie
function getCookie(keyname) {
    var arr, reg = new RegExp("(^| )" + keyname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return arr[2];
    return null;
}
/**
 * 加载外部js文件
 */
function loadExtentFile(filePath) {
    var oJs = document.createElement('script');
    oJs.setAttribute("type", "text/javascript");
    oJs.setAttribute("src", filePath);
    document.getElementsByTagName("head")[0].appendChild(oJs);
}
/**
 * http get 请求
 * url 地址
 * param 接口传值
 * callback 接口成功回调
 */
function httpAjaxGet(url, param, callback) {
    // platform 拼接终端类型上传到后端
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var platform = isiOS ? '1001' : '1';
    if (param.split('?').length == 1) {
        param = param + '?platform=' + platform;
    }
    else {
        param = param + '&platform=' + platform;
    }
    var request = new egret.HttpRequest();
    if (!Main.DEFAULT_CONFIG.debug) {
        request.withCredentials = true;
    }
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(Main.DEFAULT_CONFIG.api_url + url + param, egret.HttpMethod.GET);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    request.addEventListener(egret.Event.COMPLETE, function (event) {
        var request = event.currentTarget;
        var req = JSON.parse(request.response);
        // cookie过期将重新登入
        if (req.code == '-10001') {
            window.sessionStorage.removeItem('isLogin');
            window.location.reload();
            return;
        }
        // 玩家被加入黑名单
        if (req.code == '1401') {
            alert(req.msg);
            return;
        }
        callback(event);
    }, this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
        console.log('error');
    }, this);
}
/**
 * http post 请求
 * url 地址
 * param 接口传值
 * callback 接口成功回调
 */
function httpAjaxPost(url, param, callback) {
    // platform 拼接终端类型上传到后端
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var platform = isiOS ? '1001' : '1';
    if (url.split('?').length == 1) {
        url = url + '?platform=' + platform;
    }
    else {
        url = url + '&platform=' + platform;
    }
    var request = new egret.HttpRequest();
    if (!Main.DEFAULT_CONFIG.debug) {
        request.withCredentials = true;
    }
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(Main.DEFAULT_CONFIG.api_url + url, egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(JSON.stringify(param));
    request.addEventListener(egret.Event.COMPLETE, function (event) {
        var request = event.currentTarget;
        var req = JSON.parse(request.response);
        // cookie过期将重新登入
        if (req.code == '-10001') {
            window.sessionStorage.removeItem('isLogin');
            window.location.reload();
            return;
        }
        // 玩家被加入黑名单
        if (req.code == '1401') {
            alert(req.msg);
            return;
        }
        callback(event);
    }, this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
        console.log('error');
    }, this);
}
//# sourceMappingURL=Coommon.js.map