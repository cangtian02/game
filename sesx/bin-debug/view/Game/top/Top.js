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
 * 头部
 */
var Top = (function (_super) {
    __extends(Top, _super);
    function Top() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Top.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Top.prototype.init = function () {
        var _this = this;
        // 场景盒子
        this.addChild(Top.viewBox);
        Top.viewBox.width = this.stage.stageWidth;
        Top.viewBox.height = 205;
        // 背景
        var viewBg = createBitmapByName("sesx_json.img_3");
        Top.viewBox.addChild(viewBg);
        viewBg.width = Top.viewBox.width;
        viewBg.height = Top.viewBox.height;
        // 财神
        var character = createBitmapByName('default_json.default_1');
        Top.viewBox.addChild(character);
        character.width = 243;
        character.height = 245;
        character.x = (Top.viewBox.width - 243) / 2;
        // 报喜盒子
        Top.viewBox.addChild(Top.baoxi_box);
        Top.baoxi_box.width = 170;
        Top.baoxi_box.height = 60;
        Top.baoxi_box.x = 54;
        Top.baoxi_box.y = 145;
        var arrow = createBitmapByName('sesx_json.img_19');
        Top.baoxi_box.addChild(arrow);
        arrow.width = 22;
        arrow.height = 15;
        arrow.x = 145;
        arrow.y = 24;
        Top.baoxi_box.touchEnabled = true;
        Top.baoxi_box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.showPopup();
        }, this);
        // 吉时盒子
        Top.viewBox.addChild(Top.jishi_box);
        Top.jishi_box.width = 150;
        Top.jishi_box.height = 60;
        Top.jishi_box.x = 438;
        Top.jishi_box.y = 145;
        Top.jishi_box.addChild(Top.jishi_status_box);
        Top.jishi_status_box.width = 100;
        Top.jishi_status_box.height = 60;
        Top.jishi_box.addChild(Top.jishi_time_box);
        Top.jishi_time_box.width = 60;
        Top.jishi_time_box.height = 60;
        Top.jishi_time_box.x = 100;
        new Nav();
    };
    /**
     * 展开当前10期报喜与当前遗漏场景
     */
    Top.prototype.showPopup = function () {
        Popup.init();
        // 拉取遗漏数据
        httpAjaxGet('/zodiac/get-miss', '', function (event) {
            var res_1 = event.currentTarget;
            var res = JSON.parse(res_1.response);
            if (res.code != 0) {
                var toast = new Toast("网络异常，请稍后重试");
                Game.viewBox.addChild(toast);
                return;
            }
            Popup.missData = res.data;
        });
    };
    Top.baoxi_text = function (t) {
        if (Top.baoxi_box.$children.length > 1) {
            Top.baoxi_box.removeChild(Top.baoxi_box.$children[1]);
        }
        var text = createTextFieldByName(t);
        Top.baoxi_box.addChild(text);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 22;
        text.textColor = 0x9F6E6E;
    };
    Top.jishi_status = function (t) {
        if (Top.jishi_status_box.$children.length > 0) {
            Top.jishi_status_box.removeChild(Top.jishi_status_box.$children[0]);
        }
        var text = createTextFieldByName(t);
        Top.jishi_status_box.addChild(text);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 22;
        text.textColor = 0x9F6E6E;
    };
    Top.jishi_time = function (t) {
        if (Top.jishi_time_box.$children.length > 0) {
            Top.jishi_time_box.removeChild(Top.jishi_time_box.$children[0]);
        }
        var text = createTextFieldByName(t);
        Top.jishi_time_box.addChild(text);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 26;
        text.textColor = 0xAF7C7C;
        text.bold = true;
    };
    // 场景盒子
    Top.viewBox = new egret.Sprite();
    // 报喜盒子
    Top.baoxi_box = new egret.Sprite();
    // 吉时盒子
    Top.jishi_box = new egret.Sprite();
    // 吉时状态盒子
    Top.jishi_status_box = new egret.Sprite();
    // 吉时时间盒子
    Top.jishi_time_box = new egret.Sprite();
    return Top;
}(egret.DisplayObjectContainer));
__reflect(Top.prototype, "Top");
//# sourceMappingURL=Top.js.map