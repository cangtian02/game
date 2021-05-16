var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 选择牌型扑克牌
 */
var ChoosePokerView = (function () {
    function ChoosePokerView() {
        var len = ChooseView.cards.length;
        ChoosePokerView.pokerViewBox.length = 0;
        for (var i = 0; i < len; i++) {
            var view = new PokerView(ChooseView.cards[i]);
            ChooseView.viewBox.addChildAt(view, i + 5);
            ChoosePokerView.pokerViewBox.push(view);
        }
        // 重置扑克牌的位置
        ChoosePokerView.resetPoker(true);
    }
    /**
     * 重置牌到底部 j=true 初次绘制 j=false使用动画
     */
    ChoosePokerView.resetPoker = function (j) {
        var pokerViewBox = ChoosePokerView.pokerViewBox;
        var len = ChooseView.cards.length;
        var ch = ChooseView.viewBox.height;
        var ph = pokerViewBox[0].height;
        if (j) {
            var scale = 125 / pokerViewBox[0].width; // 计算牌的缩放比例
            for (var i = 0; i < len; i++) {
                pokerViewBox[i].scaleX = scale;
                pokerViewBox[i].scaleY = scale;
                pokerViewBox[i].x = (i * 85) + ((i + 1) * 10);
                pokerViewBox[i].y = ch - (72 + (ph * scale));
            }
        }
        else {
            var scale = 125 / pokerViewBox[0].width;
            for (var i = 0; i < len; i++) {
                var tw_p = egret.Tween.get(pokerViewBox[i]);
                tw_p.to({ "scaleX": scale, "scaleY": scale, "x": (i * 85) + ((i + 1) * 10), "y": ch - (72 + (ph * scale)) }, 300);
            }
        }
    };
    /**
     * 扑克牌移动到牌框动画
     */
    ChoosePokerView.pokerToBoxView = function (cards) {
        for (var i = 0; i < cards.length; i++) {
            for (var j = 0; j < ChooseView.cards.length; j++) {
                if (cards[i] == ChooseView.cards[j]) {
                    var scale = 88 / ChoosePokerView.pokerViewBox[0].width;
                    var tw_p = egret.Tween.get(ChoosePokerView.pokerViewBox[j]);
                    var k = 0;
                    i < 5 ? k = i + 8 : i < 10 ? k = i - 2 : k = i - 10;
                    tw_p.to({ "scaleX": scale, "scaleY": scale, "x": ChooseLeftTopView.pokerBoxPostion[k].x + 8, "y": ChooseLeftTopView.pokerBoxPostion[k].y + 5.5 }, 150);
                }
            }
        }
    };
    return ChoosePokerView;
}());
ChoosePokerView.pokerViewBox = []; // 手牌dom
__reflect(ChoosePokerView.prototype, "ChoosePokerView");
