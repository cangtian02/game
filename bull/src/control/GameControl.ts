/**
 * 游戏逻辑中控
 */
class GameControl {
	
    private game_step: number = 0; // 轮询局数

    public constructor() {
        // 确定时间区间
        RobotControl.resetSection();
        // 确定人数变化基数
        RobotControl.resetRandomSum();

        if(Game.status == 1) {
            this.betFun();
        } else if(Game.status == 2) {
            Deal.createCard();
            this.calculationFun();
        } else {
            Deal.createCard();
            this.awardFun();
        }
    }
    
    private betFun() {
        this.game_step++;

        if(Game.first_go_home) {
            Game.first_go_home = false;
            Deal.createCard();
            if(Game.time > 0) {
                setTimeout(() => {
                    Table.showTip(0);
                    MusicControl.playStart_add_chip();
                },500);
            }
        } else {
            Deal.dealTween();
            setTimeout(() => {
                Table.showTip(0);
                MusicControl.playStart_add_chip();
            },2000);
        }

        Table.betInit();  // 提示玩家下注

        Top.createState('投注中');
        Top.createTime(Game.time);
        
        if(Game.time == 0) {
            Game.status = 2;
            Game.time = 5;
            this.calculationFun();
        } else {
            let timer: any = setInterval(() => {
                Game.time--;
                Top.createTime(Game.time);
                if(Game.time == 0) {
                    clearInterval(timer);
                    Game.status = 2;
                    Game.time = 5;
                    Table.showTip(1);
                    MusicControl.playStop_add_chip();
                    this.calculationFun();
                }
                // 倒计时3秒开启音乐提示
                if(Game.time < 4) {
                    Game.time > 1 ? MusicControl.playDownTime() : MusicControl.playDownTimeEnd();
                }
            },1000);
        }

        if(this.game_step % 9 == 0) {
            let num: number = Math.floor(Math.random() * 10);
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
        if(this.game_step % 6 == 0) {
            if ((<any>window).yxjc_prizeshow.flag) {
                (<any>window).yxjc_prizeshow.start();
            } 
        }
    }
    
    private calculationFun() {
        Game.first_go_home = false;
        Top.createState('等待开奖');
        Top.createTime(Game.time);

        if(Game.time == 0) {
            Game.status = 3;
            Game.time = 10;
            this.awardFun();
        } else {
            let timer: any = setInterval(() => {
                Game.time--;
                Top.createTime(Game.time);
                if(Game.time == 0) {
                    clearInterval(timer);
                    Game.status = 3;
                    Game.time = 10;
                    this.awardFun();
                }
            },1000);
        }
        
        // 把没有下注的位置隐藏点击下注提示
        Table.removeNoHitTitle();
    }
    
    private awardFun() {
        Game.first_go_home = false;
        Top.createState('开奖中');
        Top.createTime(0);
        
        let award_timer: any;
        let award_time: number = 3;
        let award_info = '';

        // 获取本期开奖信息
        httpAjaxPost('/bull/award',{ qihao: Game.qihao },(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast(req.msg);
                Game.view_box.addChild(toast);
                clearInterval(award_timer);
                return;
            }
            award_info = req.data;
        });

        award_timer = setInterval(() => {
            award_time--;
            if(award_time <= 0) {  // 3s时间到了
                if(award_info == '') {
                    let toast = new Toast('您的网络异常，请检查后重试');
                    Game.view_box.addChild(toast);
                } else {
                    this.awardTweenFun(award_info);
                }
                clearInterval(award_timer);
            } else {
                if(award_info != '') {
                    this.awardTweenFun(award_info);
                    clearInterval(award_timer);
                }
            }
        },1000);
    }
    
    private awardTweenFun(award_info: any) {
        // 自己中奖结果
        let userAwardInfo: any = '';
        httpAjaxPost('/bull/user-award',{ qihao: Game.qihao },(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code == 0) {
                userAwardInfo = req.data;
            }
        });
        
        // 开牌
        MusicControl.playOpen_poker();
        // 开庄家前4张牌
        OpenCard.bankerCard(0,award_info);
        // 开闲家4手牌
        OpenCard.otherCard(award_info);
        // 3.5s后翻庄家最后一张牌
        setTimeout(() => {
            OpenCard.bankerCard(1,award_info);
        },3500);
        // 4S后展示输赢情况和发放星币动画
        setTimeout(() => {
            new Award(award_info);
        },4000);
        // 7S后派奖给自己和其他玩家
        setTimeout(() => {
            if(userAwardInfo == '') {
                let toast = new Toast('您的网络异常，请检查后重试');
                Game.view_box.addChild(toast);
            } else {
                if(userAwardInfo.tzPoint != undefined) {
                    if(userAwardInfo.hitPoint > 0) {
                        Award.winToMe(userAwardInfo);
                    } else {
                        setTimeout(() => {
                            let point: number = 0;
                            for(let k in userAwardInfo.hit) {
                                point += userAwardInfo.hit[k];
                            }
                            Bot.myPointTween(point);
                            Game.user_info.point = userAwardInfo.userPoint;
                            Bot.createUserPoint();
                        },600);
                    }
                }
                Award.winToOther(award_info);
            }
        },7000);
        
        // 9S后进行下一轮
        setTimeout(() => {
            // 更新四手牌的输赢信息
            for(let i: number = 1;i < 5;i++) {
                let k: any = 'player' + i;
                Game.qihao_result[k].push(award_info.hit[k].hit);
                Game.qihao_result[k].shift();
            }
            this.nextState();    
        },9000);
    }
    
    private nextState() {
        let timer = setInterval(() => {
            httpAjaxGet('/bull/current','',(event: egret.Event) => {
                let req_1 = <egret.HttpRequest>event.currentTarget;
                let req = JSON.parse(req_1.response);
                if(req.code != 0) {
                    let toast = new Toast(req.msg);
                    Game.view_box.addChild(toast);
                    return;
                }
                // 到了下注状态就更新到下注状态
                if(req.data.status == 1) {
                    clearInterval(timer);
                    Game.status = req.data.status;
                    Game.time = req.data.time;
                    Game.qihao = req.data.qihao;
                    Table.resetTable();
                    Table.createQihaoResult();
                    this.betFun();
                }
            });
        },1000);
    }
    
}
