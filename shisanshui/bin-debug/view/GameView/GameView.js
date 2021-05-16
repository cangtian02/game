var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏场景
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        GameView.self = _this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    GameView.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    GameView.prototype.init = function () {
        // 场景盒子
        this.addChild(GameView.viewBox);
        GameView.viewBox.width = this.stage.stageWidth;
        GameView.viewBox.height = this.stage.stageHeight;
    };
    GameView.createView = function () {
        // 桌子
        new GameTable(GameConfig.game_cfg.nPlayerNum);
        // 退出
        new ExitGame();
        // 局数房号信息
        new RnoAndJnum(GameConfig.game_cfg.rno);
        RnoAndJnumGroup.myCollection.replaceItemAt({ nCurrJu: GameConfig.game_cfg.nCurrJu, nJuNum: GameConfig.game_cfg.nJuNum }, 0);
        // 开房规则
        new GameSetting(GameConfig.game_cfg.GameSetting.bSupportWaterBanker, GameConfig.game_cfg.GameSetting.bSupportGhostCard, GameConfig.game_cfg.GameSetting.bSupportBuyCode);
        // 解散房间与邀请好友
        new DissolutionAndShare();
        setTimeout(function () {
            //    var rewards: any = '{"banker":1,"curr_ju":1,"ju_num":8,"rewards":[{"_chair":"p1","_uid":7539008,"all_score":-6,"bBigWinner":false,"nAllShootNums":0,"nFirstType":1,"nSecondType":2,"nShootNums":0,"nSpecialNums":0,"nSpecialType":0,"nThirdType":6,"nWinNums":0,"stCards":[35,38,41,45,46,12,60,20,51,18,27,7,21]},{"_chair":"p2","_uid":16844596,"all_score":6,"bBigWinner":true,"nAllShootNums":0,"nFirstType":1,"nSecondType":6,"nShootNums":1,"nSpecialNums":0,"nSpecialType":0,"nThirdType":7,"nWinNums":1,"stCards":[9,25,57,37,53,6,8,10,13,14,59,23,22]}],"rid":"22679","ts":1510022033,"uri":"/chess/10"}';
            //    GameRewards.askReadyAndRewards(JSON.parse(rewards),300);
        }, 1000);
    };
    return GameView;
}(egret.DisplayObjectContainer));
// 场景盒子
GameView.viewBox = new egret.Sprite();
__reflect(GameView.prototype, "GameView");
//    理牌
//    var cards: any = {"nLeftCardNums":26,"nNeedRecommend":1,"nSpecialScore":0,"nSpecialType":0,"stCards":[50,51,52,39,9,25,10,26,42,11,27,45,46]};
//    var recommend: any = [{"Cards":[10,26,42,9,25,11,27,52,51,50,46,45,39],"Types":[7,2,1]},{"Cards":[10,26,42,52,51,11,27,9,25,50,46,45,39],"Types":[4,3,1]}];
//    new ChooseView(300,cards,recommend);
//    求和
//    GameVoteDraw.voteDrawStart(300,1);
//    比牌
//    CompareView.chooseOk(0);
//    CompareView.chooseOk(1);
//    var data = JSON.parse('{"_cmd":"compare_result","_para":{"_chair":"p1","_uid":16196776,"nAllShootChairID":0,"nLeftCardNums":26,"stAllCompareData":[{"chairid":1,"nFirstType":4,"nOpenFirst":1,"nOpenSecond":2,"nOpenSpecial":0,"nOpenThird":1,"nSecondType":5,"nSpecialType":0,"nThirdType":7,"nTotallScore":-1,"stCards":[3,19,35,18,34,58,27,44,45,30,26,79,95],"stShoots":{}},{"chairid":2,"nFirstType":1,"nOpenFirst":2,"nOpenSecond":1,"nOpenSpecial":0,"nOpenThird":2,"nSecondType":5,"nSpecialType":0,"nThirdType":7,"nTotallScore":1,"stCards":[55,39,7,20,36,8,41,42,43,12,21,10,14],"stShoots":{}}],"stCompareScores":[{"nCodeMult":2,"nFinalScore":-1,"nFirstScore":-1,"nFirstScoreExt":0,"nHasCode":0,"nSecondScore":1,"nSecondScoreExt":0,"nShoot":0,"nShootMult":2,"nSpecialScore":0,"nThirdScore":-1,"nThirdScoreExt":0,"nWanterMult":0,"toChairid":2}],"stLeftCards":[62,11,13,37,50,25,29,59,61,40,51,23,56,6,46,52,22,28,38,57,2,5,9,60,4,53]},"_src":"p1","_st":"nti"}');
//    new CompareResultTween(data);
//    小结算
//    var rewards: any = '{"banker":1,"curr_ju":1,"ju_num":8,"rewards":[{"_chair":"p1","_uid":7539008,"all_score":-6,"bBigWinner":false,"nAllShootNums":0,"nFirstType":1,"nSecondType":2,"nShootNums":0,"nSpecialNums":0,"nSpecialType":0,"nThirdType":6,"nWinNums":0,"stCards":[35,38,41,45,46,12,60,20,51,18,27,7,21]},{"_chair":"p2","_uid":16844596,"all_score":6,"bBigWinner":true,"nAllShootNums":0,"nFirstType":1,"nSecondType":6,"nShootNums":1,"nSpecialNums":0,"nSpecialType":0,"nThirdType":7,"nWinNums":1,"stCards":[9,25,57,37,53,6,8,10,13,14,59,23,22]}],"rid":"22679","ts":1510022033,"uri":"/chess/10"}';
//    GameRewards.askReadyAndRewards(JSON.parse(rewards),300);
