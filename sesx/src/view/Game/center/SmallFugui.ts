/**
 * 小富贵
 */
class SmallFugui {

    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    // 文字盒子
    public static textBox: egret.Sprite = new egret.Sprite();
    // 倍率盒子
    public static beilvBox: egret.Sprite = new egret.Sprite();
    // 修改小富贵盒子
    public static resetBox1: any;
    public static resetBox2: any;
    
    public constructor() {
        this.createView();
    }

    private createView() {
        // 场景盒子
        Center.viewBox.addChild(SmallFugui.viewBox);
        SmallFugui.viewBox.width = 136;
        SmallFugui.viewBox.height = 170;
        SmallFugui.viewBox.x = 8;
        SmallFugui.viewBox.y = 25;
        
        // 背景
        let viewBg = createBitmapByName('sesx_json.img_7');
        SmallFugui.viewBox.addChild(viewBg);
        viewBg.width = SmallFugui.viewBox.width;
        viewBg.height = SmallFugui.viewBox.height;

        // 文字盒子定位
        SmallFugui.viewBox.addChild(SmallFugui.textBox);
        SmallFugui.textBox.width = SmallFugui.viewBox.width;
        SmallFugui.textBox.height = SmallFugui.viewBox.height;
        
        // 倍率盒子定位
        SmallFugui.viewBox.addChild(SmallFugui.beilvBox);
        SmallFugui.beilvBox.width = 50;
        SmallFugui.beilvBox.height = 20;
        SmallFugui.beilvBox.rotation = -45;
        SmallFugui.beilvBox.x = 38;
        SmallFugui.beilvBox.y = 68;
        
        // 修改按钮
        let updateBtn = createBitmapByName('sesx_json.img_17');
        SmallFugui.viewBox.addChild(updateBtn);
        updateBtn.width = 42;
        updateBtn.height = 42;
        updateBtn.x = SmallFugui.viewBox.width - 36;
        updateBtn.y = -12;

        updateBtn.touchEnabled = true;
        updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateSmallFugui,this);

        // 下注
        viewBg.touchEnabled = true;
        viewBg.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            new BetControl(19,3);
        },this);
    }

    private updateSmallFugui_flag: Boolean = false;
    private updateSmallFugui(evt: egret.TouchEvent) {
        if(this.updateSmallFugui_flag) return;  // 正在加载资源不做处理

        let fun: Function = () => {
            if(window.localStorage.getItem('ResetFugui_one_small') != 'Y') {
                if(SmallFugui.resetBox1 == undefined) {
                    SmallFugui.resetBox1 = new ResetFugui_one_small();
                    Game.viewBox.addChild(SmallFugui.resetBox1);
                } else {
                    SmallFugui.resetBox1.x = 0;
                }
            } else {
                if(SmallFugui.resetBox2 == undefined) {
                    SmallFugui.resetBox2 = new ResetFugui_two_small();
                    Game.viewBox.addChild(SmallFugui.resetBox2);
                } else {
                    SmallFugui.resetBox2.x = 0;
                }
            }
        }

        if(!ResetFugui.is_res) {
            this.updateSmallFugui_flag = true;
            ResUtils.getInstance().loadGroup("fugui", () => {
                this.updateSmallFugui_flag = false;
                fun();
            }, this);
        } else {
            fun();
        }
    }
    
    public static createText(t1: string,t2: string) {
        if(SmallFugui.textBox.$children.length > 0) {
            commonRemoveChild(SmallFugui.textBox);
        }
        
        let t_one = SmallFugui.textStyle(t1);
        SmallFugui.textBox.addChild(t_one);
        t_one.x = 30;
        t_one.y = 7;
        
        let t_two = SmallFugui.textStyle(t2);
        SmallFugui.textBox.addChild(t_two);
        t_two.x = 10;
        t_two.y = 58;
    }
    
    public static textStyle(t: string) {
        let ts = createTextFieldByName(t);
        ts.size = 22;
        ts.textColor = 0x301F11;
        return ts;
    }
    
    public static createBeishu(i: number) {
        if(SmallFugui.beilvBox.$children.length > 0) {
            commonRemoveChild(SmallFugui.beilvBox);
        }
        
        let beishu = createTextFieldByName('x' + Game.multiple.small[i]);
        SmallFugui.beilvBox.addChild(beishu);
        beishu.size = 24;
        beishu.textColor = 0xEFB177;
        beishu.width = 50;
        beishu.height = 20;
        beishu.verticalAlign = 'middle';
    }
    
}
