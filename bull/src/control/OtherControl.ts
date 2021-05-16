/**
 * websocket其他玩家
 */
class OtherControl {
    
    private websocket: any;
    
	public constructor() {
        this.init();
	}
	
    private init() {
        this.websocket = new WebSocket(Main.DEFAULT_CONFIG.ws_url + '?channel=bull_table&token=' + window.sessionStorage.getItem('token'));
        this.websocket.onopen = (evt) => {
            this.onOpen(evt);
        }
        this.websocket.onclose = (evt) => {
            this.init();
            console.log('ws onclose');
        }
        this.websocket.onmessage = (evt) => {
            this.onMessage(evt);
        }
        this.websocket.onerror = (evt) => {
            let toast = new Toast("您的网络异常，请刷新页面重试");
            Game.view_box.addChild(toast);
            console.log('ws onerror');
        }
    }

    private onOpen(evt) {
        if(evt.isTrusted) {
            console.log('ws online');
        }
    }
    
    private onMessage(evt) {
        let data: any = JSON.parse(evt.data);
        if(Game.status == 1) {
            RobotControl.resetSection();

            let arr: any = [0,0,0,0];
            for(let key in data) {
                if(key == 'sum') {
                    if(RobotControl.is_open_robot) {  // 开启了机器人：真实人数加上随机人数
                        Bot.other_sum = data[key] + RobotControl.robot_random_num;
                        if(RobotControl.robot_bet_arr.length == 0) {
                            RobotControl.resetBetArr();
                        }
                    } else {
                        Bot.other_sum = data[key];
                    }
                    Bot.createOtherSum();
                } else {
                    let i: any = key.substr(6,1);
                    i = i - 1;
                    let n: number = Number(data[key]);
                    if(n != BetControl.other_bet_num_arr[i] && n != BetControl.step_bet_diff[i]) {
                        if(n - BetControl.my_bet_num_arr[i] != BetControl.step_bet_diff[i]) {
                            arr[i] = n;
                            BetControl.step_bet_diff[i] = n - BetControl.my_bet_num_arr[i];
                        }
                    }
                }
            }

            if(RobotControl.is_open_robot) {  // 开启了机器人，加上机器人的下注筹码
                RobotControl.otherBet(arr);
            } else {
                new Currency.otherBet(arr);
            }
        }
    }

}
