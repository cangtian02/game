// 方便类的单列使用
class Single {
    public static getInstance(): any {
        var Class: any = this;
        if(!Class._instance) {
            Class._instance = new Class();
        }
        return Class._instance;
    }
}

// 绘制位图
function createBitmapByName(name: string) {
    var result = new egret.Bitmap();
    var texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
}

// 绘制文本
function createTextFieldByName(text: string) {
    var result: egret.TextField = new egret.TextField();
    result.text = text;
    return result;
}

// 删除节点下的所有节点
function commonRemoveChild(box: any) {
    var len: number = box.$children.length;
    for(var i: number = len - 1;i >= 0;i--) {
        box.removeChild(box.$children[i]);
    }
}

/**
 * http 请求
 * f 是否需要session_key
 * method 接口类名称
 * param 接口传值
 * callback 接口成功回调
 */ 
function httpAjax(f,method,param,callback) {
    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    var _f = '';
    if (f) {
        _f = '"session_key": "' + Main.USER_INFO.session_key + '"' + 
        ',"siteid":' + Main.DEFAULT_CONFIG.config.siteid + 
        ',"version":"' + Main.DEFAULT_CONFIG.config.version + '",';
    }
    var params = '?win_param={"appid":"' + Main.DEFAULT_CONFIG.config.appid + '",' + _f + '"method": "' + method + '","param":' + param + '}';
    request.open(Main.DEFAULT_CONFIG.config.res_url + params,egret.HttpMethod.POST);
    request.send();
    request.addEventListener(egret.Event.COMPLETE,callback,this);
}
