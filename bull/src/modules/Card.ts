/**
 * 牌面
 */
//const CARDS = [
//    0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,   //--方块 2 - A
//    0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A,0x1B,0x1C,0x1D,0x1E,   //--梅花 2 - A
//    0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C,0x2D,0x2E,   //--红桃 2 - A
//    0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39,0x3A,0x3B,0x3C,0x3D,0x3E,   //--黑桃 2 - A
//];
// --鬼牌
//const GStars_Ghost_Cards = [
//    0x4F,   // --小鬼
//    0x5F,   // --大鬼
//];
class Card extends egret.Sprite {
	
    private card_width: number = 88;  // 牌的宽高
    private card_height: number = 118;
    private num: number;  // 牌的数字
    private card_color: number;  // 牌的花色 1 方块 2 梅花 3 红桃 4 黑桃 5 小鬼 6 大鬼
    private view_box: egret.Sprite = new egret.Sprite();
    
    public constructor(n: number) {
	    super();
	    this.num = n;
        this.card_color = this.renderCardColor();
        this.createView();
    }
    
    // 返回牌的花色
    private renderCardColor() {
        let color: number;
        if(this.num == 79) {
            color = 5;
        } else if(this.num == 95) {
            color = 6;
        } else if(this.num > 1 && this.num < 15) {
            color = 1;
        } else if(this.num > 17 && this.num < 31) {
            color = 2;
        } else if(this.num > 33 && this.num < 47) {
            color = 3;
        } else if(this.num > 49 && this.num < 63) {
            color = 4;
        }
        return color;
    }
    
    private createView() {
        this.addChild(this.view_box);
        this.view_box.width = this.card_width;
        this.view_box.height = this.card_height;
        
        let bg = createBitmapByName('card_json.card_bg_top');
        this.view_box.addChild(bg);
        bg.width = this.view_box.width;
        bg.height = this.view_box.height;
        
        if(this.card_color == 5 || this.card_color == 6) {
            this.createGhostCard();
        } else {
            this.createNormalCard();
        }

        this.view_box.scaleX = 80 / this.view_box.width;
        this.view_box.scaleY = 110 / this.view_box.height;
    }
    
    // 绘制大小鬼
    private createGhostCard() {
        let img_1: any;
        this.card_color == 5 ? img_1 = createBitmapByName('card_json.joker_small') : img_1 = createBitmapByName('card_json.joker_big');
        let img_2: any;
        this.card_color == 5 ? img_2 = createBitmapByName('card_json.joker_block') : img_2 = createBitmapByName('card_json.joker_red');

        this.view_box.addChild(img_1);
        img_1.width = 14;
        img_1.height = 72;
        img_1.x = 8;
        img_1.y = 7;

        this.view_box.addChild(img_2);
        img_2.width = 54;
        img_2.height = 71;
        img_2.x = 24;
        img_2.y = 28;
    }
    
    // 绘制2-A
    private createNormalCard() {
        let num: number = this.resetNum();

        let num_img: any;
        if(this.card_color == 1 || this.card_color == 3) {
            num_img = createBitmapByName('card_json.num_red_' + num);
        } else if(this.card_color == 2 || this.card_color == 4) {
            num_img = createBitmapByName('card_json.num_block_' + num);
        }

        this.view_box.addChild(num_img);
        num_img.width = 20;
        num_img.height = 30;
        num_img.x = 8;
        num_img.y = 10;

        let small_img: any = this.cardColorView();
        this.view_box.addChild(small_img);
        small_img.width = 20;
        small_img.height = 20;
        small_img.x = 8;
        small_img.y = 44;
        
        if(num > 10 && num < 14) {
            let big_img: any;
            let arr: any = ['j','q','k'];
            if(this.card_color == 1 || this.card_color == 3) {
                big_img = createBitmapByName('card_json.flower_red_' + arr[(num - 11)]);
            } else if(this.card_color == 2 || this.card_color == 4) {
                big_img = createBitmapByName('card_json.flower_block_' + arr[(num - 11)]);
            }
            this.view_box.addChild(big_img);
            big_img.width = 88;
            big_img.height = 118;
        } else {
            let big_img: any = this.cardColorView();
            this.view_box.addChild(big_img);
            big_img.width = 54;
            big_img.height = 54;
            big_img.x = 25;
            big_img.y = 54;
        }
    }
    
    // 把点数重置成2-14
    private resetNum() {
        let num: number;
        if(this.card_color == 2) {
            num = this.num - 16;
        } else if(this.card_color == 3) {
            num = this.num - 32;
        } else if(this.card_color == 4) {
            num = this.num - 48;
        } else {
            num = this.num;
        }
        return num;
    }
    
    // 返回花色Bitmap
    private cardColorView() {
        let num: number = this.resetNum();
        let bitmap: any;
        if(this.card_color == 1) {
            bitmap = createBitmapByName('card_json.flower_4');
        } else if(this.card_color == 2) {
            bitmap = createBitmapByName('card_json.flower_3');
        } else if(this.card_color == 3) {
            bitmap = createBitmapByName('card_json.flower_2');
        } else if(this.card_color == 4) {
            bitmap = createBitmapByName('card_json.flower_1');
        }
        return bitmap;
    }
    
}
