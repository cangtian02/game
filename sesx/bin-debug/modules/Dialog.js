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
 * 弹框提示 吉时已到 辞旧迎新等
 */
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog(dialogText) {
        var _this = _super.call(this) || this;
        _this.dialogText = dialogText;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Dialog.prototype.createView = function () {
        var _this = this;
        var viewBox = new egret.Sprite();
        this.addChild(viewBox);
        viewBox.width = this.stage.stageWidth;
        viewBox.height = 160;
        viewBox.y = this.stage.stageHeight * 0.334;
        var bgImg = createBitmapByName('dialog-tips_png');
        viewBox.addChild(bgImg);
        bgImg.width = viewBox.width;
        bgImg.height = viewBox.height + 30;
        bgImg.y = -15;
        var maskBg = new egret.Shape();
        maskBg.graphics.beginFill(0x320E0F, .9);
        maskBg.graphics.drawRect(0, 0, viewBox.width, viewBox.height);
        maskBg.graphics.endFill();
        viewBox.addChild(maskBg);
        var text = this.dialogText.split('');
        for (var i = 0; i < text.length; i++) {
            var box = this.textStyle(text[i]);
            viewBox.addChild(box);
            box.x = i * 120 + (viewBox.width - (120 * 4 - 40)) / 2;
            box.y = (viewBox.height - 80) / 2;
            if (i < 3) {
                var arr = this.arrStyle();
                viewBox.addChild(arr);
                arr.x = i * 120 + (viewBox.width - (120 * 4 - 40)) / 2 + 100;
                arr.y = (viewBox.height - 20) / 2;
            }
        }
        viewBox.cacheAsBitmap = true;
        setTimeout(function () {
            _this.removeChild(viewBox);
        }, 3000);
    };
    Dialog.prototype.textStyle = function (t) {
        var box = new egret.Sprite();
        box.width = 80;
        box.height = 80;
        var shp = new egret.Shape();
        shp.graphics.lineStyle(4, 0xFBC76C);
        shp.graphics.drawCircle(40, 40, 36);
        shp.graphics.endFill();
        box.addChild(shp);
        var ts = createTextFieldByName(t);
        box.addChild(ts);
        ts.size = 46;
        ts.textColor = 0xFBC76C;
        ts.width = 80;
        ts.height = 70;
        ts.textAlign = 'center';
        ts.verticalAlign = 'bottom';
        return box;
    };
    Dialog.prototype.arrStyle = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x934B23, 1);
        shp.graphics.drawRect(0, 0, 14, 14);
        shp.graphics.endFill();
        shp.rotation = 45;
        return shp;
    };
    return Dialog;
}(egret.Sprite));
__reflect(Dialog.prototype, "Dialog");
//# sourceMappingURL=Dialog.js.map