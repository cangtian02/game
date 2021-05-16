/**
 * 下注
 */
class BetControl {
    
    // 记录自己已下注过的位置
    public static betPos: any = [];
    // 记录自己已下注的数量
    public static betNum: any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // 记录所有下注的数量
    public static otherBetNum: any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // 记录自己下注的总量
    public static curBetNum: number = 0;
    // 最大下注量
    public static maxBetNum: number = 2000000;
    // 是否正在下注
    public static flag: Boolean = false;
    
    // 下注 i:下注位置 n 0金玉 1福禄寿 2生肖 3小富贵 4大富贵
    public constructor(i: number,n: number) {
        // 算奖派奖期间不能投注
        if (Game.status != 1) return;
        // 正在下注期间不能投注
        if(BetControl.flag) return;
        
        // 更改下注状态
        BetControl.flag = true;
        
        if (Game.userinfo.point < Game.betItem) {
            let toast = new Toast("您的星币不足");
            Game.viewBox.addChild(toast);
            // 更改下注状态
            BetControl.flag = false;
        } else if(BetControl.curBetNum >= BetControl.maxBetNum) {
            let toast = new Toast("已达下注上限");
            Game.viewBox.addChild(toast);
            // 更改下注状态
            BetControl.flag = false;
        } else {
            let key: any = ['jinyu','wufu','zodiac','small','big'];
            let parms: string = '{"qihao": "' + Game.qihao + '","bet":{';
            let betKey: any;
            let small: any;
            let big: any;
            
            if(n == 3) {
                if(Game.small_type == 0) {
                    small = Game.pointList[0][Game.small[0]] + '_' + Game.pointList[1][Game.small[1]];
                } else if(Game.small_type == 1) {
                    small = Game.pointList[0][Game.small[0]] + '_' + Game.pointList[2][Game.small[1]];
                } else {
                    small = Game.pointList[1][Game.small[0]] + '_' + Game.pointList[2][Game.small[1]];
                }
            }
            
            if(n == 4) {
                big = Game.pointList[0][Game.big[0]] + '_' + Game.pointList[1][Game.big[1]] + '_' + Game.pointList[2][Game.big[2]];
            }
            
            n == 3 ? betKey = small : n == 4 ? betKey = big : betKey = Game.pointList[n][i];
            parms = parms + '"' + key[n] + '":{"' + betKey + '":' + Game.betItem + '}}}';

            httpAjaxPost('/zodiac/bet',JSON.parse(parms),(event: egret.Event) => {
                let req_1 = <egret.HttpRequest>event.currentTarget;
                let req = JSON.parse(req_1.response);
                if(req.code == '-1') {
                    let toast = new Toast("已过投注截止时间");
                    Game.viewBox.addChild(toast);
                    BetControl.flag = false;
                    return;
                }
                if(req.code != 0) {
                    let toast = new Toast("下注异常，请稍后重试");
                    Game.viewBox.addChild(toast);
                    BetControl.flag = false;
                    return;
                }
                this.bet(i,n);
            });
        }
	}
	
    private bet(i: number,n: number) {
        let j: number;
        if(n == 0) {
            j = i + 17;
        } else if(n == 1) {
            j = i + 12;
        } else if(n == 2) {
            j = i;
        } else if(n == 3) {
            j = 19;
        } else if(n == 4) {
            j = 20;
        }
        
        // 已经插入过的排除
        let a: number = 0;
        for(let k: number = 0;k < BetControl.betPos.length;k++) {
            if(BetControl.betPos[k] == j) {
                a++;
            }
        }
        if(a == 0) {
            BetControl.betPos.push(j);
        }

        // 保存相应的下注数量
        BetControl.betNum[j] = Number(BetControl.betNum[j]) + Number(Game.betItem);
        BetControl.curBetNum = Number(BetControl.curBetNum) + Number(Game.betItem);

        TableBetInfo.createMeBetNum();
        TableBetInfo.betTween(2,j);
        
        // 更新自己的星币
        Game.userinfo.point = Number(Game.userinfo.point) - Number(Game.betItem);
        Bot.createCur(String(Game.userinfo.point));
        
        // 更改下注状态
        BetControl.flag = false;
	}
	
}
