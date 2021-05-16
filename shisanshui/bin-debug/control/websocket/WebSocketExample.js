var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * websocket
 */
var WebSocketExample = (function () {
    function WebSocketExample() {
        this.webSocketGame = new WebSocketGame(); // 下发处理事件类
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }
    WebSocketExample.prototype.setConnectHandler = function (_func, _obj) {
        this.cbConnect = [_obj, _func];
    };
    WebSocketExample.prototype.setErrorHandler = function (_func, _obj) {
        this.cbError = [_obj, _func];
    };
    WebSocketExample.prototype.connect = function () {
        // 连接服务器
        var _url = 'ws://' + Main.GAME_WEBSOCKET.svrip + ':' + Main.GAME_WEBSOCKET.svrport + '?uid=' + Main.USER_INFO.uid + '&token=' + Main.USER_INFO.session_key;
        this.socket.connectByUrl(_url);
    };
    WebSocketExample.prototype.doSend = function (msg) {
        if (!this.socket.connected) {
            console.log('连接已断开');
            return;
        }
        this.socket.writeUTF(msg);
    };
    WebSocketExample.prototype.onSocketOpen = function () {
        var _this = this;
        console.log('ws连接成功');
        // 连接成功回调
        if (this.cbConnect.length > 0) {
            var obj = this.cbConnect[0];
            var func = this.cbConnect[1];
            func.call(obj);
            this.cbConnect.length = 0;
        }
        // 保持与服务端心跳
        this.time = setInterval(function () {
            _this.doSend(cfg_heart_beat());
        }, 3000);
    };
    WebSocketExample.prototype.onSocketClose = function () {
        console.log('ws连接关闭');
        // 连接关闭后停止发送心跳
        clearInterval(this.time);
        // 尝试重连
        this.connect();
    };
    WebSocketExample.prototype.onSocketError = function () {
        console.log('ws连接错误');
        // 连接错误回调
        if (this.cbError.length > 0) {
            var obj = this.cbError[0];
            var func = this.cbError[1];
            func.call(obj);
            this.cbError.length = 0;
        }
    };
    WebSocketExample.prototype.onReceiveMessage = function () {
        var msg = this.socket.readUTF();
        var _msg = JSON.parse(msg);
        if (_msg._events != undefined) {
            if (_msg._events[0]._cmd != 'heart_beat' && _msg._events[0]._cmd != 'pushmsg' && _msg._events[0]._cmd != 'points_refresh') {
                console.log(_msg);
            }
        }
        // 通过返回的数据统一派发相应事件
        this.webSocketGame.init(msg);
    };
    return WebSocketExample;
}());
__reflect(WebSocketExample.prototype, "WebSocketExample");
