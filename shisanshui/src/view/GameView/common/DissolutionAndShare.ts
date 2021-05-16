/**
 * 解散房间与邀请好友
 */
class DissolutionAndShare {
    
    public static shareBtn: any;
    public static dissolutionBtn: any;
    
    public constructor() {
        // 邀请好友按钮
        DissolutionAndShare.shareBtn = new Button('yqhy_2');
        GameView.viewBox.addChild(DissolutionAndShare.shareBtn);
        DissolutionAndShare.shareBtn.x = (GameView.viewBox.width - DissolutionAndShare.shareBtn.width) / 2;
        DissolutionAndShare.shareBtn.y = 260;
        
        DissolutionAndShare.shareBtn.touchEnabled = true;
        DissolutionAndShare.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);
        
        // 是房主才会有解散房间按钮
        if(GameConfig.owner_uid == Main.USER_INFO.uid) {
            DissolutionAndShare.dissolutionBtn = new Button('jsfj');
            GameView.viewBox.addChild(DissolutionAndShare.dissolutionBtn);
            DissolutionAndShare.dissolutionBtn.x = (GameView.viewBox.width - DissolutionAndShare.dissolutionBtn.width) / 2;
            DissolutionAndShare.dissolutionBtn.y = 260 + DissolutionAndShare.shareBtn.height + 5;
            
            DissolutionAndShare.dissolutionBtn.touchEnabled = true;
            DissolutionAndShare.dissolutionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                var modal = new Modal(3);
                GameView.viewBox.addChild(modal);
                var dissolution = new Dissolution(modal);
                modal.addChild(dissolution);
            },this);
            
        }
    }

    private share() {
        console.log("分享");
    }
    
    public static hideShareBtn() {
        DissolutionAndShare.shareBtn.alpha = 0;
        DissolutionAndShare.shareBtn.touchEnabled = false;
    }
    
    public static showShareBtn() {
        DissolutionAndShare.shareBtn.alpha = 1;
        DissolutionAndShare.shareBtn.touchEnabled = true;
    }
    
    public static removeDissolutionAndShare() {
        GameView.viewBox.removeChild(DissolutionAndShare.shareBtn);
        if(GameConfig.owner_uid == Main.USER_INFO.uid) {
            GameView.viewBox.removeChild(DissolutionAndShare.dissolutionBtn);
        }
    }
    
}

class Dissolution extends egret.Sprite {

    private modal: any;

    public constructor(modal: any) {
        super();
        this.modal = modal;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private createView() {
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
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.modal.$parent.removeChild(this.modal);
        },this);
        
        var okBtn = new Button('qr');
        modalWarp.addChild(okBtn);
        okBtn.x = 440;
        okBtn.y = 276;

        // 解散房间
        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Main.WEBSOCKET.doSend(cfg_dissolution());
        },this);

    }

}

