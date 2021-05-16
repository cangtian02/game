/**
 * 发牌动画
 */
class Deal {
	
    public static view_box: egret.Sprite = new egret.Sprite();  // 场景盒子
    public static original_coordinate: any = { x: 376.5,y: 200 };  // 发牌原始位置
    public static target_coordinate: any;  // 发牌目标位置
    
    public constructor() {
        // 全面屏
        if(window.innerHeight / window.innerWidth > 1.8) {
            Deal.target_coordinate =  [
                { x: 283,y: 14 },  // 荷官
                { x: 91,y: 580 },  // 第一手
                { x: 481,y: 580 },  // 第二手
                { x: 91,y: 1090 },  // 第三手
                { x: 481,y: 1090 }  // 第四手
            ];
        } else {
            Deal.target_coordinate =  [
                { x: 283,y: 14 },  // 荷官
                { x: 91,y: 510 },  // 第一手
                { x: 481,y: 510 },  // 第二手
                { x: 91,y: 970 },  // 第三手
                { x: 481,y: 970 }  // 第四手
            ];
        }

        Game.top_view_box.addChild(Deal.view_box);
        Deal.view_box.width = Game.top_view_box.width;
        Deal.view_box.height = Game.top_view_box.height;
    }
    
    public static dealTween() {
	    for(let i: number = 0;i < 25;i++) {
            let card = Deal.originalCardStyle(i);
            Deal.view_box.addChild(card);
	    }
	    
        let card_num: number = 25;
        let user_num: number = -1;
        let step: number = 0;
        
        let timer = setInterval(() => {
            card_num--;
            user_num++;
            if(user_num == 5) {
                user_num = 0;
                step++;
            }
            if(card_num == 0) {
                clearInterval(timer);
                setTimeout(() => {
                    commonRemoveChild(Deal.view_box);
                }, 2000);
            }
            Deal.dealTweenStyle(card_num,user_num,step);
            if(card_num > 12) {
                setTimeout(() => {
                    MusicControl.playDeal();
                }, (25 - card_num) * 50);
            }
        }, 40);

    }

    public static originalCardStyle(i: number) {
        let card = createBitmapByName('card_json.card_bg_bot');
        card.width = 55;
        card.height = 75;
        card.x = Deal.original_coordinate.x;
        card.y = Deal.original_coordinate.y + (25 - i) * 0.8;
        return card;
    }
    
    public static dealTweenStyle(card_num: number,user_num: number,step: number) {
        if (Deal.view_box.$children[card_num] == undefined) return;

        let tw_card = egret.Tween.get(Deal.view_box.$children[card_num]);
        tw_card.to({ 
            'x': Deal.target_coordinate[user_num].x + step * 45 + 7,
            'y': Deal.target_coordinate[user_num].y + 7,
            'width': 80,
            'height': 110
        }, 240).to({'alpha': 0}).call(() => {
            let card = createBitmapByName('card_json.card_bg_bot');
            card.width = 80;
            card.height = 110;
            card.x = step * 45 + 7;
            card.y = 7;
            if(user_num != 0) {
                Table.card_box[user_num - 1].addChildAt(card,(step + 1));
            } else {
                Top.card_box.addChildAt(card,(step + 1));
            }
        }, this);
    }
    
    /**
     * 没发牌动画，直接渲染牌
     */
    public static createCard() {
        for(let i: number = 0;i < 5;i++) {
            let card = Deal.cardStyle();
            card.x = i * 45 + 7;
            card.y = 7;
            Top.card_box.addChildAt(card, (i + 1));
        }
        for(let j: number = 0;j < 4;j++) {
            for(let i: number = 0;i < 5;i++) {
                let card = Deal.cardStyle();
                card.x = i * 45 + 7;
                card.y = 7;
                Table.card_box[j].addChildAt(card, (i + 1));
            }
        }
    }

    public static cardStyle() {
        let card = createBitmapByName('card_json.card_bg_bot');
        card.width = 80;
        card.height = 110;
        return card;
    }

}
