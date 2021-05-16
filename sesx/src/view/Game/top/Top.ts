/**
 * 头部
 */
class Top extends egret.DisplayObjectContainer {

    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    // 报喜盒子
    public static baoxi_box: egret.Sprite = new egret.Sprite();
    // 吉时盒子
    public static jishi_box: egret.Sprite = new egret.Sprite();
    // 吉时状态盒子
    public static jishi_status_box: egret.Sprite = new egret.Sprite();
    // 吉时时间盒子
    public static jishi_time_box: egret.Sprite = new egret.Sprite();
    
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
        this.addChild(Top.viewBox);
        Top.viewBox.width = this.stage.stageWidth;
        Top.viewBox.height = 205;

        // 背景
        let viewBg = createBitmapByName("sesx_json.img_3");
        Top.viewBox.addChild(viewBg);
        viewBg.width = Top.viewBox.width;
        viewBg.height = Top.viewBox.height;
        
        // 财神
        let character = createBitmapByName('default_json.default_1');
        Top.viewBox.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (Top.viewBox.width - 243) / 2;
        
        // 报喜盒子
        Top.viewBox.addChild(Top.baoxi_box);
        Top.baoxi_box.width = 170;
        Top.baoxi_box.height = 60;
        Top.baoxi_box.x = 54;
        Top.baoxi_box.y = 145;
        
        let arrow = createBitmapByName('sesx_json.img_19');
        Top.baoxi_box.addChild(arrow);
        arrow.width = 22;
        arrow.height = 15;
        arrow.x = 145;
        arrow.y = 24;
        
        Top.baoxi_box.touchEnabled = true;
        Top.baoxi_box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.showPopup();
        },this);
        
        // 吉时盒子
        Top.viewBox.addChild(Top.jishi_box);
        Top.jishi_box.width = 150;
        Top.jishi_box.height = 60;
        Top.jishi_box.x = 438;
        Top.jishi_box.y = 145;
        
        Top.jishi_box.addChild(Top.jishi_status_box);
        Top.jishi_status_box.width = 100;
        Top.jishi_status_box.height = 60;
        
        Top.jishi_box.addChild(Top.jishi_time_box);
        Top.jishi_time_box.width = 60;
        Top.jishi_time_box.height = 60;
        Top.jishi_time_box.x = 100;

        new Nav();
    }

    /**
     * 展开当前10期报喜与当前遗漏场景
     */ 
    private showPopup() {
        Popup.init();
        // 拉取遗漏数据
        httpAjaxGet('/zodiac/get-miss','',(event: egret.Event) => {
            let res_1 = <egret.HttpRequest>event.currentTarget;
            let res = JSON.parse(res_1.response);
            if(res.code != 0) {
                let toast = new Toast("网络异常，请稍后重试");
                Game.viewBox.addChild(toast);
                return;
            }
            Popup.missData = res.data;
        });
    }
    
    public static baoxi_text(t: string) {
        if(Top.baoxi_box.$children.length > 1) {
            Top.baoxi_box.removeChild(Top.baoxi_box.$children[1]);
        }
        
        let text = createTextFieldByName(t);
        Top.baoxi_box.addChild(text);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 22;
        text.textColor = 0x9F6E6E;
    }
    
    public static jishi_status(t: string) {
        if(Top.jishi_status_box.$children.length > 0) {
            Top.jishi_status_box.removeChild(Top.jishi_status_box.$children[0]);
        }
        
       let text = createTextFieldByName(t);
       Top.jishi_status_box.addChild(text);
       text.height = 60;
       text.verticalAlign = 'middle';
       text.size = 22;
       text.textColor = 0x9F6E6E;
    }
    
    public static jishi_time(t: string) {
        if(Top.jishi_time_box.$children.length > 0) {
            Top.jishi_time_box.removeChild(Top.jishi_time_box.$children[0]);
        }

        let text = createTextFieldByName(t);
        Top.jishi_time_box.addChild(text);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 26;
        text.textColor = 0xAF7C7C;
        text.bold = true;
    }
    
}
