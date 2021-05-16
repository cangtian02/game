/**
 * 编辑大富贵
 */
class ResetFugui_two_big extends egret.DisplayObjectContainer {
    
    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    // 内容盒子
    public static modalBox: egret.Sprite = new egret.Sprite();
    // warpbox
    public static warpBox: egret.Sprite = new egret.Sprite();
    // textBox
    public static textBox: egret.Sprite = new egret.Sprite();
    // createText
    public static createText1: egret.Sprite = new egret.Sprite();
    public static createText2: egret.Sprite = new egret.Sprite();
    public static createText3: egret.Sprite = new egret.Sprite();
    
    private big: any;
    
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
        // 拷贝一份大富贵配置数据到本地
        this.big = JSON.parse(JSON.stringify(Game.big));
        
        this.addChild(ResetFugui_two_big.viewBox);
        ResetFugui_two_big.viewBox.width = this.stage.stageWidth;
        ResetFugui_two_big.viewBox.height = this.stage.stageHeight;

        ResetFugui_two_big.viewBox.touchEnabled = true;

        // 遮罩
        let m_mask = Game.m_mask();
        ResetFugui_two_big.viewBox.addChild(m_mask);

        // 内容盒子
        ResetFugui_two_big.viewBox.addChild(ResetFugui_two_big.modalBox);
        ResetFugui_two_big.modalBox.width = 617;
        ResetFugui_two_big.modalBox.height = 629;
        ResetFugui_two_big.modalBox.x = (ResetFugui_two_big.viewBox.width - ResetFugui_two_big.modalBox.width) / 2;
        ResetFugui_two_big.modalBox.y = (ResetFugui_two_big.viewBox.height - ResetFugui_two_big.modalBox.height) / 2;

        let resetFugui_modalBox = ResetFugui.resetFugui_modalBox('big');
        ResetFugui_two_big.modalBox.addChild(resetFugui_modalBox);
        
        // 关闭盒子
        let closeBtn: egret.Shape = new egret.Shape();
        closeBtn.graphics.beginFill(0xC8504B,0);
        closeBtn.graphics.drawRect(ResetFugui_two_big.modalBox.width - 70,0,50,50);
        closeBtn.graphics.endFill();
        ResetFugui_two_big.modalBox.addChild(closeBtn);

