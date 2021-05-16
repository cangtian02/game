var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Modal 弹出框
 * index number 1，2，3代表几级弹框
 */
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        // modal顶级盒子
        _this.modalBox = new egret.Sprite();
        // 弹框盒子
        _this.modalWarp = new egret.Sprite();
        // 各级弹框的宽高
        _this.moadl_size = [
            { "width": 1040, "height": 660 },
            { "width": 760, "height": 600 },
            { "width": 760, "height": 420 }
        ];
        // 弹框宽高
        _this.modalWidth = 0;
        _this.modalHeight = 0;
        // 舞台宽高
        _this.stageWidth = 0;
        _this.stageHeight = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Modal.prototype.createView = function () {
        // 框宽高
        this.modalWidth = this.moadl_size[this.index - 1].width;
        this.modalHeight = this.moadl_size[this.index - 1].height;
        // 舞台宽高
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
        // 绘制modal盒子
        this.addChild(this.modalBox);
        this.modalBox.width = this.stageWidth;
        this.modalBox.height = this.stageHeight;
        // 设置modal盒子点击事件，阻止点击事件穿透
        this.modalBox.touchEnabled = true;
        // 绘制黑色透明背景
        var m_mask = new egret.Sprite();
        this.modalBox.addChild(m_mask);
        m_mask.graphics.beginFill(0x000000);
        m_mask.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        m_mask.graphics.endFill();
        m_mask.alpha = .6;
        // 弹框盒子
        this.modalBox.addChild(this.modalWarp);
        this.modalWarp.width = this.modalWidth;
        this.modalWarp.height = this.modalHeight;
        this.modalWarp.x = (this.stageWidth - this.modalWidth) / 2;
        this.modalWarp.y = (this.stageHeight - this.modalHeight) / 2;
        // 根据传入index判断弹出几级弹框
        if (this.index == 1 || this.index == 2) {
            this.render_moadl_one_and_two();
        }
        else if (this.index == 3) {
            this.render_moadl_tree();
        }
    };
    Modal.prototype.render_moadl_one_and_two = function () {
        // 盒子透明底
        var warp_mask = createBitmapByName("public_modal_mask_png");
        this.modalWarp.addChild(warp_mask);
        warp_mask.width = this.modalWarp.width + 12;
        warp_mask.height = this.modalWarp.height - 20;
        warp_mask.x = -6;
        warp_mask.y = 20;
        // 盒子顶部条
        if (this.index == 1) {
            var warp_top_left = createBitmapByName("public_modal_json.modal_1_top");
        }
        else {
            var warp_top_left = createBitmapByName("public_modal_json.modal_2_top");
        }
        this.modalWarp.addChild(warp_top_left);
        warp_top_left.width = this.modalWidth / 2 + 3;
        warp_top_left.height = 66;
        warp_top_left.skewY = 180;
        warp_top_left.x = this.modalWidth / 2;
        if (this.index == 1) {
            var warp_top_right = createBitmapByName("public_modal_json.modal_1_top");
        }
        else {
            var warp_top_right = createBitmapByName("public_modal_json.modal_2_top");
        }
        this.modalWarp.addChild(warp_top_right);
        warp_top_right.width = this.modalWidth / 2 + 3;
        warp_top_right.height = 66;
        warp_top_right.x = this.modalWidth / 2;
        // 盒子底部条
        var warp_bot_left = createBitmapByName("public_modal_json.modal_bot");
        this.modalWarp.addChild(warp_bot_left);
        warp_bot_left.width = this.modalWidth / 2;
        warp_bot_left.height = 38;
        warp_bot_left.skewY = 180;
        warp_bot_left.x = this.modalWidth / 2;
        warp_bot_left.y = this.modalHeight - 38;
        var warp_bot_right = createBitmapByName("public_modal_json.modal_bot");
        this.modalWarp.addChild(warp_bot_right);
        warp_bot_right.width = this.modalWidth / 2;
        warp_bot_right.height = 38;
        warp_bot_right.x = this.modalWidth / 2;
        warp_bot_right.y = this.modalHeight - 38;
        // 关闭盒子
        var close_modal = createBitmapByName("public_button_json.button_01");
        this.modalWarp.addChild(close_modal);
        close_modal.width = 46;
        close_modal.height = 46;
        close_modal.x = this.modalWidth - 64;
        close_modal.y = 6;
        // 弹框打开动画
        this.warpTween(this.modalWarp);
        // 关闭弹框事件
        this.closeMoadl(close_modal);
    };
    Modal.prototype.render_moadl_tree = function () {
        // 盒子透明底
        var warp_mask = createBitmapByName("public_modal_mask_png");
        this.modalWarp.addChild(warp_mask);
        warp_mask.width = this.modalWarp.width;
        warp_mask.height = this.modalWarp.height;
        var warp_bg = createBitmapByName('public_modal_bg_png');
        this.modalWarp.addChild(warp_bg);
        warp_bg.width = this.modalWarp.width - 36;
        warp_bg.height = this.modalWarp.height - 32;
        warp_bg.x = 18;
        warp_bg.y = 18;
        // 顶部条
        var warp_top_left = createBitmapByName("public_modal_json.modal_3_top");
        this.modalWarp.addChild(warp_top_left);
        warp_top_left.width = (this.modalWidth - 36) / 2;
        warp_top_left.height = 66;
        warp_top_left.skewY = 180;
        warp_top_left.x = (this.modalWidth - 36) / 2 + 18;
        warp_top_left.y = 18;
        var warp_top_right = createBitmapByName("public_modal_json.modal_3_top");
        this.modalWarp.addChild(warp_top_right);
        warp_top_right.width = (this.modalWidth - 12) / 2;
        warp_top_right.height = 66;
        warp_top_right.x = (this.modalWidth - 36) / 2 + 4;
        warp_top_right.y = 18;
        // 关闭盒子
        var close_modal = createBitmapByName("public_button_json.button_00");
        this.modalWarp.addChild(close_modal);
        close_modal.width = 86;
        close_modal.height = 86;
        close_modal.x = this.modalWidth - 100;
        close_modal.y = 6;
        // 弹框打开动画
        this.warpTween(this.modalWarp);
        // 关闭弹框事件
        this.closeMoadl(close_modal);
    };
    Modal.prototype.warpTween = function (box) {
        // 定义动画盒子
        var tw_box = egret.Tween.get(box);
        var tw_props_1 = {
            "alpha": .8,
            "scaleX": .9,
            "scaleY": .9,
            "x": (this.stageWidth - (this.modalWidth * .9)) / 2,
            "y": (this.stageHeight - (this.modalHeight * .9)) / 2
        };
        var tw_props_2 = {
            "alpha": 1,
            "scaleX": 1.05,
            "scaleY": 1.05,
            "x": (this.stageWidth - (this.modalWidth * 1.05)) / 2,
            "y": (this.stageHeight - (this.modalHeight * 1.05)) / 2
        };
        var tw_props_3 = {
            "alpha": 1,
            "scaleX": 1,
            "scaleY": 1,
            "x": (this.stageWidth - this.modalWidth) / 2,
            "y": (this.stageHeight - this.modalHeight) / 2
        };
        tw_box.to(tw_props_1);
        tw_box.to(tw_props_2, 180);
        tw_box.to(tw_props_3, 120);
    };
    Modal.prototype.closeMoadl = function (box) {
        var _this = this;
        box.touchEnabled = true;
        box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(_this.modalBox);
        }, this);
    };
    return Modal;
}(egret.Sprite));
__reflect(Modal.prototype, "Modal");
