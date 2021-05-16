var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * websocket其他玩家
 */
var OtherControl = (function () {
    function OtherControl() {
        this.init();
    }
    OtherControl.prototype.init = function () {
        var _this = this;
        this.websocket = new WebSocket(Main.DEFAULT_CONFIG.ws_url + '?channel=bull_table');
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
            Game.view_box.addChild(toast);
            console.log('ws onerror');
        };
    };
    OtherControl.prototype.onOpen = function (evt) {
        if (evt.isTrusted) {
            console.log('ws online');
        }
    };
    OtherControl.prototype.onMessage = function (evt) {
        var data = JSON.parse(evt.data);
        if (Game.status == 1) {
            RobotControl.resetSection();
            var arr = [0, 0, 0, 0];
            for (var key in data) {
                if (key == 'sum') {
                    if (RobotControl.is_open_robot) {
                        Bot.other_sum = data[key] + RobotControl.robot_random_num;
                        if (RobotControl.robot_bet_arr.length == 0) {
                            RobotControl.resetBetArr();
                        }
                    }
                    else {
                        Bot.other_sum = data[key];
                    }
                    Bot.createOtherSum();
                }
                else {
                    var i = key.substr(6, 1);
                    i = i - 1;
                    var n = Number(data[key]);
                    if (n != BetControl.other_bet_num_arr[i] && n != BetControl.step_bet_diff[i]) {
                        if (n - BetControl.my_bet_num_arr[i] != BetControl.step_bet_diff[i]) {
                            arr[i] = n;
                            BetControl.step_bet_diff[i] = n - BetControl.my_bet_num_arr[i];
                        }
                    }
                }
            }
            if (RobotControl.is_open_robot) {
                RobotControl.otherBet(arr);
            }
            else {
                new Currency.otherBet(arr);
            }
        }
    };
    return OtherControl;
}());
__reflect(OtherControl.prototype, "OtherControl");
//# sourceMappingURL=OtherControl.js.map