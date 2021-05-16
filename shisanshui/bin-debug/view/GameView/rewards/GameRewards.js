var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局结算
 */
var GameRewards = (function () {
    function GameRewards() {
    }
    GameRewards.askReadyAndRewards = function (data, timeo) {
        GameRewards.data = data;
        GameRewards.viewBox = new egret.Sprite();
        var gv = GameView.viewBox;
        var cv = GameRewards.viewBox;
        gv.addChild(cv);
        cv.width = gv.width;
        cv.height = gv.height;
        // 更新各玩家总得分
        var rewards = GameRewards.data.rewards;
        var len = rewards.length;
        for (var i = 0; i < len; i++) {
            var l = Number(rewards[i]._chair.substr(1, 1)) - 1;
            var allcoreBox = GameEnterViewBox.userEnterChild(l, 1);
            allcoreBox.$children[0].removeChild(allcoreBox.$children[0].$children[1]);
            var text = createTextFieldByName(rewards[i].all_score);
            allcoreBox.$children[0].addChild(text);
            text.width = allcoreBox.width;
            text.height = allcoreBox.height;
            text.size = 24;
            text.textColor = 0xF4EF89;
            text.textAlign = 'center';
        }
        var mask = new egret.Sprite();
        cv.addChild(mask);
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 0, cv.width, cv.height);
        mask.graphics.endFill();
        mask.alpha = .65;
        // 设置盒子点击事件，阻止点击事件穿透
        cv.touchEnabled = true;
        // 倒计时计时按钮
        GameRewards.askReady(timeo);
        // 小结算面板
        new GameRewardsPanel();
    };
    GameRewards.askReady = function (timeo) {
        var gv = GameView.viewBox;
        var cv = GameRewards.viewBox;
        var btnBox = new egret.Sprite();
        cv.addChild(btnBox);
        btnBox.width = 180;
        btnBox.height = 70;
        btnBox.x = (cv.width - 180) / 2;
        btnBox.y = cv.height - 95;
        var btnBg = createBitmapByName('public_button_json.button_04');
        btnBox.addChild(btnBg);
        btnBg.width = 180;
        btnBg.height = 70;
        btnBox.addChild(btnTextStyle(timeo));
        var timer = setInterval(function () {
            timeo--;
            if (timeo == 0) {
                clearInterval(timer);
            }
            // 重置数字
            btnBox.removeChild(btnBox.$children[1]);
            btnBox.addChild(btnTextStyle(timeo));
        }, 1000);
        function btnTextStyle(t) {
            var btnText = createTextFieldByName('继续（' + t + 'S）');
            btnText.width = 190;
            btnText.height = 65;
            btnText.textAlign = 'center';
            btnText.verticalAlign = 'middle';
            btnText.size = 24;
            btnText.textColor = 0xFFFFFF;
            btnText.strokeColor = 0xB73700;
            btnText.stroke = 2;
            return btnText;
        }
        btnBox.touchEnabled = true;
        btnBox.addEventListener(egret.TouchEvent.TOUCH_TAP, ready, this);
        function ready() {
            Main.WEBSOCKET.doSend(cfg_ready());
            gv.removeChild(cv);
        }
    };
    return GameRewards;
}());
__reflect(GameRewards.prototype, "GameRewards");
