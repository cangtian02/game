var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 机器人控制中枢
 */
var RobotControl = (function () {
    function RobotControl() {
    }
    // 重置时间区间
    RobotControl.resetSection = function () {
        var date = new Date();
        var h = date.getHours();
        RobotControl.robot_config.map(function (val, index) {
            if (h >= val.time_start || h <= val.time_end) {
                RobotControl.robot_section = index;
            }
        });
    };
    RobotControl.resetRandomSum = function () {
        var c = RobotControl.robot_config[RobotControl.robot_section].sum_max - RobotControl.robot_config[RobotControl.robot_section].sum_mini + 1;
        RobotControl.robot_random_num = Math.floor(Math.random() * c + RobotControl.robot_config[RobotControl.robot_section].sum_mini);
    };
    RobotControl.resetBetArr = function () {
        var bet_all_num = Math.floor(Bot.other_sum * RobotControl.robot_config[RobotControl.robot_section].percentage) * 2000;
        RobotControl.robot_bet_arr.length = 12;
        var bet_all_split = RobotControl.getBetAllSplit(bet_all_num);
        var bet_item_random = [];
        function ran() {
            var m = Math.floor(Math.random() * 13);
            if (bet_item_random.length < RobotControl.robot_randow_bet_num) {
                if (bet_item_random.indexOf(m) == -1 && m != 0) {
                    bet_item_random.push(m);
                }
                ran();
            }
        }
        ran();
        for (var i = 0; i < RobotControl.robot_randow_bet_num; i++) {
            RobotControl.robot_bet_arr[bet_item_random[i]] = bet_all_split[i];
        }
    };
    // 将所有的钱分成4份  每份随机分几份 1到4份之间
    RobotControl.getBetAllSplit = function (num) {
        var arr_1 = [0, 0, 0, 0, 0, 0]; // 所有的钱分RobotControl.robot_randow_bet_num份
        var arr_2 = []; // 每一份随机分几份
        var r_n = 10;
        for (var i = 0; i < RobotControl.robot_randow_bet_num; i++) {
            var r = 0;
            if (i == RobotControl.robot_randow_bet_num - 1) {
                r = r_n;
            }
            else {
                r = Math.random() * RobotControl.robot_randow_bet_num - 1 + 1;
                r_n = r_n - r;
            }
            arr_1[i] = num * r / 10;
            arr_1[i] < 400 ? arr_1[i] = 400 : arr_1[i] = Math.floor(arr_1[i] / 100) * 100;
            var arr_3 = [0, 0, 0, 0];
            for (var j = 0; j < 4; j++) {
                var d = Math.floor(Math.random() * 4);
                var r_2 = Math.floor(Math.random() * 3 + 1);
                arr_3[d] = arr_1[i] * r_2 / 10;
                arr_3[d] < 100 ? arr_3[d] = 100 : arr_3[d] = Math.floor(arr_3[d] / 100) * 100;
            }
            arr_2.push(arr_3);
        }
        return arr_2;
    };
    // 机器人下注 arr：真实人下的注
    RobotControl.otherBet = function (arr) {
        var item = [0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            if (RobotControl.robot_bet_arr[RobotControl.robot_bet_step] == undefined) {
                item[i] = arr[i];
            }
            else {
                if (RobotControl.robot_bet_arr[RobotControl.robot_bet_step][i] > 0) {
                    item[i] = arr[i] + RobotControl.robot_bet_arr[RobotControl.robot_bet_step][i] + BetControl.total_bet_num_arr[i];
                }
                else {
                    item[i] = arr[i];
                }
            }
        }
        RobotControl.robot_bet_step++;
        new Currency.otherBet(item);
    };
    RobotControl.is_open_robot = true; // 是否开启机器人
    RobotControl.robot_section = 0; // 时间区间 
    RobotControl.robot_random_num = 0; // 随机人数基数
    RobotControl.robot_bet_arr = []; // 机器人下注数组
    RobotControl.robot_bet_step = 0; // 下注步数
    RobotControl.robot_randow_bet_num = 12; // 每一轮机器人下注次数
    RobotControl.robot_config = [
        {
            time_start: 2,
            time_end: 8,
            sum_mini: 1000,
            sum_max: 1500,
            percentage: 0.2
        },
        {
            time_start: 9,
            time_end: 13,
            sum_mini: 1500,
            sum_max: 2000,
            percentage: 0.5
        },
        {
            time_start: 14,
            time_end: 1,
            sum_mini: 2000,
            sum_max: 3000,
            percentage: 0.8
        }
    ]; // 机器人配置
    return RobotControl;
}());
__reflect(RobotControl.prototype, "RobotControl");
//# sourceMappingURL=RobotControl.js.map