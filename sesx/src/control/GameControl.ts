/**
 * 游戏控制中心
 */
class GameControl {
    
    private game_step: number = 0; // 轮询局数
    private awardBox: any; // 开奖盒子

	public constructor() {
        if(Game.status == 1) {
            this.bet_fun();
        } else if(Game.status == 2) {
            this.calculation_fun();
        } else {
            Top.jishi_status('等待报喜');
            Top.jishi_time('0S');
            this.award_fun();
        }
	}
    
	// 下注事件
    private bet_fun() {
        this.game_step++;
        Top.jishi_status('吉时还有');
        Top.jishi_time(Game.time + 'S');
        
        let timer: egret.Timer = new egret.Timer(1000,Game.time);
        
        timer.addEventListener(egret.TimerEvent.TIMER,() => {
            Game.time--;
            if(Game.time > 0) {
                Top.jishi_status('吉时还有');
                Top.jishi_time(Game.time + 'S');
            }
            // 倒计时3秒开启音乐提示
            if(Game.time < 4) {
                MusicControl.playDownTime();
            }
        },this);
        
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            Game.status = 2;
            Game.time = 5;
            this.calculation_fun();
        },this);
        
        timer.start();

        // 奖励展示
        if(this.game_step % 6 == 0) {
            if ((<any>window).yxjc_prizeshow.flag) {
                (<any>window).yxjc_prizeshow.start();
            } 
        }
    }
	
    // 算奖事件
    private calculation_fun() {
        let dialog = new Dialog("吉时已到");
        Game.viewBox.addChild(dialog);

        Top.jishi_status('等待报喜');
        Top.jishi_time(Game.time + 'S');

        let timer: egret.Timer = new egret.Timer(1000, Game.time);

        timer.addEventListener(egret.TimerEvent.TIMER,() => {
            Game.time--;
            if(Game.time > 0) {
                Top.jishi_status('等待报喜');
                Top.jishi_time(Game.time + 'S');
            }
        },this);

        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {
            Game.status = 3;
            Game.time = 20;
            this.award_fun();
        },this);

        timer.start();
    }
    
    /**
     * 派奖事件
     * 派奖动画时间为20s，2s的时间拉取结果，2s都没拉取到结果，就提示网络异常，不做任何处理
     */ 
    private award_fun() {
        let timer: egret.Timer = new egret.Timer(1000, 2);
        let info = '';
        let flag = true;

        // 获取本期开奖信息
        httpAjaxPost('/zodiac/award',{ qihao: Game.qihao },(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            timer.reset();
            if(req.code == '-1') {
                let toast = new Toast(Game.qihao + '期还未开奖');
                Game.viewBox.addChild(toast);
            } else if(req.code != 0) {
                let toast = new Toast('获取开奖异常，请刷新页面重试');
                Game.viewBox.addChild(toast);
            } else {
                if(flag) {
                    info = req.data;
                    this.award_tween_fun(info);
                } 
            }
        });

        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {
            if(info == '') {
                flag = false;
                let toast = new Toast('您的网络异常，请检查后重试');
                Game.viewBox.addChild(toast);
            }
        },this);

        timer.start();
    }
    
    private award_tween_fun(info: any) {
        // 自己中奖结果
        let userAwardInfo: any = '';
        httpAjaxPost('/zodiac/user-award',{ qihao: Game.qihao },(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code == 0) {
                userAwardInfo = req.data;
            }
        });
        
        // 保存相应信息
        Award.point = info.point;
        Award.point_number[0] = Game.pointList[1].indexOf(Award.point[1]);
        Award.point_number[1] = Game.pointList[0].indexOf(Award.point[0]);
        Award.point_number[2] = Game.pointList[2].indexOf(Award.point[2]);
        
        // 最新期信息插入到10期报喜第一条，然后删除最后一条
        Popup.qihaoData.splice(0,0,info);
        Popup.qihaoData.splice(10,1);
        
        // 显示开奖场景
        this.awardBox = new Award();
        Game.viewBox.addChild(this.awardBox);
        
        // 剩余时间大于10秒就播放全部动画，反之只播放对联动画
        let time: number;
        if(Game.time > 10) {
            time = 17000;
            this.awardBox.addChild(new Lantern());
            Lantern.LanternTween();
            setTimeout(() => {
                this.awardBox.addChild(new Couplet());
                Couplet.createView();
                setTimeout(() => {
                    Couplet.tween();
                }, 100);
            }, 13900);
        } else {
            time = 3000;
            this.awardBox.addChild(new Couplet());
            Couplet.createView();
            setTimeout(() => {
                Couplet.tween();
            }, 100);
        }
        
        setTimeout(() => {
            // 中奖闪烁背景
            TableBetInfo.createJinyu_bg(Game.pointList[0].indexOf(info.point[0]));
            TableBetInfo.createWufu_bg(Game.pointList[1].indexOf(info.point[1]));
            TableBetInfo.createZodiac_bg(Game.pointList[2].indexOf(info.point[2]));
        }, time - 1000);

        setTimeout(() => {
            // 去除灯笼对联场景
            Game.viewBox.removeChild(this.awardBox);
            // 发钱
            this.userAward_fun(userAwardInfo);
        }, time);
    }
    
    // 发钱
    private userAward_fun(userAwardInfo: any) {
        if(userAwardInfo == '') {
            let toast = new Toast('您的网络异常，请检查后重试');
            Game.viewBox.addChild(toast);
            return;
        }
        // 发自己的
        let hit: any = userAwardInfo.hit;
        for(let key in hit) {
            if(key == 'jinyu' || key == 'wufu' || key == 'zodiac') {
                for(let n in hit[key]) {
                    TableBetInfo.awardTween(Game.pointCVList.indexOf(n),2);
                }
            }
        }
        if(userAwardInfo.hitPoint != undefined && userAwardInfo.hitPoint > 0) {
            User.userPoint(userAwardInfo.hitPoint,2);
            MusicControl.playGetGold();
        }
        
        let hasHit: Boolean = false;  // 同桌的人是否有钱发
        // 发同桌的，不计算大小富贵，只是为了展示效果，发的钱不真实
        for(let i: number = 0,len = User.userList.length;i < len;i++) {
            if(i == 2 || User.userList[i] == '') continue;
            if(User.userList[i].bets != undefined) {
                let bet: any = User.userList[i].bets.bet;
                let hitPoint: number = 0;
                for(let k1 in bet) {
                    let sub: number;
                    k1 == 'jinyu' ? sub = 0 : k1 == 'wufu' ? sub = 1 : sub = 2;
                    let multiple: number;
                    k1 == 'jinyu' ? multiple = Game.multiple.jinyu : k1 == 'wufu' ? multiple = Game.multiple.wufu : multiple = Game.multiple.zodiac;
                    let bet_1_1: any = bet[k1];
                    for(let k2 in bet_1_1) {
                        if(k2 == Award.point[sub]) {
                            hitPoint = hitPoint + bet_1_1[k2] * multiple;
                            TableBetInfo.awardTween(Game.pointCVList.indexOf(k2),i);
                        }
                    }
                }
                if(hitPoint != undefined && hitPoint > 0) {
                    User.userPoint(hitPoint,i);
                    hasHit = true;
                }
            }
        }
        if(hasHit) MusicControl.playGetGold();

        // 发钱动画时长2S
        setTimeout(() => {
            this.nextCurrent(userAwardInfo.userPoint);
        }, 2000);
    }
    
    /**
     * 进入下一轮  userPoint自己的金币信息
     */ 
    private nextCurrent(userPoint) {
        // 刷新自己的星币
        Game.userinfo.point = userPoint;
        Bot.createCur(Game.userinfo.point);
        // 清桌
        commonRemoveChild(TableBetInfo.meBetBox);
        commonRemoveChild(TableBetInfo.otherBetBox);
        // 清空保存的值
        BetControl.curBetNum = 0;
        BetControl.betPos.length = 0;
        BetControl.betNum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        BetControl.otherBetNum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        // 更新最新期报喜信息
        let point_number: any = [-1,-1,-1];
        point_number[0] = Game.pointList[1].indexOf(Popup.qihaoData[0].point[1]);
        point_number[1] = Game.pointList[0].indexOf(Popup.qihaoData[0].point[0]);
        point_number[2] = Game.pointList[2].indexOf(Popup.qihaoData[0].point[2]);
        Top.baoxi_text(Game.pointCNList[0][point_number[1]] + ' • ' + Game.pointCNList[1][point_number[0]] + ' • ' + Game.pointCNList[2][point_number[2]]);
        
        let dialog = new Dialog("辞旧迎新");
        Game.viewBox.addChild(dialog);

        let timer: egret.Timer = new egret.Timer(1000, 30);

        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            httpAjaxGet('/zodiac/current','',(event: egret.Event) => {
                let req_1 = <egret.HttpRequest>event.currentTarget;
                let req = JSON.parse(req_1.response);
                if(req.code != 0) {
                    timer.reset();
                    let toast = new Toast('获取状态异常，请刷新页面重试');
                    Game.viewBox.addChild(toast);
                    return;
                }

                // 到了下注状态就更新到下注状态
                if(req.data.status == 1) {
                    timer.reset();

                    Game.status = req.data.status;
                    Game.time = req.data.time;
                    Game.qihao = req.data.qihao;
                    this.bet_fun();
                    
                    // 当前报喜如果已展开，就更新最新的一期
                    if(Popup.viewBox != undefined) {
                        PopupQihao.updateItem();
                        PopupMiss.updateItem();
                    }
                }
            });
        }, this);

        // 30S都到了还没拉取到状态
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            let toast = new Toast('网络异常，请刷新页面重试');
            Game.viewBox.addChild(toast);
        }, this);

        timer.start();
    }
    
}
