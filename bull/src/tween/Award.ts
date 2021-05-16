/**
 * 输赢情况和发放星币动画
 */
class Award {
    
    public constructor(award_info: any) {
        let hit: any = award_info.hit;
        let banker_hit: number = hit.player0.hit;  // 庄家输赢情况  0 通赔 1 通杀 2 默认
        
        if(banker_hit == 0) {
            // 庄家通赔动画
            this.bankerTween(0);
            for(let i: number = 0;i < 4;i++) {
                Table.bet_block_box[i].addChild(this.lampTween());
            }
            // 2s后庄家发钱给赢家
            setTimeout(() => {
                Currency.bankerToWin([0,1,2,3]);
            },2000);
        } else if(banker_hit == 1) {
            // 庄家通杀动画
            this.bankerTween(1);
            // 1s后庄家收输家钱动画
            setTimeout(() => {
                Currency.loserToBanker([0,1,2,3]);
            },1000);
        } else if(banker_hit == 2) {
            let loser_arr: any = [];  // 记录输牌的位置
            let win_arr: any = [];  // 记录赢牌的位置
            for(let i: number = 1;i < 5;i++) {
                let key: any = 'player' + i;
                if(hit[key].hit == 1) {
                    Table.bet_block_box[i - 1].addChild(this.lampTween());
                    win_arr.push(i - 1);
                } else {
                    loser_arr.push(i - 1);
                }
            }
            // 1s后庄家收输家钱动画
            setTimeout(() => {
                Currency.loserToBanker(loser_arr);
            },1000);
            // 2s后庄家发钱给赢家
            setTimeout(() => {
                Currency.bankerToWin(win_arr);
            },2000);
        }
	}
	
	/**
	 * 彩灯动画
	 */
    private lampTween() {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 278;
        box.height = 300;
        box.x = -9;
        box.y = -10;
        
        let img_1 = createBitmapByName('Spirit_json.win_tween_1');
        box.addChild(img_1);
        img_1.width = box.width;
        img_1.height = box.height;
        
        let img_2 = createBitmapByName('Spirit_json.win_tween_2');
        box.addChild(img_2);
        img_2.width = box.width;
        img_2.height = box.height;
        img_2.alpha = 0;
        
        let tw_img_1 = egret.Tween.get(img_1, {loop: true});
        tw_img_1.to({ 'alpha': 1 },150);
        tw_img_1.to({ 'alpha': 0 },150);
        
        let tw_img_2 = egret.Tween.get(img_2,{ loop: true });
        tw_img_2.to({ 'alpha': 0 },150);
        tw_img_2.to({ 'alpha': 1 },150);
        
        return box;
    }
    
    /**
     * 庄家通杀通赔动画 f 0：通赔 1：通杀
     */
    private bankerTween(f: number) {
        if(f == 0) {
            MusicControl.playWin();
            MusicControl.playApplause();
        } else {
            MusicControl.playOver();
        }

        let img: any = f == 0 ? 'banker_loser' : 'banker_win';
        let bitmap = createBitmapByName('Spirit_json.' + img);
        Game.view_box.addChild(bitmap);
        bitmap.width = 651;
        bitmap.height = 272;
        bitmap.x = (Game.view_box.width - 651 * .5) / 2;
        bitmap.y = 200 + 272 * .5;
        bitmap.alpha = 0;
        bitmap.scaleX = .5;
        bitmap.scaleY = .5;

        let tw_bitmap = egret.Tween.get(bitmap);
        tw_bitmap.to({
            'scaleX': 1,
            'scaleY': 1,
            'x': (Game.view_box.width - 651) / 2,
            'Y': 200,
            'alpha': 1
        }, 300, egret.Ease.bounceInOut).wait(2000).to({
            'scaleX': .5,
            'scaleY': .5,
            'x': (Game.view_box.width - 651 * .5) / 2,
            'Y': 200 + 272 * .5,
            'alpha': 0
        }, 300, egret.Ease.bounceInOut).call(() => {
            Game.view_box.removeChild(bitmap);
        }, this);
    }

    /**
     * 赢的钱派奖给自己一部分
     */ 
    public static winToMe(userAwardInfo: any) {
        let hit: any = userAwardInfo.hit;
        let win_arr: any = [];  // 记录赢牌的位置
        for(let k in hit) {
            let i: any = k.substr(6,1);
            if(hit[k] > 0) {
                win_arr.push(i - 1);
            }
        }
        Currency.winToMe(win_arr,userAwardInfo.hitPoint,userAwardInfo.userPoint);
    }
    
    /**
     * 桌面的钱发给其他玩家
     */
    public static winToOther(award_info: any) {
        let hit: any = award_info.hit;
        let win_arr: any = [];  // 记录赢牌的位置
        let banker_info: number = 0; // 庄家输赢情况
        
        for(let i: number = 1;i < 5;i++) {
            let key: any = 'player' + i;
            if(hit[key].hit == 1) {  // 庄家输
                win_arr.push(i - 1);
                banker_info += -(BetControl.total_bet_num_arr[i - 1] * hit[key].multi);
            } else {  // 庄家赢
                banker_info += BetControl.total_bet_num_arr[i - 1] * hit[key].multi;
            }
        }
        Currency.winToOther(win_arr);
        setTimeout(() => {
            Top.createBankerInfo(banker_info);
        },600);
    }
    
}
