/**
 * 此类是绘制各个属性的位置盒子，盒子内绘制闪烁背景与下注数量，按照生肖 福禄寿 金玉顺序绘制
 * 生肖从鼠到猪顺时针，以此类推
 */
class TableTouch extends egret.DisplayObjectContainer {

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

    // 生肖盒子
    private zodiacBox: egret.Sprite = new egret.Sprite();
    // 五福盒子
    private wufuBox: egret.Sprite = new egret.Sprite();
    // 金玉盒子
    private jinyuBox: egret.Sprite = new egret.Sprite();
    
    private init() {
        // 背景颜色数组，开发调试使用，方便知道区域位置
        let c: any = [0xff0000,0xF5F2F2,0xDBDBDB,0x817E7E,0x272727,0xE35F5F,0xF00A0A,0xD3A2E3,0x430558,0x5DE024,0x291CC6,0x315836];
        
        // 生肖盒子
        this.addChildAt(this.zodiacBox,1);
        this.zodiacBox.width = 596;
        this.zodiacBox.height = 596;
        this.zodiacBox.x = 18;
        this.zodiacBox.y = 18;
        
        for(let i:number = 0; i < 12; i++) {
            let x:any = i * 30 * Math.PI / 180 + 17;
            let y:any = (i + 1) * 30 * Math.PI / 180 + 17;
            
            let box: egret.Sprite = new egret.Sprite();
            box.graphics.beginFill(c[i],0);
            box.graphics.drawArc(294,294,294,x,y,false);
            box.graphics.lineTo(294,294);
            box.graphics.endFill();
            this.zodiacBox.addChild(box);
            
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                new BetControl(i,2);
            },this);
        }
        
        // 五福盒子
        this.addChildAt(this.wufuBox,2);
        this.wufuBox.width = 370;
        this.wufuBox.height = 370;
        this.wufuBox.x = 131;
        this.wufuBox.y = 131;
        
        for(let i: number = 0;i < 5;i++) {
            let x: any = i * 72 * Math.PI / 180 + 23;
            let y: any = (i + 1) * 72 * Math.PI / 180 + 23;

            let box: egret.Sprite = new egret.Sprite();
            box.graphics.beginFill(c[i],0);
            box.graphics.drawArc(184,184,184,x,y,false);
            box.graphics.lineTo(184,184);
            box.graphics.endFill();
            this.wufuBox.addChild(box);

            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new BetControl(i,1);
            },this);
        }
        
        // 金玉盒子
        this.addChildAt(this.jinyuBox,3);
        this.jinyuBox.width = 180;
        this.jinyuBox.height = 180;
        this.jinyuBox.x = 402;
        this.jinyuBox.y = 222;
        this.jinyuBox.rotation = 90;
        
        for(let i: number = 0;i < 2;i++) {
            let x: any = i * 180 * Math.PI / 180;
            let y: any = (i + 1) * 180 * Math.PI / 180;

            let box: egret.Sprite = new egret.Sprite();
            box.graphics.beginFill(c[i],0);
            box.graphics.drawArc(90,90,90,x,y,false);
            box.graphics.lineTo(90,90);
            box.graphics.endFill();
            this.jinyuBox.addChild(box);

            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new BetControl(i,0);
            },this);
        }

        this.cacheAsBitmap = true;
    }
    
}
