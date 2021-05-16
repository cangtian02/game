/**
 * 桌布
 */
class Table extends egret.DisplayObjectContainer {

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
        this.addChild(Table.viewBox);
        Table.viewBox.width = 624;
        Table.viewBox.height = 624;

        // 桌布
        let tablebg = createBitmapByName('sesx_json.img_1');
        Table.viewBox.addChild(tablebg);
        tablebg.width = Table.viewBox.width;
        tablebg.height = Table.viewBox.height;
        
        // 展示结果与下注数量盒子
        let tableBetInfo = new TableBetInfo();
        Table.viewBox.addChild(tableBetInfo);
        
        // 下注盒子
        let tableTouch = new TableTouch();
        Table.viewBox.addChild(tableTouch);
    }

    /**
     * 展示相应倍率
     */ 
    public static createBeishu() {
        let beishu_zodiac = Table.beishuStyle('x' + Game.multiple.zodiac);
        Table.viewBox.addChild(beishu_zodiac);
        beishu_zodiac.y = 2;

        let beishu_wufu = Table.beishuStyle('x' + Game.multiple.wufu);
        Table.viewBox.addChild(beishu_wufu);
        beishu_wufu.y = 132;

        let beishu_jinyu = Table.beishuStyle('x' + Game.multiple.jinyu);
        Table.viewBox.addChild(beishu_jinyu);
        beishu_jinyu.y = 230;
    }
    
    public static beishuStyle(t: string) {
        let ts = createTextFieldByName(t);
        ts.size = 22;
        ts.textColor = 0xEFB177;
        ts.width = 90;
        ts.textAlign = 'center';
        ts.x = 266;
        return ts;
    }
    
}
