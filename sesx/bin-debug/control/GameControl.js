var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏控制中心
 */
var GameControl = (function () {
    function GameControl() {
        this.game_step = 0; // 轮询局数
        if (Game.status == 1) {
            this.bet_fun();
        }
        else if (Game.status == 2) {
            this.calculation_fun();
        }
        else {
            Top.jishi_status('等待报喜');
            Top.jishi_time('0S');
            this.award_fun();
        }
    }
    // 下注事件
    GameControl.prototype.bet_fun = function () {
        var _this = this;
        this.game_step++;
        Top.jishi_status('吉时还有');
        Top.jishi_time(Game.time + 'S');
        var timer = new egret.Timer(1000, Game.time);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            Game.time--;
            if (Game.time > 0) {
                Top.jishi_status('吉时还有');
                Top.jishi_time(Game.time + 'S');
            }
            // 倒计时3秒开启音乐提示
            if (Game.time < 4) {
                MusicControl.playDownTime();
            }
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            Game.status = 2;
            Game.time = 5;
            _this.calculation_fun();
        }, this);
        timer.start();
        // 奖励展示
        if (this.game_step % 6 == 0) {
            if (window.yxjc_prizeshow.flag) {
                window.yxjc_prizeshow.start();
            }
        }
    };
    // 算奖事件
    GameControl.prototype.calculation_fun = function () {
        var _this = this;
        var dialog = new Dialog("吉时已到");
        Game.viewBox.addChild(dialog);
        Top.jishi_status('等待报喜');
        Top.jishi_time(Game.time + 'S');
        var timer = new egret.Timer(1000, Game.time);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            Game.time--;
            if (Game.time > 0) {
                Top.jishi_status('等待报喜');
                Top.jishi_time(Game.time + 'S');
            }
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            Game.status = 3;
            Game.time = 30;
            _this.award_fun();
        }, this);
        timer.start();
    };
    /**
     * 派奖事件
     * 派奖动画时间为20s，2s的时间拉取结果，2s都没拉取到结果，就提示网络异常，不做任何处理
     */
    GameControl.prototype.award_fun = function () {
        var _this = this;
        var timer = new egret.Timer(1000, 2);
        var info = '';
        var flag = true;
        // 获取本期开奖信息
        httpAjaxPost('/zodiac/award', { qihao: Game.qihao }, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            timer.reset();
            if (req.code == '-1') {
                var toast = new Toast(Game.qihao + '期还未开奖');
                Game.viewBox.addChild(toast);
            }
            else if (req.code != 0) {
                var toast = new Toast('获取开奖异常，请刷新页面重试');
                Game.viewBox.addChild(toast);
            }
            else {
                if (flag) {
                    info = req.data;
                    _this.award_tween_fun(info);
                }
            }
        });
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            if (info == '') {
                flag = false;
                var toast = new Toast('您的网络异常，请检查后重试');
                Game.viewBox.addChild(toast);
            }
        }, this);
        timer.start();
    };
    GameControl.prototype.award_tween_fun = function (info) {
        var _this = this;
        // 自己中奖结果
        var userAwardInfo = '';
        httpAjaxPost('/zodiac/user-award', { qihao: Game.qihao }, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code == 0) {
                userAwardInfo = req.data;
            }
        });
        // 保存相应信息
        Award.point = info.point;
        Award.point_number[0] = Game.pointList[1].indexOf(Award.point[1]);
        Award.point_number[1] = Game.pointList[0].indexOf(Award.point[0]);
        Award.point_number[2] = Game.pointList[2].indexOf(Award.point[2]);
        // 最新期信息插入到10期报喜第一条，然后删除最后一条
        Popup.qihaoData.splice(0, 0, info);
        Popup.qihaoData.splice(10, 1);
        // 显示开奖场景
        this.awardBox = new Award();
        Game.viewBox.addChild(this.awardBox);
        // 剩余时间大于10秒就播放全部动画，反之只播放对联动画
        var time;
        if (Game.time > 10) {
            time = 17000;
            this.awardBox.addChild(new Lantern());
            Lantern.LanternTween();
            setTimeout(function () {
                _this.awardBox.addChild(new Couplet());
                Couplet.createView();
                setTimeout(function () {
                    Couplet.tween();
                }, 100);
            }, 13900);
        }
        else {
            time = 3000;
            this.awardBox.addChild(new Couplet());
            Couplet.createView();
            setTimeout(function () {
                Couplet.tween();
            }, 100);
        }
        setTimeout(function () {
            // 中奖闪烁背景
            TableBetInfo.createJinyu_bg(Game.pointList[0].indexOf(info.point[0]));
            TableBetInfo.createWufu_bg(Game.pointList[1].indexOf(info.point[1]));
            TableBetInfo.createZodiac_bg(Game.pointList[2].indexOf(info.point[2]));
        }, time - 1000);
        setTimeout(function () {
            // 去除灯笼对联场景
            Game.viewBox.removeChild(_this.awardBox);
            // 发钱
            _this.userAward_fun(userAwardInfo);
        }, time);
    };
    // 发钱
    GameControl.prototype.userAward_fun = function (userAwardInfo) {
        var _this = this;
        if (userAwardInfo == '') {
            var toast = new Toast('您的网络异常，请检查后重试');
            Game.viewBox.addChild(toast);
            return;
        }
        // 发自己的
        var hit = userAwardInfo.hit;
        for (var key in hit) {
            if (key == 'jinyu' || key == 'wufu' || key == 'zodiac') {
                for (var n in hit[key]) {
                    TableBetInfo.awardTween(Game.pointCVList.indexOf(n), 2);
                }
            }
        }
        if (userAwardInfo.hitPoint != undefined && userAwardInfo.hitPoint > 0) {
            User.userPoint(userAwardInfo.hitPoint, 2);
            MusicControl.playGetGold();
        }
        var hasHit = false; // 同桌的人是否有钱发
        // 发同桌的，不计算大小富贵，只是为了展示效果，发的钱不真实
        for (var i = 0, len = User.userList.length; i < len; i++) {
            if (i == 2 || User.userList[i] == '')
                continue;
            if (User.userList[i].bets != undefined) {
                var bet = User.userList[i].bets.bet;
                var hitPoint = 0;
                for (var k1 in bet) {
                    var sub = void 0;
                    k1 == 'jinyu' ? sub = 0 : k1 == 'wufu' ? sub = 1 : sub = 2;
                    var multiple = void 0;
                    k1 == 'jinyu' ? multiple = Game.multiple.jinyu : k1 == 'wufu' ? multiple = Game.multiple.wufu : multiple = Game.multiple.zodiac;
                    var bet_1_1 = bet[k1];
                    for (var k2 in bet_1_1) {
                        if (k2 == Award.point[sub]) {
                            hitPoint = hitPoint + bet_1_1[k2] * multiple;
                            TableBetInfo.awardTween(Game.pointCVList.indexOf(k2), i);
                        }
                    }
                }
                if (hitPoint != undefined && hitPoint > 0) {
                    User.userPoint(hitPoint, i);
                    hasHit = true;
                }
            }
        }
        if (hasHit)
            MusicControl.playGetGold();
        // 发钱动画时长2S
        setTimeout(function () {
            _this.nextCurrent(userAwardInfo.userPoint);
        }, 2000);
    };
    /**
     * 进入下一轮  userPoint自己的金币信息
     */
    GameControl.prototype.nextCurrent = function (userPoint) {
        var _this = this;
        // 刷新自己的星币
        Game.userinfo.point = userPoint;
        Bot.createCur(Game.userinfo.point);
        // 清桌
        commonRemoveChild(TableBetInfo.meBetBox);
        commonRemoveChild(TableBetInfo.otherBetBox);
        // 清空保存的值
        BetControl.curBetNum = 0;
        BetControl.betPos.length = 0;
        BetControl.betNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        BetControl.otherBetNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // 更新最新期报喜信息
        var point_number = [-1, -1, -1];
        point_number[0] = Game.pointList[1].indexOf(Popup.qihaoData[0].point[1]);
        point_number[1] = Game.pointList[0].indexOf(Popup.qihaoData[0].point[0]);
        point_number[2] = Game.pointList[2].indexOf(Popup.qihaoData[0].point[2]);
        Top.baoxi_text(Game.pointCNList[0][point_number[1]] + ' • ' + Game.pointCNList[1][point_number[0]] + ' • ' + Game.pointCNList[2][point_number[2]]);
        var dialog = new Dialog("辞旧迎新");
        Game.viewBox.addChild(dialog);
        var timer = new egret.Timer(1000, 30);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            httpAjaxGet('/zodiac/current', '', function (event) {
                var req_1 = event.currentTarget;
                var req = JSON.parse(req_1.response);
                if (req.code != 0) {
                    timer.reset();
                    var toast = new Toast('获取状态异常，请刷新页面重试');
                    Game.viewBox.addChild(toast);
                    return;
                }
                // 到了下注状态就更新到下注状态
                if (req.data.status == 1) {
                    timer.reset();
                    Game.status = req.data.status;
                    Game.time = req.data.time;
                    Game.qihao = req.data.qihao;
                    _this.bet_fun();
                    // 当前报喜如果已展开，就更新最新的一期
                    if (Popup.viewBox != undefined) {
                        PopupQihao.updateItem();
                        PopupMiss.updateItem();
                    }
                }
            });
        }, this);
        // 30S都到了还没拉取到状态
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            var toast = new Toast('网络异常，请刷新页面重试');
            Game.viewBox.addChild(toast);
        }, this);
        timer.start();
    };
    return GameControl;
}());
__reflect(GameControl.prototype, "GameControl");
//# sourceMappingURL=GameControl.js.map