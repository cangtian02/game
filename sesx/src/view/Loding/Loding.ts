/**
 * 项目启动
 */
class Loding extends egret.DisplayObjectContainer {
    
	public constructor() {
	    super();
	    if(this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
	}
	
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }
    
    private init() {
        let stageWidth = this.stage.stageWidth;
        let stageHeight = this.stage.stageHeight;

        // 背景
        let shap: egret.Shape = new egret.Shape();
        shap.graphics.beginFill(0x422122, 1);
        shap.graphics.drawRect(0, 0, stageWidth, stageHeight);
        shap.graphics.endFill();
        this.addChild(shap);
        
        // 条纹
        let stripe = createBitmapByName("default_json.default_2");
        this.addChild(stripe);
        stripe.width = this.stage.stageWidth;
        stripe.height = 65;
        stripe.x = 0;
        stripe.y = 340;
        
        // 人物
        let character = createBitmapByName('default_json.default_1');
        this.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (stageWidth - 243) / 2;
        character.y = 220;
        
        // 线条
        let line1: egret.Shape = new egret.Shape();
        line1.graphics.beginFill(0xCD787A,1);
        line1.graphics.drawRoundRect((stageWidth - 290) / 2, 454, 290, 10, 10, 10);
        line1.graphics.endFill();
        this.addChild(line1);

        // 加载主要场景资源
        ResUtils.getInstance().loadGroupWithPro("game",() => {
            // 加载成功跳转游戏场景
            this.dispatchEvent(new egret.Event("Game"));
        }, (e: RES.ResourceEvent) => {
            let w: number = 290 / e.itemsTotal * e.itemsLoaded;
            let line2: egret.Shape = new egret.Shape();
            line2.graphics.beginFill(0x984B4B,1);
            line2.graphics.drawRoundRect((stageWidth - 290) / 2, 454, w, 10, 10, 10);
            line2.graphics.endFill();
            this.addChild(line2);
        },this);
    }
    
}
