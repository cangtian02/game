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
 * 中部 圆盘 大小富贵等
 */
var Center = (function (_super) {
    __extends(Center, _super);
    function Center() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Center.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Center.prototype.init = function () {
        // 场景盒子
        this.addChild(Center.viewBox);
        Center.viewBox.width = this.stage.stageWidth;
        Center.viewBox.height = 624;
        // 小富贵
        new SmallFugui();
        if (Game.small_type == 0) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]], Game.pointCNList[1][Game.small[1]]);
        }
        else if (Game.small_type == 1) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]], Game.pointCNList[2][Game.small[1]]);
        }
        else {
            SmallFugui.createText(Game.pointCNList[1][Game.small[0]], Game.pointCNList[2][Game.small[1]]);
        }
        // 大富贵
        new BigFugui();
        BigFugui.createText(Game.pointCNList[0][Game.big[0]], Game.pointCNList[1][Game.big[1]], Game.pointCNList[2][Game.big[2]]);
        // 桌子
        var table = new Table();
        Center.viewBox.addChild(table);
        table.x = (Center.viewBox.width - 624) / 2;
    };
    // 场景盒子
    Center.viewBox = new egret.Sprite();
    return Center;
}(egret.DisplayObjectContainer));
__reflect(Center.prototype, "Center");
//# sourceMappingURL=Center.js.map