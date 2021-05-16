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
 * 展示结果与下注数量盒子
 */
var TableBetInfo = (function (_super) {
    __extends(TableBetInfo, _super);
    function TableBetInfo() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    TableBetInfo.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    TableBetInfo.prototype.init = function () {
        this.addChild(this.boxStyle(TableBetInfo.viewBox));
        this.addChild(this.boxStyle(TableBetInfo.otherBetBox));
        this.addChild(this.boxStyle(TableBetInfo.meBetBox));
    };
    TableBetInfo.prototype.boxStyle = function (b) {
        b.width = 596;
        b.height = 596;
        b.x = 18;
        b.y = 18;
        return b;
    };
    /**
     * 绘制自己下注数量
     */
    TableBetInfo.createMeBetNum = function () {
        // 每次下注前都清空以前下注所绘制的
        commonRemoveChild(TableBetInfo.meBetBox);
        for (var i = 0; i < BetControl.betPos.length; i++) {
            var box = new egret.Sprite();
            TableBetInfo.meBetBox.addChild(box);
            box.width = 70;
            box.height = 30;
            box.x = TableBetInfo.betNumPos[BetControl.betPos[i]].x2;
            box.y = TableBetInfo.betNumPos[BetControl.betPos[i]].y2;
            var line = new egret.Shape();
            line.graphics.beginFill(0x000000, .5);
            line.graphics.drawRect(0, 0, 40, 30);
            line.graphics.endFill();
            box.addChild(line);
            var line_left = new egret.Shape();
            line_left.graphics.beginFill(0x000000, .5);
            line_left.graphics.drawArc(0, 15, 15, 0, Math.PI, true);
            line_left.graphics.endFill();
            box.addChild(line_left);
            line_left.rotation = 270;
            line_left.x = -14.5;
            line_left.y = 15;
            var line_right = new egret.Shape();
            line_right.graphics.beginFill(0x000000, .5);
            line_right.graphics.drawArc(80, 15, 15, 0, Math.PI, true);
            line_right.graphics.endFill();
            box.addChild(line_right);
            line_right.rotation = 90;
            line_right.x = 54.5;
            line_right.y = -65;
            var n = BetControl.betNum[BetControl.betPos[i]];
            n / 10000 >= 10 ? n = n / 10000 + 'W' : n = n;
            var t = createTextFieldByName(n);
            box.addChild(t);
            t.width = 80;
            t.height = 30;
            t.verticalAlign = 'middle';
            t.size = 24;
            t.textColor = 0xFCF194;
            t.textAlign = 'center';
            t.x = -22;
        }
    };
    /**
     * 显示其他玩家下注数量，i：下的哪个注，n：下注数量
     */
    TableBetInfo.createOtherBetNum = function (i, n) {
        // 需要清除所有其他玩家下注dom时就先清除再绘制
        if (TableBetInfo.isRefreshBet) {
            commonRemoveChild(TableBetInfo.otherBetBox);
            TableBetInfo.isRefreshBet = false;
        }
        var num;
        n / 10000 >= 10 ? num = n / 10000 + 'W' : num = n;
        var t = createTextFieldByName(num);
        TableBetInfo.otherBetBox.addChild(t);
        t.width = 80;
        t.height = 30;
        t.verticalAlign = 'middle';
        t.size = 24;
        t.textColor = 0xFCF194;
        t.textAlign = 'center';
        t.x = TableBetInfo.betNumPos[i].x;
        t.y = TableBetInfo.betNumPos[i].y;
    };
    // 中奖生肖闪烁背景 i: 位置
    TableBetInfo.createZodiac_bg = function (i) {
        var zodiac_bg_pos = [
            { x: 214, y: 0, r: 0 },
            { x: 372, y: 0, r: 30 },
            { x: 506, y: 78, r: 60 },
            { x: 588, y: 210, r: 90 },
            { x: 588, y: 370, r: 120 },
            { x: 508, y: 506, r: 150 },
            { x: 374, y: 590, r: 180 },
            { x: 214, y: 590, r: 210 },
            { x: 82, y: 510, r: 240 },
            { x: 0, y: 376, r: 270 },
            { x: 0, y: 218, r: 300 },
            { x: 76, y: 78, r: 330 }
        ];
        var bg = TableBetInfo.zodiac_bg();
        TableBetInfo.viewBox.addChild(bg);
        bg.x = zodiac_bg_pos[i].x;
        bg.y = zodiac_bg_pos[i].y;
        bg.rotation = zodiac_bg_pos[i].r;
        TableBetInfo.bgTween(bg);
    };
    TableBetInfo.zodiac_bg = function () {
        var bg = createBitmapByName('sesx_json.img_25');
        bg.width = 158;
        bg.height = 116;
        return bg;
    };
    // 中奖五福闪烁背景  i: 位置
    TableBetInfo.createWufu_bg = function (i) {
        var wufu_bg_pos = [
            { x: 186, y: 108, r: 0 },
            { x: 440, y: 132, r: 72 },
            { x: 490, y: 380, r: 144 },
            { x: 268, y: 508, r: 216 },
            { x: 82, y: 338, r: 288 }
        ];
        var bg = TableBetInfo.wufu_bg();
        TableBetInfo.viewBox.addChild(bg);
        bg.x = wufu_bg_pos[i].x;
        bg.y = wufu_bg_pos[i].y;
        bg.rotation = wufu_bg_pos[i].r;
        TableBetInfo.bgTween(bg);
    };
    TableBetInfo.wufu_bg = function () {
        var bg = createBitmapByName('sesx_json.img_22');
        bg.width = 219;
        bg.height = 116;
        return bg;
    };
    // 中奖金玉闪烁背景  i: 位置
    TableBetInfo.createJinyu_bg = function (i) {
        var jinyu_bg_pos = [
            { x: 196, y: 200, r: 0 },
            { x: 390, y: 390, r: 180 }
        ];
        var bg = TableBetInfo.jinyu_bg();
        TableBetInfo.viewBox.addChild(bg);
        bg.x = jinyu_bg_pos[i].x;
        bg.y = jinyu_bg_pos[i].y;
        bg.rotation = jinyu_bg_pos[i].r;
        TableBetInfo.bgTween(bg);
    };
    TableBetInfo.jinyu_bg = function () {
        var bg = createBitmapByName('sesx_json.img_24');
        bg.width = 103;
        bg.height = 194;
        return bg;
    };
    /**
     * 背景闪烁动画
     */
    TableBetInfo.bgTween = function (bg) {
        var tw_bg = egret.Tween.get(bg, { loop: true });
        tw_bg.to({ 'alpha': .5 }, 150).wait(150).to({ 'alpha': 1 }, 150).wait(150);
        setTimeout(function () {
            egret.Tween.removeTweens(bg);
            commonRemoveChild(TableBetInfo.viewBox);
        }, 3000);
    };
    /**
     * 下注动画 s: 玩家位置，从左至右  n: 目标位置
     */
    TableBetInfo.betTween = function (s, n) {
        MusicControl.playBet();
        var distance = 0; // 玩家位置与目标投注位置的差距是远还是近 0近 1远
        var start = [TableBetInfo.userPos[s].x, TableBetInfo.userPos[s].y]; // 玩家起始位置
        var end = [TableBetInfo.betNumPos[n].x, TableBetInfo.betNumPos[n].y]; // 目标投注位置
        start[0] - end[0] > 100 || start[1] - end[1] ? distance = 1 : distance = 0;
        var time_arr = [200, 300];
        var bet = createBitmapByName('sesx_json.img_currency');
        TableBetInfo.viewBox.addChild(bet);
        bet.width = 40;
        bet.height = 40;
        bet.x = TableBetInfo.userPos[s].x;
        bet.y = TableBetInfo.userPos[s].y;
        bet.alpha = .5;
        var tw_bet = egret.Tween.get(bet);
        tw_bet.to({
            'x': TableBetInfo.betNumPos[n].x,
            'y': TableBetInfo.betNumPos[n].y,
            'alpha': 1
        }, time_arr[distance]).to({
            'alpha': 0
        }, 100);
        setTimeout(function () {
            TableBetInfo.viewBox.removeChild(bet);
        }, time_arr[distance] + 100);
    };
    /**
     * 发钱动画 s: 中奖位置  n: 玩家位置，从左至右
     */
    TableBetInfo.awardTween = function (s, n) {
        var bet = TableBetInfo.awardTweenBet(s);
        TableBetInfo.viewBox.addChild(bet);
        var tw_bet = egret.Tween.get(bet);
        tw_bet.to({ 'x': TableBetInfo.userPos[n].x, 'y': TableBetInfo.userPos[n].y, 'alpha': 1 }, 400).to({ 'alpha': 0 }, 100);
        setTimeout(function () {
            TableBetInfo.viewBox.removeChild(bet);
        }, 500);
    };
    TableBetInfo.awardTweenBet = function (s) {
        var bet = createBitmapByName('sesx_json.img_currency');
        bet.width = 40;
        bet.height = 40;
        bet.x = TableBetInfo.betNumPos[s].x;
        bet.y = TableBetInfo.betNumPos[s].y;
        bet.alpha = .5;
        return bet;
    };
    // 场景盒子
    TableBetInfo.viewBox = new egret.Sprite();
    // 其他玩家下注数量盒子
    TableBetInfo.otherBetBox = new egret.Sprite();
    // 自己下注数量盒子
    TableBetInfo.meBetBox = new egret.Sprite();
    // 是否刷新其他玩家所下注的数量
    TableBetInfo.isRefreshBet = false;
    // 顺序十二生肖从鼠到猪=》五福从福到财=》金玉从金童到玉女=》小富贵》=大富贵
    TableBetInfo.betNumPos = [
        { x: 260, y: 20, x2: 280, y2: 60 },
        { x: 380, y: 50, x2: 405, y2: 90 },
        { x: 466, y: 140, x2: 486, y2: 180 },
        { x: 490, y: 260, x2: 510, y2: 300 },
        { x: 452, y: 376, x2: 472, y2: 415 },
        { x: 370, y: 460, x2: 375, y2: 500 },
        { x: 240, y: 490, x2: 260, y2: 530 },
        { x: 132, y: 460, x2: 152, y2: 500 },
        { x: 50, y: 370, x2: 70, y2: 410 },
        { x: 16, y: 250, x2: 36, y2: 290 },
        { x: 44, y: 130, x2: 64, y2: 170 },
        { x: 140, y: 44, x2: 160, y2: 84 },
        { x: 200, y: 140, x2: 330, y2: 140 },
        { x: 360, y: 200, x2: 410, y2: 280 },
        { x: 360, y: 350, x2: 320, y2: 420 },
        { x: 150, y: 350, x2: 220, y2: 420 },
        { x: 130, y: 200, x2: 140, y2: 280 },
        { x: 210, y: 235, x2: 235, y2: 325 },
        { x: 295, y: 235, x2: 315, y2: 325 },
        { x: -20, y: 30, x2: -5, y2: 90 },
        { x: 530, y: 30, x2: 550, y2: 76 }
    ];
    // 五位玩家头像的坐标
    TableBetInfo.userPos = [
        { x: 30, y: 450 },
        { x: 130, y: 540 },
        { x: 270, y: 560 },
        { x: 400, y: 540 },
        { x: 510, y: 460 }
    ];
    return TableBetInfo;
}(egret.DisplayObjectContainer));
__reflect(TableBetInfo.prototype, "TableBetInfo");
//# sourceMappingURL=TableBetInfo.js.map