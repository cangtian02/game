/**
 * 机器人控制中枢
 */
class RobotControl {

    public static is_open_robot: Boolean = true;  // 是否开启机器人
    public static robot_section: number = 0;  // 时间区间 
    public static robot_random_num: number = 0;  // 随机人数基数
    public static robot_bet_arr: any = [];  // 机器人下注数组
    public static robot_bet_step: number = 0;  // 下注步数
    public static robot_randow_bet_num: number = 12;  // 每一轮机器人下注次数
    public static robot_config: any = [
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
    ];  // 机器人配置

    // 重置时间区间
    public static resetSection() {
        let date: any = new Date();
        let h: number = date.getHours();
        RobotControl.robot_config.map((val, index) => {
            if(h >= val.time_start || h <= val.time_end) {
                RobotControl.robot_section = index;
            }
        });
    }    

    public static resetRandomSum() {
        let c = RobotControl.robot_config[RobotControl.robot_section].sum_max - RobotControl.robot_config[RobotControl.robot_section].sum_mini + 1;
        RobotControl.robot_random_num = Math.floor(Math.random() * c + RobotControl.robot_config[RobotControl.robot_section].sum_mini);
    }

    public static resetBetArr() {
        let bet_all_num: number = Math.floor(Bot.other_sum * RobotControl.robot_config[RobotControl.robot_section].percentage) * 2000;
        RobotControl.robot_bet_arr.length = 12;
        let bet_all_split: any = RobotControl.getBetAllSplit(bet_all_num);
        let bet_item_random: any = [];

        function ran() {
            let m: number = Math.floor(Math.random() * 13);
            if(bet_item_random.length < RobotControl.robot_randow_bet_num) {
                if(bet_item_random.indexOf(m) == -1 && m != 0) {
                    bet_item_random.push(m);
                }
                ran();
            }
        }
        ran();

        for(let i: number = 0;i < RobotControl.robot_randow_bet_num;i++) {
            RobotControl.robot_bet_arr[bet_item_random[i]] = bet_all_split[i];
        }
    }

    // 将所有的钱分成4份  每份随机分几份 1到4份之间
    public static getBetAllSplit(num: number) {
        let arr_1: any = [0, 0, 0, 0, 0, 0];  // 所有的钱分RobotControl.robot_randow_bet_num份
        let arr_2: any = [];  // 每一份随机分几份

        let r_n: number = 10;
        for(let i: number = 0;i < RobotControl.robot_randow_bet_num;i++) {
            let r: number = 0;
            if(i == RobotControl.robot_randow_bet_num - 1) {
                r = r_n;
            } else {
                r = Math.random() * RobotControl.robot_randow_bet_num - 1 + 1;
                r_n = r_n - r;
            }
            arr_1[i] = num * r / 10;
            arr_1[i] < 400 ? arr_1[i] = 400 : arr_1[i] = Math.floor(arr_1[i]/100) * 100;

            let arr_3: any = [0, 0, 0, 0];
            for(let j: number = 0;j < 4;j++) {
                let d: number = Math.floor(Math.random() * 4);
                let r_2: number = Math.floor(Math.random() * 3 + 1);
                arr_3[d] = arr_1[i] * r_2 / 10;
                arr_3[d] < 100 ? arr_3[d] = 100 : arr_3[d] = Math.floor(arr_3[d]/100) * 100;
            }
            arr_2.push(arr_3);
        }
        return arr_2;
    }

    // 机器人下注 arr：真实人下的注
    public static otherBet(arr: any) {
        let item: any = [0, 0, 0, 0];

        for(let i: number = 0;i < 4;i++) {
            if(RobotControl.robot_bet_arr[RobotControl.robot_bet_step] == undefined) {
                item[i] = arr[i];
            } else {
                if(RobotControl.robot_bet_arr[RobotControl.robot_bet_step][i] > 0) {
                    item[i] = arr[i] + RobotControl.robot_bet_arr[RobotControl.robot_bet_step][i] + BetControl.total_bet_num_arr[i];
                } else {
                    item[i] = arr[i];
                }
            }
        }
        RobotControl.robot_bet_step++;

        new Currency.otherBet(item);
    }

}
