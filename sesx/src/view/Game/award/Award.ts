/**
 * 开奖
 */
class Award extends egret.DisplayObjectContainer {
    
    public static viewBox: egret.Sprite;  // 场景盒子
    public static point: any;  // 开奖结果数组 金玉 五福 生肖 (后端返回为字母结果)
    public static point_number: any = [-1,-1,-1];  // 中奖数字数组 五福 金玉 生肖 (自己保存为数字结果)
    
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
        // 场景盒子
        Award.viewBox = new egret.Sprite();
        this.addChild(Award.viewBox);
        Award.viewBox.width = this.stage.stageWidth;
        Award.viewBox.height = this.stage.stageHeight;
        
        // 阻止点击事件穿透
        Award.viewBox.touchEnabled = true;

        // 黑色透明背景
        let mask: any = Game.m_mask();
        Award.viewBox.addChild(mask);
        
        // 主要场景背景
        let viewBg = createBitmapByName('sesx_json.img_2');
        Award.viewBox.addChild(viewBg);
        viewBg.width = Award.viewBox.width;
        viewBg.height = 420;
        viewBg.y = 230;
        
        // 财神
        let character = createBitmapByName('sesx_json.img_9');
        Award.viewBox.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (Award.viewBox.width - 243) / 2;
        character.y = 370;
    }

}
