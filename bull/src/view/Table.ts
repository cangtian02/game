/**
 * 桌子盒子
 */
class Table extends egret.DisplayObjectContainer {

    public static bet_block_box: any = [];  // 下注盒子
    public static bet_block_box_coordinate: any;  // 下注盒子坐标

    public static qihao_result_box: any = [];  // 历史开奖信息盒子
    public static qihao_result_box_coordinate: any;  // 历史开奖信息盒子坐标
    
    public static card_box: any = [];  // 牌盒子
    public static card_box_coordinate: any;  // 牌盒子坐标
    
    public constructor() {
        super();
        // 全面屏
        if(window.innerHeight / window.innerWidth > 1.8) {
            Table.bet_block_box_coordinate = [
                { x: 90,y: 230 },
                { x: 480,y: 230 },
                { x: 90,y: 740 },
                { x: 480,y: 740 }
            ];
            Table.qihao_result_box_coordinate = [
                { x: 72,y: 520 },
                { x: 462,y: 520 },
                { x: 72,y: 1030 },
                { x: 462,y: 1030 }
            ];
            Table.card_box_coordinate = [
                { x: 84,y: 580 },
                { x: 474,y: 580 },
                { x: 84,y: 1090 },
                { x: 474,y: 1090 }
            ];
        } else {
            Table.bet_block_box_coordinate = [
                { x: 90,y: 180 },
                { x: 476,y: 180 },
                { x: 90,y: 640 },
                { x: 476,y: 640 }
            ];
            Table.qihao_result_box_coordinate = [
                { x: 72,y: 460 },
                { x: 458,y: 460 },
                { x: 72,y: 920 },
                { x: 458,y: 920 }
            ];
            Table.card_box_coordinate = [
                { x: 84,y: 510 },
                { x: 470,y: 510 },
                { x: 84,y: 970 },
                { x: 470,y: 970 }
            ];
        }
        this.init();
    }

    private init() {
        for(let i: number = 0;i < 4;i++) {
            let bet_block_box = this.betBlockBoxStyle(i);
            this.addChild(bet_block_box);
            Table.bet_block_box.push(bet_block_box);
            
            bet_block_box.touchEnabled = true;
            bet_block_box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new BetControl(i);
            },this);
            
            let qihao_reqult_box = this.qihaoResultBoxStyle(i);
            this.addChild(qihao_reqult_box);
            Table.qihao_result_box.push(qihao_reqult_box);
            
            let card_box_bg = this.cardBoxBgStyle(i);
            this.addChild(card_box_bg);
            
