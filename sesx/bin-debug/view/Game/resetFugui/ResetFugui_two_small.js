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
 * 编辑小富贵
 */
var ResetFugui_two_small = (function (_super) {
    __extends(ResetFugui_two_small, _super);
    function ResetFugui_two_small() {
        var _this = _super.call(this) || this;
        _this.select_status = [0, 0, 0]; // 三种选择状态
        if (_this.stage) {
            _this.createView();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    ResetFugui_two_small.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createView();
    };
    ResetFugui_two_small.prototype.createView = function () {
        var _this = this;
        // 拷贝一份小富贵配置数据到本地
        this.small = JSON.parse(JSON.stringify(Game.small));
        this.small_type = Game.small_type;
        this.addChild(ResetFugui_two_small.viewBox);
        ResetFugui_two_small.viewBox.width = this.stage.stageWidth;
        ResetFugui_two_small.viewBox.height = this.stage.stageHeight;
        ResetFugui_two_small.viewBox.touchEnabled = true;
        // 遮罩
        var m_mask = Game.m_mask();
        ResetFugui_two_small.viewBox.addChild(m_mask);
        // 内容盒子
        ResetFugui_two_small.viewBox.addChild(ResetFugui_two_small.modalBox);
        ResetFugui_two_small.modalBox.width = 617;
        ResetFugui_two_small.modalBox.height = 629;
        ResetFugui_two_small.modalBox.x = (ResetFugui_two_small.viewBox.width - ResetFugui_two_small.modalBox.width) / 2;
        ResetFugui_two_small.modalBox.y = (ResetFugui_two_small.viewBox.height - ResetFugui_two_small.modalBox.height) / 2;
        var resetFugui_modalBox = ResetFugui.resetFugui_modalBox('small');
        ResetFugui_two_small.modalBox.addChild(resetFugui_modalBox);
        // 关闭盒子
        var closeBtn = new egret.Shape();
        closeBtn.graphics.beginFill(0xC8504B, 0);
        closeBtn.graphics.drawRect(ResetFugui_two_small.modalBox.width - 70, 0, 50, 50);
        closeBtn.graphics.endFill();
        ResetFugui_two_small.modalBox.addChild(closeBtn);
        closeBtn.touchEnabled = true;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SmallFugui.resetBox2.x = -ResetFugui_two_small.viewBox.width;
        }, this);
        ResetFugui_two_small.modalBox.addChild(ResetFugui_two_small.warpBox);
        ResetFugui_two_small.warpBox.width = ResetFugui_two_small.modalBox.width - 100;
        ResetFugui_two_small.warpBox.height = 400;
        ResetFugui_two_small.warpBox.x = 50;
        ResetFugui_two_small.warpBox.y = 110;
        this.createModal();
        this.createItem_1();
        this.createItem_2();
        this.createItem_3();
        for (var i = 0; i < 2; i++) {
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, 0xA17C58);
            if (i == 0) {
                shp.graphics.moveTo(ResetFugui_two_small.warpBox.width - 400, 97.5);
                shp.graphics.lineTo(ResetFugui_two_small.warpBox.width - 2, 97.5);
            }
            else {
                shp.graphics.moveTo(ResetFugui_two_small.warpBox.width - 460, 192.5);
                shp.graphics.lineTo(ResetFugui_two_small.warpBox.width - 2, 192.5);
            }
            shp.graphics.endFill();
            ResetFugui_two_small.warpBox.addChild(shp);
        }
        // 确认盒子
        var btnBox = ResetFugui.resetFugui_btnBox();
        ResetFugui_two_small.modalBox.addChild(btnBox);
        btnBox.touchEnabled = true;
        btnBox.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.return_fun();
        }, this);
    };
    /**
     * 点击确认
     */
    ResetFugui_two_small.prototype.return_fun = function () {
        // 检查是否合法
        if (JSON.stringify(this.small).indexOf('-1') > -1) {
            var toast = new Toast("自由选择串关，选项二串一");
            Game.viewBox.addChild(toast);
            return;
        }
        // 保存值
        Game.small = JSON.parse(JSON.stringify(this.small));
        Game.small_type = this.small_type;
        // 缓存
        window.localStorage.setItem('Game_small', JSON.stringify(Game.small));
        window.localStorage.setItem('Game_small_type', String(Game.small_type));
        // 更改table上的小富贵
        if (Game.small_type == 0) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]], Game.pointCNList[1][Game.small[1]]);
        }
        else if (Game.small_type == 1) {
            SmallFugui.createText(Game.pointCNList[0][Game.small[0]], Game.pointCNList[2][Game.small[1]]);
        }
        else {
            SmallFugui.createText(Game.pointCNList[1][Game.small[0]], Game.pointCNList[2][Game.small[1]]);
        }
        SmallFugui.createBeishu(Game.small_type);
        // 隐藏盒子
        SmallFugui.resetBox2.x = -ResetFugui_two_small.viewBox.width;
    };
    ResetFugui_two_small.prototype.createModal = function () {
        ResetFugui_two_small.warpBox.addChild(ResetFugui_two_small.textBox);
        ResetFugui_two_small.textBox.width = 136;
        ResetFugui_two_small.textBox.height = 170;
        ResetFugui_two_small.textBox.x = 10;
        ResetFugui_two_small.textBox.y = 10;
        var viewBg = createBitmapByName('sesx_json.img_7');
        ResetFugui_two_small.textBox.addChild(viewBg);
        viewBg.width = ResetFugui_two_small.textBox.width;
        viewBg.height = ResetFugui_two_small.textBox.height;
        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText1);
        ResetFugui_two_small.createText1.x = 30;
        ResetFugui_two_small.createText1.y = 7;
        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText2);
        ResetFugui_two_small.createText2.x = 10;
        ResetFugui_two_small.createText2.y = 58;
        ResetFugui_two_small.textBox.addChild(ResetFugui_two_small.createText3);
        ResetFugui_two_small.createText3.x = 42;
        ResetFugui_two_small.createText3.y = 66;
        ResetFugui_two_small.createText3.rotation = -45;
        if (Game.small_type == 0) {
            this.createText1(Game.pointCNList[0][Game.small[0]]);
            this.createText2(Game.pointCNList[1][Game.small[1]]);
            this.select_status = [1, 1, 0];
        }
        else if (Game.small_type == 1) {
            this.createText1(Game.pointCNList[0][Game.small[0]]);
            this.createText2(Game.pointCNList[2][Game.small[1]]);
            this.select_status = [1, 0, 1];
        }
        else {
            this.createText1(Game.pointCNList[1][Game.small[0]]);
            this.createText2(Game.pointCNList[2][Game.small[1]]);
            this.select_status = [0, 1, 1];
        }
        this.createText3('x' + Game.multiple.small[Game.small_type]);
    };
    /**
     * 更改金玉
     */
    ResetFugui_two_small.prototype.createText1 = function (t) {
        if (ResetFugui_two_small.createText1.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText1);
        }
        ResetFugui_two_small.createText1.addChild(SmallFugui.textStyle(t));
    };
    /**
     * 更改五福或者生肖
     */
    ResetFugui_two_small.prototype.createText2 = function (t) {
        if (ResetFugui_two_small.createText2.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText2);
        }
        ResetFugui_two_small.createText2.addChild(SmallFugui.textStyle(t));
    };
    /**
     * 更改倍数
     */
    ResetFugui_two_small.prototype.createText3 = function (t) {
        if (ResetFugui_two_small.createText3.$children.length > 0) {
            commonRemoveChild(ResetFugui_two_small.createText3);
        }
        var ts = createTextFieldByName(t);
        ts.size = 24;
        ts.textColor = 0xEFB177;
        ts.width = 50;
        ts.height = 20;
        ts.verticalAlign = 'middle';
        ResetFugui_two_small.createText3.addChild(ts);
    };
    /**
     * 选择金玉
     */
    ResetFugui_two_small.prototype.createItem_1 = function () {
        var _this = this;
        var box = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 180;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 150;
        box.y = 20;
        var _loop_1 = function (i) {
            var item = ResetFugui.item(Game.pointCNList[0][i]);
            box.addChild(item);
            item.x = i * 80;
            if (Game.small_type == 0 || Game.small_type == 1) {
                if (i == Game.small[0]) {
                    item.swapChildren(item.$children[0], item.$children[1]);
                }
            }
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.select_jinyu(box, i);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 2; i++) {
            _loop_1(i);
        }
    };
    ResetFugui_two_small.prototype.select_jinyu = function (box, i) {
        if (this.select_status[1] == 1 && this.select_status[2] == 1) {
            var toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        var j;
        i == 0 ? j = 1 : j = 0;
        var item1 = box.$children[i]; // 选中的
        var item2 = box.$children[j]; // 未选择的
        if (this.select_status[0] == 1) {
            // 样式切换
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            if (i == this.small[0]) {
                if (this.select_status[1] == 1) {
                    this.small[0] = this.small[1];
                    this.small[1] = -1;
                    this.createText1(Game.pointCNList[1][this.small[0]]);
                    this.createText2('');
                }
                else {
                    this.small[0] = -1;
                    this.createText1('');
                }
                // 标记未选择金玉
                this.select_status[0] = 0;
                // 更改倍率为0
                this.createText3('x0');
            }
            else {
                if (this.select_status[1] == 1) {
                    this.small_type = 0;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                }
                else if (this.select_status[2] == 1) {
                    this.small_type = 1;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                }
                else {
                    this.createText3('x0');
                }
                // 样式切换
                item2.swapChildren(item2.$children[0], item2.$children[1]);
                // 展示选中的值
                this.createText1(Game.pointCNList[0][i]);
                // 修改small第一选项
                this.small[0] = i;
            }
        }
        else {
            // 样式切换
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            // 展示选中的值
            this.createText1(Game.pointCNList[0][i]);
            // 标记已选择金玉
            this.select_status[0] = 1;
            if (this.select_status[1] == 1) {
                this.small_type = 0;
                this.small[1] = this.small[0];
                this.small[0] = i;
                this.createText2(Game.pointCNList[1][this.small[1]]);
                this.createText3('x' + Game.multiple.small[this.small_type]);
            }
            else if (this.select_status[2] == 1) {
                this.small_type = 1;
                this.small[0] = i;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            }
            else {
                this.small[0] = i;
                this.createText3('x0');
            }
        }
    };
    /**
     * 选择五福
     */
    ResetFugui_two_small.prototype.createItem_2 = function () {
        var _this = this;
        var box = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 380;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 390;
        box.y = 115;
        var _loop_2 = function (i) {
            var item = ResetFugui.item(Game.pointCNList[1][i]);
            box.addChild(item);
            item.x = i * 80;
            if (Game.small_type == 0 && i == Game.small[1]) {
                item.swapChildren(item.$children[0], item.$children[1]);
            }
            else if (Game.small_type == 2 && i == Game.small[0]) {
                item.swapChildren(item.$children[0], item.$children[1]);
            }
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.select_wufu(box, i);
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 5; i++) {
            _loop_2(i);
        }
    };
    ResetFugui_two_small.prototype.select_wufu = function (box, i) {
        if (this.select_status[0] == 1 && this.select_status[2] == 1) {
            var toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        var item1 = box.$children[i]; // 选中的
        if (this.select_status[1] == 1) {
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            if (this.select_status[0] == 1) {
                if (i == this.small[1]) {
                    this.createText2('');
                    this.small[1] = -1;
                    this.createText3('x0');
                    this.select_status[1] = 0;
                }
                else {
                    this.createText2(Game.pointCNList[1][i]);
                    var item2 = box.$children[this.small[1]];
                    item2.swapChildren(item2.$children[0], item2.$children[1]);
                    this.small[1] = i;
                }
            }
            else if (this.select_status[2] == 1) {
                if (i == this.small[0]) {
                    this.createText1('');
                    this.small[0] = -1;
                    this.createText3('x0');
                    this.select_status[1] = 0;
                }
                else {
                    this.createText1(Game.pointCNList[1][i]);
                    var item2 = box.$children[this.small[0]];
                    item2.swapChildren(item2.$children[0], item2.$children[1]);
                    this.small[0] = i;
                }
            }
            else {
                if (i == this.small[0]) {
                    this.createText1('');
                    this.small[0] = -1;
                    this.select_status[1] = 0;
                }
                else {
                    this.createText1(Game.pointCNList[1][i]);
                    var item2 = box.$children[this.small[0]];
                    item2.swapChildren(item2.$children[0], item2.$children[1]);
                    this.small[0] = i;
                }
            }
        }
        else {
            if (this.select_status[0] == 1) {
                this.small_type = 0;
                this.small[1] = i;
                this.createText2(Game.pointCNList[1][i]);
                this.createText3('x' + Game.multiple.small[this.small_type]);
            }
            else if (this.select_status[0] == 0) {
                this.small[0] = i;
                this.createText1(Game.pointCNList[1][i]);
                if (this.select_status[2] == 1) {
                    this.small_type = 2;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                }
                else {
                    this.createText3('x0');
                }
            }
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            this.select_status[1] = 1;
        }
    };
    /**
     * 选择生肖
     */
    ResetFugui_two_small.prototype.createItem_3 = function () {
        var _this = this;
        var box = new egret.Sprite();
        ResetFugui_two_small.warpBox.addChild(box);
        box.width = 460;
        box.height = 60;
        box.x = ResetFugui_two_small.warpBox.width - 470;
        box.y = 210;
        var _loop_3 = function (i) {
            var item = ResetFugui.item(Game.pointCNList[2][i]);
            box.addChild(item);
            if (i < 6) {
                item.x = i * 80;
            }
            else {
                item.x = (i - 6) * 80;
                item.y = 85;
            }
            if (Game.small_type == 1 && i == Game.small[1]) {
                item.swapChildren(item.$children[0], item.$children[1]);
            }
            else if (Game.small_type == 2 && i == Game.small[1]) {
                item.swapChildren(item.$children[0], item.$children[1]);
            }
            item.touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.select_zodiac(box, i);
            }, this_3);
        };
        var this_3 = this;
        for (var i = 0; i < 12; i++) {
            _loop_3(i);
        }
    };
    ResetFugui_two_small.prototype.select_zodiac = function (box, i) {
        if (this.select_status[0] == 1 && this.select_status[1] == 1) {
            var toast = new Toast("更换选项需先取消当前已选内容");
            Game.viewBox.addChild(toast);
            return;
        }
        var item1 = box.$children[i]; // 选中的
        if (this.select_status[2] == 1) {
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            if (i == this.small[1]) {
                this.small[1] = -1;
                this.select_status[2] = 0;
                this.createText2('');
                this.createText3('x0');
            }
            else {
                var item2 = box.$children[this.small[1]];
                item2.swapChildren(item2.$children[0], item2.$children[1]);
                this.small[1] = i;
                this.createText2(Game.pointCNList[2][i]);
                if (this.select_status[0] == 1) {
                    this.small_type = 1;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                }
                else if (this.select_status[1] == 1) {
                    this.small_type = 2;
                    this.createText3('x' + Game.multiple.small[this.small_type]);
                }
                else {
                    this.createText3('x0');
                }
            }
        }
        else {
            this.small[1] = i;
            this.select_status[2] = 1;
            this.createText2(Game.pointCNList[2][i]);
            item1.swapChildren(item1.$children[0], item1.$children[1]);
            if (this.select_status[0] == 1) {
                this.small_type = 1;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            }
            else if (this.select_status[1] == 1) {
                this.small_type = 2;
                this.createText3('x' + Game.multiple.small[this.small_type]);
            }
            else {
                this.createText3('x0');
            }
        }
    };
    // 场景盒子
    ResetFugui_two_small.viewBox = new egret.Sprite();
    // 内容盒子
    ResetFugui_two_small.modalBox = new egret.Sprite();
    // warpbox
    ResetFugui_two_small.warpBox = new egret.Sprite();
    // textBox
    ResetFugui_two_small.textBox = new egret.Sprite();
    // createText
    ResetFugui_two_small.createText1 = new egret.Sprite();
    ResetFugui_two_small.createText2 = new egret.Sprite();
    ResetFugui_two_small.createText3 = new egret.Sprite();
    return ResetFugui_two_small;
}(egret.DisplayObjectContainer));
__reflect(ResetFugui_two_small.prototype, "ResetFugui_two_small");
//# sourceMappingURL=ResetFugui_two_small.js.map