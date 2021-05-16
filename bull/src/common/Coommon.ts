// 方便类的单列使用
class Single {
    public static getInstance(): any {
        let Class: any = this;
        if(!Class._instance) {
            Class._instance = new Class();
        }
        return Class._instance;
    }
}

// 绘制位图
function createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    result.texture = RES.getRes(name);
    return result;
}

// 绘制文本
function createTextFieldByName(text: string) {
    let result: egret.TextField = new egret.TextField();
    result.text = text;
    return result;
}

// 删除节点下的所有节点
function commonRemoveChild(box: any) {
    let len: number = box.$children.length;
    for(let i: number = len - 1;i >= 0;i--) {
        box.removeChild(box.$children[i]);
    }
}

/**
 * 获取url中的值
 */ 
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if(r != null) return decodeURIComponent(r[2]); return null;
}

// 存储cookie
function setCookie (keyname, value, expires) {
    if (expires < 0) {
        document.cookie = keyname + "=" + value + ";expires=-1;path=/"
    } else {
        let date: any = new Date()
        date.setTime(date.getTime() + expires * 1000)
        document.cookie = keyname + "=" + value + ";expires=" + date.toGMTString() + ";path=/"
    }
}

// 获取cookie
function getCookie (keyname) {
    let arr, reg = new RegExp("(^| )" + keyname + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg)) return arr[2]
    return null
}

/**
 * 加载外部js文件
 */ 
function loadExtentFile(filePath) {
    var oJs = document.createElement('script');
    oJs.setAttribute("type","text/javascript");
    oJs.setAttribute("src",filePath);
    document.getElementsByTagName("head")[0].appendChild(oJs);
}

/**
 * http get 请求
 * url 地址
 * param 接口传值
 * callback 接口成功回调
 */ 
function httpAjaxGet(url,param,callback) {
    // platform 拼接终端类型上传 iOS 1001 Android 1
    const platform = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? '1001' : '1';
    param = param.split('?').length == 1 ? param + '?platform=' + platform : param + '&platform=' + platform;

    // 登录后带回token
    param = window.sessionStorage.getItem('isLogin') != 'Y' ? param : param + '&token=' + window.sessionStorage.getItem('token');

    let request = new egret.HttpRequest();
    if(!Main.DEFAULT_CONFIG.debug) { request.withCredentials = true; }
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(Main.DEFAULT_CONFIG.api_url + url + param,egret.HttpMethod.GET);
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send();
    request.addEventListener(egret.Event.COMPLETE,function(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        var req = JSON.parse(request.response);

        // cookie过期将重新登入
        if (req.code == '-10001') {
            window.sessionStorage.removeItem('isLogin')
            window.location.reload()
            return
        } 

        // 玩家被加入黑名单
        if(req.code == '1401') {
            alert(req.msg);
            return;
        }
        callback(event);
    },this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR,() => {
        console.log('error');
    },this);
}

/**
 * http post 请求
 * url 地址
 * param 接口传值
 * callback 接口成功回调
 */
function httpAjaxPost(url,param,callback) {
    // platform 拼接终端类型上传 iOS 1001 Android 1
    const platform = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? '1001' : '1';
    url = url.split('?').length == 1 ? url + '?platform=' + platform : url + '&platform=' + platform;

    // 登录后带回token
    url = window.sessionStorage.getItem('isLogin') != 'Y' ? url : url + '&token=' + window.sessionStorage.getItem('token');

    let request = new egret.HttpRequest();
    if(!Main.DEFAULT_CONFIG.debug) {request.withCredentials = true;}
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(Main.DEFAULT_CONFIG.api_url + url,egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(JSON.stringify(param));
    request.addEventListener(egret.Event.COMPLETE,function(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        var req = JSON.parse(request.response);
        
        // cookie过期将重新登入
        if (req.code == '-10001') {
            window.sessionStorage.removeItem('isLogin')
            window.location.reload()
            return
        }

        // 玩家被加入黑名单
        if(req.code == '1401') {
            alert(req.msg);
            return;
        }
        callback(event);
    },this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR,() => {
        console.log('error');
    },this);
}
