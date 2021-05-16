/**
 * 底部盒子
 */
class Bot extends egret.DisplayObjectContainer {
    
    public static view_box: egret.Sprite = new egret.Sprite();  // 场景盒子
    public static currency_box: egret.Sprite = new egret.Sprite();  // 我的星币盒子
    public static other_sum_box: egret.Sprite = new egret.Sprite();  // 当前在线人数盒子
    public static other_sum: number = 0;  // 当前在线人数
    
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
        this.addChild(Bot.view_box);
        Bot.view_box.width = this.stage.stageWidth;
        Bot.view_box.height = 110;
        
        let user_info_bg = createBitmapByName('Spirit_json.my_headimg_bg');
        Bot.view_box.addChild(user_info_bg);
        user_info_bg.width = 267;
        user_info_bg.height = 100;
        user_info_bg.x = 10;

        let other_user = createBitmapByName('Spirit_json.user_list_btn');
        Bot.view_box.addChild(other_user);
        other_user.width = 103;
        other_user.height = 102;
        other_user.x = Bot.view_box.width - 118;

        Bot.view_box.addChild(Bot.other_sum_box);
        Bot.other_sum_box.width = 210;
        Bot.other_sum_box.height = 30;
        Bot.other_sum_box.x = Bot.view_box.width - 210;
        Bot.other_sum_box.y = 75;

