var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏和局投票
 */
var GameVoteDraw = (function () {
    function GameVoteDraw() {
    }
    // 自己开启和局投票
    GameVoteDraw.openVote = function () {
        var modal = new Modal(3);
        GameView.viewBox.addChild(modal);
        var openVoteModal = new OpenVoteModal(modal);
        modal.addChild(openVoteModal);
    };
    // 有人开启和局投票
    GameVoteDraw.voteDrawStart = function (timeo, who) {
        var modal = new Modal(2);
        GameView.viewBox.addChild(modal);
        var voteDrawStartModal = new VoteDrawStartModal(modal, timeo, who);
        modal.addChild(voteDrawStartModal);
    };
    return GameVoteDraw;
}());
__reflect(GameVoteDraw.prototype, "GameVoteDraw");
var OpenVoteModal = (function (_super) {
    __extends(OpenVoteModal, _super);
    function OpenVoteModal(modal) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    OpenVoteModal.prototype.createView = function () {
        var _this = this;
        var modalWarp = this.modal.modalWarp;
        var title = createBitmapByName('public_tishi_title_png');
        modalWarp.addChild(title);
        title.width = 88;
        title.height = 42;
        title.x = (modalWarp.width - 88) / 2;
        title.y = 28;
        var text = createTextFieldByName('牌局中无法直接退出房间，您是否想发起解散房间投票？');
        modalWarp.addChild(text);
        text.width = 460;
        text.size = 32;
        text.textColor = 0x996F56;
        text.textAlign = 'center';
        text.lineSpacing = 20;
        text.x = (modalWarp.width - 460) / 2;
        text.y = 140;
        var closeBtn = new Button('qx');
        modalWarp.addChild(closeBtn);
        closeBtn.x = 140;
        closeBtn.y = 276;
        // 取消解散房间
        closeBtn.touchEnabled = true;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modal.$parent.removeChild(_this.modal);
        }, this);
        var okBtn = new Button('qr');
        modalWarp.addChild(okBtn);
        okBtn.x = 440;
        okBtn.y = 276;
        // 发起解散房间
        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.WEBSOCKET.doSend(cfg_vote_draw(true));
            _this.modal.$parent.removeChild(_this.modal);
        }, this);
    };
    return OpenVoteModal;
}(egret.Sprite));
__reflect(OpenVoteModal.prototype, "OpenVoteModal");
var VoteDrawStartModal = (function (_super) {
    __extends(VoteDrawStartModal, _super);
    function VoteDrawStartModal(modal, timeo, who) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        _this.timeo = timeo;
        _this.who = who;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    VoteDrawStartModal.prototype.createView = function () {
        var _this = this;
        var modalWarp = this.modal.modalWarp;
        var title = createBitmapByName('game_fonts_jiesan_tt_png');
        modalWarp.addChild(title);
        title.width = 163;
        title.height = 45;
        title.x = (modalWarp.width - 163) / 2;
        title.y = 5;
        // 背景
        var warp_bg = createBitmapByName('public_modal_bg_png');
        modalWarp.addChild(warp_bg);
        warp_bg.width = 732;
        warp_bg.height = 480;
        warp_bg.x = 14;
        warp_bg.y = 76;
        var textBox = new egret.Sprite();
        modalWarp.addChild(textBox);
        textBox.height = 90;
        textBox.y = 125;
        var who = '';
        for (var i = 0; i < GameConfig.enterData.length; i++) {
            if (GameConfig.enterData[i]._chair == this.who) {
                who = GameConfig.enterData[i]._uid;
            }
        }
        var text1 = this.textFun('玩家' + who, true);
        textBox.addChild(text1);
        var text2 = this.textFun('想要解散房间', false);
        textBox.addChild(text2);
        text2.x = text1.width;
        textBox.width = text1.width + text2.width;
        textBox.x = (modalWarp.width - textBox.width) / 2;
        var text3 = this.textFun('您是否同意解散?', false);
        textBox.addChild(text3);
        text3.y = 50;
        text3.width = textBox.width;
        text3.textAlign = 'center';
        // 底部文字提示
        var timeoTextBox = new egret.Sprite();
        modalWarp.addChild(timeoTextBox);
        timeoTextBox.width = modalWarp.width;
        timeoTextBox.y = 500;
        timeoTextBox.addChild(this.timeoText(this.timeo));
        var timer = setInterval(function () {
            _this.timeo--;
            if (_this.timeo == 0) {
                clearInterval(timer);
                _this.modal.$parent.removeChild(_this.modal);
                Main.WEBSOCKET.doSend(cfg_vote_draw(true));
            }
            timeoTextBox.removeChild(timeoTextBox.$children[0]);
            timeoTextBox.addChild(_this.timeoText(_this.timeo));
        }, 1000);
        // 按钮
        var btn1 = new Button('jujue');
        modalWarp.addChild(btn1);
        btn1.x = 145;
        btn1.y = 380;
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            clearInterval(timer);
            _this.modal.$parent.removeChild(_this.modal);
            Main.WEBSOCKET.doSend(cfg_vote_draw(false));
        }, this);
        var btn2 = new Button('ty');
        modalWarp.addChild(btn2);
        btn2.x = 430;
        btn2.y = 380;
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            clearInterval(timer);
            _this.modal.$parent.removeChild(_this.modal);
            Main.WEBSOCKET.doSend(cfg_vote_draw(true));
        }, this);
    };
    VoteDrawStartModal.prototype.textFun = function (t, f) {
        var text = createTextFieldByName(t);
        if (f) {
            text.textColor = 0xBB0D01;
        }
        else {
            text.textColor = 0x996F56;
        }
        return text;
    };
    VoteDrawStartModal.prototype.timeoText = function (t) {
        var text = createTextFieldByName(t + '秒后将默认"同意"');
        text.textColor = 0xBB0D01;
        text.width = this.modal.modalWarp.width;
        text.textAlign = 'center';
        return text;
    };
    return VoteDrawStartModal;
}(egret.Sprite));
__reflect(VoteDrawStartModal.prototype, "VoteDrawStartModal");
