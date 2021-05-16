var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 底部
 */
var Bot = (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Bot.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Bot.prototype.init = function () {
        var _this = this;
        // 场景盒子
        this.addChild(Bot.viewBox);
        Bot.viewBox.width = this.stage.stageWidth;
        Bot.viewBox.height = 110;
        // 背景
        var viewBg = createBitmapByName("sesx_json.img_4");
        Bot.viewBox.addChild(viewBg);
        viewBg.width = Bot.viewBox.width;
        viewBg.height = Bot.viewBox.height;
        var text_my_cur = createTextFieldByName('我的星币');
        Bot.viewBox.addChild(text_my_cur);
        text_my_cur.size = 24;
        text_my_cur.textColor = 0x906262;
        text_my_cur.x = 50;
        text_my_cur.y = 26;
        var cur_bg = createBitmapByName('sesx_json.img_33');
        Bot.viewBox.addChild(cur_bg);
        cur_bg.width = 168;
        cur_bg.height = 36;
        cur_bg.x = 30;
        cur_bg.y = 60;
        // 星币盒子
        Bot.viewBox.addChild(Bot.curBox);
        Bot.curBox.width = 130;
        Bot.curBox.height = 36;
        Bot.curBox.x = 44;
        Bot.curBox.y = 60;
        // 获取星币
        var get_cur_btn = createBitmapByName('sesx_json.img_27');
        Bot.viewBox.addChild(get_cur_btn);
        get_cur_btn.width = 50;
        get_cur_btn.height = 50;
        get_cur_btn.x = 174;
        get_cur_btn.y = 51;
        get_cur_btn.touchEnabled = true;
        get_cur_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.get_cur, this);
        // 清除按钮
        var cleanBtn = createBitmapByName('sesx_json.img_32');
        Bot.viewBox.addChild(cleanBtn);
        cleanBtn.width = 79;
        cleanBtn.height = 76;
        cleanBtn.x = Bot.viewBox.width - 85;
        cleanBtn.y = 16;
        cleanBtn.touchEnabled = true;
        cleanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.cancel();
        }, this);
    };
    /**
     * 清除下注
     */
    Bot.prototype.cancel = function () {
        // 算奖派奖期间不能清除下注
        if (Game.status != 1)
            return;
        // 从未下过注
        if (BetControl.betPos.length == 0) {
            var toast = new Toast("您还未有下注");
            Game.viewBox.addChild(toast);
            return;
        }
        httpAjaxPost('/zodiac/cancel', { qihao: Game.qihao }, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code == '-1') {
                var toast = new Toast("已过投注截止时间，不能取消投注");
                Game.viewBox.addChild(toast);
                return;
            }
            if (req.code != 0) {
                var toast = new Toast("清除下注异常，请稍后重试");
                Game.viewBox.addChild(toast);
                return;
            }
            commonRemoveChild(TableBetInfo.meBetBox);
            // 清空保存的值
            BetControl.curBetNum = 0;
            BetControl.betPos.length = 0;
            var betNum = 0;
            for (var i = 0; i < BetControl.betNum.length; i++) {
                betNum = betNum + BetControl.betNum[i];
                // 更改全部下注数量
                BetControl.otherBetNum[i] = BetControl.otherBetNum[i] - BetControl.betNum[i];
            }
            // 更新自己的星币
            Game.userinfo.point = Game.userinfo.point + betNum;
            Bot.createCur(Game.userinfo.point);
            BetControl.betNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    };
    /**
     * 购买星币
     */
    Bot.prototype.get_cur = function (evt) {
        var callback = function () {
            var toast = new Toast('购买成功');
            Game.viewBox.addChild(toast);
            httpAjaxGet('/dice/user', '', function (event) {
                var req_1 = event.currentTarget;
                var req = JSON.parse(req_1.response);
                if (req.code != 0)
                    return;
                Game.userinfo = req.data;
                // 更新自己的星币
                Bot.createCur(Game.userinfo.point);
            });
        };
        if (window.yxjc_pay == undefined) {
            loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/pay/yxjc_pay.js?ver=' + window.yxjc_public_config.ver.pay);
            var timer_1;
            timer_1 = setInterval(function () {
                if (window.yxjc_pay != undefined) {
                    clearInterval(timer_1);
                    window.yxjc_pay.init(Main.DEFAULT_CONFIG.api_url, callback);
                }
            }, 20);
        }
        else {
            window.yxjc_pay.init(Main.DEFAULT_CONFIG.api_url, callback);
        }
    };
    /**
     * 展示我的星币数量
     */
    Bot.createCur = function (n) {
        if (Bot.curBox.$children.length > 0) {
            commonRemoveChild(Bot.curBox);
        }
        var ts = createTextFieldByName(n);
        Bot.curBox.addChild(ts);
        ts.size = 26;
        ts.textColor = 0xDAABAB;
        ts.height = 36;
        ts.verticalAlign = 'middle';
    };
    /**
     * 我的下注列表
     */
    Bot.createBetList = function (betNum) {
        Bot.viewBox.addChild(Bot.betBtnBox);
        Bot.betBtnBox.width = 315;
        Bot.betBtnBox.height = Bot.viewBox.height;
        Bot.betBtnBox.x = 240;
        var _loop_1 = function (i) {
            var betItem = new egret.Sprite();
            Bot.betBtnBox.addChild(betItem);
            betItem.width = 105;
            betItem.height = Bot.viewBox.height;
            betItem.x = i * 105;
            var bg = createBitmapByName('sesx_json.img_23');
            betItem.addChild(bg);
            bg.width = 88;
            bg.height = 82;
            bg.y = 24;
            var n = betNum[i];
            n / 10000 >= 10 ? n = n / 10000 + 'W' : n = n;
            var num = createTextFieldByName(n);
            betItem.addChild(num);
            num.textColor = 0x673228;
            num.size = 24;
            num.width = 88;
            num.textAlign = 'center';
            num.y = 80;
            betItem.touchEnabled = true;
            betItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Bot.betBtnTween(i);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        Bot.betBtnTween(0);
    };
    /**
     * 下注选项动画
     */
    Bot.betBtnTween = function (i) {
        Game.betItem = Game.betList[i];
        var tw_btn = egret.Tween.get(Bot.betBtnBox.$children[i]);
        tw_btn.to({ 'y': -10, 'alpha': 1 }, 300);
        for (var j = 0; j < 3; j++) {
            if (j != i) {
                var tw_btn_1 = egret.Tween.get(Bot.betBtnBox.$children[j]);
                tw_btn_1.to({ 'y': 0, 'alpha': .7 }, 300);
            }
        }
    };
    // 场景盒子
    Bot.viewBox = new egret.Sprite();
    // 星币数量盒子
    Bot.curBox = new egret.Sprite();
    // 下注盒子
    Bot.betBtnBox = new egret.Sprite();
    return Bot;
}(egret.DisplayObjectContainer));
__reflect(Bot.prototype, "Bot");
//# sourceMappingURL=Bot.js.map