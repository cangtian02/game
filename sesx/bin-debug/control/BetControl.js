var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 下注
 */
var BetControl = (function () {
    // 下注 i:下注位置 n 0金玉 1福禄寿 2生肖 3小富贵 4大富贵
    function BetControl(i, n) {
        var _this = this;
        // 算奖派奖期间不能投注
        if (Game.status != 1)
            return;
        // 正在下注期间不能投注
        if (BetControl.flag)
            return;
        // 更改下注状态
        BetControl.flag = true;
        if (Game.userinfo.point < Game.betItem) {
            var toast = new Toast("您的星币不足");
            Game.viewBox.addChild(toast);
            // 更改下注状态
            BetControl.flag = false;
        }
        else if (BetControl.curBetNum >= BetControl.maxBetNum) {
            var toast = new Toast("已达下注上限");
            Game.viewBox.addChild(toast);
            // 更改下注状态
            BetControl.flag = false;
        }
        else {
            var key = ['jinyu', 'wufu', 'zodiac', 'small', 'big'];
            var parms = '{"qihao": "' + Game.qihao + '","bet":{';
            var betKey = void 0;
            var small = void 0;
            var big = void 0;
            if (n == 3) {
                if (Game.small_type == 0) {
                    small = Game.pointList[0][Game.small[0]] + '_' + Game.pointList[1][Game.small[1]];
                }
                else if (Game.small_type == 1) {
                    small = Game.pointList[0][Game.small[0]] + '_' + Game.pointList[2][Game.small[1]];
                }
                else {
                    small = Game.pointList[1][Game.small[0]] + '_' + Game.pointList[2][Game.small[1]];
                }
            }
            if (n == 4) {
                big = Game.pointList[0][Game.big[0]] + '_' + Game.pointList[1][Game.big[1]] + '_' + Game.pointList[2][Game.big[2]];
            }
            n == 3 ? betKey = small : n == 4 ? betKey = big : betKey = Game.pointList[n][i];
            parms = parms + '"' + key[n] + '":{"' + betKey + '":' + Game.betItem + '}}}';
            httpAjaxPost('/zodiac/bet', JSON.parse(parms), function (event) {
                var req_1 = event.currentTarget;
                var req = JSON.parse(req_1.response);
                if (req.code == '-1') {
                    var toast = new Toast("已过投注截止时间");
                    Game.viewBox.addChild(toast);
                    BetControl.flag = false;
                    return;
                }
                if (req.code != 0) {
                    var toast = new Toast("下注异常，请稍后重试");
                    Game.viewBox.addChild(toast);
                    BetControl.flag = false;
                    return;
                }
                _this.bet(i, n);
            });
        }
    }
    BetControl.prototype.bet = function (i, n) {
        var j;
        if (n == 0) {
            j = i + 17;
        }
        else if (n == 1) {
            j = i + 12;
        }
        else if (n == 2) {
            j = i;
        }
        else if (n == 3) {
            j = 19;
        }
        else if (n == 4) {
            j = 20;
        }
        // 已经插入过的排除
        var a = 0;
        for (var k = 0; k < BetControl.betPos.length; k++) {
            if (BetControl.betPos[k] == j) {
                a++;
            }
        }
        if (a == 0) {
            BetControl.betPos.push(j);
        }
        // 保存相应的下注数量
        BetControl.betNum[j] = Number(BetControl.betNum[j]) + Number(Game.betItem);
        BetControl.curBetNum = Number(BetControl.curBetNum) + Number(Game.betItem);
        TableBetInfo.createMeBetNum();
        TableBetInfo.betTween(2, j);
        // 更新自己的星币
        Game.userinfo.point = Number(Game.userinfo.point) - Number(Game.betItem);
        Bot.createCur(String(Game.userinfo.point));
        // 更改下注状态
        BetControl.flag = false;
    };
    // 记录自己已下注过的位置
    BetControl.betPos = [];
    // 记录自己已下注的数量
    BetControl.betNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // 记录所有下注的数量
    BetControl.otherBetNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // 记录自己下注的总量
    BetControl.curBetNum = 0;
    // 最大下注量
    BetControl.maxBetNum = 2000000;
    // 是否正在下注
    BetControl.flag = false;
    return BetControl;
}());
__reflect(BetControl.prototype, "BetControl");
//# sourceMappingURL=BetControl.js.map