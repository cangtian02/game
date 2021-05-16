/**
 * 星币动画
 */
class Currency {
	
    public static me_coordinate: any;  // 自己的位置
    public static banker_coordinate: any;  // 庄家的位置
    public static other_coordinate: any;  // 其他玩家的位置
    public static bet_content: egret.Sprite;  // 下注星币处理盒子

    public constructor() {
        Currency.me_coordinate = { x: 40,y: Game.bot_view_box.y + 30 };
        Currency.banker_coordinate = { x: 60,y: 50 };
        Currency.other_coordinate = { x: Game.bot_view_box.width - 90,y: Game.bot_view_box.y + 30 };

        Currency.bet_content = new egret.Sprite();
        Game.view_box.addChild(Currency.bet_content);
        Currency.bet_content.width = Game.view_box.width;
        Currency.bet_content.height = Game.view_box.height;
    }
    
    public static currencyStyle() {
        let currency = createBitmapByName('Spirit_json.currency');
        currency.width = 52;
        currency.height = 52;
        return currency;
    }
    
    /**
     * 自己投注 i 下的第几手
     */ 
    public static myBet(i: number) {
        let bet_block_box = Table.bet_block_box[i].$children[2];
        let end_x: number = Table.bet_block_box_coordinate[i].x + bet_block_box.x;
        let end_y: number = Table.bet_block_box_coordinate[i].y + bet_block_box.y;
        let bet_block_currency_x: number = Math.round(Math.random() * (bet_block_box.width - 60));
        let bet_block_currency_y: number = Math.round(Math.random() * (bet_block_box.height - 60));
        end_x += bet_block_currency_x;
        end_y += bet_block_currency_y;
        
        let currency = Currency.currencyStyle();
        Currency.bet_content.addChild(currency);
        currency.x = Currency.me_coordinate.x;
        currency.y = Currency.me_coordinate.y;
        
        let tw_currency = egret.Tween.get(currency);
        tw_currency.to({
            'x': end_x,
            'y': end_y
        },300).call(() => {
            Currency.bet_content.removeChild(currency);

            let bet_currency = Currency.currencyStyle();
            bet_block_box.addChild(bet_currency);
            bet_currency.x = bet_block_currency_x;
            bet_currency.y = bet_block_currency_y;
        },this);
        MusicControl.playOne_add_chips();
    }
    
    /**
     * 其他玩家下注  arr：下注信息
     */ 
    public static otherBet(arr: any) {
        let hasBet: Boolean = false; // 此轮下注信息是否有合法下注
        arr.forEach(x => x > 0 ? hasBet = true : '');
        if(hasBet) {
            setTimeout(() => {
                MusicControl.playBet();
            }, 400);
        }

        for(let i: number = 0;i < 4;i++) {
            if (Number(arr[i]) == 0) continue;

            // 记录下注数据
            BetControl.other_bet_num_arr[i] = Number(arr[i]);
            BetControl.total_bet_num_arr[i] = Number(arr[i]);
            
            let j: number = 0;
            let timer: any = setInterval(() => {
                if (j == 11) clearInterval(timer);

                let bet_block_box = Table.bet_block_box[i].$children[2];
                let end_x: number = Table.bet_block_box_coordinate[i].x + bet_block_box.x;
                let end_y: number = Table.bet_block_box_coordinate[i].y + bet_block_box.y;
                let bet_block_currency_x: number = Math.round(Math.random() * (bet_block_box.width - 60));
                let bet_block_currency_y: number = Math.round(Math.random() * (bet_block_box.height - 60));
                end_x += bet_block_currency_x;
                end_y += bet_block_currency_y;
                
                let currency: any = Currency.currencyStyle();
                currency.x = Currency.other_coordinate.x;
                currency.y = Currency.other_coordinate.y;
                Currency.bet_content.addChild(currency);

                let tw_currency = egret.Tween.get(currency);
                tw_currency.to({
                    'x': end_x,
                    'y': end_y
                }, 600).call(() => {
                    Currency.bet_content.removeChild(currency);

                    let bet_currency = Currency.currencyStyle();
                    bet_block_box.addChild(bet_currency);
                    bet_currency.x = bet_block_currency_x;
                    bet_currency.y = bet_block_currency_y;
                    Table.createTotalBetNum(i);
                }, this);

                j++;
            }, 80);
        }
    }
    
    /**
     * 输家星币飞向庄家  arr：输家位置数组
     */ 
    public static loserToBanker(arr: any) {
        let hasCurrency: Boolean = false;  // 输的位置是否有星币

        for(let i: number = 0, len = arr.length;i < len;i++) {
            let box = Table.bet_block_box[arr[i]].$children[2];
            if (box.$children.length > 0) {
                hasCurrency = true;
                let len: number = box.$children.length > 12 ? 12 : box.$children.length;
                for(let j: number = 0;j < len;j++) {
                    let currency = Currency.currencyStyle();
                    Currency.bet_content.addChild(currency);
                    currency.x = Table.bet_block_box_coordinate[arr[i]].x + box.$children[j].x;
                    currency.y = Table.bet_block_box_coordinate[arr[i]].y + box.$children[j].y + 46;

                    let tw_currency = egret.Tween.get(currency);
                    tw_currency.wait(20 * j).to({
                        'x': Currency.banker_coordinate.x,
                        'y': Currency.banker_coordinate.y
                    }, 500).call(() => {
                        Currency.bet_content.removeChild(currency);
                    }, this);
                }
                commonRemoveChild(box);
            }
        }
        
        if (hasCurrency) MusicControl.playGetGold();  // 有星币播放音乐
    }
    
