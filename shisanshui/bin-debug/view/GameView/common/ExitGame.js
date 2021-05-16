var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 退出游戏
 */
var ExitGame = (function () {
    function ExitGame() {
        var exitBtn = createBitmapByName('game_exit_png');
        GameView.viewBox.addChild(exitBtn);
        exitBtn.width = 68;
        exitBtn.height = 60;
        exitBtn.x = 6;
        exitBtn.y = 6;
        exitBtn.touchEnabled = true;
        exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitGameFun, this);
    }
    ExitGame.prototype.exitGameFun = function () {
        if (!GameConfig.isPlayStart) {
            // 游戏还未开始可随意退出
            var modal = new Modal(3);
            GameView.viewBox.addChild(modal);
            var exitGameModal = new ExitGameModal(modal);
            modal.addChild(exitGameModal);
        }
        else {
            // 游戏已经开始需提出和局流程
            if (GameConfig.game_vote_draw == -1) {
                // 未开启投票则自己开启投票
                GameVoteDraw.openVote();
            }
            else if (GameConfig.game_vote_draw == 1) {
                var toast = new Toast("您已参与和局投票");
                GameView.viewBox.addChild(toast);
            }
        }
    };
    return ExitGame;
}());
__reflect(ExitGame.prototype, "ExitGame");
var ExitGameModal = (function (_super) {
    __extends(ExitGameModal, _super);
    function ExitGameModal(modal) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    ExitGameModal.prototype.createView = function () {
        var modalWarp = this.modal.modalWarp;
        var title = createBitmapByName('public_tishi_title_png');
        modalWarp.addChild(title);
        title.width = 88;
        title.height = 42;
        title.x = (modalWarp.width - 88) / 2;
        title.y = 28;
        var text = createTextFieldByName('您确定要退出当前房间吗？');
        modalWarp.addChild(text);
        text.size = 32;
        text.textColor = 0x996F56;
        text.textAlign = 'center';
        text.width = 440;
        text.x = (modalWarp.width - 440) / 2;
        text.y = 150;
        var okBtn = new Button('qr');
        modalWarp.addChild(okBtn);
        okBtn.x = (modalWarp.width - okBtn.width) / 2;
        okBtn.y = 276;
        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.WEBSOCKET.doSend(cfg_leave());
        }, this);
    };
    return ExitGameModal;
}(egret.Sprite));
__reflect(ExitGameModal.prototype, "ExitGameModal");
