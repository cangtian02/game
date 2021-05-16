var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏启动场景
 */
var ViewStart = (function (_super) {
    __extends(ViewStart, _super);
    function ViewStart() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    ViewStart.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    ViewStart.prototype.init = function () {
        var _this = this;
        // 绘制游戏启动背景
        var viewBg = createBitmapByName("viewStart_png");
        this.addChild(viewBg);
        viewBg.width = this.stage.stageWidth;
        viewBg.height = this.stage.stageHeight;
        // 加载场景切换资源
        ResUtils.getInstance().loadGroup("loading", function () {
            _this.loginReload();
        }, this);
    };
    // 加载登入资源，成功后跳转登入
    ViewStart.prototype.loginReload = function () {
        var _this = this;
        var loading = new Loading("正在努力加载，即将进入游戏");
        this.addChild(loading);
        ResUtils.getInstance().loadGroup(["config", "login"], function () {
            // 获取配置json植入Main类的CONFIG变量
            Main.DEFAULT_CONFIG = RES.getRes("default.config_json");
            // 替代eui主题，预加载exml文件
            new eui.Theme("resource/config/default.thm.json", _this.stage);
            // 跳转登入
            _this.dispatchEvent(new egret.Event("GameLogin"));
        }, this);
    };
    return ViewStart;
}(egret.DisplayObjectContainer));
__reflect(ViewStart.prototype, "ViewStart");