    /**
     * 庄家飞星币往赢家  arr：赢家位置数组
     */
    public static bankerToWin(arr: any) {
        let hasCurrency: Boolean = false;  // 赢家位置是否有人下注过

        for(let i: number = 0;i < arr.length;i++) {
            if (BetControl.total_bet_num_arr[arr[i]] == 0) continue;  // 如果此手没人下注就略过

            hasCurrency = true;

            let bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            let len: number = bet_block_box.$children.length%2 == 0 ? 12 : 13;

            for(let j: number = 0;j < len;j++) {
                let end_x: number = Table.bet_block_box_coordinate[arr[i]].x;
                let end_y: number = Table.bet_block_box_coordinate[arr[i]].y;
                let bet_block_currency_x: number = Math.round(Math.random() * (bet_block_box.width - 60));
                let bet_block_currency_y: number = Math.round(Math.random() * (bet_block_box.height - 60));
                end_x += bet_block_currency_x;
                end_y += bet_block_currency_y;
                
                let currency = Currency.currencyStyle();
                Currency.bet_content.addChild(currency);
                currency.x = Currency.banker_coordinate.x;
                currency.y = Currency.banker_coordinate.y;
                currency.alpha = 0;
                
                let tw_currency = egret.Tween.get(currency);
                tw_currency.wait(20 * j).to({
                    'alpha': 1,
                }).to({
                    'x': end_x,
                    'y': end_y
                },500).call(() => {
                    Currency.bet_content.removeChild(currency);

                    let bet_currency = Currency.currencyStyle();
                    bet_block_box.addChild(bet_currency);
                    bet_currency.x = bet_block_currency_x;
                    bet_currency.y = bet_block_currency_y;
                }, this);
            }
        }
        
        if (hasCurrency) MusicControl.playGetGold();  // 有星币播放音乐
    }
    
    /**
     * 自己赢钱 arr：赢钱位置  hitPoint：赢钱数量  userPoint：总的星币数量
     */ 
    public static winToMe(arr: any,hitPoint: number,userPoint: number) {
        let hasCurrency: Boolean = false;  // 赢家位置是否下注过

        for(let i: number = 0;i < arr.length;i++) {
            let bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            let start_x: number = Table.bet_block_box_coordinate[arr[i]].x;
            let start_y: number = Table.bet_block_box_coordinate[arr[i]].y;

            if(bet_block_box.$children.length > 0) {
                hasCurrency = true;

                let len : number = BetControl.other_bet_num_arr[arr[i]] == 0 ? bet_block_box.$children.length : bet_block_box.$children.length / 2;
                
                for(let j: number = 0;j < len;j++) {

                    bet_block_box.$children[j].alpha = 0;

                    if (j < 12) {
                        let currency = Currency.currencyStyle();
                        Currency.bet_content.addChild(currency);
                        currency.x = start_x + bet_block_box.$children[j].x;
                        currency.y = start_y + bet_block_box.$children[j].y + 46;
                        currency.alpha = 0;
                        
                        let tw_currency = egret.Tween.get(currency);
                        tw_currency.wait(60 * j).to({
                            'alpha': 1,
                        }).to({
                            'x': Currency.me_coordinate.x,
                            'y': Currency.me_coordinate.y
                        }, 500).call(() => {
                            Currency.bet_content.removeChild(currency);
                        }, this);
                    }
                }
            }
        }
        
        if (hasCurrency) MusicControl.playGetGold();

        setTimeout(() => {
            Game.user_info.point = userPoint;
            Bot.createUserPoint();
            Bot.myPointTween(hitPoint);
        }, 1200);
    }
    
    /**
     * 桌面的钱发给其他玩家 arr：赢牌位置
     */ 
    public static winToOther(arr: any) {
        let hasCurrency: Boolean = false;  // 赢家位置是否下注过

        for(let i: number = 0;i < arr.length;i++) {
            if(BetControl.other_bet_num_arr[arr[i]] == 0) continue;

            hasCurrency = true;
            
            let bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            let start_x: number = Table.bet_block_box_coordinate[arr[i]].x;
            let start_y: number = Table.bet_block_box_coordinate[arr[i]].y;

            for(let j: number = 0,len: number = bet_block_box.$children.length;j < len;j++) {

                bet_block_box.$children[j].alpha = 0;

                if (j < 12) {
                    let currency = Currency.currencyStyle();
                    Currency.bet_content.addChild(currency);
                    currency.x = start_x + bet_block_box.$children[j].x;
                    currency.y = start_y + bet_block_box.$children[j].y + 46;
                    currency.alpha = 0;

                    let tw_currency = egret.Tween.get(currency);
                    tw_currency.wait(60 * j).to({
                        'alpha': 1,
                    }).to({
                        'x': Currency.other_coordinate.x,
                        'y': Currency.other_coordinate.y
                    }, 500).call(() => {
                        Currency.bet_content.removeChild(currency);
                    }, this);
                }
            }
        }

        if (hasCurrency) MusicControl.playGetGold();
    }
    
}
