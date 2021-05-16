var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * toast 提示
 */
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(toastText) {
        var _this = _super.call(this) || this;
        _this.toastText = toastText;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Toast.prototype.createView = function () {
        var _this = this;
        // 绘制toast盒子
        var toastBox = new egret.Sprite();
        this.addChild(toastBox);
        toastBox.width = 960;
        toastBox.height = 72;
        toastBox.x = 160;
        toastBox.y = (this.stage.stageHeight - 72) / 2;
        var toastBg = createBitmapByName("loading_text_bg_png");
        toastBox.addChild(toastBg);
        toastBg.width = toastBox.width;
        toastBg.height = toastBox.height;
        var _toastText = createTextFieldByName(this.toastText);
        toastBox.addChild(_toastText);
        _toastText.width = toastBox.width;
        _toastText.height = toastBox.height;
        _toastText.textColor = 0xFFFFFF;
        _toastText.size = 28;
        _toastText.textAlign = 'center';
        _toastText.verticalAlign = 'middle';
        _toastText.width = toastBox.width;
        _toastText.height = toastBox.height;
        // toast 动画
        var tw_toastBox = egret.Tween.get(toastBox);
        var tw_props_1 = {
            "alpha": .5,
            "scaleX": .5,
            "scaleY": .5,
            "x": 400,
            "y": (this.stage.stageHeight - 36) / 2
        };
        var tw_props_2 = {
            "alpha": 1,
            "scaleX": 1.2,
            "scaleY": 1.2,
            "x": 64,
            "y": (this.stage.stageHeight - 86.4) / 2
        };
        var tw_props_3 = {
            "alpha": 1,
            "scaleX": .9,
            "scaleY": .9,
            "x": 208,
            "y": (this.stage.stageHeight - 64.8) / 2
        };
        var tw_props_4 = {
            "alpha": 1,
            "scaleX": 1,
            "scaleY": 1,
            "x": 160,
            "y": (this.stage.stageHeight - 72) / 2
        };
        var tw_props_5 = {
            "alpha": 0,
            "scaleX": 1,
            "scaleY": 1,
            "x": 160,
            "y": (this.stage.stageHeight - 72) / 2 - 120
        };
        tw_toastBox.to(tw_props_1);
        tw_toastBox.to(tw_props_2, 120);
        tw_toastBox.to(tw_props_3, 100);
        tw_toastBox.to(tw_props_4, 80);
        tw_toastBox.wait(2000);
        tw_toastBox.to(tw_props_5, 1000, egret.Ease.backInOut);
        setTimeout(function () {
            _this.removeChild(toastBox);
        }, 3300);
    };
    return Toast;
}(egret.Sprite));
__reflect(Toast.prototype, "Toast");
