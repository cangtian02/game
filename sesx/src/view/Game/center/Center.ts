/**
 * 中部 圆盘 大小富贵等
 */
class Center extends egret.DisplayObjectContainer {

    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    
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
        this.addChild(Center.viewBox);
        Center.viewBox.width = this.stage.stageWidth;
        Center.viewBox.height = 624;
        
        // 小富贵
        new SmallFugui();
        if(Game.small_type == 0) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]],Game.pointCNList[1][Game.small[1]]);
        } else if(Game.small_type == 1) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]],Game.pointCNList[2][Game.small[1]]);
        } else {
            SmallFugui.createText(Game.pointCNList[1][Game.small[0]],Game.pointCNList[2][Game.small[1]]);
        }
        
        // 大富贵
        new BigFugui();
        BigFugui.createText(Game.pointCNList[0][Game.big[0]],Game.pointCNList[1][Game.big[1]],Game.pointCNList[2][Game.big[2]]);
        
        // 桌子
        let table = new Table();
        Center.viewBox.addChild(table);
        table.x = (Center.viewBox.width - 624) / 2;
    }

}
