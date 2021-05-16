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
 * 开奖
 */
var Award = (function (_super) {
    __extends(Award, _super);
    function Award() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Award.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Award.prototype.init = function () {
        // 场景盒子
        Award.viewBox = new egret.Sprite();
        this.addChild(Award.viewBox);
        Award.viewBox.width = this.stage.stageWidth;
        Award.viewBox.height = this.stage.stageHeight;
        // 阻止点击事件穿透
        Award.viewBox.touchEnabled = true;
        // 黑色透明背景
        var mask = Game.m_mask();
        Award.viewBox.addChild(mask);
        // 主要场景背景
        var viewBg = createBitmapByName('sesx_json.img_2');
        Award.viewBox.addChild(viewBg);
        viewBg.width = Award.viewBox.width;
        viewBg.height = 420;
        viewBg.y = 230;
        // 财神
        var character = createBitmapByName('sesx_json.img_9');
        Award.viewBox.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (Award.viewBox.width - 243) / 2;
        character.y = 370;
    };
    Award.point_number = [-1, -1, -1]; // 中奖数字数组 五福 金玉 生肖 (自己保存为数字结果)
    return Award;
}(egret.DisplayObjectContainer));
__reflect(Award.prototype, "Award");
//# sourceMappingURL=Award.js.map