/**
 * 出牌按钮
 */
class ChooseBtnView {
	
    public static viewBox: egret.Sprite;
    public static recommend: any; // 选择的牌型，提供给确定出牌
    
    public constructor() {
        ChooseBtnView.viewBox = new egret.Sprite();
        var gv: any = ChooseView.viewBox;
        var cv: any = ChooseBtnView.viewBox;
        gv.addChild(cv);
        cv.width = 550;
        cv.height = 74;
        cv.x = (gv.width - 550) / 2;
        cv.y = gv.height - 180;
        cv.alpha = 0;
        
        // 取消比牌
        var btn1 = new Button('qxcp');
        ChooseBtnView.viewBox.addChild(btn1);
        
        // 确认出牌
        var btn2 = new Button('qrcp');
        ChooseBtnView.viewBox.addChild(btn2);
        btn2.x = 318;
        
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeChoose,this);
        
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.confirmChoose,this);
	}
	
    private closeChoose() {
        ChoosePokerView.resetPoker(false);  // 回归牌到底部位置
        ChooseBtnView.viewBox.alpha = 0;    // 隐藏出牌按钮
        ChooseBotView.viewBox.alpha = 1;    // 显示底部按钮
        ChooseLeftTopView.dunLableBox.alpha = 1; // 显示墩数
        ChooseLeftTopView.closeBtnBox.alpha = 0; // 隐藏撤回墩数按钮
        ScrollerPosition.tapFlag = false;   // 重置推荐牌型列表是否点击
	}

    private confirmChoose() {
        ScrollerPosition.tapFlag = false;   // 重置推荐牌型列表是否点击
        GameView.viewBox.removeChild(ChooseView.viewBox);  // 关闭选择牌型场景
        Main.WEBSOCKET.doSend(cfg_choose_normal(ChooseBtnView.recommend));  // 发送选择牌型信息
        ChooseLeftTopView.isCountdown = false; // 关闭倒计时功能
    }
	
}
