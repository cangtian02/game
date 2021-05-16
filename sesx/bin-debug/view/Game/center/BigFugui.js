var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大富贵
 */
var BigFugui = (function () {
    function BigFugui() {
        this.updateBigFugui_flag = false;
        this.createView();
    }
    BigFugui.prototype.createView = function () {
        // 场景盒子
        Center.viewBox.addChild(BigFugui.viewBox);
        BigFugui.viewBox.width = 136;
        BigFugui.viewBox.height = 170;
        BigFugui.viewBox.x = Center.viewBox.width - 144;
        BigFugui.viewBox.y = 25;
        // 背景
        var viewBg = createBitmapByName('sesx_json.img_8');
        BigFugui.viewBox.addChild(viewBg);
        viewBg.width = BigFugui.viewBox.width;
        viewBg.height = BigFugui.viewBox.height;
        // 文字盒子定位
        BigFugui.viewBox.addChild(BigFugui.textBox);
        BigFugui.textBox.width = BigFugui.viewBox.width;
        BigFugui.textBox.height = BigFugui.viewBox.height;
        // 修改按钮
        var updateBtn = createBitmapByName('sesx_json.img_16');
        BigFugui.viewBox.addChild(updateBtn);
        updateBtn.width = 42;
        updateBtn.height = 42;
        updateBtn.x = -8;
        updateBtn.y = -12;
        updateBtn.touchEnabled = true;
        updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateBigFugui, this);
        // 下注
        viewBg.touchEnabled = true;
        viewBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            new BetControl(20, 4);
        }, this);
    };
    BigFugui.prototype.updateBigFugui = function (evt) {
        var _this = this;
        if (this.updateBigFugui_flag)
            return; // 正在加载资源不做处理
        var fun = function () {
            if (window.localStorage.getItem('ResetFugui_one_big') != 'Y') {
                if (BigFugui.resetBox1 == undefined) {
                    BigFugui.resetBox1 = new ResetFugui_one_big();
                    Game.viewBox.addChild(BigFugui.resetBox1);
                }
                else {
                    BigFugui.resetBox1.x = 0;
                }
            }
            else {
                if (BigFugui.resetBox2 == undefined) {
                    BigFugui.resetBox2 = new ResetFugui_two_big();
                    Game.viewBox.addChild(BigFugui.resetBox2);
                }
                else {
                    BigFugui.resetBox2.x = 0;
                }
            }
        };
        if (!ResetFugui.is_res) {
            this.updateBigFugui_flag = true;
            ResUtils.getInstance().loadGroup("fugui", function () {
                fun();
                _this.updateBigFugui_flag = false;
            }, this);
        }
        else {
            fun();
        }
    };
    BigFugui.createText = function (t1, t2, t3) {
        if (BigFugui.textBox.$children.length > 0) {
            commonRemoveChild(BigFugui.textBox);
        }
        var t_one = SmallFugui.textStyle(t1);
        BigFugui.textBox.addChild(t_one);
        t_one.x = 60;
        t_one.y = 7;
        var t_two = SmallFugui.textStyle(t2);
        BigFugui.textBox.addChild(t_two);
        t_two.x = 100;
        t_two.y = 46;
        var t_tree = SmallFugui.textStyle(t3);
        BigFugui.textBox.addChild(t_tree);
        t_tree.x = 104;
        t_tree.y = 100;
    };
    BigFugui.createBeishu = function () {
        var beishu = createTextFieldByName('x' + Game.multiple.big);
        BigFugui.viewBox.addChild(beishu);
        beishu.size = 22;
        beishu.textColor = 0xEFB177;
        beishu.width = 50;
        beishu.height = 20;
        beishu.verticalAlign = 'middle';
        beishu.rotation = 45;
        beishu.x = 72;
        beishu.y = 46;
    };
    // 场景盒子
    BigFugui.viewBox = new egret.Sprite();
    // 文字盒子
    BigFugui.textBox = new egret.Sprite();
    return BigFugui;
}());
__reflect(BigFugui.prototype, "BigFugui");
//# sourceMappingURL=BigFugui.js.map