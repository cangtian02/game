var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏逻辑中控
 */
var GameControl = (function () {
    function GameControl() {
        this.game_step = 0; // 轮询局数
        // 确定时间区间
        RobotControl.resetSection();
        // 确定人数变化基数
        RobotControl.resetRandomSum();
        if (Game.status == 1) {
            this.betFun();
        }
        else if (Game.status == 2) {
            Deal.createCard();
            this.calculationFun();
        }
        else {
            Deal.createCard();
            this.awardFun();
        }
    }
    GameControl.prototype.betFun = function () {
        var _this = this;
        this.game_step++;
        if (Game.first_go_home) {
            Game.first_go_home = false;
            Deal.createCard();
            if (Game.time > 0) {
                setTimeout(function () {
                    Table.showTip(0);
                    MusicControl.playStart_add_chip();
                }, 500);
            }
        }
        else {
            Deal.dealTween();
            setTimeout(function () {
                Table.showTip(0);
                MusicControl.playStart_add_chip();
            }, 2000);
        }
        Table.betInit(); // 提示玩家下注
        Top.createState('投注中');
        Top.createTime(Game.time);
        if (Game.time == 0) {
            Game.status = 2;
            Game.time = 5;
            this.calculationFun();
        }
        else {
            var timer_1 = setInterval(function () {
                Game.time--;
                Top.createTime(Game.time);
                if (Game.time == 0) {
                    clearInterval(timer_1);
                    Game.status = 2;
                    Game.time = 5;
                    Table.showTip(1);
                    MusicControl.playStop_add_chip();
                    _this.calculationFun();
                }
                // 倒计时3秒开启音乐提示
                if (Game.time < 4) {
                    MusicControl.playDownTime();
                }
            }, 1000);
        }
        if (this.game_step % 9 == 0) {
            var num = Math.floor(Math.random() * 10);
            num == Top.banker_headimg_sub ? num > 2 ? num = num - 1 : num = num + 1 : num = num;
            Top.banker_headimg_sub = num;
            Top.createBanker(num);
            // 每9局变化随机人数基数
            RobotControl.resetRandomSum();
        }
        // 清空机器人数据
        RobotControl.robot_bet_arr = [];
        RobotControl.robot_bet_step = 0;
        // 奖励展示
        if (this.game_step % 6 == 0) {
            if (window.yxjc_prizeshow.flag) {
                window.yxjc_prizeshow.start();
            }
        }
    };
    GameControl.prototype.calculationFun = function () {
        var _this = this;
        Game.first_go_home = false;
        Top.createState('等待开奖');
        Top.createTime(Game.time);
        if (Game.time == 0) {
            Game.status = 3;
            Game.time = 10;
            this.awardFun();
        }
        else {
            var timer_2 = setInterval(function () {
                Game.time--;
                Top.createTime(Game.time);
                if (Game.time == 0) {
                    clearInterval(timer_2);
                    Game.status = 3;
                    Game.time = 10;
                    _this.awardFun();
                }
            }, 1000);
        }
        // 把没有下注的位置隐藏点击下注提示
        Table.removeNoHitTitle();
    };
    GameControl.prototype.awardFun = function () {
        var _this = this;
        Game.first_go_home = false;
        Top.createState('开奖中');
        Top.createTime(0);
        var award_timer;
        var award_time = 3;
        var award_info = '';
        // 获取本期开奖信息
        httpAjaxPost('/bull/award', { qihao: Game.qihao }, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast(req.msg);
                Game.view_box.addChild(toast);
                clearInterval(award_timer);
                return;
            }
            award_info = req.data;
        });
        award_timer = setInterval(function () {
            award_time--;
            if (award_time <= 0) {
                if (award_info == '') {
                    var toast = new Toast('您的网络异常，请检查后重试');
                    Game.view_box.addChild(toast);
                }
                else {
                    _this.awardTweenFun(award_info);
                }
                clearInterval(award_timer);
            }
            else {
                if (award_info != '') {
                    _this.awardTweenFun(award_info);
                    clearInterval(award_timer);
                }
            }
        }, 1000);
    };
    GameControl.prototype.awardTweenFun = function (award_info) {
        var _this = this;
        // 自己中奖结果
        var userAwardInfo = '';
        httpAjaxPost('/bull/user-award', { qihao: Game.qihao }, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code == 0) {
                userAwardInfo = req.data;
            }
        });
        // 开牌
        MusicControl.playOpen_poker();
        // 开庄家前4张牌
        OpenCard.bankerCard(0, award_info);
        // 开闲家4手牌
        OpenCard.otherCard(award_info);
        // 3.5s后翻庄家最后一张牌
        setTimeout(function () {
            OpenCard.bankerCard(1, award_info);
        }, 3500);
        // 4S后展示输赢情况和发放星币动画
        setTimeout(function () {
            new Award(award_info);
        }, 4000);
        // 7S后派奖给自己和其他玩家
        setTimeout(function () {
            if (userAwardInfo == '') {
                var toast = new Toast('您的网络异常，请检查后重试');
                Game.view_box.addChild(toast);
            }
            else {
                if (userAwardInfo.tzPoint != undefined) {
                    if (userAwardInfo.hitPoint > 0) {
                        Award.winToMe(userAwardInfo);
                    }
                    else {
                        setTimeout(function () {
                            var point = 0;
                            for (var k in userAwardInfo.hit) {
                                point += userAwardInfo.hit[k];
                            }
                            Bot.myPointTween(point);
                            Game.user_info.point = userAwardInfo.userPoint;
                            Bot.createUserPoint();
                        }, 600);
                    }
                }
                Award.winToOther(award_info);
            }
        }, 7000);
        // 9S后进行下一轮
        setTimeout(function () {
            // 更新四手牌的输赢信息
            for (var i = 1; i < 5; i++) {
                var k = 'player' + i;
                Game.qihao_result[k].push(award_info.hit[k].hit);
                Game.qihao_result[k].shift();
            }
            _this.nextState();
        }, 9000);
    };
    GameControl.prototype.nextState = function () {
        var _this = this;
        var timer = setInterval(function () {
            httpAjaxGet('/bull/current', '', function (event) {
                var req_1 = event.currentTarget;
                var req = JSON.parse(req_1.response);
                if (req.code != 0) {
                    var toast = new Toast(req.msg);
                    Game.view_box.addChild(toast);
                    return;
                }
                // 到了下注状态就更新到下注状态
                if (req.data.status == 1) {
                    clearInterval(timer);
                    Game.status = req.data.status;
                    Game.time = req.data.time;
                    Game.qihao = req.data.qihao;
                    Table.resetTable();
                    Table.createQihaoResult();
                    _this.betFun();
                }
            });
        }, 1000);
    };
    return GameControl;
}());
__reflect(GameControl.prototype, "GameControl");
//# sourceMappingURL=GameControl.js.map