        closeBtn.touchEnabled = true;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            BigFugui.resetBox2.x = -ResetFugui_two_big.viewBox.width;
        },this);
        
        ResetFugui_two_big.modalBox.addChild(ResetFugui_two_big.warpBox);
        ResetFugui_two_big.warpBox.width = ResetFugui_two_big.modalBox.width - 100;
        ResetFugui_two_big.warpBox.height = 400;
        ResetFugui_two_big.warpBox.x = 50;
        ResetFugui_two_big.warpBox.y = 110;
        
        this.createModal();
        this.createItem_1();
        this.createItem_2();
        this.createItem_3();
        
        // 确认盒子
        let btnBox = ResetFugui.resetFugui_btnBox();
        ResetFugui_two_big.modalBox.addChild(btnBox);

        btnBox.touchEnabled = true;
        btnBox.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.return_fun();
        },this);
    }

    /**
     * 点击确认
     */
    private return_fun() {
        // 保存值
        Game.big = JSON.parse(JSON.stringify(this.big));
        // 缓存
        window.localStorage.setItem('Game_big',JSON.stringify(Game.big));
        // 更改table上的小富贵
        BigFugui.createText(Game.pointCNList[0][Game.big[0]],Game.pointCNList[1][Game.big[1]],Game.pointCNList[2][Game.big[2]]);
        // 隐藏盒子
        BigFugui.resetBox2.x = -ResetFugui_two_big.viewBox.width;
    }
    
    private createModal() {
        ResetFugui_two_big.warpBox.addChild(ResetFugui_two_big.textBox);
        ResetFugui_two_big.textBox.width = 136;
        ResetFugui_two_big.textBox.height = 170;
        ResetFugui_two_big.textBox.x = ResetFugui_two_big.warpBox.width - 146;
        ResetFugui_two_big.textBox.y = 10;

        let viewBg = createBitmapByName('sesx_json.img_8');
        ResetFugui_two_big.textBox.addChild(viewBg);
        viewBg.width = ResetFugui_two_big.textBox.width;
        viewBg.height = ResetFugui_two_big.textBox.height;

        ResetFugui_two_big.textBox.addChild(ResetFugui_two_big.createText1);
        ResetFugui_two_big.createText1.x = 60;
        ResetFugui_two_big.createText1.y = 7;

        ResetFugui_two_big.textBox.addChild(ResetFugui_two_big.createText2);
        ResetFugui_two_big.createText2.x = 100;
        ResetFugui_two_big.createText2.y = 46;

        ResetFugui_two_big.textBox.addChild(ResetFugui_two_big.createText3);
        ResetFugui_two_big.createText3.x = 104;
        ResetFugui_two_big.createText3.y = 100;
        
        let beilv = createTextFieldByName('x' + Game.multiple.big);
        beilv.size = 24;
        beilv.textColor = 0xEFB177;
        beilv.width = 50;
        beilv.height = 20;
        beilv.verticalAlign = 'middle';
        beilv.x = 72;
        beilv.y = 46;
        beilv.rotation = 45;
        ResetFugui_two_big.textBox.addChild(beilv);
        
        this.createText1(Game.pointCNList[0][Game.big[0]]);
        this.createText2(Game.pointCNList[1][Game.big[1]]);
        this.createText3(Game.pointCNList[2][Game.big[2]]);
    }
    
    /**
     * 更改金玉
     */
    private createText1(t: string) {
        if(ResetFugui_two_big.createText1.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_big.createText1);
        }
        ResetFugui_two_big.createText1.addChild(SmallFugui.textStyle(t));
    }

    /**
     * 更改五福
     */
    private createText2(t: string) {
        if(ResetFugui_two_big.createText2.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_big.createText2);
        }
        ResetFugui_two_big.createText2.addChild(SmallFugui.textStyle(t));
    }

    /**
     * 更改生肖
     */
    private createText3(t: string) {
        if(ResetFugui_two_big.createText3.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_big.createText3);
        }
        ResetFugui_two_big.createText3.addChild(SmallFugui.textStyle(t));
    }

    /**
     * 选择金玉
     */
    private createItem_1() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_big.warpBox.addChild(box);
        box.width = 180;
        box.height = 60;
        box.x = 10;
        box.y = 20;

        for(let i: number = 0;i < 2;i++) {
            let item = ResetFugui.item(Game.pointCNList[0][i]);
            box.addChild(item);
            item.x = i * 80;
            if(i == Game.big[0]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_jinyu(box,i);
            },this);
        }
    }

    private select_jinyu(box: any,i: number) {
        let j: number;
        i == 0 ? j = 1 : j = 0;
        let item1 = box.$children[i];  // 选中的
        let item2: any = box.$children[j];  // 未选择的
        
        // 只处理未选中的
        if(i != this.big[0]) {
            // 样式切换
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            item2.swapChildren(item2.$children[0],item2.$children[1]);
            // 展示选中的值
            this.createText1(Game.pointCNList[0][i]);
            // 修改big第一选项
            this.big[0] = i;
        }
    }
    
    /**
     * 选择五福
     */
    private createItem_2() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_big.warpBox.addChild(box);
        box.width = 380;
        box.height = 60;
        box.x = 10;
        box.y = 115;

        for(let i: number = 0;i < 5;i++) {
            let item = ResetFugui.item(Game.pointCNList[1][i]);
            box.addChild(item);
            item.x = i * 80;
            if(i == Game.big[1]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_wufu(box,i);
            },this);
        }
    }

    private select_wufu(box: any,i: number) {
        let j: number;
        i == 0 ? j = 1 : j = 0;
        let item1 = box.$children[i];  // 选中的

        // 只处理未选中的
        if(i != this.big[1]) {
            // 样式切换
            let item2 = box.$children[this.big[1]];
            item2.swapChildren(item2.$children[0],item2.$children[1]);
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            // 展示选中的值
            this.createText2(Game.pointCNList[1][i]);
            // 修改big第二选项
            this.big[1] = i;
        }
    }
    
    /**
     * 选择生肖
     */
    private createItem_3() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_big.warpBox.addChild(box);
        box.width = 460;
        box.height = 60;
        box.x = 10;
        box.y = 210;

        for(let i: number = 0;i < 12;i++) {
            let item = ResetFugui.item(Game.pointCNList[2][i]);
            box.addChild(item);
            if(i < 6) {
                item.x = i * 80;
            } else {
                item.x = (i - 6) * 80;
                item.y = 85;
            }
            if(i == Game.big[2]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_zodiac(box,i);
            },this);
        }
    }
    
    private select_zodiac(box: any,i: number) {
        let j: number;
        i == 0 ? j = 1 : j = 0;
        let item1 = box.$children[i];  // 选中的

        // 只处理未选中的
        if(i != this.big[2]) {
            // 样式切换
            let item2 = box.$children[this.big[2]];
            item2.swapChildren(item2.$children[0],item2.$children[1]);
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            // 展示选中的值
            this.createText3(Game.pointCNList[2][i]);
            // 修改big第三选项
            this.big[2] = i;
        }
    }
}
