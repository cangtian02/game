var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 选择牌型顶级场景
 * timeo: 选择牌型时间
 * cards：玩家手牌
 */
var ChooseView = (function () {
    function ChooseView(timeo, dealData, recommend) {
        ChooseView.timeo = timeo;
        ChooseView.dealData = dealData;
        ChooseView.recommend = recommend;
        ChooseView.cards = dealData.stCards;
        this.createView();
    }
    ChooseView.prototype.createView = function () {
        ChooseView.viewBox = new egret.Sprite();
        var gv = GameView.viewBox;
        var cv = ChooseView.viewBox;
        gv.addChild(cv);
        cv.width = gv.width;
        cv.height = gv.height;
        var mask = new egret.Sprite();
        cv.addChild(mask);
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 0, cv.width, cv.height);
        mask.graphics.endFill();
        mask.alpha = .85;
        // 设置盒子点击事件，阻止点击事件穿透
        cv.touchEnabled = true;
        // 底部按钮
        new ChooseBotView();
        // 绘制扑克牌
        new ChoosePokerView();
        // 左上角区域
        new ChooseLeftTopView();
        // 右上角区域
        new ChooseRightTopView();
        // 出牌按钮
        new ChooseBtnView();
    };
    return ChooseView;
}());
__reflect(ChooseView.prototype, "ChooseView");
//--普通牌型
//1 --散牌(乌龙)
//2 --一对
//3 --两对
//4 --三条
//5 --顺子
//6 --同花
//7 --葫芦
//8 --铁支
//9 --同花顺
//10 --五同
//--特殊牌型
//1 --三同花
//2 --三顺子
//3 --六对半   6对+ 散牌
//4 --五队冲三 5对+ 3条
//5 --凑一色
//6 --全小
//7 --全大
//8 --六六大顺  6同
//9 --三同花顺
//10 --十二皇族
//11 --三皇五帝 2个5同+ 3条
//12 --三炸弹   3个铁枝
//13 --四套三条  4个3条
//14 --一条龙
//15 --至尊清龙
