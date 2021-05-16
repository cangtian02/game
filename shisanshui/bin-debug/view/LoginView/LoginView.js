var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏登入
 */
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        // 协议点击状态 0 未选中 1 选中
        _this.agrFlag = 1;
        // 登入openid
        _this.openid = 0;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    LoginView.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    LoginView.prototype.init = function () {
        // 绘制背景
        var viewBg = createBitmapByName("login_bg_jpg");
        this.addChild(viewBg);
        viewBg.width = this.stage.stageWidth;
        viewBg.height = this.stage.stageHeight;
        // 绘制logo
        var logo = createBitmapByName("login_logo_png");
        this.addChild(logo);
        logo.width = 628;
        logo.height = 215;
        logo.x = 326;
        logo.y = 60;
        // 绘制提示语
        var text = createTextFieldByName('抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活');
        this.addChild(text);
        text.width = this.stage.stageWidth;
        text.height = 40;
        text.y = this.stage.stageHeight - 40;
        text.textColor = 0xFFFFFF;
        text.size = 22;
        text.textAlign = 'center';
        text.verticalAlign = 'middle';
        // 绘制同意使用协议
        var agreement = new egret.Sprite();
        this.addChild(agreement);
        agreement.width = 300;
        agreement.height = 40;
        agreement.x = 490;
        agreement.y = this.stage.stageHeight - 120;
        var radioBox = new egret.Sprite();
        agreement.addChild(radioBox);
        radioBox.width = 40;
        radioBox.height = 40;
        var radioBtn_1 = createBitmapByName("login_sprite_json.login_radio1");
        radioBox.addChildAt(radioBtn_1, 1);
        radioBtn_1.width = 40;
        radioBtn_1.height = 40;
        this.radioBtn_2 = createBitmapByName("login_sprite_json.login_radio2");
        radioBox.addChildAt(this.radioBtn_2, 2);
        this.radioBtn_2.width = 50;
        this.radioBtn_2.height = 38;
        this.radioBtn_2.x = 2;
        this.radioBtn_2.y = -2;
        var agr_text = createBitmapByName("login_sprite_json.login_text1");
        agreement.addChild(agr_text);
        agr_text.width = 240;
        agr_text.height = 34;
        agr_text.x = 60;
        agr_text.y = 3;
        // 绘制登入按钮
        var loginBtn = createBitmapByName("login_sprite_json.login_btn1");
        this.addChild(loginBtn);
        loginBtn.width = 240;
        loginBtn.height = 80;
        loginBtn.x = 520;
        loginBtn.y = this.stage.stageHeight - 248;
        // 使用协议点击事件处理
        radioBox.touchEnabled = true;
        radioBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.radioBoxTap, this);
        // 登入按钮点击事件
        loginBtn.touchEnabled = true;
        loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginBtnTap, this);
        // 查询缓存是否有openid
        var _openid = egret.localStorage.getItem('openid');
        _openid != null ? this.openid = _openid : this.openid = 0;
        // 当缓存内有openid时，自动登入
        if (this.openid != 0)
            this.goLogin();
    };
    LoginView.prototype.radioBoxTap = function (evt) {
        var tw_radioBtn_2 = egret.Tween.get(this.radioBtn_2);
        if (this.agrFlag == 1) {
            tw_radioBtn_2.to({ "alpha": 0 }, 300);
            this.agrFlag = 0;
        }
        else {
            tw_radioBtn_2.to({ "alpha": 1 }, 300);
            this.agrFlag = 1;
        }
    };
    LoginView.prototype.loginBtnTap = function (evt) {
        // 没有勾选同意用户使用协议
        if (this.agrFlag == 0) {
            var toast = new Toast("请同意用户使用协议");
            this.addChild(toast);
        }
        else {
            // 随机生成一个openid（不根据终端做唯一随机）
            this.openid = new Date().getTime() + Math.floor(Math.random() * 10000);
            this.goLogin();
        }
    };
    // 登入
    LoginView.prototype.goLogin = function () {
        var _this = this;
        var loading = new Loading("正在登入，即将进入大厅");
        this.addChild(loading);
        // 先获取客户端配置
        httpAjax(false, Main.DEFAULT_CONFIG.config.met_clientConfig, '{}', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.ret != 0) {
                _this.removeChild(loading);
                var toast = new Toast("获取客户端配置异常");
                _this.addChild(toast);
                return;
            }
            // 注入游戏配置
            Main.GAME_CONFIG = req;
            Main.Game_GID = req.gameinfo.roomgame[0].gid;
            Main.GAME_WEBSOCKET = req.server[0];
            // 登入
            var param = '{"rtype": 9,"openid": ' + _this.openid + '}';
            httpAjax(false, Main.DEFAULT_CONFIG.config.met_login, param, function (event) {
                var res_1 = event.currentTarget;
                var res = JSON.parse(res_1.response);
                if (res.ret != 0) {
                    _this.removeChild(loading);
                    var toast = new Toast("用户登入异常");
                    _this.addChild(toast);
                    return;
                }
                // 注入用户信息
                Main.USER_INFO = res.user;
                Main.USER_INFO.session_key = res.session_key;
                // 存储openid
                egret.localStorage.setItem("openid", _this.openid);
                // 上连websocket
                Main.WEBSOCKET.connect();
                // 连接成功
                Main.WEBSOCKET.setConnectHandler(function () {
                    // 跳转大厅
                    ResUtils.getInstance().loadGroup(["home", "public"], function () {
                        _this.dispatchEvent(new egret.Event("GameHome"));
                    }, _this);
                }, _this);
                // 连接失败
                Main.WEBSOCKET.setErrorHandler(function () {
                    _this.removeChild(loading);
                    var toast = new Toast("用户登入异常");
                    _this.addChild(toast);
                }, _this);
            });
        });
    };
    return LoginView;
}(egret.DisplayObjectContainer));
__reflect(LoginView.prototype, "LoginView");
