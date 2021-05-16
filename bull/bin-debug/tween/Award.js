var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 输赢情况和发放星币动画
 */
var Award = (function () {
    function Award(award_info) {
        var hit = award_info.hit;
        var banker_hit = hit.player0.hit; // 庄家输赢情况  0 通赔 1 通杀 2 默认
        if (banker_hit == 0) {
            // 庄家通赔动画
            this.bankerTween(0);
            for (var i = 0; i < 4; i++) {
                Table.bet_block_box[i].addChild(this.lampTween());
            }
            // 2s后庄家发钱给赢家
            setTimeout(function () {
                Currency.bankerToWin([0, 1, 2, 3]);
            }, 2000);
        }
        else if (banker_hit == 1) {
            // 庄家通杀动画
            this.bankerTween(1);
            // 1s后庄家收输家钱动画
            setTimeout(function () {
                Currency.loserToBanker([0, 1, 2, 3]);
            }, 1000);
        }
        else if (banker_hit == 2) {
            var loser_arr_1 = []; // 记录输牌的位置
            var win_arr_1 = []; // 记录赢牌的位置
            for (var i = 1; i < 5; i++) {
                var key = 'player' + i;
                if (hit[key].hit == 1) {
                    Table.bet_block_box[i - 1].addChild(this.lampTween());
                    win_arr_1.push(i - 1);
                }
                else {
                    loser_arr_1.push(i - 1);
                }
            }
            // 1s后庄家收输家钱动画
            setTimeout(function () {
                Currency.loserToBanker(loser_arr_1);
            }, 1000);
            // 2s后庄家发钱给赢家
            setTimeout(function () {
                Currency.bankerToWin(win_arr_1);
            }, 2000);
        }
    }
    /**
     * 彩灯动画
     */
    Award.prototype.lampTween = function () {
        var box = new egret.Sprite();
        box.width = 278;
        box.height = 300;
        box.x = -9;
        box.y = -10;
        var img_1 = createBitmapByName('Spirit_json.win_tween_1');
        box.addChild(img_1);
        img_1.width = box.width;
        img_1.height = box.height;
        var img_2 = createBitmapByName('Spirit_json.win_tween_2');
        box.addChild(img_2);
        img_2.width = box.width;
        img_2.height = box.height;
        img_2.alpha = 0;
        var tw_img_1 = egret.Tween.get(img_1, { loop: true });
        tw_img_1.to({ 'alpha': 1 }, 150);
        tw_img_1.to({ 'alpha': 0 }, 150);
        var tw_img_2 = egret.Tween.get(img_2, { loop: true });
        tw_img_2.to({ 'alpha': 0 }, 150);
        tw_img_2.to({ 'alpha': 1 }, 150);
        return box;
    };
    /**
     * 庄家通杀通赔动画 f 0：通赔 1：通杀
     */
    Award.prototype.bankerTween = function (f) {
        if (f == 0) {
            MusicControl.playWin();
            MusicControl.playApplause();
        }
        else {
            MusicControl.playOver();
        }
        var img = f == 0 ? 'banker_loser' : 'banker_win';
        var bitmap = createBitmapByName('Spirit_json.' + img);
        Game.view_box.addChild(bitmap);
        bitmap.width = 651;
        bitmap.height = 272;
        bitmap.x = (Game.view_box.width - 651 * .5) / 2;
        bitmap.y = 200 + 272 * .5;
        bitmap.alpha = 0;
        bitmap.scaleX = .5;
        bitmap.scaleY = .5;
        var tw_bitmap = egret.Tween.get(bitmap);
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
        }, 300, egret.Ease.bounceInOut).call(function () {
            Game.view_box.removeChild(bitmap);
        }, this);
    };
    /**
     * 赢的钱派奖给自己一部分
     */
    Award.winToMe = function (userAwardInfo) {
        var hit = userAwardInfo.hit;
        var win_arr = []; // 记录赢牌的位置
        for (var k in hit) {
            var i = k.substr(6, 1);
            if (hit[k] > 0) {
                win_arr.push(i - 1);
            }
        }
        Currency.winToMe(win_arr, userAwardInfo.hitPoint, userAwardInfo.userPoint);
    };
    /**
     * 桌面的钱发给其他玩家
     */
    Award.winToOther = function (award_info) {
        var hit = award_info.hit;
        var win_arr = []; // 记录赢牌的位置
        var banker_info = 0; // 庄家输赢情况
        for (var i = 1; i < 5; i++) {
            var key = 'player' + i;
            if (hit[key].hit == 1) {
                win_arr.push(i - 1);
                banker_info += -(BetControl.total_bet_num_arr[i - 1] * hit[key].multi);
            }
            else {
                banker_info += BetControl.total_bet_num_arr[i - 1] * hit[key].multi;
            }
        }
        Currency.winToOther(win_arr);
        setTimeout(function () {
            Top.createBankerInfo(banker_info);
        }, 600);
    };
    return Award;
}());
__reflect(Award.prototype, "Award");
//# sourceMappingURL=Award.js.map