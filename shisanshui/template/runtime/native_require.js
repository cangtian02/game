
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/control/websocket/WebSocketGame.js",
	"bin-debug/common/Coommon.js",
	"bin-debug/control/websocket/WebSocketExample.js",
	"bin-debug/view/HomeView/User/HomeCardNumGroup.js",
	"bin-debug/control/home/HomeControl.js",
	"bin-debug/control/public/PublicControl.js",
	"bin-debug/control/websocket/WebSocketConfig.js",
	"bin-debug/view/ViewStart/ViewStart.js",
	"bin-debug/control/game/GameControl.js",
	"bin-debug/Main.js",
	"bin-debug/modules/Button.js",
	"bin-debug/modules/Loading.js",
	"bin-debug/modules/Modal.js",
	"bin-debug/modules/Poker.js",
	"bin-debug/modules/Toast.js",
	"bin-debug/tween/ChooseTween.js",
	"bin-debug/tween/CompareStartTween.js",
	"bin-debug/tween/CountdownTween.js",
	"bin-debug/tween/DealTween.js",
	"bin-debug/view/GameView/choose/ChooseBotView.js",
	"bin-debug/view/GameView/choose/ChooseBtnView.js",
	"bin-debug/view/GameView/choose/ChooseLeftTopView.js",
	"bin-debug/view/GameView/choose/ChoosePokerView.js",
	"bin-debug/common/ResUtils.js",
	"bin-debug/view/GameView/choose/ChooseView.js",
	"bin-debug/view/GameView/common/DissolutionAndShare.js",
	"bin-debug/view/GameView/common/ExitGame.js",
	"bin-debug/view/GameView/common/GameSetting.js",
	"bin-debug/view/GameView/common/GameTable.js",
	"bin-debug/view/GameView/common/RnoAndJnum.js",
	"bin-debug/view/GameView/compare/CompareResultTween.js",
	"bin-debug/view/GameView/compare/CompareView.js",
	"bin-debug/view/GameView/enter/GameEnter.js",
	"bin-debug/view/GameView/enter/GameUserInfo.js",
	"bin-debug/view/GameView/GameView.js",
	"bin-debug/view/GameView/ready/GameReady.js",
	"bin-debug/view/GameView/rewards/GameRewards.js",
	"bin-debug/view/GameView/rewards/GameRewardsPanel.js",
	"bin-debug/view/GameView/votedraw/GameVoteDraw.js",
	"bin-debug/view/HomeView/HomeView.js",
	"bin-debug/view/HomeView/Room/JoinRoomView.js",
	"bin-debug/view/HomeView/Room/OpenRoomView.js",
	"bin-debug/view/HomeView/Room/RoomBtnView.js",
	"bin-debug/control/game/GamePublicControl.js",
	"bin-debug/view/HomeView/User/UserBoxView.js",
	"bin-debug/view/LoginView/LoginView.js",
	"bin-debug/view/GameView/choose/ChooseRightTopView.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 1280,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};