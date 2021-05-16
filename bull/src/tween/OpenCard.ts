/**
 * 开奖翻牌
 */
class OpenCard {
	
    /**
     * 翻开庄家的牌  f 0：开前4张  1：开最后一张
     */ 
    public static bankerCard(f: number,award_info: any) {
        commonRemoveChild(Top.card_box);
        let cards: any = award_info.point[0];
        
        if(f == 0) {
            for(let i: number = 0;i < 5;i++) {
                let card: any;
                if(i < 4) {
                    let c: any = parseInt(cards[i],16);
                    card = new Card(c.toString(10));
                } else {
                    card = createBitmapByName('card_json.card_bg_bot');
                }
                Top.card_box.addChildAt(card,(i + 1));
                card.x = i * 45 + 7;
                card.y = 7;
                card.width = 80;
                card.height = 110;
            }
        }
        
        if(f == 1) {
            let hit: any = award_info.hit.player0;
            
            for(let j: number = 0;j < 5;j++) {
                let c: any = parseInt(cards[j],16);
                let card = new Card(c.toString(10));
                Top.card_box.addChildAt(card,(j + 1));
                card.x = j * 45 + 7;
                card.y = 7;
            }

            let bg = OpenCard.cardTypeBgStyle();
            Top.card_box.addChildAt(bg,6);

            let content = OpenCard.cardTypeStyle(hit);
            let c_x: number = (Top.card_box.width - content.width) / 2;
            let c_y: number = (70 - content.height) / 2 + 54;
            let c_w: number = content.width;
            let c_h: number = content.height;
            Top.card_box.addChildAt(content,7);
            content.x = c_x - (c_w * .3) / 2;
            content.y = c_y - (c_h * .3) / 2;
            content.scaleX = 1.4;
            content.scaleY = 1.4;

            OpenCard.twContentTween(content,c_x,c_y,c_w,c_h);
        }
    }
    
    /**
     * 翻开闲家四手牌
     */ 
    public static otherCard(award_info: any) {
        let point: any = award_info.point;
        let step: number = 0;
        let timer: any = setInterval(() => {
            step++;
            if(step == 4) clearInterval(timer);
            
            let box = Table.card_box[step - 1];
            commonRemoveChild(box);
            
            for(let j: number = 0;j < 5;j++) {
                let c: any = parseInt(point[step][j],16);
                let card = new Card(c.toString(10));
                box.addChildAt(card,(j + 1));
                card.x = j * 45 + 7;
                card.y = 7;
            }
            
            let hit: any = award_info.hit;
            let key: any = 'player' + step;
            hit = hit[key];
            let to_hit: any = {};

            if(hit.hit == 0) {
                let m: number = 0;
                if(hit.type == 1) {
                    m = 1;
                } else if(hit.type > 1 && hit.type < 11) {
                    m = hit.type - 1;
                } else {
                    m = 10;
                }
                to_hit.multi = m;
            } else {
                to_hit.multi = hit.multi;
            }
            to_hit.type = hit.type;
            to_hit.hit = hit.hit;

            let bg = OpenCard.cardTypeBgStyle();
            box.addChildAt(bg,6);

            let content = OpenCard.cardTypeStyle(to_hit);
            let c_x: number = (box.width - content.width) / 2;
            let c_y: number = (70 - content.height) / 2 + 54;
            let c_w: number = content.width;
            let c_h: number = content.height;
            box.addChildAt(content,7);
            content.x = c_x - (c_w * .3) / 2;
            content.y = c_y - (c_h * .3) / 2;
            content.scaleX = 1.4;
            content.scaleY = 1.4;
            
            OpenCard.twContentTween(content,c_x,c_y,c_w,c_h);
        }, 600);
    }
    
    public static cardTypeBgStyle() {
        let bg = createBitmapByName('Spirit_json.card_type_bg');
        bg.width = 290;
        bg.height = 70;
        bg.x = -7;
        bg.y = 54;
        return bg;
    }
    
    public static twContentTween(content: any,c_x: number,c_y: number,c_w: number,c_h: number) {
        let tw_content = egret.Tween.get(content);
        tw_content.to({ 'scaleX': 1.2,'scaleY': 1.2,'x': c_x - (c_w * .2) / 2,'y': c_y - (c_h * .2) / 2 },40);
        tw_content.to({ 'scaleX': .9,'scaleY': .9,'x': c_x + c_w * .1 / 2,'y': c_y + c_y * .1 / 2 },40);
        tw_content.to({ 'scaleX': .8,'scaleY': .8,'x': c_x + c_w * .2 / 2,'y': c_y + c_y * .2 / 2 },40);
        tw_content.to({ 'scaleX': 1.1,'scaleY': 1.1,'x': c_x - (c_w * .1) / 2,'y': c_y - (c_h * .1) / 2 },40);
        tw_content.to({ 'scaleX': 1,'scaleY': 1,'x': c_x,'y': c_y },40);
    }
    
    /**
     * 牌型
     */ 
    public static cardTypeStyle(hit: any) {
        let bitmap_arr: any = ['meiniu','niu1','niu2','niu3','niu4','niu5','niu6','niu7','niu8','niu9','niuniu','wuhuaniu','zhadanniu','wuxiaoniu','wuhuazhadanniu'];
        let style_arr: any = [
            { 'w': 104,'h': 59 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 106,'h': 62 },
            { 'w': 134,'h': 62 },
            { 'w': 132,'h': 52 },
            { 'w': 134,'h': 52 },
            { 'w': 221,'h': 52 }
        ];
        
        let hit_type: number = hit.type;
        let hit_hit: number = hit.hit;
        let hit_multi: number = hit.multi;
        
        MusicControl.playCardType(hit_type);

        let box: egret.Sprite = new egret.Sprite();
        
        let type_img = createBitmapByName('card_type_json.' + bitmap_arr[hit_type - 1]);
        box.addChild(type_img);
        type_img.width = style_arr[hit_type - 1].w;
        type_img.height = style_arr[hit_type - 1].h;
        
        let multi_icon = createBitmapByName('card_type_json.x');
        box.addChild(multi_icon);
        multi_icon.width = 30;
        multi_icon.height = 33;
        multi_icon.x = style_arr[hit_type - 1].w + 5;
        multi_icon.y = style_arr[hit_type - 1].h - 40;
        
        let multi_img: any;
        if(hit_multi < 10) {
            multi_img = createBitmapByName('card_type_json.' + hit_multi);
        } else {
            multi_img = createBitmapByName('card_type_json.1');
            let multi_img_2 = createBitmapByName('card_type_json.0');
            box.addChild(multi_img_2);
            multi_img_2.width = 29;
            multi_img_2.height = 42;
            multi_img_2.x = style_arr[hit_type - 1].w + 66;
            multi_img_2.y = style_arr[hit_type - 1].h - 47;
        }
        box.addChild(multi_img);
        multi_img.width = 22;
        multi_img.height = 40;
        multi_img.x = style_arr[hit_type - 1].w + 40;
        multi_img.y = style_arr[hit_type - 1].h - 47;
        
        return box;
    }
    
}
