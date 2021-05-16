/**
  * 根据sockt信息做游戏中公共相关控制
 */

class GamePublicControl {

    // 玩家坐下
    public static Handle_enter(e: any) {
        // 保存玩家坐下信息
        GameConfig.enterData.push(e._para);
        // 自己坐下后开始游戏chess心跳，注意，退出游戏后将要停止此心跳
        if(e._para._uid == Main.USER_INFO.uid) {
            GameConfig.time = setInterval(() => {
                Main.WEBSOCKET.doSend(cfg_heart_beat_chess(GameConfig.session));
            },3000);
        }
        // 当坐下玩家满了并未开始游戏时隐藏邀请好友按钮
        if(GameConfig.enterData.length == GameConfig.game_cfg.nPlayerNum && !GameConfig.isPlayStart) {
            DissolutionAndShare.hideShareBtn();
        }
        // 初始化玩家所在位置
        GameEnter.resetUserPosition(e._para._chair);
        // 坐下并绘制玩家基础场景
        GameUserInfo.createPortraitAndName(e);
        GameUserInfo.createScore(e._para._chair,e._para.score.coin);
    }

    // 提示玩家准备
    public static Handle_ask_ready(e: any) {
        if(!GameConfig.isPlayStart) {
            GameReady.createAskReady(e);
        } else {
            // 游戏开始后的提示准备dom，有小结算面板与倒计时
            GameRewards.askReadyAndRewards(GameControl.rewards,e.timeo);
        }
    }

    // 玩家已准备
    public static Handle_ready(e: any) {
        GameReady.createReady(e);
    }

    // 游戏开始
    public static Handle_game_start(e: any) {
        if(!GameConfig.isPlayStart) {
            GameConfig.isPlayStart = true;  // 标记游戏开始
            DissolutionAndShare.removeDissolutionAndShare();  // 去除中间解散房间和邀请好友盒子
        }
        // 去除各玩家准备手势
        for(var i: number = 0;i < GameConfig.game_cfg.nPlayerNum;i++) {
            var vBox = GameEnterViewBox.userEnterChild(i,2);
            commonRemoveChild(vBox);
        }
    }
    
    // 玩家退出
    public static Handle_leave(e: any) {
        if(e._para._uid == undefined) return;
        if(e._para._uid == Main.USER_INFO.uid) {
            // 自己退出
            clearInterval(GameConfig.time);  // 停止游戏心跳
            GameView.self.dispatchEvent(new egret.Event("GameHome"));  // 跳转大厅
        } else {
            // 其他玩家退出
            if(!GameConfig.isPlayStart) {
                // 当游戏未开始时
                DissolutionAndShare.showShareBtn();  // 显示邀请好友按钮
                // 删除退出玩家信息
                var i: number = GameEnter.userPosition[e._para._chair - 1];
                var vBox1 = GameEnterViewBox.userEnterChild(i,0); // 头像
                var vBox2 = GameEnterViewBox.userEnterChild(i,1); // 分数
                var vBox3 = GameEnterViewBox.userEnterChild(i,2); // 准备
                commonRemoveChild(vBox1);
                commonRemoveChild(vBox2);
                commonRemoveChild(vBox3);
                for(var j: number = 0;j < GameConfig.enterData.length;j++) {
                    if(GameConfig.enterData[j]._uid == e._para._uid) {
                        GameConfig.enterData.splice(j,1);
                    }
                }
            }
        }
    }

    // 房主解散房间
    public static Handle_dissolution(e: any) {
        // 解散房间 只处理不是房主的玩家
        if(e._para.uid != Main.USER_INFO.uid) {
            setTimeout(() => {
                var toast = new Toast('房主已解散房间，请进入其他房间进行游戏');
                HomeView.viewBox.addChild(toast);
            },1000);
        }
    }

    // 玩家掉线
    public static Handle_offline(e: any) {
        var i: number = GameEnter.userPosition[e._para._chair - 1];
        var vBox = GameEnterViewBox.userEnterChild(i,0);
        // e._para.active 为0表示在线，1表示断线
        if(e._para.active == 0) {
            vBox.$children[1].alpha = 0;
        } else {
            vBox.$children[1].alpha = 1;
        }
    }
    
    // 和局投票开始
    public static vote_draw_who: number;  // 谁发起的和局投票
    public static Handle_vote_draw_start(e: any) {
        GamePublicControl.vote_draw_who = e._para.who;
        if(e._para.who != GameConfig.chair) {
            GameVoteDraw.voteDrawStart(e._para.timeout,e._para.who);
        }else {
            GameConfig.game_vote_draw = 1;
        }
    }

    // 玩家和局投票
    public static Handle_vote_draw(e: any) {
        if(e._para.who == GameConfig.chair) {
            // 自己已经参与和局投票
            GameConfig.game_vote_draw = 1;
        }
        if(GamePublicControl.vote_draw_who != GameConfig.chair) {
            // 不是自己发起时
        }else {
            // 是自己发起时
        }
    }

    // 和局投票结束
    public static Handle_vote_draw_end(e: any) {
        if(e._para.confirm) {
            // 和局达成
        }else {
            // 和局未达成
            GameConfig.game_vote_draw = -1;
        }
    }
    
}