            let card_box = this.cardBoxStyle(i);
            this.addChild(card_box);
            Table.card_box.push(card_box);
        }
    }

    private betBlockBoxStyle(i: number) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 260;
        box.height = 280;
        box.x = Table.bet_block_box_coordinate[i].x;
        box.y = Table.bet_block_box_coordinate[i].y;

        let bg = createBitmapByName('Spirit_json.table_list_bg_' + (i + 1));
        box.addChild(bg);
        bg.width = 260;
        bg.height = 280;
        
        let top_box: egret.Sprite = new egret.Sprite();  // 顶部下注总额盒子
        box.addChild(top_box);
        top_box.width = box.width;
        top_box.height = 40;
        top_box.y = 6;
        
        let center_box: egret.Sprite = new egret.Sprite();  // 中部下注星币图标盒子
        box.addChild(center_box);
        center_box.width = box.width;
        center_box.height = 190;
        center_box.y = 46;
        
        let bot_box: egret.Sprite = new egret.Sprite();  // 底部自己下注数量盒子
        box.addChild(bot_box);
        bot_box.width = 167;
        bot_box.height = 35;
        bot_box.x = 46.5;
        bot_box.y = 236;
        
        return box;
    }

    private qihaoResultBoxStyle(i: number) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 300;
        box.height = 50;
        box.x = Table.qihao_result_box_coordinate[i].x;
        box.y = Table.qihao_result_box_coordinate[i].y;

        let bg = createBitmapByName('Spirit_json.outcome_bg');
        box.addChild(bg);
        bg.width = 300;
        bg.height = 50;

        let content: egret.Sprite = new egret.Sprite();
        content.width = 300;
        content.height = 50;
        box.addChild(content);

        return box;
    }

    private cardBoxBgStyle(i: number) {
        let card_box_bg = createBitmapByName('Spirit_json.card_bg');
        card_box_bg.width = 276;
        card_box_bg.height = 124;
        card_box_bg.x = Table.card_box_coordinate[i].x;
        card_box_bg.y = Table.card_box_coordinate[i].y;
        return card_box_bg;
    }
    
    private cardBoxStyle(i: number) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 276;
        box.height = 124;
        box.x = Table.card_box_coordinate[i].x;
        box.y = Table.card_box_coordinate[i].y;
        return box;
    }
    
    public static createQihaoResult() {
        for(let i: number = 0;i < 4;i++) {
            let box = Table.qihao_result_box[i].$children[1];
            if(box.$children.length > 0) {
                commonRemoveChild(box);
            }

            let k1: any = 'player' + (i + 1);
            let data: any = Game.qihao_result[k1];
            let len: number = data.length;

            for(let j: number = 0;j < len;j++) {
                let img_soure: any = data[j] == 1 ? 'win': 'loser';
                let img = createBitmapByName('Spirit_json.' + img_soure);
                box.addChild(img);
                img.width = 29;
                img.height = 29;
                img.x = j * 31 + 27;
                img.y = 10.5;
            }
        }
    }

    /**
     * 重置四手盒子成点击下注状态
     */ 
    public static betInit() {
        for(let i: number = 0;i < 4;i++) {
            let box = Table.bet_block_box[i].$children[1];
            if(box.$children.length > 0) {
                commonRemoveChild(box);
            }
            
            let t = createTextFieldByName('点击下注');
            box.addChild(t);
            t.width = box.width;
            t.height = box.height;
            t.textAlign = 'center';
            t.verticalAlign = 'middle';
            t.size = 28;
            t.textColor = 0x329C51;
        }
    }
    
    /**
     * 0：请下注 1：买定离手
     */
    public static showTip(f: number) {
        let box: egret.Sprite = new egret.Sprite();
        Game.view_box.addChild(box);
        box.width = 757;
        box.height = 135;
        box.x = (Game.view_box.width - 757) / 2;
        box.y = 460;

        let bg = createBitmapByName('Spirit_json.popup_tip_bg');
        box.addChild(bg);
        bg.width = box.width;
        bg.height = box.height;

        let w: number = f == 0 ? 235 : 313;
        let img: any = f == 0 ? 'popup_tip_qxz' : 'popup_tip_mdls';
        let bitmap = createBitmapByName('Spirit_json.' + img);
        box.addChild(bitmap);
        bitmap.width = w;
        bitmap.height = 78;
        bitmap.x = (box.width - w) / 2;
        bitmap.y = (box.height - 78) / 2;

        setTimeout(() => {
            Game.view_box.removeChild(box);
        },2000);
    }

    /**
     * 把没有下注的位置隐藏点击下注提示
     */ 
    public static removeNoHitTitle() {
        for(let i: number = 0;i < 4;i++) {
            if(Table.bet_block_box[i].$children[2].$children.length == 0) {
                commonRemoveChild(Table.bet_block_box[i].$children[1]);
            }
        }
    }
    
    /**
     * 绘制自己下注数量 i 第几手
     */ 
    public static createMyBetNum(i: number) {
        let box = Table.bet_block_box[i].$children[3];
        if(box.$children.length > 0) {
            commonRemoveChild(box);
        }

        let bg = createBitmapByName('Spirit_json.my_bet_bg');
        box.addChild(bg);
        bg.width = box.width;
        bg.height = box.height;
        
        let n: number = BetControl.my_bet_num_arr[i];
        let tx: string;
        n >= 10000000 ? tx = Math.round(n / 10000) + '万' : tx = String(n);
        
        let t = createTextFieldByName(tx);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 28;
        t.textColor = 0xEFCE34;
    }
    
    /**
     * 绘制全部玩家下注数量 i 第几手
     */
    public static createTotalBetNum(i: number) {
        let box = Table.bet_block_box[i].$children[1];
        if(box.$children.length > 0) {
            commonRemoveChild(box);
        }

        let n: number = BetControl.total_bet_num_arr[i];
        let tx: string;
        n >= 1000000 ? tx = Math.round(n / 10000) + '万' : tx = String(n);
        
        let t = createTextFieldByName(tx);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 28;
        t.textColor = 0x7CF49D;
    }
    
    /**
     * 请桌
     */ 
    public static resetTable() {
        for(let i: number = 0;i < 4;i++) {
            commonRemoveChild(Table.card_box[i]);
            let len: number = Table.bet_block_box[i].$children.length;
            if(Table.bet_block_box[i].$children.length == 5) {
                Table.bet_block_box[i].removeChild(Table.bet_block_box[i].$children[len - 1]);
            }
            commonRemoveChild(Table.bet_block_box[i].$children[2]);
            commonRemoveChild(Table.bet_block_box[i].$children[3]);
        }
        Table.betInit();
        commonRemoveChild(Top.card_box);
        BetControl.bet_total_num = 0;
        BetControl.my_bet_num_arr = [0,0,0,0];
        BetControl.other_bet_num_arr = [0,0,0,0];
        BetControl.total_bet_num_arr = [0,0,0,0];
        BetControl.step_bet_diff = [0,0,0,0];
    }
    
}
