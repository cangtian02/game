/**
 * 顶部盒子
 */
class Top extends egret.DisplayObjectContainer {
	
    public static view_box: egret.Sprite = new egret.Sprite();  // 场景盒子
    public static headimg_box: egret.Sprite = new egret.Sprite();  // 庄家头像盒子
    public static card_box: egret.Sprite = new egret.Sprite();  // 牌型盒子
    public static clock_time_box: egret.Sprite = new egret.Sprite();  // 倒计时盒子
    public static state_box: egret.Sprite = new egret.Sprite();  // 状态盒子

    public static banker_headimg_sub: number;
    public static banker_data: any = [
        { name: '嘉美',point: 9999 },
        { name: '玲玲',point: 6666 },
        { name: '柔柔',point: 8888 },
        { name: '小飓',point: 6688 },
        { name: '小雅',point: 6868 },
        { name: '晓美',point: 9898 },
        { name: '晓蜜',point: 9889 },
        { name: '雪芙',point: 9298 },
        { name: '瑶瑶',point: 6888 },
        { name: '紫夏',point: 6889 }
    ];

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
        this.addChild(Top.view_box);
        Top.view_box.width = this.stage.stageWidth;
        Top.view_box.height = 130;
        
        Top.view_box.addChild(Top.headimg_box);
        Top.headimg_box.width = 220;
        Top.headimg_box.height = 100;
        Top.headimg_box.x = 35;
        Top.headimg_box.y = 17;

        Top.banker_headimg_sub = Math.floor(Math.random() * 10);
        Top.createBanker(Top.banker_headimg_sub);

        let banker_card_bg = createBitmapByName('Spirit_json.card_bg');
        Top.view_box.addChild(banker_card_bg);
        banker_card_bg.width = 272;
        banker_card_bg.height = 124;
        banker_card_bg.x = (Top.view_box.width - 272) / 2;
        banker_card_bg.y = 5;
        
        // 牌型盒子预先定位
        Top.view_box.addChild(Top.card_box);
        Top.card_box.width = 276;
        Top.card_box.height = 124;
        Top.card_box.x = (Top.view_box.width - 276) / 2;
        Top.card_box.y = 5;
        
        let clock_bg = createBitmapByName('Spirit_json.clock');
        Top.view_box.addChild(clock_bg);
        clock_bg.width = 91;
        clock_bg.height = 103;
        clock_bg.x = banker_card_bg.x + 310;
        clock_bg.y = 19;
        
        // 倒计时盒子预先定位
        Top.view_box.addChild(Top.clock_time_box);
        Top.clock_time_box.width = 50;
        Top.clock_time_box.height = 50;
        Top.clock_time_box.x = clock_bg.x + 24;
        Top.clock_time_box.y = clock_bg.y + 30;
        
        // 状态盒子预先定位
        Top.view_box.addChild(Top.state_box);
        Top.state_box.width = 130;
        Top.state_box.height = 40;
        Top.state_box.x = clock_bg.x + 105;
        Top.state_box.y = clock_bg.y + 54;
    }

    public static createBanker(n: number) {
        if(Top.headimg_box.$children.length > 0) {
            commonRemoveChild(Top.headimg_box);
        }

        let head_img = createBitmapByName('banker_json.tx' + (n + 1));
        Top.headimg_box.addChild(head_img);
        head_img.width = 100;
        head_img.height = 100;
        
        let name = createTextFieldByName(Top.banker_data[n].name);
        Top.headimg_box.addChild(name);
        name.size = 26;
        name.textColor = 0xFFFFFF;
        name.x = 115;
        name.y = 18;
        
        let point = createTextFieldByName(Top.banker_data[n].point + '亿');
        Top.headimg_box.addChild(point);
        point.size = 26;
        point.textColor = 0xF9D435;
        point.x = 115;
        point.y = 58;
    }
    
    public static createTime(n: number) {
        if(Top.clock_time_box.$children.length > 0) {
            commonRemoveChild(Top.clock_time_box);
        }
        
        let t_size: number = n > 9 ? 40 : 50;
        let t = createTextFieldByName(String(n));
        Top.clock_time_box.addChild(t);
        t.textColor = 0xFCE842;
        t.width = Top.clock_time_box.width;
        t.height = Top.clock_time_box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = t_size;
        t.bold = true;
    }
    
    public static createState(t: string) {
        if(Top.state_box.$children.length > 0) {
            commonRemoveChild(Top.state_box);
        }
        
        let tx = createTextFieldByName(t);
        Top.state_box.addChild(tx);
        tx.textColor = 0xFCE739;
        tx.height = Top.state_box.height;
        tx.verticalAlign = 'middle';
        tx.size = 30;
        tx.bold = true;
    }
    
    public static createBankerInfo(n: number) {
        if(n == undefined || n == 0) return;
    
        let type: Boolean = n < 0 ? true : false; // 负数 true 反之 flase
        n = n < 0 ? -n : n;
        let text:any = n.toString();
        let big: Boolean = n >= 100000 ? true : false;  // 是否大于或等于十万
        big ? text = String(Math.floor(Number(text)/10000)) : '';

        let box: egret.Sprite = new egret.Sprite();
        
        let icon = createBitmapByName('card_type_json.' + (type ? 'minus' : 'add'));
        box.addChild(icon);
        icon.width = 36;
        type ? icon.height = 19 : icon.height = 43;
        type ? icon.y = 13 : icon.y = -1;

        for(let i: number = 0;i < text.length;i++) {
            let img =  createBitmapByName('card_type_json.' + text[i]);
            box.addChild(img);
            img.x = i * 29 + 36;
        }

        if(big) {
            let wan = createBitmapByName('card_type_json.wan');
            box.addChild(wan);
            wan.width = 39;
            wan.height = 40;
            wan.x = box.width;
        }

        Top.view_box.addChild(box);
        box.x = 90;
        box.y = 100;
        box.scaleX = .9;
        box.scaleY = .9;
        box.alpha = 0;
        
        let tw_ts = egret.Tween.get(box);
        tw_ts.to({ 
            'y': 70,'alpha': 1 
        },600).wait(2000).to({
            'y': 30,'alpha': 0 
        },600).call(() => {
            Top.view_box.removeChild(box);
        },this);
    }

}
