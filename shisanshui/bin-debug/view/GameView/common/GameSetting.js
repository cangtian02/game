var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 开房规则
 */
var GameSetting = (function () {
    function GameSetting(flag1, flag2, flag3) {
        // 是否有加一色坐庄
        if (flag1) {
            var x = 870;
            if (!flag2) {
                x = 960;
            }
            var t1 = this.returnSprite(114, x);
            GameView.viewBox.addChild(t1);
            var bg1 = this.returnBg(t1.width, t1.height);
            t1.addChild(bg1);
            var tt1 = this.returnText('加一色坐庄', t1.width, t1.height);
            t1.addChild(tt1);
        }
        // 是否有大小鬼
        if (flag2) {
            var t2 = this.returnSprite(75, 1000);
            GameView.viewBox.addChild(t2);
            var textBg2 = this.returnBg(t2.width, t2.height);
            t2.addChild(textBg2);
            var tt2 = this.returnText('大小鬼', t2.width, t2.height);
            t2.addChild(tt2);
        }
        // 有无买马
        var t3 = this.returnSprite(75, 1090);
        GameView.viewBox.addChild(t3);
        var textBg3 = this.returnBg(t3.width, t3.height);
        t3.addChild(textBg3);
        var t;
        flag3 == false ? t = '无马牌' : t = '有马牌';
        var tt3 = this.returnText(t, t3.width, t3.height);
        t3.addChild(tt3);
    }
    GameSetting.prototype.returnBg = function (w, h) {
        var bg = createBitmapByName('game_text_bg_png');
        bg.width = w;
        bg.height = h;
        return bg;
    };
    GameSetting.prototype.returnSprite = function (w, x) {
        var sprite = new egret.Sprite();
        sprite.width = w;
        sprite.height = 34;
        sprite.x = x;
        sprite.y = GameView.viewBox.height - 44;
        return sprite;
    };
    GameSetting.prototype.returnText = function (t, w, h) {
        var tt = createTextFieldByName(t);
        tt.width = w;
        tt.height = h;
        tt.size = 18;
        tt.textColor = 0xFFFFFF;
        tt.textAlign = 'center';
        tt.verticalAlign = 'middle';
        return tt;
    };
    return GameSetting;
}());
__reflect(GameSetting.prototype, "GameSetting");
