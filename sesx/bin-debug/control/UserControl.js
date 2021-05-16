var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * websocket同桌玩家
 */
var UserControl = (function () {
    function UserControl() {
        if (!Main.DEFAULT_CONFIG.debug) {
            this.init();
        }
    }
    UserControl.prototype.init = function () {
        var _this = this;
        this.websocket = new WebSocket(Main.DEFAULT_CONFIG.ws_url + "?channel=zodiac_table&user_id=" + Game.userinfo.uid + '&token=' + window.sessionStorage.getItem('token'));
        this.websocket.onopen = function (evt) {
            _this.onOpen(evt);
        };
        this.websocket.onclose = function (evt) {
            _this.init();
            console.log('ws onclose');
        };
        this.websocket.onmessage = function (evt) {
            _this.onMessage(evt);
        };
        this.websocket.onerror = function (evt) {
            var toast = new Toast("您的网络异常，请刷新页面重试");
            Game.viewBox.addChild(toast);
            console.log('ws onerror');
        };
    };
    UserControl.prototype.onOpen = function (evt) {
        if (evt.isTrusted) {
            // 随意发送一段信息给后端，第一次进入页面获取同桌玩家信息，后期的同桌信息由后端推送
            this.websocket.send('open');
            console.log('ws online');
        }
    };
    UserControl.prototype.onMessage = function (evt) {
        var data = JSON.parse(evt.data);
        if (data.length > 0) {
            // 拷贝一份原有数组，留作与新有数组对比
            var userList = JSON.parse(JSON.stringify(User.userList));
            // 依据现有数据更新数组
            for (var i = 0; i < data.length; i++) {
                var j = void 0;
                i > 1 ? j = i + 1 : j = i;
                if (data[i].uid != User.userList[j].uid) {
                    if (User.userList[j].uid == undefined) {
                        User.userList[j] = {
                            'uid': data[i].uid,
                            'name': data[i].name,
                            'headimg': data[i].headimg,
                            'bets': data[i].bets
                        };
                    }
                    else {
                        User.userList[j].uid = data[i].uid;
                        User.userList[j].name = data[i].name;
                        User.userList[j].headimg = data[i].headimg;
                        User.userList[j].bets = data[i].bets;
                    }
                    // 绘制玩家信息
                    User.createUserList(j);
                }
                else {
                    User.userList[j].bets = data[i].bets;
                }
            }
            // 玩家下注动画与数量展示,只在下注状态才做展示
            if (Game.status == 1) {
                this.userBetsTween(userList);
            }
        }
    };
    // 玩家下注动画与数量展示 list: 原有玩家信息数组
    UserControl.prototype.userBetsTween = function (list) {
        // 处理下注动画
        for (var i = 0, len = User.userList.length; i < len; i++) {
            if (User.userList[i] == '')
                continue; // 如果没有这个玩家就跳出到下一个
            if (i == 2)
                continue; // 如果是自己就跳出到下一个
            if (User.userList[i].bets == undefined)
                continue; // 如果没有下注就跳出到下一个
            if (list[i].bets == undefined) {
                var bet = User.userList[i].bets.bet;
                for (var key in bet) {
                    var section = Game.getSection(key);
                    if (section > 2) {
                        var j = Game.getBetPos(section, '');
                        TableBetInfo.betTween(i, j);
                    }
                    else {
                        for (var k in bet[key]) {
                            var j = Game.getBetPos(section, k);
                            TableBetInfo.betTween(i, j);
                        }
                    }
                }
            }
            else {
                var bets_1 = User.userList[i].bets.bet;
                var bets_2 = list[i].bets.bet;
                for (var k1 in bets_1) {
                    var section = Game.getSection(k1);
                    if (bets_2[k1] == undefined) {
                        if (section > 2) {
                            var j = Game.getBetPos(section, '');
                            TableBetInfo.betTween(i, j);
                        }
                        else {
                            for (var k3 in bets_1[k1]) {
                                var j = Game.getBetPos(section, k3);
                                TableBetInfo.betTween(i, j);
                            }
                        }
                    }
                    else {
                        var bets_1_1 = bets_1[k1];
                        var bets_2_1 = bets_2[k1];
                        for (var k2 in bets_1_1) {
                            // 比较最新下注数量与原有下注数量，大于的话代表玩家继续下注，等于的话就是没有再次下注该位置
                            if (bets_1_1[k2] > bets_2_1[k2]) {
                                if (section > 2) {
                                    var j = Game.getBetPos(section, '');
                                    TableBetInfo.betTween(i, j);
                                }
                                else {
                                    var j = Game.getBetPos(section, k2);
                                    TableBetInfo.betTween(i, j);
                                }
                            }
                        }
                    }
                }
            }
        }
        // 处理下注数量显示
        var betNum = {}; // 记录所有下过的注和相应数量
        for (var i = 0, len = User.userList.length; i < len; i++) {
            if (User.userList[i].bets == undefined)
                continue;
            var bet = User.userList[i].bets.bet;
            for (var k1 in bet) {
                if (k1 == 'small' || k1 == 'big') {
                    var n = JSON.stringify(bet[k1]);
                    n = n.split(':');
                    n = Number(n[1].substr(0, n[1].length - 1));
                    betNum[k1] == undefined ? betNum[k1] = n : betNum[k1] = betNum[k1] + n;
                }
                else {
                    var bet_1 = bet[k1];
                    for (var k2 in bet_1) {
                        var n = bet_1[k2];
                        betNum[k2] == undefined ? betNum[k2] = n : betNum[k2] = betNum[k2] + n;
                    }
                }
            }
        }
        TableBetInfo.isRefreshBet = true;
        for (var k in betNum) {
            var n = void 0;
            if (k == 'small' || k == 'big') {
                var section = Game.getSection(k);
                n = Game.getBetPos(section, '');
            }
            else {
                n = Game.pointCVList.indexOf(k);
            }
            // 展示全部下注数量加上自己下注的
            BetControl.otherBetNum[n] = betNum[k] + BetControl.betNum[n];
            TableBetInfo.createOtherBetNum(n, BetControl.otherBetNum[n]);
        }
    };
    return UserControl;
}());
__reflect(UserControl.prototype, "UserControl");
//# sourceMappingURL=UserControl.js.map