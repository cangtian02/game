var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 选择牌型左上角区域
 */
var ChooseLeftTopView = (function () {
    function ChooseLeftTopView() {
        var bg = createBitmapByName('game_choose_box_bg_png');
        ChooseView.viewBox.addChildAt(bg, 1);
        bg.width = 755;
        bg.height = 425;
        bg.x = 10;
        bg.y = 10;
        // 倒计时
        this.createCountdown();
        // 重置牌框坐标
        this.resetPokerBoxPostion();
        // 墩数lable
        this.createDunLable();
        // 撤回按钮
        this.createcloseBtn();
    }
    ChooseLeftTopView.prototype.createCountdown = function () {
        var countdownTween = new CountdownTween(ChooseView.timeo);
        ChooseView.viewBox.addChildAt(countdownTween, 2);
        countdownTween.x = 580;
        countdownTween.y = 18;
        countdownTween.setConnectHandler(function () {
            if (ChooseLeftTopView.isCountdown) {
                console.log("时间到了");
            }
        }, this);
    };
    ChooseLeftTopView.prototype.resetPokerBoxPostion = function () {
        ChooseLeftTopView.pokerBoxPostion.length = 0;
        for (var i = 0; i < 13; i++) {
            if (i > -1 && i < 3) {
                ChooseLeftTopView.pokerBoxPostion.push({ x: (i * 115) + 175, y: 20 });
            }
            else if (i > 2 && i < 8) {
                ChooseLeftTopView.pokerBoxPostion.push({ x: ((i - 3) * 115) + 175, y: 155 });
            }
            else if (i > 7) {
                ChooseLeftTopView.pokerBoxPostion.push({ x: ((i - 8) * 115) + 175, y: 290 });
            }
        }
        this.createPokerBox();
    };
    // 绘制牌框
    ChooseLeftTopView.prototype.createPokerBox = function () {
        var pos = ChooseLeftTopView.pokerBoxPostion;
        var len = pos.length;
        for (var i = 0; i < len; i++) {
            var pokerBox = this.PokerBoxStyle();
            ChooseView.viewBox.addChildAt(pokerBox, 2);
            pokerBox.x = pos[i].x;
            pokerBox.y = pos[i].y;
        }
    };
    ChooseLeftTopView.prototype.PokerBoxStyle = function () {
        var pokerBox = createBitmapByName('game_choose_list_json.poker_bg');
        pokerBox.width = 104;
        pokerBox.height = 130;
        return pokerBox;
    };
    // 绘制墩数
    ChooseLeftTopView.prototype.createDunLable = function () {
        ChooseLeftTopView.dunLableBox = new egret.Sprite();
        var dunLableBox = ChooseLeftTopView.dunLableBox;
        ChooseView.viewBox.addChildAt(dunLableBox, 3);
        dunLableBox.width = 125;
        dunLableBox.height = 310;
        dunLableBox.x = 30;
        dunLableBox.y = 85;
        for (var i = 0; i < 3; i++) {
            var t = '';
            i == 0 ? t = '第一墩' : i == 1 ? t = '第二墩' : t = '第三墩';
            var box = new egret.Sprite();
            dunLableBox.addChild(box);
            dunLableBox.width = 125;
            dunLableBox.height = 50;
            box.y = i * 125;
            var bg = createBitmapByName('game_choose_list_json.lable_bg');
            box.addChild(bg);
            bg.width = 125;
            bg.height = 50;
            var text = createTextFieldByName(t);
            box.addChild(text);
            text.width = 127;
            text.height = 48;
            text.textAlign = 'center';
            text.verticalAlign = 'middle';
            text.size = 24;
            text.textColor = 0xFFFFFF;
        }
    };
    ChooseLeftTopView.prototype.createcloseBtn = function () {
        ChooseLeftTopView.closeBtnBox = new egret.Sprite();
        var closeBtnBox = ChooseLeftTopView.closeBtnBox;
        ChooseView.viewBox.addChildAt(closeBtnBox, 3);
        closeBtnBox.width = 70;
        closeBtnBox.height = 410;
        closeBtnBox.x = 55;
        closeBtnBox.y = 50;
    };
    return ChooseLeftTopView;
}());
ChooseLeftTopView.pokerBoxPostion = []; // 牌框的坐标 
ChooseLeftTopView.isCountdown = false; // 是否开启倒计时功能
__reflect(ChooseLeftTopView.prototype, "ChooseLeftTopView");
