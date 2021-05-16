/**
 * 文案提示
 */
class Toast extends egret.Sprite {

    public constructor(public toastText: string) {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private createView() {
        let viewBox: egret.Sprite = new egret.Sprite();
        this.addChild(viewBox);
        viewBox.width = 600;
        viewBox.height = 80;
        viewBox.x = (Game.view_box.width - 600) / 2;
        viewBox.y = 500;
        
        let bg = createBitmapByName('Spirit_json.toast_bg');
        viewBox.addChild(bg);
        bg.width = 600;
        bg.height = 80;

        let ts = createTextFieldByName(this.toastText);
        ts.textColor = 0xffffff;
        ts.size = 28;
        ts.width = bg.width;
        ts.height = bg.height;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        viewBox.addChild(ts);
        
        // toast 动画
        let tw_toastBox = egret.Tween.get(viewBox);
        tw_toastBox.wait(2000);
        tw_toastBox.to({
            "alpha": 0,
            "y": 300
        },1000,egret.Ease.backInOut);
        
        setTimeout(() => {
            this.removeChild(viewBox);
        },3000);
    }

}
