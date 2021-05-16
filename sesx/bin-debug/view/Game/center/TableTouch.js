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
 * 此类是绘制各个属性的位置盒子，盒子内绘制闪烁背景与下注数量，按照生肖 福禄寿 金玉顺序绘制
 * 生肖从鼠到猪顺时针，以此类推
 */
var TableTouch = (function (_super) {
    __extends(TableTouch, _super);
    function TableTouch() {
        var _this = _super.call(this) || this;
        // 生肖盒子
        _this.zodiacBox = new egret.Sprite();
        // 五福盒子
        _this.wufuBox = new egret.Sprite();
        // 金玉盒子
        _this.jinyuBox = new egret.Sprite();
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    TableTouch.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    TableTouch.prototype.init = function () {
        // 背景颜色数组，开发调试使用，方便知道区域位置
        var c = [0xff0000, 0xF5F2F2, 0xDBDBDB, 0x817E7E, 0x272727, 0xE35F5F, 0xF00A0A, 0xD3A2E3, 0x430558, 0x5DE024, 0x291CC6, 0x315836];
        // 生肖盒子
        this.addChildAt(this.zodiacBox, 1);
        this.zodiacBox.width = 596;
        this.zodiacBox.height = 596;
        this.zodiacBox.x = 18;
        this.zodiacBox.y = 18;
        var _loop_1 = function (i) {
            var x = i * 30 * Math.PI / 180 + 17;
            var y = (i + 1) * 30 * Math.PI / 180 + 17;
            var box = new egret.Sprite();
            box.graphics.beginFill(c[i], 0);
            box.graphics.drawArc(294, 294, 294, x, y, false);
            box.graphics.lineTo(294, 294);
            box.graphics.endFill();
            this_1.zodiacBox.addChild(box);
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new BetControl(i, 2);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 12; i++) {
            _loop_1(i);
        }
        // 五福盒子
        this.addChildAt(this.wufuBox, 2);
        this.wufuBox.width = 370;
        this.wufuBox.height = 370;
        this.wufuBox.x = 131;
        this.wufuBox.y = 131;
        var _loop_2 = function (i) {
            var x = i * 72 * Math.PI / 180 + 23;
            var y = (i + 1) * 72 * Math.PI / 180 + 23;
            var box = new egret.Sprite();
            box.graphics.beginFill(c[i], 0);
            box.graphics.drawArc(184, 184, 184, x, y, false);
            box.graphics.lineTo(184, 184);
            box.graphics.endFill();
            this_2.wufuBox.addChild(box);
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new BetControl(i, 1);
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 5; i++) {
            _loop_2(i);
        }
        // 金玉盒子
        this.addChildAt(this.jinyuBox, 3);
        this.jinyuBox.width = 180;
        this.jinyuBox.height = 180;
        this.jinyuBox.x = 402;
        this.jinyuBox.y = 222;
        this.jinyuBox.rotation = 90;
        var _loop_3 = function (i) {
            var x = i * 180 * Math.PI / 180;
            var y = (i + 1) * 180 * Math.PI / 180;
            var box = new egret.Sprite();
            box.graphics.beginFill(c[i], 0);
            box.graphics.drawArc(90, 90, 90, x, y, false);
            box.graphics.lineTo(90, 90);
            box.graphics.endFill();
            this_3.jinyuBox.addChild(box);
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new BetControl(i, 0);
            }, this_3);
        };
        var this_3 = this;
        for (var i = 0; i < 2; i++) {
            _loop_3(i);
        }
        this.cacheAsBitmap = true;
    };
    return TableTouch;
}(egret.DisplayObjectContainer));
__reflect(TableTouch.prototype, "TableTouch");
//# sourceMappingURL=TableTouch.js.map