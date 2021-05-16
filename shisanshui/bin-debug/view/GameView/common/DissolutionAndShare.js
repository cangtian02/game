var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 解散房间与邀请好友
 */
var DissolutionAndShare = (function () {
    function DissolutionAndShare() {
        // 邀请好友按钮
        DissolutionAndShare.shareBtn = new Button('yqhy_2');
        GameView.viewBox.addChild(DissolutionAndShare.shareBtn);
        DissolutionAndShare.shareBtn.x = (GameView.viewBox.width - DissolutionAndShare.shareBtn.width) / 2;
        DissolutionAndShare.shareBtn.y = 260;
        DissolutionAndShare.shareBtn.touchEnabled = true;
        DissolutionAndShare.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        // 是房主才会有解散房间按钮
        if (GameConfig.owner_uid == Main.USER_INFO.uid) {
            DissolutionAndShare.dissolutionBtn = new Button('jsfj');
            GameView.viewBox.addChild(DissolutionAndShare.dissolutionBtn);
            DissolutionAndShare.dissolutionBtn.x = (GameView.viewBox.width - DissolutionAndShare.dissolutionBtn.width) / 2;
            DissolutionAndShare.dissolutionBtn.y = 260 + DissolutionAndShare.shareBtn.height + 5;
            DissolutionAndShare.dissolutionBtn.touchEnabled = true;
            DissolutionAndShare.dissolutionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var modal = new Modal(3);
                GameView.viewBox.addChild(modal);
                var dissolution = new Dissolution(modal);
                modal.addChild(dissolution);
            }, this);
        }
    }
    DissolutionAndShare.prototype.share = function () {
        console.log("分享");
    };
    DissolutionAndShare.hideShareBtn = function () {
        DissolutionAndShare.shareBtn.alpha = 0;
        DissolutionAndShare.shareBtn.touchEnabled = false;
    };
    DissolutionAndShare.showShareBtn = function () {
        DissolutionAndShare.shareBtn.alpha = 1;
        DissolutionAndShare.shareBtn.touchEnabled = true;
    };
    DissolutionAndShare.removeDissolutionAndShare = function () {
        GameView.viewBox.removeChild(DissolutionAndShare.shareBtn);
        if (GameConfig.owner_uid == Main.USER_INFO.uid) {
            GameView.viewBox.removeChild(DissolutionAndShare.dissolutionBtn);
        }
    };
    return DissolutionAndShare;
}());
__reflect(DissolutionAndShare.prototype, "DissolutionAndShare");
var Dissolution = (function (_super) {
    __extends(Dissolution, _super);
    function Dissolution(modal) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Dissolution.prototype.createView = function () {
        var _this = this;
        var modalWarp = this.modal.modalWarp;
        var title = createBitmapByName('public_tishi_title_png');
        modalWarp.addChild(title);
        title.width = 88;
        title.height = 42;
        title.x = (modalWarp.width - 88) / 2;
        title.y = 28;
        var text = createTextFieldByName('是否要解散房间？');
        modalWarp.addChild(text);
        text.size = 32;
        text.textColor = 0x996F56;
        text.textAlign = 'center';
        text.width = 440;
        text.x = (modalWarp.width - 440) / 2;
        text.y = 160;
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
        // 解散房间
        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.WEBSOCKET.doSend(cfg_dissolution());
        }, this);
    };
    return Dissolution;
}(egret.Sprite));
__reflect(Dissolution.prototype, "Dissolution");
