var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 项目入口
 */
var Main = (function (_super) {
    __extends(Main, _super);
    // 构造函数
    function Main() {
        var _this = _super.call(this) || this;
        // 加载资源
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            RES.loadConfig("resource/default.res.json", "resource/");
        }, _this);
        // 游戏启动场景加载
        ResUtils.getInstance().loadGroup("viewStart", function () {
            _this._state = -1;
            _this.state = Main.STATE_START;
        }, _this);
        return _this;
    }
    Object.defineProperty(Main.prototype, "state", {
        set: function (s) {
            if (this._state != s) {
                this._state = s;
                if (this._curState && this._curState.parent) {
                    this.removeChild(this._curState);
                }
                switch (this._state) {
                    case Main.STATE_START:
                        this._curState = new ViewStart();
                        this._curState.addEventListener("GameLogin", this.gameLogin, this);
                        this.addChild(this._curState);
                        break;
                    case Main.STATE_LOGIN:
                        this._curState = new LoginView();
                        this._curState.addEventListener("GameHome", this.gameHome, this);
                        this.addChild(this._curState);
                        break;
                    case Main.STATE_HOME:
                        this._curState = new HomeView();
                        this._curState.addEventListener("GameStart", this.gameStart, this);
                        this.addChild(this._curState);
                        break;
                    case Main.STATE_GAME:
                        this._curState = new GameView();
                        this._curState.addEventListener("GameHome", this.gameHome, this);
                        this.addChild(this._curState);
                        break;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.gameLogin = function (e) {
        this.state = Main.STATE_LOGIN;
        Main.CUR_STATE = Main.STATE_LOGIN;
    };
    Main.prototype.gameHome = function (e) {
        this.state = Main.STATE_HOME;
        Main.CUR_STATE = Main.STATE_HOME;
    };
    Main.prototype.gameStart = function (e) {
        this.state = Main.STATE_GAME;
        Main.CUR_STATE = Main.STATE_GAME;
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.WEBSOCKET = new WebSocketExample(); // 全局websocket类
Main.ISLOGINONE = true; // 是否第一次登入游戏
// 各游戏场景
Main.STATE_START = 1; // 启动
Main.STATE_LOGIN = 2; // 登入
Main.STATE_HOME = 3; // 大厅
Main.STATE_GAME = 4; // 打牌
// 当前游戏场景
Main.CUR_STATE = 1;
__reflect(Main.prototype, "Main");
