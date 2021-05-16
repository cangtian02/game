/**
 * 根据sockt信息做游戏中相关控制
 */

class GameControl {
    
    public static dealData: any;      // 自己发的牌
    public static recommend: any;     // 推荐牌型
    public static rewards: any;       // 当局结算数据

    // 开始发牌
    public static Handle_deal(e: any) {
        GameControl.dealData = e._para;
        // 添加发牌动画
        var dealTween = new DealTween();
        GameView.viewBox.addChild(dealTween);
        // 去除发牌动画,并添加理牌中动画
        setTimeout(() => {
            GameView.viewBox.removeChild(dealTween);
            for(var i: number = 0;i < GameConfig.game_cfg.nPlayerNum;i++) {
                var vBox = GameEnterViewBox.userEnterChild(i,3);
                var chooseTween = new ChooseTween();
                vBox.addChild(chooseTween);
            }
        },DealTween.tweenTime);
    }

    // 推荐牌型
    public static Handle_recommend(e: any) {
        GameControl.recommend = e._para.recommendCards;
    }

    // 选择牌型
    public static Handle_ask_choose(e: any) {
        setTimeout(() => {
            new ChooseView(e.timeo,GameControl.dealData,GameControl.recommend);
        },DealTween.tweenTime + 500);
    }

    // 选择好了牌型
    public static Handle_choose_ok(e: any) {
        var _i: any = e._src.substr(1,1);
        var i: number = Number(_i) - 1;
        var vBox = GameEnterViewBox.userEnterChild(i,3);
        commonRemoveChild(vBox);
        CompareView.chooseOk(i);
    }

    // 开始比牌
    public static Handle_compare_start() {
        var compareStartTween = new CompareStartTween();
        GameView.viewBox.addChild(compareStartTween);
        setTimeout(() => { 
            GameView.viewBox.removeChild(compareStartTween);
        },CompareStartTween.tweenTime);
    }

    // 比牌结果
    public static Handle_compare_result(e: any) {
        // 比牌动画
        new CompareResultTween(e);
    }

    // 比牌结束
    public static Handle_compare_end() {
        for(var i: number = 0;i < GameConfig.game_cfg.nPlayerNum;i++) {
            var vBox4 = GameEnterViewBox.userEnterChild(i,4);
            commonRemoveChild(vBox4);
            var vBox5 = GameEnterViewBox.userEnterChild(i,5);
            commonRemoveChild(vBox5);
            var vBox6 = GameEnterViewBox.userEnterChild(i,6);
            commonRemoveChild(vBox6);
        }
    }

    // 当局结算
    public static Handle_rewards(e: any) {
        GameControl.rewards = e._para;
        // 更新左上角局数信息
        RnoAndJnumGroup.myCollection.replaceItemAt({ nCurrJu: GameControl.rewards.curr_ju + 1,nJuNum: GameControl.rewards.ju_num },0);
    }
    
}
