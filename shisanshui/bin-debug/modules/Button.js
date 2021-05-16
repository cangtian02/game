var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 项目中所用到的button按钮
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(n) {
        var _this = _super.call(this) || this;
        _this.t = [
            {
                bgWidth: 232,
                bgHeight: 74,
                textWidth: 140,
                textHeight: 38
            },
            {
                bgWidth: 184,
                bgHeight: 74,
                textWidth: 140,
                textHeight: 38
            },
            {
                bgWidth: 184,
                bgHeight: 74,
                textWidth: 90,
                textHeight: 38
            }
        ];
        _this.b = [
            'public_button_json.button_02',
            'public_button_json.button_03',
            'public_button_json.button_04',
            'public_button_json.button_05'
        ];
        /**
         * cjfj 创建房间，yqhy 邀请好友，jrfj 进入房间
         * qr 确认，yqhy_2 黄色背景邀请好友，jsfj 解散房间
         * qx 取消 zb 准备
         * qxcp 取消出牌， qrcp 确认出牌
         * jujue 拒绝 ty 同意
         */
        _this.arr = [
            {
                name: 'cjfj',
                bg: _this.b[2],
                text: 'home_open_room_btn_text_png',
                type: _this.t[0]
            },
            {
                name: 'yqhy',
                bg: _this.b[1],
                text: 'home_open_room_yqhy_png',
                type: _this.t[1]
            },
            {
                name: 'jrfj',
                bg: _this.b[0],
                text: 'home_open_room_jrfj_png',
                type: _this.t[1]
            },
            {
                name: 'qr',
                bg: _this.b[0],
                text: 'game_fonts_queren_png',
                type: _this.t[2]
            },
            {
                name: 'yqhy_2',
                bg: _this.b[0],
                text: 'game_fonts_yaoqing_png',
                type: _this.t[1]
            },
            {
                name: 'jsfj',
                bg: _this.b[1],
                text: 'game_fonts_jiesan_png',
                type: _this.t[1]
            },
            {
                name: 'qx',
                bg: _this.b[1],
                text: 'game_fonts_quxiao_png',
                type: _this.t[2]
            },
            {
                name: 'zb',
                bg: _this.b[0],
                text: 'game_fonts_zhunbei_png',
                type: _this.t[2]
            },
            {
                name: 'qxcp',
                bg: _this.b[3],
                text: 'game_choose_fonts_json.quxiao',
                type: _this.t[0]
            },
            {
                name: 'qrcp',
                bg: _this.b[2],
                text: 'game_choose_fonts_json.queding',
                type: _this.t[0]
            },
            {
                name: 'jujue',
                bg: _this.b[1],
                text: 'game_fonts_quxiao_png',
                type: _this.t[2]
            },
            {
                name: 'ty',
                bg: _this.b[0],
                text: 'game_fonts_queren_png',
                type: _this.t[2]
            }
        ];
        var btn;
        for (var i = 0; i < _this.arr.length; i++) {
            if (_this.arr[i].name == n) {
                btn = _this.arr[i];
            }
        }
        var btnBox = new egret.Sprite();
        _this.addChild(btnBox);
        btnBox.width = btn.type.bgWidth;
        btnBox.height = btn.type.bgHeight;
        var btnBg = createBitmapByName(btn.bg);
        btnBox.addChild(btnBg);
        btnBg.width = btnBox.width;
        btnBg.height = btnBox.height;
        var btnText = createBitmapByName(btn.text);
        btnBox.addChild(btnText);
        btnText.width = btn.type.textWidth;
        btnText.height = btn.type.textHeight;
        btnText.x = (btnBox.width - btnText.width) / 2;
        btnText.y = (btnBox.height - btnText.height) / 2 - 4;
        return _this;
    }
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
