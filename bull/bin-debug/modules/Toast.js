var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 文案提示
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
        var viewBox = new egret.Sprite();
        this.addChild(viewBox);
        viewBox.width = 600;
        viewBox.height = 80;
        viewBox.x = (Game.view_box.width - 600) / 2;
        viewBox.y = 500;
        var bg = createBitmapByName('Spirit_json.toast_bg');
        viewBox.addChild(bg);
        bg.width = 600;
        bg.height = 80;
        var ts = createTextFieldByName(this.toastText);
        ts.textColor = 0xffffff;
        ts.size = 28;
        ts.width = bg.width;
        ts.height = bg.height;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        viewBox.addChild(ts);
        // toast 动画
        var tw_toastBox = egret.Tween.get(viewBox);
        tw_toastBox.wait(2000);
        tw_toastBox.to({
            "alpha": 0,
            "y": 300
        }, 1000, egret.Ease.backInOut);
        setTimeout(function () {
            _this.removeChild(viewBox);
        }, 3000);
    };
    return Toast;
}(egret.Sprite));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map