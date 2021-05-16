var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 发牌动画
 */
var DealTween = (function (_super) {
    __extends(DealTween, _super);
    function DealTween() {
        var _this = _super.call(this) || this;
        _this.num = GameConfig.game_cfg.nPlayerNum; // 玩家人数
        _this.starPosition = { x: 0, y: 0 }; // 开始坐标
        _this.endPosition = []; // 结束坐标数组
        _this.viewBox = new egret.Sprite(); // 顶级盒子
        _this.centerPoker = new egret.Sprite(); // 中间牌墩盒子
        DealTween.tweenTime = ((7 - _this.num) * 10) * 13 + 2400;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DealTween.prototype.onAddToStage = function () {
        var _this = this;
        // 初始化盒子
        this.addChild(this.viewBox);
        this.viewBox.width = GameView.viewBox.width;
        this.viewBox.height = GameView.viewBox.height;
        var deal_poker_data = RES.getRes("deal_poker_json");
        var deal_poker_png = RES.getRes("deal_poker_png");
        var deal_Factory = new egret.MovieClipDataFactory(deal_poker_data, deal_poker_png);
        var deal_move = new egret.MovieClip(deal_Factory.generateMovieClipData("deal"));
        this.viewBox.addChild(deal_move);
        deal_move.scaleX = .75;
        deal_move.scaleY = .75;
        deal_move.x = (GameView.viewBox.width - (300 * .75)) / 2;
        deal_move.y = 200;
        deal_move.play();
        setTimeout(function () {
            _this.viewBox.removeChild(deal_move);
            _this.createView();
        }, 1500);
    };
    DealTween.prototype.createView = function () {
        var _this = this;
        var poker = PokerBg();
        this.viewBox.addChild(this.centerPoker);
        this.centerPoker.width = poker.width;
        this.centerPoker.height = poker.height;
        this.centerPoker.x = (this.viewBox.width - poker.width) / 2;
        this.centerPoker.y = (this.viewBox.height - poker.height) / 2 - poker.height;
        this.centerPoker.addChild(poker);
        // 初始化结束坐标
        for (var i = 0; i < this.num; i++) {
            this.endPosition.push({
                x: GameEnter.userCoordinate[i].x + 110,
                y: GameEnter.userCoordinate[i].y + 100
            });
        }
        var pokerNum = 0;
        var pNum = 0;
        var timer = setInterval(function () {
            pokerNum++;
            pNum++;
            if (pNum == _this.num)
                pNum = 0;
            if (pokerNum == (13 * _this.num)) {
                clearInterval(timer);
                _this.centerPoker.removeChild(_this.centerPoker.$children[0]);
            }
            _this.dealPoker(pokerNum, pNum);
        }, (7 - this.num) * 10);
    };
    // 发牌动画
    DealTween.prototype.dealPoker = function (i, j) {
        var poker = PokerBg();
        this.viewBox.addChild(poker);
        poker.x = (this.viewBox.width - poker.width) / 2;
        poker.y = (this.viewBox.height - poker.height) / 2 - poker.height;
        var tw_poker = egret.Tween.get(poker);
        var x = Math.random() * 60;
        var y = Math.random() * 40;
        var r = -(Math.random() * 180);
        tw_poker.to({ x: this.endPosition[j].x + x, y: this.endPosition[j].y + y - 80, rotation: 0 }, 70);
        tw_poker.to({ x: this.endPosition[j].x + x, y: this.endPosition[j].y + y, rotation: r }, 30);
    };
    return DealTween;
}(egret.Sprite));
__reflect(DealTween.prototype, "DealTween");