        Bot.createOtherSum();
    }
    
    public static createBetList() {
        let bet_box: egret.Sprite = new egret.Sprite();
        Bot.view_box.addChild(bet_box);
        bet_box.width = 470;
        bet_box.height = 90;
        bet_box.x = 273;
        bet_box.y = 7;

        for(let i: number = 0;i < 3;i++) {
            let box = Bot.betItemBox(Game.bet_list[i]);
            bet_box.addChild(box);
            box.x = 142 * i;

            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                let item = bet_box.$children[i];
                item.$children[0].alpha = 1;
                item.$children[1].alpha = 0;
                Game.bet_num = Game.bet_list[i];

                for(let j: number = 0;j < 3;j++) {
                    if(j != i) {
                        let item_other = bet_box.$children[j];
                        item_other.$children[0].alpha = 0;
                        item_other.$children[1].alpha = 1;
                    }
                }
            },this);
        }

        let item_first = bet_box.$children[0];
        item_first.$children[0].alpha = 1;
        item_first.$children[1].alpha = 0;
        Game.bet_num = Game.bet_list[0];
    }
    
    public static betItemBox(n: number) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 150;
        box.height = 90;
        
        let bg_1 = createBitmapByName('Spirit_json.bet_item_active_bg');
        bg_1.width = box.width;
        bg_1.height = box.height;
        box.addChild(bg_1);
        bg_1.alpha = 0;
        
        let bg_2 = createBitmapByName('Spirit_json.bet_item_bg');
        bg_2.width = box.width;
        bg_2.height = box.height;
        box.addChild(bg_2);
        
        let txt: string = n >= 100000 ? (n / 10000) + '万' : String(n);
        let t = createTextFieldByName(txt);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 30;
        t.textColor = 0xFFFFFF;
        
        return box;
    }
    
    public static createUserInfo() {
        let name_text: string = Game.user_info.name;
        name_text.length > 6 ? name_text = name_text.substring(0, 6) : name_text = name_text;
        let name = createTextFieldByName(name_text);
        Bot.view_box.addChild(name);
        name.textColor = 0xFFFFFF;
        name.size = 22;
        name.x = 118;
        name.y = 24;
        
        // 头像
        let headimg: any = Game.user_info.headimg == '' ? Main.DEFAULT_CONFIG.http_origin + '/default/static/head_nan_64.png' : Game.user_info.headimg;
        headimg = headimg.split('/');
        if (headimg[headimg.length - 1] == '0' || headimg[headimg.length - 1] == '132') {
            headimg = headimg.splice(0, headimg.length - 1);
            headimg = headimg.join("/") + '/64';
        } else {
            headimg = headimg.join("/");
        }

        // 因使用了webgl，微信头像地址跨域，采用图片转base64模式加载微信头像
        httpAjaxGet('/common/trans-base', '?url=' + headimg, (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast("获取用户头像异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            
            let img: HTMLImageElement = new Image();
            img.src = req.data.code;
            img.onload = () => {
                let texture = new egret.Texture();
                let bitmapdata = new egret.BitmapData(img);
                texture._setBitmapData(bitmapdata);
                let bmp:egret.Bitmap = new egret.Bitmap(texture);
                bmp.x = 15;
                bmp.width = 94;
                bmp.height = 94;
                Bot.view_box.addChild(bmp);

                // 头像遮罩
                let circle: egret.Shape = new egret.Shape();
                circle.graphics.beginFill(0xF6C728);
                circle.graphics.drawCircle(50, 50, 46);
                circle.graphics.endFill();
                circle.x = 10;
                Bot.view_box.addChild(circle);
                bmp.mask = circle;

                // 头像边框
                let shp: egret.Shape = new egret.Shape();
                shp.graphics.lineStyle(3,0xCB9A52);
                shp.graphics.beginFill(0xCB9A52,0);
                shp.graphics.drawCircle(50,50,44);
                shp.graphics.endFill();
                shp.x = 10;
                Bot.view_box.addChild(shp);
            }
        });

        let point_bg = createBitmapByName('Spirit_json.point_bg');
        point_bg.width = 230;
        point_bg.height = 50;
        Bot.view_box.addChild(point_bg);
        point_bg.x = 40;
        point_bg.y = 52;

        let add_point = createBitmapByName('Spirit_json.add_cur');
        add_point.width = 46;
        add_point.height = 46;
        Bot.view_box.addChild(add_point);
        add_point.x = 230;
        add_point.y = 53;

        add_point.touchEnabled = true;
        add_point.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            let callback = () => {
                let toast = new Toast('购买成功');
                Game.view_box.addChild(toast);
                
                httpAjaxGet('/dice/user','',(event: egret.Event) => {
                    let req_1 = <egret.HttpRequest>event.currentTarget;
                    let req = JSON.parse(req_1.response);
                    if(req.code != 0) return;
                    Game.user_info = req.data;
                    // 更新自己的星币
                    Bot.createUserPoint();
                });
            }
            
            if((<any>window).yxjc_pay == undefined) {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/pay/yxjc_pay.js?ver=' + (<any>window).yxjc_public_config.ver.pay);
                let timer;
                timer = setInterval(() => {
                    if((<any>window).yxjc_pay != undefined) {
                        clearInterval(timer);
                        (<any>window).yxjc_pay.init(Main.DEFAULT_CONFIG.api_url, callback);
                    }
                },20);
            } else {
                (<any>window).yxjc_pay.init(Main.DEFAULT_CONFIG.api_url, callback);
            } 
        },this);
    }

    public static createUserPoint() {
        // 第一次绘制
        if(Bot.currency_box.x == 0) {
            Bot.view_box.addChild(Bot.currency_box);
            Bot.currency_box.width = 115;
            Bot.currency_box.height = 50;
            Bot.currency_box.x = 110;
            Bot.currency_box.y = 52;
        }
        
        if(Bot.currency_box.$children.length > 0) {
            commonRemoveChild(Bot.currency_box);
        }
        
        let point = createTextFieldByName(Game.user_info.point);
        Bot.currency_box.addChild(point);
        point.height = 50;
        point.verticalAlign = 'middle';
        point.size = 24;
        point.textColor = 0xFFF060;
    }
    
    /**
     * 自己星币输赢情况动画 头像上展示赢或者输得数量
     */ 
    public static myPointTween(n: number) {
        if(n == undefined || n == 0) return;
        
        let text: any = n < 0 ? String(n) : '+' + n;
        let ts = createTextFieldByName(text);
        Bot.view_box.addChild(ts);
        ts.x = 100;
        ts.y = -10;
        ts.size = 34;
        ts.textColor = 0xF7E238;
        ts.alpha = 0;
        
        let tw_ts = egret.Tween.get(ts);
        tw_ts.to({ 'y': -30,'alpha': 1 },600).wait(2000).to({ 'y': -60,'alpha': 0 },600).call(() => {
            Bot.view_box.removeChild(ts);
        },this);
    }

    /**
     * 当前在线人数
     */
    public static createOtherSum() {
        if(Bot.other_sum_box.$children.length > 0) {
            commonRemoveChild(Bot.other_sum_box);
        }

        let ts = createTextFieldByName('当前在线：' + Bot.other_sum);
        Bot.other_sum_box.addChild(ts);
        ts.width = 200;
        ts.height = 30;
        ts.size = 20;
        ts.textAlign = 'right';
        ts.textColor = 0xffffff;
        ts.verticalAlign = 'middle';
    }

}
