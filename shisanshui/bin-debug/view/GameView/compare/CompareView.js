var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 比牌
 */
var CompareView = (function () {
    function CompareView() {
    }
    // 选择好了牌型
    CompareView.chooseOk = function (i) {
        var vBox = GameEnterViewBox.userEnterChild(i, 4);
        var pBox1 = new egret.Sprite();
        vBox.addChildAt(pBox1, 1);
        pBox1.width = 134;
        pBox1.height = 80;
        pBox1.x = 37;
        pBox1.y = 30;
        var pBox2 = new egret.Sprite();
        vBox.addChildAt(pBox2, 2);
        pBox2.width = 208;
        pBox2.height = 80;
        pBox2.x = 0;
        pBox2.y = 74;
        var pBox3 = new egret.Sprite();
        vBox.addChildAt(pBox3, 3);
        pBox3.width = 208;
        pBox3.height = 80;
        pBox3.x = 0;
        pBox3.y = 124;
        for (var i = 0; i < 3; i++) {
            var pokerBox = new egret.Sprite();
            pBox1.addChild(pokerBox);
            pokerBox.x = i * 37;
            var poker = PokerBg();
            pokerBox.addChild(poker);
        }
        for (var i = 0; i < 5; i++) {
            var pokerBox = new egret.Sprite();
            pBox2.addChild(pokerBox);
            pokerBox.x = i * 37;
            var poker = PokerBg();
            pokerBox.addChild(poker);
        }
        for (var i = 0; i < 5; i++) {
            var pokerBox = new egret.Sprite();
            pBox3.addChild(pokerBox);
            pokerBox.x = i * 37;
            var poker = PokerBg();
            pokerBox.addChild(poker);
        }
    };
    return CompareView;
}());
__reflect(CompareView.prototype, "CompareView");
