/**
 * websocket 
 */
class WebSocketExample {
	
    private socket: egret.WebSocket;   // socket
    private cbConnect: Array<any>;  // 连接成功回调
    private cbError: Array<any>;  // 连接失败回调
    private time: any;  // 心跳
    private webSocketGame: any = new WebSocketGame();  // 下发处理事件类
    
    constructor() {
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
	}
	
    public setConnectHandler(_func: Function,_obj: Object) {
        this.cbConnect = [_obj,_func];
    }
    
    public setErrorHandler(_func: Function,_obj: Object) {
        this.cbError = [_obj,_func];
    }
    
    public connect() {
        // 连接服务器
        var _url = 'ws://' + Main.GAME_WEBSOCKET.svrip + ':' + Main.GAME_WEBSOCKET.svrport + '?uid=' + Main.USER_INFO.uid + '&token=' + Main.USER_INFO.session_key;
        this.socket.connectByUrl(_url);
    }
    
    public doSend(msg: string) {
        if(!this.socket.connected) {
            console.log('连接已断开');
            return;
        }
        this.socket.writeUTF(msg);
    }
    
    private onSocketOpen() {
        console.log('ws连接成功');
        // 连接成功回调
        if(this.cbConnect.length > 0) {
            var obj: Object = this.cbConnect[0];
            var func: Function = this.cbConnect[1];
            func.call(obj);
            this.cbConnect.length = 0;
        }
        // 保持与服务端心跳
        this.time = setInterval(() => {
            this.doSend(cfg_heart_beat());
        },3000);
    }
 
    private onSocketClose() {
        console.log('ws连接关闭');
        // 连接关闭后停止发送心跳
        clearInterval(this.time);
        // 尝试重连
        this.connect();
    }
    
    private onSocketError() {
        console.log('ws连接错误');
        // 连接错误回调
        if(this.cbError.length > 0) {
            var obj: Object = this.cbError[0];
            var func: Function = this.cbError[1];
            func.call(obj);
            this.cbError.length = 0;
        }
    }

    private onReceiveMessage() {
        var msg = this.socket.readUTF();
        var _msg = JSON.parse(msg);
        if(_msg._events != undefined) {
            if(_msg._events[0]._cmd != 'heart_beat' && _msg._events[0]._cmd != 'pushmsg' && _msg._events[0]._cmd != 'points_refresh') {
                console.log(_msg);
            }
        }
        // 通过返回的数据统一派发相应事件
        this.webSocketGame.init(msg);
    }
    
}
