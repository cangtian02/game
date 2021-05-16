var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅场景
 */
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super.call(this) || this;
        HomeView.self = _this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    HomeView.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    HomeView.prototype.init = function () {
        // 初次登入不进行获取用户信息查询
        if (!Main.ISLOGINONE) {
            HomeView.getUserInfo();
        }
        this.createView();
        this.createWebsocket();
    };
    HomeView.getUserInfo = function () {
        httpAjax(true, Main.DEFAULT_CONFIG.config.met_getAccount, '{}', function (event) {
            var res_1 = event.currentTarget;
            var res = JSON.parse(res_1.response);
            if (res.ret != 0) {
                var toast = new Toast('获取用户信息异常');
                HomeView.viewBox.addChild(toast);
                return;
            }
            // 更改用户信息
            Main.USER_INFO.card = res.account.card;
            HomeCardNumGroup.myCollection.replaceItemAt({ value: Main.USER_INFO.card }, 0);
        });
    };
    // 绘制场景
    HomeView.prototype.createView = function () {
        // 场景盒子
        this.addChild(HomeView.viewBox);
        HomeView.viewBox.width = this.stage.stageWidth;
        HomeView.viewBox.height = this.stage.stageHeight;
        // 背景
        var viewBg = createBitmapByName("home_bg_jpg");
        HomeView.viewBox.addChild(viewBg);
        viewBg.width = this.stage.stageWidth;
        viewBg.height = this.stage.stageHeight;
        // logo
        var logo = createBitmapByName("public_logo_png");
        HomeView.viewBox.addChild(logo);
        logo.width = 277;
        logo.height = 95;
        logo.x = (this.stage.stageWidth - 277) / 2;
        logo.y = 10;
        // 左上角用户信息
        var userBoxView = new UserBoxView();
        HomeView.viewBox.addChild(userBoxView);
        userBoxView.x = 28;
        userBoxView.y = 24;
        // 创建和加入房间
        var roomBtnView = new RoomBtnView();
        HomeView.viewBox.addChild(roomBtnView);
        roomBtnView.x = 284;
        roomBtnView.y = this.stage.stageHeight - 540;
    };
    HomeView.prototype.createWebsocket = function () {
        // 第一次进入大厅进行 query_state 查询用户状态
        if (Main.ISLOGINONE) {
            Main.ISLOGINONE = false;
            Main.WEBSOCKET.doSend(cfg_query_state());
        }
    };
    return HomeView;
}(egret.DisplayObjectContainer));
// 场景盒子
HomeView.viewBox = new egret.Sprite();
__reflect(HomeView.prototype, "HomeView");
