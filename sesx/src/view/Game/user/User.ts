/**
 * 玩家
 */
class User extends egret.DisplayObjectContainer {

    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    // 玩家盒子
    public static userBox_1: egret.Sprite = new egret.Sprite();
    public static userBox_2: egret.Sprite = new egret.Sprite();
    public static userBox_3: egret.Sprite = new egret.Sprite();
    public static userBox_4: egret.Sprite = new egret.Sprite();
    public static userBox_5: egret.Sprite = new egret.Sprite();
    // 玩家坐标
    public static userPos: any = [
        { x: -10,y: -160 },
        { x: 100,y: -68 },
        { x: 256,y: -44 },
        { x: 410,y: -68 },
        { x: 520,y: -160 }
    ];
    // 用户信息
    public static userList: any = ['','','','',''];
    
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
        this.addChild(User.viewBox);
        User.viewBox.width = this.stage.stageWidth;
        User.viewBox.height = 80;
        
        // 背景
        let viewBg = createBitmapByName('default_json.default_2');
        User.viewBox.addChild(viewBg);
        viewBg.width = User.viewBox.width;
        viewBg.height = 62;
        
        // 玩家位置盒子
        for(let i: number = 0;i < 5;i++){
            let userBox = User.userBox(i);
            userBox.x = User.userPos[i].x;
            userBox.y = User.userPos[i].y;
            userBox.width = 130;
            userBox.height = 140;
            User.viewBox.addChild(userBox);
        }

    }

    public static userBox(i: number) {
        let item: any;
        if(i == 0) {
            item = User.userBox_1;
        }else if(i == 1) {
            item = User.userBox_2;
        } else if(i == 2) {
            item = User.userBox_3;
        } else if(i == 3) {
            item = User.userBox_4;
        } else {
            item = User.userBox_5;
        }
        return item;
    }
    
    // 绘制玩家 i:哪位玩家
    public static createUserList(i: number) {
        let userBox = User.userBox(i);
        if(userBox.$children.length > 0) {
            commonRemoveChild(userBox);
        }

        let headimg: any;
        if(User.userList[i].name == undefined) {
            headimg = i % 2 == 0 ? '/default/static/head_nan_64.png' : '/default/static/head_nv_64.png';
            headimg = Main.DEFAULT_CONFIG.http_origin + headimg;
        } else {
            headimg = User.userList[i].headimg == '' ? Main.DEFAULT_CONFIG.http_origin + '/default/static/head_nan_64.png' : User.userList[i].headimg;
            headimg = headimg.split('/');
            if (headimg[headimg.length - 1] == '0' || headimg[headimg.length - 1] == '132') {
                headimg = headimg.splice(0, headimg.length - 1);
                headimg = headimg.join("/") + '/64';
            } else {
                headimg = headimg.join("/");
            }            
        }

        // 因使用了webgl，微信头像地址跨域，采用图片转base64模式加载微信头像
        httpAjaxGet('/common/trans-base', '?url=' + headimg, (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast("获取用户头像异常，请刷新页面重试");
                Game.viewBox.addChild(toast);
                return;
            }
            
            let img: HTMLImageElement = new Image();
            img.src = req.data.code;
            img.onload = () => {
                let texture = new egret.Texture();
                let bitmapdata = new egret.BitmapData(img);
                texture._setBitmapData(bitmapdata);
                let bmp:egret.Bitmap = new egret.Bitmap(texture);
                bmp.width = 87.6;
                bmp.height = 87.6;
                bmp.x = 23;
                bmp.y = 5;
                userBox.addChild(bmp);

                // 头像遮罩
                let circle: egret.Shape = new egret.Shape();
                circle.graphics.beginFill(0xCB9A52);
                circle.graphics.drawCircle(50,50,44);
                circle.graphics.endFill();
                circle.x = 15;
                userBox.addChild(circle);
                bmp.mask = circle;

                // 头像边框
                let shp: egret.Shape = new egret.Shape();
                shp.graphics.lineStyle(3,0xCB9A52);
                shp.graphics.beginFill(0xCB9A52,0);
                shp.graphics.drawCircle(50,50,44);
                shp.graphics.endFill();
                shp.x = 15;
                userBox.addChild(shp);
            }
        });

        if(User.userList[i].name != undefined) {  // 昵称
            let t: string = User.userList[i].name;
            if(t.length > 4) t = t.substr(0,4) + '...';
            let name = createTextFieldByName(t);
            name.width = 130;
            name.height = 40;
            name.size = 24;
            name.textAlign = 'center';
            name.verticalAlign = 'middle';
            name.textColor = 0x6E5454;
            name.y = 100;
            userBox.addChild(name);
        }
    }
    
    // 玩家所得奖励展示 n奖励数 i位置
    public static userPoint(n: number,i: number) {
        let box: egret.Sprite = new egret.Sprite();
        User.viewBox.addChild(box);
        box.width = 80;
        box.height = 34;
        box.x = User.userPos[i].x + 10;
        box.y = User.userPos[i].y + 20;
        
        let line: egret.Shape = new egret.Shape();
        line.graphics.beginFill(0xE34849,1);
        line.graphics.drawRect(15,0,80,34);
        line.graphics.endFill();
        box.addChild(line);
        
        let line_left: egret.Shape = new egret.Shape();
        line_left.graphics.beginFill(0xE34849,1);
        line_left.graphics.drawArc(0,17,17,0,Math.PI,true);
        line_left.graphics.endFill();
        box.addChild(line_left);
        line_left.rotation = 270;
        line_left.x = 0;
        line_left.y = 17;

        let line_right: egret.Shape = new egret.Shape();
        line_right.graphics.beginFill(0xE34849,1);
        line_right.graphics.drawArc(80,17,17,0,Math.PI,true);
        line_right.graphics.endFill();
        box.addChild(line_right);
        line_right.rotation = 90;
        line_right.x = 110;
        line_right.y = -62;
        
        let ts = createTextFieldByName('+' + n);
        box.addChild(ts);
        ts.x = 10;
        ts.size = 28;
        ts.height = 34;
        ts.verticalAlign = 'middle';

        setTimeout(() => {
            User.viewBox.removeChild(box);
        },2000);
    }
    
}
