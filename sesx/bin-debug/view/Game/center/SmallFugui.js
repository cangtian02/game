var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 小富贵
 */
var SmallFugui = (function () {
    function SmallFugui() {
        this.updateSmallFugui_flag = false;
        this.createView();
    }
    SmallFugui.prototype.createView = function () {
        // 场景盒子
        Center.viewBox.addChild(SmallFugui.viewBox);
        SmallFugui.viewBox.width = 136;
        SmallFugui.viewBox.height = 170;
        SmallFugui.viewBox.x = 8;
        SmallFugui.viewBox.y = 25;
        // 背景
        var viewBg = createBitmapByName('sesx_json.img_7');
        SmallFugui.viewBox.addChild(viewBg);
        viewBg.width = SmallFugui.viewBox.width;
        viewBg.height = SmallFugui.viewBox.height;
        // 文字盒子定位
        SmallFugui.viewBox.addChild(SmallFugui.textBox);
        SmallFugui.textBox.width = SmallFugui.viewBox.width;
        SmallFugui.textBox.height = SmallFugui.viewBox.height;
        // 倍率盒子定位
        SmallFugui.viewBox.addChild(SmallFugui.beilvBox);
        SmallFugui.beilvBox.width = 50;
        SmallFugui.beilvBox.height = 20;
        SmallFugui.beilvBox.rotation = -45;
        SmallFugui.beilvBox.x = 38;
        SmallFugui.beilvBox.y = 68;
        // 修改按钮
        var updateBtn = createBitmapByName('sesx_json.img_17');
        SmallFugui.viewBox.addChild(updateBtn);
        updateBtn.width = 42;
        updateBtn.height = 42;
        updateBtn.x = SmallFugui.viewBox.width - 36;
        updateBtn.y = -12;
        updateBtn.touchEnabled = true;
        updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateSmallFugui, this);
        // 下注
        viewBg.touchEnabled = true;
        viewBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            new BetControl(19, 3);
        }, this);
    };
    SmallFugui.prototype.updateSmallFugui = function (evt) {
        var _this = this;
        if (this.updateSmallFugui_flag)
            return; // 正在加载资源不做处理
        var fun = function () {
            if (window.localStorage.getItem('ResetFugui_one_small') != 'Y') {
                if (SmallFugui.resetBox1 == undefined) {
                    SmallFugui.resetBox1 = new ResetFugui_one_small();
                    Game.viewBox.addChild(SmallFugui.resetBox1);
                }
                else {
                    SmallFugui.resetBox1.x = 0;
                }
            }
            else {
                if (SmallFugui.resetBox2 == undefined) {
                    SmallFugui.resetBox2 = new ResetFugui_two_small();
                    Game.viewBox.addChild(SmallFugui.resetBox2);
                }
                else {
                    SmallFugui.resetBox2.x = 0;
                }
            }
        };
        if (!ResetFugui.is_res) {
            this.updateSmallFugui_flag = true;
            ResUtils.getInstance().loadGroup("fugui", function () {
                _this.updateSmallFugui_flag = false;
                fun();
            }, this);
        }
        else {
            fun();
        }
    };
    SmallFugui.createText = function (t1, t2) {
        if (SmallFugui.textBox.$children.length > 0) {
            commonRemoveChild(SmallFugui.textBox);
        }
        var t_one = SmallFugui.textStyle(t1);
        SmallFugui.textBox.addChild(t_one);
        t_one.x = 30;
        t_one.y = 7;
        var t_two = SmallFugui.textStyle(t2);
        SmallFugui.textBox.addChild(t_two);
        t_two.x = 10;
        t_two.y = 58;
    };
    SmallFugui.textStyle = function (t) {
        var ts = createTextFieldByName(t);
        ts.size = 22;
        ts.textColor = 0x301F11;
        return ts;
    };
    SmallFugui.createBeishu = function (i) {
        if (SmallFugui.beilvBox.$children.length > 0) {
            commonRemoveChild(SmallFugui.beilvBox);
        }
        var beishu = createTextFieldByName('x' + Game.multiple.small[i]);
        SmallFugui.beilvBox.addChild(beishu);
        beishu.size = 24;
        beishu.textColor = 0xEFB177;
        beishu.width = 50;
        beishu.height = 20;
        beishu.verticalAlign = 'middle';
    };
    // 场景盒子
    SmallFugui.viewBox = new egret.Sprite();
    // 文字盒子
    SmallFugui.textBox = new egret.Sprite();
    // 倍率盒子
    SmallFugui.beilvBox = new egret.Sprite();
    return SmallFugui;
}());
__reflect(SmallFugui.prototype, "SmallFugui");
//# sourceMappingURL=SmallFugui.js.map