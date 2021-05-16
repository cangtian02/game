/**
 * 牌面类
 * 方块 2-14
 * 梅花 18-30
 * 红桃 34-46
 * 黑桃 50-62
 * 小鬼 79 大鬼 95
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 正面牌类，接收牌数字，返回牌的对象
 */
var PokerView = (function (_super) {
    __extends(PokerView, _super);
    function PokerView(num) {
        var _this = _super.call(this) || this;
        _this.poker_width = 144; // 牌宽
        _this.poker_height = 198; // 牌高
        _this.viewBox = new egret.Sprite();
        _this.num = num;
        _this.cardColor = _this.renderCardColor();
        _this.createView();
        return _this;
    }
    // 返回牌的花色
    PokerView.prototype.renderCardColor = function () {
        var color;
        var num = this.num;
        if (num == 79) {
            color = 5;
        }
        else if (num == 95) {
            color = 6;
        }
        else if (num > 1 && num < 15) {
            color = 1;
        }
        else if (num > 17 && num < 31) {
            color = 2;
        }
        else if (num > 33 && num < 47) {
            color = 3;
        }
        else if (num > 49 && num < 63) {
            color = 4;
        }
        return color;
    };
    PokerView.prototype.createView = function () {
        this.addChild(this.viewBox);
        this.viewBox.width = this.poker_width;
        this.viewBox.height = this.poker_height;
        var bg = createBitmapByName('public_poker_json.Pokerface');
        this.viewBox.addChild(bg);
        bg.width = this.viewBox.width;
        bg.height = this.viewBox.height;
        if (this.cardColor == 5 || this.cardColor == 6) {
            this.createGhostCard();
        }
        else {
            this.createNormalCard();
        }
    };
    // 绘制大小鬼
    PokerView.prototype.createGhostCard = function () {
        var be_1;
        this.cardColor == 5 ? be_1 = createBitmapByName('public_poker_json.joker_1') : be_1 = createBitmapByName('public_poker_json.joker_2');
        var be_2;
        this.cardColor == 5 ? be_2 = createBitmapByName('public_poker_json.joker_3') : be_2 = createBitmapByName('public_poker_json.joker_4');
        this.viewBox.addChild(be_1);
        be_1.width = 10;
        be_1.height = 90;
        be_1.x = 8;
        be_1.y = 7;
        this.viewBox.addChild(be_2);
        be_2.width = 90;
        be_2.height = 130;
        be_2.x = 30;
        be_2.y = 35;
    };
    // 绘制2-A
    PokerView.prototype.createNormalCard = function () {
        var num = this.resetNum();
        var be_1;
        if (this.cardColor == 1 || this.cardColor == 3) {
            be_1 = createBitmapByName('public_poker_json.r_' + num);
        }
        else if (this.cardColor == 2 || this.cardColor == 4) {
            be_1 = createBitmapByName('public_poker_json.b_' + num);
        }
        this.viewBox.addChild(be_1);
        be_1.width = 24;
        be_1.height = 40;
        be_1.x = 8;
        be_1.y = 14;
        var be_2 = this.cardColorView();
        this.viewBox.addChild(be_2);
        be_2.width = 24;
        be_2.height = 22;
        be_2.x = 8;
        be_2.y = 60;
        var be_3 = this.cardColorView();
        this.viewBox.addChild(be_3);
        be_3.width = 110;
        be_3.height = 100;
        be_3.x = (this.viewBox.width - 110) / 2 + 8;
        be_3.y = 68;
    };
    // 把点数重置成2-14
    PokerView.prototype.resetNum = function () {
        var num;
        if (this.cardColor == 2) {
            num = this.num - 16;
        }
        else if (this.cardColor == 3) {
            num = this.num - 32;
        }
        else if (this.cardColor == 4) {
            num = this.num - 48;
        }
        else {
            num = this.num;
        }
        return num;
    };
    // 返回花色Bitmap
    PokerView.prototype.cardColorView = function () {
        var num = this.resetNum();
        var be;
        if (this.cardColor == 1) {
            be = createBitmapByName('public_poker_json.Diamond');
        }
        else if (this.cardColor == 2) {
            be = createBitmapByName('public_poker_json.Club');
        }
        else if (this.cardColor == 3) {
            be = createBitmapByName('public_poker_json.Heart');
        }
        else if (this.cardColor == 4) {
            be = createBitmapByName('public_poker_json.Spade');
        }
        return be;
    };
    return PokerView;
}(egret.Sprite));
__reflect(PokerView.prototype, "PokerView");
/**
 * 牌背面
 */
function PokerBg() {
    var poker = createBitmapByName('game_poker_png');
    poker.width = 60;
    poker.height = 80;
    return poker;
}
