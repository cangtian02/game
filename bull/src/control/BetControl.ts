/**
 * 下注中控
 */
class BetControl {
    
    public static bet_flag: Boolean = false;  // 是否正在下注 
    public static max_bet_num: number = 2000000;  // 最大下注量
    public static bet_total_num: number = 0;  // 自己下注的总量
    public static my_bet_num_arr: any = [0, 0, 0, 0];  // 自己四手详细下注数量
    public static other_bet_num_arr: any = [0, 0, 0, 0];  // 其他玩家四手下注数量
    public static total_bet_num_arr: any = [0, 0, 0, 0];  // 全部玩家四手详细下注数量
    public static step_bet_diff: any = [0, 0, 0, 0];  // 当前轮自己下的注与总数的差值
    
    /**
     * i: number  下注位置  0 - 3
     */ 
	public constructor(i: number) {
        if(BetControl.bet_flag) return; 
        if(Game.status != 1) return;
        
        if(Game.user_info.point < Game.bet_num) {
            let toast = new Toast("您的星币不足");
            Game.view_box.addChild(toast);
            return;
        }
        if(BetControl.bet_total_num >= BetControl.max_bet_num) {
            let toast = new Toast("已达投注上限");
            Game.view_box.addChild(toast);
            return;
        }
        if(BetControl.bet_total_num == 0 && Game.bet_num > Game.user_info.point / 10) {
            let toast = new Toast("星币少于1000无法投注");
            Game.view_box.addChild(toast);
            return;
        }
        if((BetControl.bet_total_num + Game.bet_num) * 10 >= Game.user_info.point) {
            let toast = new Toast("已达该次投注上限");
            Game.view_box.addChild(toast);
            return;
        }
        
        BetControl.bet_flag = true;
	    
        let parms: any = '{"qihao": "' + Game.qihao + '","bet": {"player' + (i + 1) + '": ' + Game.bet_num + '}}';
        
        httpAjaxPost('/bull/bet',JSON.parse(parms),(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            
            // 更改投注状态
            BetControl.bet_flag = false;
            
            if(req.code != 0) {
                let toast = new Toast(req.msg);
                Game.view_box.addChild(toast);
                return;
            }
            
            // 保存下注信息
            BetControl.bet_total_num += Game.bet_num;
            BetControl.my_bet_num_arr[i] = BetControl.my_bet_num_arr[i] + Game.bet_num;
            BetControl.total_bet_num_arr[i] = BetControl.total_bet_num_arr[i] + Game.bet_num;
            
            // 更新自己的星币
            Game.user_info.point = Number(Game.user_info.point) - Number(Game.bet_num);
            Bot.createUserPoint();
            
            // 绘制下注数量
            Table.createMyBetNum(i);
            Table.createTotalBetNum(i);
            
            // 下注星币动画
            Currency.myBet(i);
        });
	}
	
}
