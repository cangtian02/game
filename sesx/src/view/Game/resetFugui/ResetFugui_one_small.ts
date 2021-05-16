/**
 * 编辑小富贵教育层
 */
class ResetFugui_one_small extends egret.DisplayObjectContainer {

    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    // 内容盒子
    public static modalBox: egret.Sprite = new egret.Sprite();

    public constructor() {
        super();
        if(this.stage) {
            this.createView();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.createView();
    }

    private createView() {
        this.addChild(ResetFugui_one_small.viewBox);
        ResetFugui_one_small.viewBox.width = this.stage.stageWidth;
        ResetFugui_one_small.viewBox.height = this.stage.stageHeight;

        ResetFugui_one_small.viewBox.touchEnabled = true;

        // 遮罩
        let m_mask = Game.m_mask();
        ResetFugui_one_small.viewBox.addChild(m_mask);

        // 内容盒子
        ResetFugui_one_small.viewBox.addChild(ResetFugui_one_small.modalBox);
        ResetFugui_one_small.modalBox.width = 600;
        ResetFugui_one_small.modalBox.height = 580;
        ResetFugui_one_small.modalBox.x = (ResetFugui_one_small.viewBox.width - ResetFugui_one_small.modalBox.width) / 2;
        ResetFugui_one_small.modalBox.y = (ResetFugui_one_small.viewBox.height - ResetFugui_one_small.modalBox.height) / 2;
        
        // 背景
        let bg = ResetFugui.resetFugui_one_bg();
        ResetFugui_one_small.modalBox.addChild(bg);
        
        // 关闭
        let close_btn = createBitmapByName('reset_fugui_json.reset_fugui_2');
        ResetFugui_one_small.modalBox.addChildAt(close_btn,5);
        close_btn.width = 51;
        close_btn.height = 50;
        close_btn.x = ResetFugui_one_small.modalBox.width - 68;
        close_btn.y = 26;

        close_btn.touchEnabled = true;
        close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            SmallFugui.resetBox1.x = -Game.viewBox.width;
        },this);
        
        // 标题
        let title = ResetFugui.resetFugui_one_title('small');
        ResetFugui_one_small.modalBox.addChild(title);
        
        // tips
        let tips = ResetFugui.resetFugui_one_tips();
        ResetFugui_one_small.modalBox.addChild(tips);
        
        // btn
        let btn = ResetFugui.resetFugui_one_btn();
        ResetFugui_one_small.modalBox.addChild(btn);
        
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            window.localStorage.setItem('ResetFugui_one_small','Y');
            Game.viewBox.removeChild(SmallFugui.resetBox1);
            SmallFugui.resetBox2 = new ResetFugui_two_small();
            Game.viewBox.addChild(SmallFugui.resetBox2);
        },this);
        
        this.createModal_box1();
        this.createModal_box2();
        this.createModal_box3();
    }

    private createModal_box1() {
        let box1: egret.Sprite = new egret.Sprite();
        ResetFugui_one_small.modalBox.addChild(box1);
        box1.width = 210;
        box1.height = 220;
        box1.x = 70;
        box1.y = 160;

        for(let i: number = 0;i < 2;i++) {
            let box = ResetFugui.item(Game.pointCNList[0][i]);
            box1.addChild(box);
            box.x = i * 75;
            if(i == 1) {
                box.swapChildren(box.$children[0],box.$children[1]);
            }
        }

        for(let i: number = 0;i < 3;i++) {
            let box = ResetFugui.item(Game.pointCNList[1][i]);
            box1.addChild(box);
            box.x = i * 75;
            box.y = 80;
        }

        for(let i: number = 0;i < 3;i++) {
            let box = ResetFugui.item(Game.pointCNList[2][i]);
            box1.addChild(box);
            box.x = i * 75;
            box.y = 160;
            if(i == 0) {
                box.swapChildren(box.$children[0],box.$children[1]);
            }
        }

        for(let i: number = 0;i < 2;i++) {
            let y: number;
            i == 0 ? y = 70 : y = 150;
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.beginFill(0x483131,1);
            shp.graphics.drawRect(0,y,box1.width,2);
            shp.graphics.endFill();
            box1.addChild(shp);
        }

        let shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(2,0xE5BC94);
        shp.graphics.moveTo(90,50);
        shp.graphics.lineTo(38,190);
        shp.graphics.endFill();
        box1.addChild(shp);
    }
    
    private createModal_box2() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_one_small.modalBox.addChild(box);
        box.width = 90;
        box.height = 30;
        box.x = 300;
        box.y = 230;

        let ts = createTextFieldByName('替换');
        box.addChild(ts);
        ts.size = 24;
        ts.textColor = 0xB49C83;
        ts.width = 100;
        ts.textAlign = 'center';

        let shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(1,0xB49C83);
        shp.graphics.moveTo(0,28);
        shp.graphics.lineTo(90,28);
        shp.graphics.lineTo(84,24);
        shp.graphics.endFill();
        box.addChild(shp);
    }
    
    private createModal_box3() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_one_small.modalBox.addChild(box);
        box.width = 136;
        box.height = 170;
        box.x = 410;
        box.y = 180;

        let viewBg = createBitmapByName('sesx_json.img_7');
        box.addChild(viewBg);
        viewBg.width = box.width;
        viewBg.height = box.height;

        let t_one: any;
        let t_two: any;
        
        if(Game.small_type == 0) {
            t_one = SmallFugui.textStyle(Game.pointCNList[0][Game.small[0]]);
            t_two = SmallFugui.textStyle(Game.pointCNList[1][Game.small[1]]);
        } else if(Game.small_type == 1) {
            t_one = SmallFugui.textStyle(Game.pointCNList[0][Game.small[0]]);
            t_two = SmallFugui.textStyle(Game.pointCNList[2][Game.small[1]]);
        } else {
            t_one = SmallFugui.textStyle(Game.pointCNList[1][Game.small[0]]);
            t_two = SmallFugui.textStyle(Game.pointCNList[2][Game.small[1]]);
        }
        
        box.addChild(t_one);
        t_one.x = 30;
        t_one.y = 7;

        box.addChild(t_two);
        t_two.x = 10;
        t_two.y = 58;

        let beishu = createTextFieldByName('x' + Game.multiple.small[Game.small_type]);
        box.addChild(beishu);
        beishu.size = 24;
        beishu.textColor = 0xEFB177;
        beishu.width = 50;
        beishu.height = 20;
        beishu.verticalAlign = 'middle';
        beishu.rotation = -45;
        beishu.x = 42;
        beishu.y = 66;
    }
    
}
