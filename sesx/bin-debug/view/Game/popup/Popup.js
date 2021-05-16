var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 最近10期与当前遗漏展示
 */
var Popup = (function () {
    function Popup() {
    }
    Popup.init = function () {
        this.createView();
    };
    Popup.createView = function () {
        Popup.active = 0;
        Popup.viewBox = new egret.Sprite();
        Game.viewBox.addChild(Popup.viewBox);
        Popup.viewBox.width = Game.viewBox.width;
        Popup.viewBox.height = Game.viewBox.height;
        Popup.viewBox.touchEnabled = true;
        // 黑色透明背景
        var m_mask = Game.m_mask();
        Popup.viewBox.addChild(m_mask);
        m_mask.width = Popup.viewBox.width;
        m_mask.height = Popup.viewBox.height;
        m_mask.alpha = 0;
        var tw_mask = egret.Tween.get(m_mask);
        tw_mask.to({ 'alpha': 1 }, 300);
        m_mask.touchEnabled = true;
        m_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Game.viewBox.removeChild(Popup.viewBox);
        }, this);
        var warpBox = new egret.Sprite();
        Popup.viewBox.addChild(warpBox);
        warpBox.width = Popup.viewBox.width;
        warpBox.height = 700;
        warpBox.y = -400;
        warpBox.alpha = .5;
        var tw_warpBox = egret.Tween.get(warpBox);
        tw_warpBox.to({ 'y': 0, 'alpha': 1 }, 200);
        var navBox = new egret.Sprite();
        warpBox.addChild(navBox);
        navBox.width = warpBox.width;
        navBox.height = 60;
        var navBg = new egret.Shape();
        navBg.graphics.beginFill(0xDB915B, 1);
        navBg.graphics.drawRect(0, 0, navBox.width, navBox.height);
        navBg.graphics.endFill();
        navBox.addChild(navBg);
        var navText = ['当前报喜', '当前遗漏'];
        var _loop_1 = function (i) {
            var box = new egret.Sprite();
            navBox.addChild(box);
            box.width = 150;
            box.height = 60;
            box.x = i * 150 + 30;
            var box1 = new egret.Sprite();
            box.addChildAt(box1, 1);
            box1.width = box.width;
            box1.height = box.height;
            var shp1 = new egret.Shape();
            shp1.graphics.beginFill(0xA9663E, 1);
            shp1.graphics.drawRect(0, 0, box.width, box.height);
            shp1.graphics.endFill();
            box1.addChild(shp1);
            var ts1 = Popup.navText(navText[i]);
            ts1.textColor = 0xFFD5A7;
            box1.addChild(ts1);
            var box2 = new egret.Sprite();
            box.addChildAt(box2, 2);
            box2.width = box.width;
            box2.height = box.height;
            var shp2 = new egret.Shape();
            shp2.graphics.beginFill(0xDB915B, 1);
            shp2.graphics.drawRect(0, 0, box.width, box.height);
            shp2.graphics.endFill();
            box2.addChild(shp2);
            var ts2 = Popup.navText(navText[i]);
            ts2.textColor = 0x673A1F;
            box2.addChild(ts2);
            if (i == 0) {
                box.swapChildren(box.$children[0], box.$children[1]);
            }
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Popup.navTab(navBox, i);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 2; i++) {
            _loop_1(i);
        }
        Popup.qihaoBox = new egret.Sprite();
        warpBox.addChild(Popup.qihaoBox);
        Popup.qihaoBox.width = warpBox.width;
        Popup.qihaoBox.height = 670;
        Popup.qihaoBox.y = 60;
        Popup.missBox = new egret.Sprite();
        warpBox.addChild(Popup.missBox);
        Popup.missBox.width = warpBox.width;
        Popup.missBox.height = 330;
        Popup.missBox.y = 60;
        Popup.missBox.x = -Popup.viewBox.width;
        Popup.qihaoBox.touchEnabled = true;
        Popup.missBox.touchEnabled = true;
        PopupQihao.createView();
    };
    Popup.navText = function (t) {
        var ts = createTextFieldByName(t);
        ts.width = 150;
        ts.height = 60;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 26;
        return ts;
    };
    Popup.navTab = function (navBox, i) {
        if (i == Popup.active)
            return;
        if (i == 0) {
            Popup.navTabTween(navBox, i);
            Popup.qihaoBox.x = 0;
            Popup.missBox.x = -Popup.viewBox.width;
        }
        else {
            if (Popup.missData == '') {
                setTimeout(function () {
                    if (Popup.missData == '') {
                        var toast = new Toast("网络异常，请稍后重试");
                        Game.viewBox.addChild(toast);
                        return;
                    }
                    else {
                        Popup.navTabTween(navBox, i);
                        PopupMiss.createView();
                        Popup.qihaoBox.x = -Popup.viewBox.width;
                        Popup.missBox.x = 0;
                    }
                }, 1000);
            }
            else {
                Popup.navTabTween(navBox, i);
                PopupMiss.createView();
                Popup.qihaoBox.x = -Popup.viewBox.width;
                Popup.missBox.x = 0;
            }
        }
    };
    Popup.navTabTween = function (navBox, i) {
        var item1 = navBox.$children[i + 1];
        item1.swapChildren(item1.$children[0], item1.$children[1]);
        var j;
        i == 0 ? j = 2 : j = 1;
        var item2 = navBox.$children[j];
        item2.swapChildren(item2.$children[0], item2.$children[1]);
        Popup.active = i;
    };
    Popup.botStyle = function () {
        var box = new egret.Sprite();
        var shp1 = new egret.Shape();
        shp1.graphics.beginFill(0xCC8A51, 1);
        shp1.graphics.drawRect(0, 0, Popup.viewBox.width, 4);
        shp1.graphics.endFill();
        box.addChild(shp1);
        var shp2 = new egret.Shape();
        shp2.graphics.beginFill(0xE09C61, 1);
        shp2.graphics.drawRect(0, 0, Popup.viewBox.width, 20);
        shp2.graphics.endFill();
        box.addChild(shp2);
        shp2.y = 4;
        var shp3 = new egret.Shape();
        shp3.graphics.beginFill(0xC7854C, 1);
        shp3.graphics.drawRect(0, 0, Popup.viewBox.width, 6);
        shp3.graphics.endFill();
        box.addChild(shp3);
        shp3.y = 24;
        var x = (box.width - 30) / 2;
        var shp = new egret.Shape();
        shp.graphics.lineStyle(8, 0x663A1F);
        shp.graphics.moveTo(x, 18);
        shp.graphics.lineTo(x + 15, 4);
        shp.graphics.lineTo(x + 30, 18);
        shp.graphics.endFill();
        box.addChild(shp);
        box.touchEnabled = true;
        box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Game.viewBox.removeChild(Popup.viewBox);
        }, this);
        return box;
    };
    // 当前查看页面
    Popup.active = 0;
    // 报喜与遗漏数据
    Popup.qihaoData = [];
    Popup.missData = '';
    return Popup;
}());
__reflect(Popup.prototype, "Popup");
//# sourceMappingURL=Popup.js.map