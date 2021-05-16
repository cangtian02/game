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
 * 底部盒子
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
        this.addChild(Bot.view_box);
        Bot.view_box.width = this.stage.stageWidth;
        Bot.view_box.height = 110;
        var user_info_bg = createBitmapByName('Spirit_json.my_headimg_bg');
        Bot.view_box.addChild(user_info_bg);
        user_info_bg.width = 267;
        user_info_bg.height = 100;
        user_info_bg.x = 10;
        var other_user = createBitmapByName('Spirit_json.user_list_btn');
        Bot.view_box.addChild(other_user);
        other_user.width = 103;
        other_user.height = 102;
        other_user.x = Bot.view_box.width - 118;
        Bot.view_box.addChild(Bot.other_sum_box);
        Bot.other_sum_box.width = 210;
        Bot.other_sum_box.height = 30;
        Bot.other_sum_box.x = Bot.view_box.width - 210;
        Bot.other_sum_box.y = 75;
        Bot.createOtherSum();
    };
    Bot.createBetList = function () {
        var bet_box = new egret.Sprite();
        Bot.view_box.addChild(bet_box);
        bet_box.width = 470;
        bet_box.height = 90;
        bet_box.x = 273;
        bet_box.y = 7;
        var _loop_1 = function (i) {
            var box = Bot.betItemBox(Game.bet_list[i]);
            bet_box.addChild(box);
            box.x = 142 * i;
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var item = bet_box.$children[i];
                item.$children[0].alpha = 1;
                item.$children[1].alpha = 0;
                Game.bet_num = Game.bet_list[i];
                for (var j = 0; j < 3; j++) {
                    if (j != i) {
                        var item_other = bet_box.$children[j];
                        item_other.$children[0].alpha = 0;
                        item_other.$children[1].alpha = 1;
                    }
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        var item_first = bet_box.$children[0];
        item_first.$children[0].alpha = 1;
        item_first.$children[1].alpha = 0;
        Game.bet_num = Game.bet_list[0];
    };
    Bot.betItemBox = function (n) {
        var box = new egret.Sprite();
        box.width = 150;
        box.height = 90;
        var bg_1 = createBitmapByName('Spirit_json.bet_item_active_bg');
        bg_1.width = box.width;
        bg_1.height = box.height;
        box.addChild(bg_1);
        bg_1.alpha = 0;
        var bg_2 = createBitmapByName('Spirit_json.bet_item_bg');
        bg_2.width = box.width;
        bg_2.height = box.height;
        box.addChild(bg_2);
        var txt = n >= 100000 ? (n / 10000) + '万' : String(n);
        var t = createTextFieldByName(txt);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 30;
        t.textColor = 0xFFFFFF;
        return box;
    };
    Bot.createUserInfo = function () {
        var name_text = Game.user_info.name;
        name_text.length > 6 ? name_text = name_text.substring(0, 6) : name_text = name_text;
        var name = createTextFieldByName(name_text);
        Bot.view_box.addChild(name);
        name.textColor = 0xFFFFFF;
        name.size = 22;
        name.x = 118;
        name.y = 24;
        // 头像
        var headimg = Game.user_info.headimg == '' ? Main.DEFAULT_CONFIG.http_origin + '/default/static/head_nan_64.png' : Game.user_info.headimg;
        headimg = headimg.split('/');
        if (headimg[headimg.length - 1] == '0' || headimg[headimg.length - 1] == '132') {
            headimg = headimg.splice(0, headimg.length - 1);
            headimg = headimg.join("/") + '/64';
        }
        else {
            headimg = headimg.join("/");
        }
        // 因使用了webgl，微信头像地址跨域，采用图片转base64模式加载微信头像
        httpAjaxGet('/common/trans-base', '?url=' + headimg, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取用户头像异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            var img = new Image();
            img.src = req.data.code;
            img.onload = function () {
                var texture = new egret.Texture();
                var bitmapdata = new egret.BitmapData(img);
                texture._setBitmapData(bitmapdata);
                var bmp = new egret.Bitmap(texture);
                bmp.x = 15;
                bmp.width = 94;
                bmp.height = 94;
                Bot.view_box.addChild(bmp);
                // 头像遮罩
                var circle = new egret.Shape();
                circle.graphics.beginFill(0xF6C728);
                circle.graphics.drawCircle(50, 50, 46);
                circle.graphics.endFill();
                circle.x = 10;
                Bot.view_box.addChild(circle);
                bmp.mask = circle;
                // 头像边框
                var shp = new egret.Shape();
                shp.graphics.lineStyle(3, 0xCB9A52);
                shp.graphics.beginFill(0xCB9A52, 0);
                shp.graphics.drawCircle(50, 50, 44);
                shp.graphics.endFill();
                shp.x = 10;
                Bot.view_box.addChild(shp);
            };
        });
        var point_bg = createBitmapByName('Spirit_json.point_bg');
        point_bg.width = 230;
        point_bg.height = 50;
        Bot.view_box.addChild(point_bg);
        point_bg.x = 40;
        point_bg.y = 52;
        var add_point = createBitmapByName('Spirit_json.add_cur');
        add_point.width = 46;
        add_point.height = 46;
        Bot.view_box.addChild(add_point);
        add_point.x = 230;
        add_point.y = 53;
        add_point.touchEnabled = true;
        add_point.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var callback = function () {
                var toast = new Toast('购买成功');
                Game.view_box.addChild(toast);
                httpAjaxGet('/dice/user', '', function (event) {
                    var req_1 = event.currentTarget;
                    var req = JSON.parse(req_1.response);
                    if (req.code != 0)
                        return;
                    Game.user_info = req.data;
                    // 更新自己的星币
                    Bot.createUserPoint();
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
        }, this);
    };
    Bot.createUserPoint = function () {
        // 第一次绘制
        if (Bot.currency_box.x == 0) {
            Bot.view_box.addChild(Bot.currency_box);
            Bot.currency_box.width = 115;
            Bot.currency_box.height = 50;
            Bot.currency_box.x = 110;
            Bot.currency_box.y = 52;
        }
        if (Bot.currency_box.$children.length > 0) {
            commonRemoveChild(Bot.currency_box);
        }
        var point = createTextFieldByName(Game.user_info.point);
        Bot.currency_box.addChild(point);
        point.height = 50;
        point.verticalAlign = 'middle';
        point.size = 24;
        point.textColor = 0xFFF060;
    };
    /**
     * 自己星币输赢情况动画 头像上展示赢或者输得数量
     */
    Bot.myPointTween = function (n) {
        if (n == undefined || n == 0)
            return;
        var text = n < 0 ? String(n) : '+' + n;
        var ts = createTextFieldByName(text);
        Bot.view_box.addChild(ts);
        ts.x = 100;
        ts.y = -10;
        ts.size = 34;
        ts.textColor = 0xF7E238;
        ts.alpha = 0;
        var tw_ts = egret.Tween.get(ts);
        tw_ts.to({ 'y': -30, 'alpha': 1 }, 600).wait(2000).to({ 'y': -60, 'alpha': 0 }, 600).call(function () {
            Bot.view_box.removeChild(ts);
        }, this);
    };
    /**
     * 当前在线人数
     */
    Bot.createOtherSum = function () {
        if (Bot.other_sum_box.$children.length > 0) {
            commonRemoveChild(Bot.other_sum_box);
        }
        var ts = createTextFieldByName('当前在线：' + Bot.other_sum);
        Bot.other_sum_box.addChild(ts);
        ts.width = 200;
        ts.height = 30;
        ts.size = 20;
        ts.textAlign = 'right';
        ts.textColor = 0xffffff;
        ts.verticalAlign = 'middle';
    };
    Bot.view_box = new egret.Sprite(); // 场景盒子
    Bot.currency_box = new egret.Sprite(); // 我的星币盒子
    Bot.other_sum_box = new egret.Sprite(); // 当前在线人数盒子
    Bot.other_sum = 0; // 当前在线人数
    return Bot;
}(egret.DisplayObjectContainer));
__reflect(Bot.prototype, "Bot");
//# sourceMappingURL=Bot.js.map