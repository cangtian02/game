/**
 * 根据sockt信息做游戏中相关控制
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameControl = (function () {
    function GameControl() {
    }
    // 开始发牌
    GameControl.Handle_deal = function (e) {
        GameControl.dealData = e._para;
        // 添加发牌动画
        var dealTween = new DealTween();
        GameView.viewBox.addChild(dealTween);
        // 去除发牌动画,并添加理牌中动画
        setTimeout(function () {
            GameView.viewBox.removeChild(dealTween);
            for (var i = 0; i < GameConfig.game_cfg.nPlayerNum; i++) {
                var vBox = GameEnterViewBox.userEnterChild(i, 3);
                var chooseTween = new ChooseTween();
                vBox.addChild(chooseTween);
            }
        }, DealTween.tweenTime);
    };
    // 推荐牌型
    GameControl.Handle_recommend = function (e) {
        GameControl.recommend = e._para.recommendCards;
    };
    // 选择牌型
    GameControl.Handle_ask_choose = function (e) {
        setTimeout(function () {
            new ChooseView(e.timeo, GameControl.dealData, GameControl.recommend);
        }, DealTween.tweenTime + 500);
    };
    // 选择好了牌型
    GameControl.Handle_choose_ok = function (e) {
        var _i = e._src.substr(1, 1);
        var i = Number(_i) - 1;
        var vBox = GameEnterViewBox.userEnterChild(i, 3);
        commonRemoveChild(vBox);
        CompareView.chooseOk(i);
    };
    // 开始比牌
    GameControl.Handle_compare_start = function () {
        var compareStartTween = new CompareStartTween();
        GameView.viewBox.addChild(compareStartTween);
        setTimeout(function () {
            GameView.viewBox.removeChild(compareStartTween);
        }, CompareStartTween.tweenTime);
    };
    // 比牌结果
    GameControl.Handle_compare_result = function (e) {
        // 比牌动画
        new CompareResultTween(e);
    };
    // 比牌结束
    GameControl.Handle_compare_end = function () {
        for (var i = 0; i < GameConfig.game_cfg.nPlayerNum; i++) {
            var vBox4 = GameEnterViewBox.userEnterChild(i, 4);
            commonRemoveChild(vBox4);
            var vBox5 = GameEnterViewBox.userEnterChild(i, 5);
            commonRemoveChild(vBox5);
            var vBox6 = GameEnterViewBox.userEnterChild(i, 6);
            commonRemoveChild(vBox6);
        }
    };
    // 当局结算
    GameControl.Handle_rewards = function (e) {
        GameControl.rewards = e._para;
        // 更新左上角局数信息
        RnoAndJnumGroup.myCollection.replaceItemAt({ nCurrJu: GameControl.rewards.curr_ju + 1, nJuNum: GameControl.rewards.ju_num }, 0);
    };
    return GameControl;
}());
__reflect(GameControl.prototype, "GameControl");
