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
 * 开奖灯笼
 */
var Lantern = (function (_super) {
    __extends(Lantern, _super);
    function Lantern() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Lantern.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Lantern.prototype.init = function () {
        // 场景盒子
        Lantern.viewBox = new egret.Sprite();
        this.addChild(Lantern.viewBox);
        Lantern.viewBox.width = this.stage.stageWidth;
        Lantern.viewBox.height = this.stage.stageHeight;
        // 黑色透明背景
        Lantern.mask = Game.m_mask();
        Lantern.viewBox.addChild(Lantern.mask);
        Lantern.mask.alpha = 0;
        // 灯笼盒子
        Lantern.lanternBox = new egret.Sprite();
        Lantern.viewBox.addChild(Lantern.lanternBox);
        Lantern.lanternBox.width = Lantern.viewBox.width;
        Lantern.lanternBox.height = Lantern.viewBox.height;
        var secondRect = new egret.Rectangle(0, 230, Lantern.viewBox.width, 420);
        Lantern.lanternBox.mask = secondRect;
        // 绘制灯笼落下的初始状态
        Lantern.createLanternInitView();
    };
    /**
     * 绘制灯笼落下的初始状态
     */
    Lantern.createLanternInitView = function () {
        for (var i = 0; i < 3; i++) {
            var box = new egret.Sprite();
            box.width = 135;
            box.height = 427;
            box.x = i * box.width + (i + 1) * ((Lantern.lanternBox.width - box.width * 3) / 4);
            box.y = 110;
            box.alpha = 0;
            var bg = createBitmapByName('sesx_json.img_6');
            bg.width = box.width;
            bg.height = box.height;
            box.addChild(bg);
            var content = Lantern.itemFirstImg(i);
            box.addChild(content);
            content.x = 37;
            content.y = 190;
            Lantern.lanternBox.addChild(box);
        }
    };
    /**
     * 灯笼内容第一张图片
     */
    Lantern.itemFirstImg = function (i) {
        var item = [
            createBitmapByName('sesx_json.img_ani_1'),
            createBitmapByName('sesx_json.img_ani_2'),
            createBitmapByName('sesx_json.img_ani_3')
        ][i];
        item.width = 62;
        item.height = 116;
        return item;
    };
    /**
     * 绘制滚动动画场景
     */
    Lantern.createScrollView = function () {
        for (var i = 0; i < 3; i++) {
            var box = Lantern.lanternBox.$children[i];
            box.removeChild(box.$children[1]);
            var scrollBox = new egret.Sprite();
            scrollBox.width = box.width;
            scrollBox.height = box.height;
            box.addChild(scrollBox);
            var secondRect = new egret.Rectangle(37, 190, 62, 116);
            scrollBox.mask = secondRect;
            scrollBox.addChild(Lantern.scrollContentBox(i));
        }
    };
    Lantern.scrollContentBox = function (i) {
        var len = i == 0 ? 5 : i == 1 ? 2 : 12;
        var num = i == 0 ? 12 : i == 1 ? 36 : 12;
        var box = new egret.Sprite();
        box.width = len * num * 82 + 62;
        box.height = 116;
        box.x = 37;
        box.y = 190;
        var firstImg = Lantern.itemFirstImg(i);
        box.addChild(firstImg);
        for (var k = 0; k < num; k++) {
            for (var j = 0; j < len; j++) {
                var itemOther = Lantern.itemOther(i, j, k);
                box.addChild(itemOther);
            }
        }
        return box;
    };
    Lantern.itemOther = function (i, j, k) {
        var item = [
            createBitmapByName('sesx_json.img_wf_' + (j + 1)),
            createBitmapByName('sesx_json.img_jy_' + (j + 1)),
            createBitmapByName('sesx_json.img_sx_' + (j + 1))
        ][i];
        item.width = 62;
        item.height = 116;
        var l = i == 0 ? 4 : i == 1 ? 1 : 11;
        var x = j * item.width + (j + 1) * 20 + 62;
        item.x = k > 0 ? x + k * (l * item.width + (l + 1) * 20 + 62) : x;
        return item;
    };
    /**
     * 灯笼掉下1S  滚动动画10S 停留2S 灯笼收回1S 灯笼区间动画总时间14S
     */
    Lantern.LanternTween = function () {
        Lantern.mask.alpha = 1;
        for (var i = 0; i < 3; i++) {
            var tw_box = egret.Tween.get(Lantern.lanternBox.$children[i]);
            tw_box.wait(i * 300).to({ 'alpha': 1 }).to({ 'y': 210 }, 200).to({ 'y': 190 }, 100);
        }
        setTimeout(function () {
            // 绘制播放结果动画场景
            Lantern.createScrollView();
            // 播放结果动画
            setTimeout(function () {
                Lantern.LanternTween_2();
            }, 50);
        }, 950);
    };
    Lantern.LanternTween_2 = function () {
        for (var i = 0; i < 3; i++) {
            var box = Lantern.lanternBox.$children[i].$children[1].$children[0];
            var tw_box = egret.Tween.get(box);
            var l = (box.width - 62) / 6 * 5 + Award.point_number[i] * 82 + 82 - 37;
            tw_box.to({ 'x': -(l - 82 * 15) }, 2000 + i * 2000);
            tw_box.to({ 'x': -l }, 4000, egret.Ease.sineOut);
        }
        setTimeout(function () {
            // 灯笼收回
            for (var i = 0; i < 3; i++) {
                var tw_box = egret.Tween.get(Lantern.lanternBox.$children[i]);
                tw_box.wait(i * 300).to({ 'y': 210 }, 200).to({ 'y': 110 }, 100).to({ 'alpha': 0 });
            }
            setTimeout(function () {
                Lantern.mask.alpha = 0;
            }, 900);
        }, 11500);
    };
    return Lantern;
}(egret.DisplayObjectContainer));
__reflect(Lantern.prototype, "Lantern");
//# sourceMappingURL=Lantern.js.map