/**
 * 牌面类
 * 方块 2-14
 * 梅花 18-30
 * 红桃 34-46
 * 黑桃 50-62
 * 小鬼 79 大鬼 95
 */

/**
 * 正面牌类，接收牌数字，返回牌的对象
 */ 
class PokerView extends egret.Sprite{
    
    private poker_width: number = 144; // 牌宽
    private poker_height: number = 198; // 牌高
    
    private num: number; // num 牌的数字
    private cardColor: number; // 牌的花色 1 方块 2 梅花 3 红桃 4 黑桃 5 小鬼 6 大鬼
    
    private viewBox: egret.Sprite = new egret.Sprite();
    
    public constructor(num: number) {
        super();
        
        this.num = num;
        this.cardColor = this.renderCardColor();
        
        this.createView();
    }
    
    // 返回牌的花色
    private renderCardColor() {
        var color: number;
        var num: number = this.num;
        if(num == 79) {
            color = 5;
        } else if(num == 95) {
            color = 6;
        } else if(num > 1 && num < 15) {
            color = 1;
        } else if(num > 17 && num < 31) {
            color = 2;
        } else if(num > 33 && num < 47) {
            color = 3;
        } else if(num > 49 && num < 63) {
            color = 4;
        }
        return color;
    }
    
    private createView() {
        this.addChild(this.viewBox);
        this.viewBox.width = this.poker_width;
        this.viewBox.height = this.poker_height;
        
        var bg = createBitmapByName('public_poker_json.Pokerface');
        this.viewBox.addChild(bg);
        bg.width = this.viewBox.width;
        bg.height = this.viewBox.height;
        
        if(this.cardColor == 5 || this.cardColor == 6) {
            this.createGhostCard();
        } else {
            this.createNormalCard();
        }
        
    }
    
    // 绘制大小鬼
    private createGhostCard() {
        var be_1: any;
        this.cardColor == 5 ? be_1 = createBitmapByName('public_poker_json.joker_1') : be_1 = createBitmapByName('public_poker_json.joker_2');
        var be_2: any;
        this.cardColor == 5 ? be_2 = createBitmapByName('public_poker_json.joker_3') : be_2 = createBitmapByName('public_poker_json.joker_4');
        
        this.viewBox.addChild(be_1);
        be_1.width = 10;
        be_1.height = 90;
        be_1.x = 8;
        be_1.y = 7;
        
        this.viewBox.addChild(be_2);
        be_2.width = 90;
        be_2.height = 130;
        be_2.x = 30;
        be_2.y = 35;
    }
    
    // 绘制2-A
    private createNormalCard() {
        var num: number = this.resetNum();

        var be_1: any;
        if(this.cardColor == 1 || this.cardColor == 3) {
            be_1 = createBitmapByName('public_poker_json.r_' + num);
        } else if(this.cardColor == 2 || this.cardColor == 4) {
            be_1 = createBitmapByName('public_poker_json.b_' + num);
        }
        
        this.viewBox.addChild(be_1);
        be_1.width = 24;
        be_1.height = 40;
        be_1.x = 8;
        be_1.y = 14;
        
        var be_2: any = this.cardColorView();
        this.viewBox.addChild(be_2);
        be_2.width = 24;
        be_2.height = 22;
        be_2.x = 8;
        be_2.y = 60;
        
        var be_3: any = this.cardColorView();
        this.viewBox.addChild(be_3);
        be_3.width = 110;
        be_3.height = 100;
        be_3.x = (this.viewBox.width - 110) / 2 + 8;
        be_3.y = 68;
    }
    
    // 把点数重置成2-14
    private resetNum() {
        var num: number;
        if(this.cardColor == 2) {
            num = this.num - 16;
        } else if(this.cardColor == 3) {
            num = this.num - 32;
        } else if(this.cardColor == 4) {
            num = this.num - 48;
        } else {
            num = this.num;
        }
        return num;
    }
    
    // 返回花色Bitmap
    private cardColorView() {
        var num: number = this.resetNum();
        var be: any;
        
        if(this.cardColor == 1) {
            be = createBitmapByName('public_poker_json.Diamond');
        } else if(this.cardColor == 2) {
            be = createBitmapByName('public_poker_json.Club');
        } else if(this.cardColor == 3) {
            be = createBitmapByName('public_poker_json.Heart');
        } else if(this.cardColor == 4) {
            be = createBitmapByName('public_poker_json.Spade');
        }
        
        return be;
    }
    
}

/**
 * 牌背面
 */
function PokerBg() {
    var poker = createBitmapByName('game_poker_png');
    poker.width = 60;
    poker.height = 80;
    return poker;
}
