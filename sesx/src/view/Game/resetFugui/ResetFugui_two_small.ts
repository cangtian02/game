/**
 * 编辑小富贵
 */
class ResetFugui_two_small extends egret.DisplayObjectContainer {

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
    
    private small: any;
    private small_type: number;
    private select_status: any = [0,0,0];  // 三种选择状态
    
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
        // 拷贝一份小富贵配置数据到本地
        this.small = JSON.parse(JSON.stringify(Game.small));
        this.small_type = Game.small_type;
        
        this.addChild(ResetFugui_two_small.viewBox);
        ResetFugui_two_small.viewBox.width = this.stage.stageWidth;
        ResetFugui_two_small.viewBox.height = this.stage.stageHeight;

        ResetFugui_two_small.viewBox.touchEnabled = true;

        // 遮罩
        let m_mask = Game.m_mask();
        ResetFugui_two_small.viewBox.addChild(m_mask);
        
        // 内容盒子
        ResetFugui_two_small.viewBox.addChild(ResetFugui_two_small.modalBox);
        ResetFugui_two_small.modalBox.width = 617;
        ResetFugui_two_small.modalBox.height = 629;
        ResetFugui_two_small.modalBox.x = (ResetFugui_two_small.viewBox.width - ResetFugui_two_small.modalBox.width) / 2;
        ResetFugui_two_small.modalBox.y = (ResetFugui_two_small.viewBox.height - ResetFugui_two_small.modalBox.height) / 2;
        
        let resetFugui_modalBox = ResetFugui.resetFugui_modalBox('small');
        ResetFugui_two_small.modalBox.addChild(resetFugui_modalBox);
        
        // 关闭盒子
        let closeBtn: egret.Shape = new egret.Shape();
        closeBtn.graphics.beginFill(0xC8504B,0);
        closeBtn.graphics.drawRect(ResetFugui_two_small.modalBox.width - 70,0,50,50);
        closeBtn.graphics.endFill();
        ResetFugui_two_small.modalBox.addChild(closeBtn);
        
