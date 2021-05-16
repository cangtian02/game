var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 星币动画
 */
var Currency = (function () {
    function Currency() {
        Currency.me_coordinate = { x: 40, y: Game.bot_view_box.y + 30 };
        Currency.banker_coordinate = { x: 60, y: 50 };
        Currency.other_coordinate = { x: Game.bot_view_box.width - 90, y: Game.bot_view_box.y + 30 };
        Currency.bet_content = new egret.Sprite();
        Game.view_box.addChild(Currency.bet_content);
        Currency.bet_content.width = Game.view_box.width;
        Currency.bet_content.height = Game.view_box.height;
    }
    Currency.currencyStyle = function () {
        var currency = createBitmapByName('Spirit_json.currency');
        currency.width = 52;
        currency.height = 52;
        return currency;
    };
    /**
     * 自己投注 i 下的第几手
     */
    Currency.myBet = function (i) {
        var bet_block_box = Table.bet_block_box[i].$children[2];
        var end_x = Table.bet_block_box_coordinate[i].x + bet_block_box.x;
        var end_y = Table.bet_block_box_coordinate[i].y + bet_block_box.y;
        var bet_block_currency_x = Math.round(Math.random() * (bet_block_box.width - 60));
        var bet_block_currency_y = Math.round(Math.random() * (bet_block_box.height - 60));
        end_x += bet_block_currency_x;
        end_y += bet_block_currency_y;
        var currency = Currency.currencyStyle();
        Currency.bet_content.addChild(currency);
        currency.x = Currency.me_coordinate.x;
        currency.y = Currency.me_coordinate.y;
        var tw_currency = egret.Tween.get(currency);
        tw_currency.to({
            'x': end_x,
            'y': end_y
        }, 300).call(function () {
            Currency.bet_content.removeChild(currency);
            var bet_currency = Currency.currencyStyle();
            bet_block_box.addChild(bet_currency);
            bet_currency.x = bet_block_currency_x;
            bet_currency.y = bet_block_currency_y;
        }, this);
        MusicControl.playOne_add_chips();
    };
    /**
     * 其他玩家下注  arr：下注信息
     */
    Currency.otherBet = function (arr) {
        var _this = this;
        var hasBet = false; // 此轮下注信息是否有合法下注
        arr.forEach(function (x) { return x > 0 ? hasBet = true : ''; });
        if (hasBet) {
            setTimeout(function () {
                MusicControl.playBet();
            }, 400);
        }
        var _loop_1 = function (i) {
            if (Number(arr[i]) == 0)
                return "continue";
            // 记录下注数据
            BetControl.other_bet_num_arr[i] = Number(arr[i]);
            BetControl.total_bet_num_arr[i] = Number(arr[i]);
            var j = 0;
            var timer = setInterval(function () {
                if (j == 11)
                    clearInterval(timer);
                var bet_block_box = Table.bet_block_box[i].$children[2];
                var end_x = Table.bet_block_box_coordinate[i].x + bet_block_box.x;
                var end_y = Table.bet_block_box_coordinate[i].y + bet_block_box.y;
                var bet_block_currency_x = Math.round(Math.random() * (bet_block_box.width - 60));
                var bet_block_currency_y = Math.round(Math.random() * (bet_block_box.height - 60));
                end_x += bet_block_currency_x;
                end_y += bet_block_currency_y;
                var currency = Currency.currencyStyle();
                currency.x = Currency.other_coordinate.x;
                currency.y = Currency.other_coordinate.y;
                Currency.bet_content.addChild(currency);
                var tw_currency = egret.Tween.get(currency);
                tw_currency.to({
                    'x': end_x,
                    'y': end_y
                }, 600).call(function () {
                    Currency.bet_content.removeChild(currency);
                    var bet_currency = Currency.currencyStyle();
                    bet_block_box.addChild(bet_currency);
                    bet_currency.x = bet_block_currency_x;
                    bet_currency.y = bet_block_currency_y;
                    Table.createTotalBetNum(i);
                }, _this);
                j++;
            }, 80);
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    /**
     * 输家星币飞向庄家  arr：输家位置数组
     */
    Currency.loserToBanker = function (arr) {
        var hasCurrency = false; // 输的位置是否有星币
        for (var i = 0, len = arr.length; i < len; i++) {
            var box = Table.bet_block_box[arr[i]].$children[2];
            if (box.$children.length > 0) {
                hasCurrency = true;
                var len_1 = box.$children.length > 12 ? 12 : box.$children.length;
                var _loop_2 = function (j) {
                    var currency = Currency.currencyStyle();
                    Currency.bet_content.addChild(currency);
                    currency.x = Table.bet_block_box_coordinate[arr[i]].x + box.$children[j].x;
                    currency.y = Table.bet_block_box_coordinate[arr[i]].y + box.$children[j].y + 46;
                    var tw_currency = egret.Tween.get(currency);
                    tw_currency.wait(20 * j).to({
                        'x': Currency.banker_coordinate.x,
                        'y': Currency.banker_coordinate.y
                    }, 500).call(function () {
                        Currency.bet_content.removeChild(currency);
                    }, this_1);
                };
                var this_1 = this;
                for (var j = 0; j < len_1; j++) {
                    _loop_2(j);
                }
                commonRemoveChild(box);
            }
        }
        if (hasCurrency)
            MusicControl.playGetGold(); // 有星币播放音乐
    };
    /**
     * 庄家飞星币往赢家  arr：赢家位置数组
     */
    Currency.bankerToWin = function (arr) {
        var hasCurrency = false; // 赢家位置是否有人下注过
        var _loop_3 = function (i) {
            if (BetControl.total_bet_num_arr[arr[i]] == 0)
                return "continue"; // 如果此手没人下注就略过
            hasCurrency = true;
            var bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            var len = bet_block_box.$children.length % 2 == 0 ? 12 : 13;
            var _loop_4 = function (j) {
                var end_x = Table.bet_block_box_coordinate[arr[i]].x;
                var end_y = Table.bet_block_box_coordinate[arr[i]].y;
                var bet_block_currency_x = Math.round(Math.random() * (bet_block_box.width - 60));
                var bet_block_currency_y = Math.round(Math.random() * (bet_block_box.height - 60));
                end_x += bet_block_currency_x;
                end_y += bet_block_currency_y;
                var currency = Currency.currencyStyle();
                Currency.bet_content.addChild(currency);
                currency.x = Currency.banker_coordinate.x;
                currency.y = Currency.banker_coordinate.y;
                currency.alpha = 0;
                var tw_currency = egret.Tween.get(currency);
                tw_currency.wait(20 * j).to({
                    'alpha': 1,
                }).to({
                    'x': end_x,
                    'y': end_y
                }, 500).call(function () {
                    Currency.bet_content.removeChild(currency);
                    var bet_currency = Currency.currencyStyle();
                    bet_block_box.addChild(bet_currency);
                    bet_currency.x = bet_block_currency_x;
                    bet_currency.y = bet_block_currency_y;
                }, this_2);
            };
            for (var j = 0; j < len; j++) {
                _loop_4(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < arr.length; i++) {
            _loop_3(i);
        }
        if (hasCurrency)
            MusicControl.playGetGold(); // 有星币播放音乐
    };
    /**
     * 自己赢钱 arr：赢钱位置  hitPoint：赢钱数量  userPoint：总的星币数量
     */
    Currency.winToMe = function (arr, hitPoint, userPoint) {
        var hasCurrency = false; // 赢家位置是否下注过
        for (var i = 0; i < arr.length; i++) {
            var bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            var start_x = Table.bet_block_box_coordinate[arr[i]].x;
            var start_y = Table.bet_block_box_coordinate[arr[i]].y;
            if (bet_block_box.$children.length > 0) {
                hasCurrency = true;
                var len = BetControl.other_bet_num_arr[arr[i]] == 0 ? bet_block_box.$children.length : bet_block_box.$children.length / 2;
                var _loop_5 = function (j) {
                    bet_block_box.$children[j].alpha = 0;
                    if (j < 12) {
                        var currency_1 = Currency.currencyStyle();
                        Currency.bet_content.addChild(currency_1);
                        currency_1.x = start_x + bet_block_box.$children[j].x;
                        currency_1.y = start_y + bet_block_box.$children[j].y + 46;
                        currency_1.alpha = 0;
                        var tw_currency = egret.Tween.get(currency_1);
                        tw_currency.wait(60 * j).to({
                            'alpha': 1,
                        }).to({
                            'x': Currency.me_coordinate.x,
                            'y': Currency.me_coordinate.y
                        }, 500).call(function () {
                            Currency.bet_content.removeChild(currency_1);
                        }, this_3);
                    }
                };
                var this_3 = this;
                for (var j = 0; j < len; j++) {
                    _loop_5(j);
                }
            }
        }
        if (hasCurrency)
            MusicControl.playGetGold();
        setTimeout(function () {
            Game.user_info.point = userPoint;
            Bot.createUserPoint();
            Bot.myPointTween(hitPoint);
        }, 1200);
    };
    /**
     * 桌面的钱发给其他玩家 arr：赢牌位置
     */
    Currency.winToOther = function (arr) {
        var hasCurrency = false; // 赢家位置是否下注过
        for (var i = 0; i < arr.length; i++) {
            if (BetControl.other_bet_num_arr[arr[i]] == 0)
                continue;
            hasCurrency = true;
            var bet_block_box = Table.bet_block_box[arr[i]].$children[2];
            var start_x = Table.bet_block_box_coordinate[arr[i]].x;
            var start_y = Table.bet_block_box_coordinate[arr[i]].y;
            var _loop_6 = function (j, len) {
                bet_block_box.$children[j].alpha = 0;
                if (j < 12) {
                    var currency_2 = Currency.currencyStyle();
                    Currency.bet_content.addChild(currency_2);
                    currency_2.x = start_x + bet_block_box.$children[j].x;
                    currency_2.y = start_y + bet_block_box.$children[j].y + 46;
                    currency_2.alpha = 0;
                    var tw_currency = egret.Tween.get(currency_2);
                    tw_currency.wait(60 * j).to({
                        'alpha': 1,
                    }).to({
                        'x': Currency.other_coordinate.x,
                        'y': Currency.other_coordinate.y
                    }, 500).call(function () {
                        Currency.bet_content.removeChild(currency_2);
                    }, this_4);
                }
            };
            var this_4 = this;
            for (var j = 0, len = bet_block_box.$children.length; j < len; j++) {
                _loop_6(j, len);
            }
        }
        if (hasCurrency)
            MusicControl.playGetGold();
    };
    return Currency;
}());
__reflect(Currency.prototype, "Currency");
//# sourceMappingURL=Currency.js.map