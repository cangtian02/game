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
 * 项目启动
 */
var Loding = (function (_super) {
    __extends(Loding, _super);
    function Loding() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Loding.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Loding.prototype.init = function () {
        var _this = this;
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        // 背景
        var shap = new egret.Shape();
        shap.graphics.beginFill(0x422122, 1);
        shap.graphics.drawRect(0, 0, stageWidth, stageHeight);
        shap.graphics.endFill();
        this.addChild(shap);
        // 条纹
        var stripe = createBitmapByName("default_json.default_2");
        this.addChild(stripe);
        stripe.width = this.stage.stageWidth;
        stripe.height = 65;
        stripe.x = 0;
        stripe.y = 340;
        // 人物
        var character = createBitmapByName('default_json.default_1');
        this.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (stageWidth - 243) / 2;
        character.y = 220;
        // 线条
        var line1 = new egret.Shape();
        line1.graphics.beginFill(0xCD787A, 1);
        line1.graphics.drawRoundRect((stageWidth - 290) / 2, 454, 290, 10, 10, 10);
        line1.graphics.endFill();
        this.addChild(line1);
        // 加载主要场景资源
        ResUtils.getInstance().loadGroupWithPro("game", function () {
            // 加载成功跳转游戏场景
            _this.dispatchEvent(new egret.Event("Game"));
        }, function (e) {
            var w = 290 / e.itemsTotal * e.itemsLoaded;
            var line2 = new egret.Shape();
            line2.graphics.beginFill(0x984B4B, 1);
            line2.graphics.drawRoundRect((stageWidth - 290) / 2, 454, w, 10, 10, 10);
            line2.graphics.endFill();
            _this.addChild(line2);
        }, this);
    };
    return Loding;
}(egret.DisplayObjectContainer));
__reflect(Loding.prototype, "Loding");
//# sourceMappingURL=Loding.js.map