        closeBtn.touchEnabled = true;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            SmallFugui.resetBox2.x = -ResetFugui_two_small.viewBox.width;
        },this);
        
        ResetFugui_two_small.modalBox.addChild(ResetFugui_two_small.warpBox);
        ResetFugui_two_small.warpBox.width = ResetFugui_two_small.modalBox.width - 100;
        ResetFugui_two_small.warpBox.height = 400;
        ResetFugui_two_small.warpBox.x = 50;
        ResetFugui_two_small.warpBox.y = 110;
        
        this.createModal();
        this.createItem_1();
        this.createItem_2();
        this.createItem_3();
        
        for(let i: number = 0;i < 2;i++) {
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(1,0xA17C58);
            if(i == 0) {
                shp.graphics.moveTo(ResetFugui_two_small.warpBox.width - 400,97.5);
                shp.graphics.lineTo(ResetFugui_two_small.warpBox.width - 2,97.5);
            } else {
                shp.graphics.moveTo(ResetFugui_two_small.warpBox.width - 460,192.5);
                shp.graphics.lineTo(ResetFugui_two_small.warpBox.width - 2,192.5);
            }
            shp.graphics.endFill();
            ResetFugui_two_small.warpBox.addChild(shp);
        }
        
        // 确认盒子
        let btnBox = ResetFugui.resetFugui_btnBox();
        ResetFugui_two_small.modalBox.addChild(btnBox);
        
        btnBox.touchEnabled = true;
        btnBox.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.return_fun();
        },this);
    }
    
    /**
     * 点击确认
     */ 
    private return_fun() {
        // 检查是否合法
        if(JSON.stringify(this.small).indexOf('-1') > -1) {
            let toast = new Toast("自由选择串关，选项二串一");
            Game.viewBox.addChild(toast);
            return;
        }
        // 保存值
        Game.small = JSON.parse(JSON.stringify(this.small));
        Game.small_type = this.small_type;
        // 缓存
        window.localStorage.setItem('Game_small',JSON.stringify(Game.small));
        window.localStorage.setItem('Game_small_type',String(Game.small_type));
        // 更改table上的小富贵
        if(Game.small_type == 0) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]],Game.pointCNList[1][Game.small[1]]);
        } else if(Game.small_type == 1) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]],Game.pointCNList[2][Game.small[1]]);
        } else {
            SmallFugui.createText(Game.pointCNList[1][Game.small[0]],Game.pointCNList[2][Game.small[1]]);
        }
        SmallFugui.createBeishu(Game.small_type);
        // 隐藏盒子
        SmallFugui.resetBox2.x = -ResetFugui_two_small.viewBox.width;
    }
    
    private createModal() {
        ResetFugui_two_small.warpBox.addChild(ResetFugui_two_small.textBox);
        ResetFugui_two_small.textBox.width = 136;
        ResetFugui_two_small.textBox.height = 170;
        ResetFugui_two_small.textBox.x = 10;
        ResetFugui_two_small.textBox.y = 10;

        let viewBg = createBitmapByName('sesx_json.img_7');
        ResetFugui_two_small.textBox.addChild(viewBg);
        viewBg.width = ResetFugui_two_small.textBox.width;
        viewBg.height = ResetFugui_two_small.textBox.height;

        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText1);
        ResetFugui_two_small.createText1.x = 30;
        ResetFugui_two_small.createText1.y = 7;
        
        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText2);
        ResetFugui_two_small.createText2.x = 10;
        ResetFugui_two_small.createText2.y = 58;
        
        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText3);
        ResetFugui_two_small.createText3.x = 42;
        ResetFugui_two_small.createText3.y = 66;
        ResetFugui_two_small.createText3.rotation = -45;
        
        if(Game.small_type == 0) {
            this.createText1(Game.pointCNList[0][Game.small[0]]);
            this.createText2(Game.pointCNList[1][Game.small[1]]);
            this.select_status = [1,1,0];
        } else if(Game.small_type == 1) {
            this.createText1(Game.pointCNList[0][Game.small[0]]);
            this.createText2(Game.pointCNList[2][Game.small[1]]);
            this.select_status = [1,0,1];
        } else {
            this.createText1(Game.pointCNList[1][Game.small[0]]);
            this.createText2(Game.pointCNList[2][Game.small[1]]);
            this.select_status = [0,1,1];
        }
        this.createText3('x' + Game.multiple.small[Game.small_type]);
    }
    
    /**
     * 更改金玉
     */ 
    private createText1(t: string) {
        if(ResetFugui_two_small.createText1.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText1);
        }
        ResetFugui_two_small.createText1.addChild(SmallFugui.textStyle(t));
    }
    
    /**
     * 更改五福或者生肖
     */
    private createText2(t: string) {
        if(ResetFugui_two_small.createText2.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText2);
        }
        ResetFugui_two_small.createText2.addChild(SmallFugui.textStyle(t));
    }
    
    /**
     * 更改倍数
     */
    private createText3(t: string) {
        if(ResetFugui_two_small.createText3.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText3);
        }
        let ts = createTextFieldByName(t);
        ts.size = 24;
        ts.textColor = 0xEFB177;
        ts.width = 50;
        ts.height = 20;
        ts.verticalAlign = 'middle';
        ResetFugui_two_small.createText3.addChild(ts);
    }
    
    /**
     * 选择金玉
     */ 
    private createItem_1() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 180;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 150;
        box.y = 20;
        
        for(let i: number = 0;i < 2;i++) {
            let item = ResetFugui.item(Game.pointCNList[0][i]);
            box.addChild(item);
            item.x = i * 80;
            if(Game.small_type == 0 || Game.small_type == 1) {
                if(i == Game.small[0]) {
                    item.swapChildren(item.$children[0],item.$children[1]);
                }
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_jinyu(box,i);
            },this);
        }
    }

    private select_jinyu(box: any,i: number) {
        if(this.select_status[1] == 1 && this.select_status[2] == 1) {
            let toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        
        let j: number;
        i == 0 ? j = 1 : j = 0;
        let item1 = box.$children[i];  // 选中的
        let item2: any = box.$children[j];  // 未选择的
        
        if(this.select_status[0] == 1) {  // 已经选择有金玉
            // 样式切换
            item1.swapChildren(item1.$children[0],item1.$children[1]);

            if(i == this.small[0]) {  // 选中的是已经选择的
                if(this.select_status[1] == 1) { // 已选择五福
                    this.small[0] = this.small[1];
                    this.small[1] = -1;
                    this.createText1(Game.pointCNList[1][this.small[0]]);
                    this.createText2('');
                } else { // 已选择生肖或者都未选择
                    this.small[0] = -1;
                    this.createText1('');
                }
                // 标记未选择金玉
                this.select_status[0] = 0;
                // 更改倍率为0
                this.createText3('x0');
            } else {  // 选中的是未选择的
                if(this.select_status[1] == 1) { // 已选择五福
                    this.small_type = 0;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                } else if(this.select_status[2] == 1) { // 已选择生肖
                    this.small_type = 1;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                } else { // 两个都未选择
                    this.createText3('x0');
                }
                // 样式切换
                item2.swapChildren(item2.$children[0],item2.$children[1]);
                // 展示选中的值
                this.createText1(Game.pointCNList[0][i]);
                // 修改small第一选项
                this.small[0] = i;
            }
        } else {  // 没有选择过金玉
            // 样式切换
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            // 展示选中的值
            this.createText1(Game.pointCNList[0][i]);
            // 标记已选择金玉
            this.select_status[0] = 1;

            if(this.select_status[1] == 1) { // 已选择五福
                this.small_type = 0;
                this.small[1] = this.small[0];
                this.small[0] = i;
                this.createText2(Game.pointCNList[1][this.small[1]]);
                this.createText3('x' + Game.multiple.small[this.small_type]);
            } else if(this.select_status[2] == 1) { // 已选择生肖
                this.small_type = 1;
                this.small[0] = i;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            } else {
                this.small[0] = i;
                this.createText3('x0');
            }
        }
    }
    
    /**
     * 选择五福
     */ 
    private createItem_2() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 380;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 390;
        box.y = 115;
        
        for(let i: number = 0;i < 5;i++) {
            let item = ResetFugui.item(Game.pointCNList[1][i]);
            box.addChild(item);
            item.x = i * 80;
            if(Game.small_type == 0 && i == Game.small[1]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            } else if(Game.small_type == 2 && i == Game.small[0]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_wufu(box,i);
            },this);
        }
    }
    
    private select_wufu(box: any,i: number) {
        if(this.select_status[0] == 1 && this.select_status[2] == 1) {
            let toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        let item1 = box.$children[i]; // 选中的
        
        if(this.select_status[1] == 1) {  // 已选择五福
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            
            if(this.select_status[0] == 1) { // 选择了金玉
                if(i == this.small[1]) { // 选中的是已选择
                    this.createText2('');
                    this.small[1] = -1;
                    this.createText3('x0');
                    this.select_status[1] = 0;
                } else { // 选中的是未选择
                    this.createText2(Game.pointCNList[1][i]);
                    let item2 = box.$children[this.small[1]];
                    item2.swapChildren(item2.$children[0],item2.$children[1]);
                    this.small[1] = i;
                }
            } else if(this.select_status[2] == 1) { // 选择了生肖
                if(i == this.small[0]) { // 选中的是已选择
                    this.createText1('');
                    this.small[0] = -1;
                    this.createText3('x0');
                    this.select_status[1] = 0;
                } else { // 选中的是未选择
                    this.createText1(Game.pointCNList[1][i]);
                    let item2 = box.$children[this.small[0]];
                    item2.swapChildren(item2.$children[0],item2.$children[1]);
                    this.small[0] = i;
                }
            } else { // 什么都没选择
                if(i == this.small[0]) { // 选中的是已选择
                    this.createText1('');
                    this.small[0] = -1;
                    this.select_status[1] = 0;
                } else { // 选中的是未选择
                    this.createText1(Game.pointCNList[1][i]);
                    let item2 = box.$children[this.small[0]];
                    item2.swapChildren(item2.$children[0],item2.$children[1]);
                    this.small[0] = i;
                }
            }
        } else {  // 未选择五福
            if(this.select_status[0] == 1) { // 选择了金玉
                this.small_type = 0;
                this.small[1] = i;
                this.createText2(Game.pointCNList[1][i]);
                this.createText3('x' + Game.multiple.small[this.small_type]);
            } else if(this.select_status[0] == 0) { // 没选择金玉
                this.small[0] = i;
                this.createText1(Game.pointCNList[1][i]);
                if(this.select_status[2] == 1) { // 选择了生肖
                    this.small_type = 2;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                } else { // 没选择生肖
                    this.createText3('x0');
                }
            }
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            this.select_status[1] = 1;
        }
    }
    
    /**
     * 选择生肖
     */ 
    private createItem_3() {
        let box: egret.Sprite = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 460;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 470;
        box.y = 210;
        
        for(let i: number = 0;i < 12;i++) {
            let item = ResetFugui.item(Game.pointCNList[2][i]);
            box.addChild(item);
            if (i < 6) {
                item.x = i * 80;
            } else {
                item.x = (i - 6) * 80;
                item.y = 85;
            }
            if(Game.small_type == 1 && i == Game.small[1]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            } else if(Game.small_type == 2 && i == Game.small[1]) {
                item.swapChildren(item.$children[0],item.$children[1]);
            }
            
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.select_zodiac(box,i);
            },this);
        }
    }
    
    private select_zodiac(box: any,i: number) {
        if(this.select_status[0] == 1 && this.select_status[1] == 1) {
            let toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        let item1 = box.$children[i]; // 选中的
        
        if(this.select_status[2] == 1) { // 已选择生肖
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            if(i == this.small[1]) { // 选中的是已选择的
                this.small[1] = -1;
                this.select_status[2] = 0;
                this.createText2('');
                this.createText3('x0');
            } else { // 选中的是未选择的
                let item2 = box.$children[this.small[1]];
                item2.swapChildren(item2.$children[0],item2.$children[1]);
                this.small[1] = i;
                this.createText2(Game.pointCNList[2][i]);
                if(this.select_status[0] == 1) { // 选中了金玉
                    this.small_type = 1;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                } else if(this.select_status[1] == 1) { // 选择了五福
                    this.small_type = 2;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                } else { // 什么都没选择
                    this.createText3('x0');
                }
            }
        } else { // 未选择生肖
            this.small[1] = i;
            this.select_status[2] = 1;
            this.createText2(Game.pointCNList[2][i]);
            item1.swapChildren(item1.$children[0],item1.$children[1]);
            if(this.select_status[0] == 1) { // 选中了金玉
                this.small_type = 1;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            } else if(this.select_status[1] == 1) { // 选中了五福
                this.small_type = 2;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            } else {
                this.createText3('x0');
            }
        }
    }
    
}
