/**
 * 弹框提示 吉时已到 辞旧迎新等
 */
class Dialog extends egret.Sprite {
    
    public constructor(public dialogText: string) {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
	}
	
    private createView() {
        let viewBox: egret.Sprite = new egret.Sprite();
        this.addChild(viewBox);
        viewBox.width = this.stage.stageWidth;
        viewBox.height = 160;
        viewBox.y = this.stage.stageHeight * 0.334;
        
        let bgImg = createBitmapByName('dialog-tips_png');
        viewBox.addChild(bgImg);
        bgImg.width = viewBox.width;
        bgImg.height = viewBox.height + 30;
        bgImg.y = -15;
        
        let maskBg: egret.Shape = new egret.Shape();
        maskBg.graphics.beginFill(0x320E0F,.9);
        maskBg.graphics.drawRect(0,0,viewBox.width,viewBox.height);
        maskBg.graphics.endFill();
        viewBox.addChild(maskBg);
        
        let text: any = this.dialogText.split('');

        for(let i: number = 0;i < text.length;i++) {
            let box = this.textStyle(text[i]);
            viewBox.addChild(box);
            box.x = i * 120 + (viewBox.width - (120 * 4 - 40)) / 2;
            box.y = (viewBox.height - 80) / 2;
            if(i < 3){
                let arr = this.arrStyle();
                viewBox.addChild(arr);
                arr.x = i * 120 + (viewBox.width - (120 * 4 - 40)) / 2 + 100;
                arr.y = (viewBox.height - 20) / 2;
            }
        }
        
        viewBox.cacheAsBitmap = true;

        setTimeout(() => {
            this.removeChild(viewBox);
        }, 3000);
        
    }
	
    private textStyle(t: string) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 80;
        box.height = 80;
        
        let shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(4,0xFBC76C);
        shp.graphics.drawCircle(40,40,36);
        shp.graphics.endFill();
        box.addChild(shp);
        
        let ts = createTextFieldByName(t);
        box.addChild(ts);
        ts.size = 46;
        ts.textColor = 0xFBC76C;
        ts.width = 80;
        ts.height = 70;
        ts.textAlign = 'center';
        ts.verticalAlign = 'bottom';
        
        return box;
    }
    
    private arrStyle() {
        let shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x934B23,1);
        shp.graphics.drawRect(0,0,14,14);
        shp.graphics.endFill();
        shp.rotation = 45;
        return shp;
    }
    
}
