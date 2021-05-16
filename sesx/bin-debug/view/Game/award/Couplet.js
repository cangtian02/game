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
 * 开奖对联
 */
var Couplet = (function (_super) {
    __extends(Couplet, _super);
    function Couplet() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Couplet.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Couplet.prototype.init = function () {
        // 场景盒子
        Couplet.viewBox = new egret.Sprite();
        this.addChild(Couplet.viewBox);
        Couplet.viewBox.width = this.stage.stageWidth;
        Couplet.viewBox.height = 420;
        Couplet.viewBox.y = 230;
    };
    Couplet.lian_bg = function () {
        var lian_bg = createBitmapByName('sesx_json.img_21');
        lian_bg.width = 76;
        lian_bg.height = 337;
        return lian_bg;
    };
    Couplet.newShp = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xED9846, 1);
        shp.graphics.drawRect((Couplet.hengpi_box.width - 0) / 2, 0, 0, 64);
        shp.graphics.endFill();
        return shp;
    };
    Couplet.createView = function () {
        // 横批盒子
        Couplet.hengpi_box = new egret.Sprite();
        Couplet.viewBox.addChild(Couplet.hengpi_box);
        Couplet.hengpi_box.width = 226;
        Couplet.hengpi_box.height = 64;
        Couplet.hengpi_box.x = (Couplet.viewBox.width - 226) / 2;
        Couplet.hengpi_box.y = 14;
        Couplet.hengpi_box_mask = Couplet.newShp();
        Couplet.hengpi_box.addChild(Couplet.hengpi_box_mask);
        var hengpi_bg = createBitmapByName('sesx_json.img_10');
        Couplet.hengpi_box.addChild(hengpi_bg);
        hengpi_bg.width = Couplet.hengpi_box.width;
        hengpi_bg.height = Couplet.hengpi_box.height;
        Couplet.hengpi_box.mask = Couplet.hengpi_box_mask;
        // 上联盒子
        Couplet.shang_box = new egret.Sprite();
        Couplet.viewBox.addChild(Couplet.shang_box);
        Couplet.shang_box.width = 76;
        Couplet.shang_box.height = 337;
        Couplet.shang_box.x = 80;
        Couplet.shang_box.y = 50;
        Couplet.shang_box_mask = Couplet.newShp();
        Couplet.shang_box.addChild(Couplet.shang_box_mask);
        Couplet.shang_box.addChild(Couplet.lian_bg());
        Couplet.shang_box.mask = Couplet.shang_box_mask;
        // 下联盒子
        Couplet.xia_box = new egret.Sprite();
        Couplet.viewBox.addChild(Couplet.xia_box);
        Couplet.xia_box.width = 76;
        Couplet.xia_box.height = 337;
        Couplet.xia_box.x = Couplet.viewBox.width - 80 - 76;
        Couplet.xia_box.y = 50;
        Couplet.xia_box_mask = Couplet.newShp();
        Couplet.xia_box.addChild(Couplet.xia_box_mask);
        Couplet.xia_box.addChild(Couplet.lian_bg());
        Couplet.xia_box.mask = Couplet.xia_box_mask;
        // 横批
        var hengpi_text = Couplet.couplet[1][Award.point_number[1]];
        var hengpi_text_1 = hengpi_text.substr(0, 2);
        var hengpi_text_2 = hengpi_text.substr(2, 4);
        var hengpi_text_box_1 = Couplet.lian_text(hengpi_text_1, 0, 0);
        Couplet.hengpi_box.addChild(hengpi_text_box_1);
        hengpi_text_box_1.x = 51;
        var hengpi_text_box_2 = Couplet.lian_text(hengpi_text_2, 0, 1);
        Couplet.hengpi_box.addChild(hengpi_text_box_2);
        hengpi_text_box_2.x = 119;
        // 上联
        var left_lian_text = Couplet.couplet[0][Award.point_number[0]];
        var left_lian_text_1 = left_lian_text.substr(0, 2);
        var left_lian_text_2 = left_lian_text.substr(2, 7);
        for (var i in left_lian_text_1) {
            var left_lian_text_box_1 = Couplet.lian_text(left_lian_text_1[i], 1, 0);
            Couplet.shang_box.addChild(left_lian_text_box_1);
            left_lian_text_box_1.y = 44 + Number(i) * 36;
        }
        for (var i in left_lian_text_2) {
            var left_lian_text_box_2 = Couplet.lian_text(left_lian_text_2[i], 1, 1);
            Couplet.shang_box.addChild(left_lian_text_box_2);
            left_lian_text_box_2.y = 116 + Number(i) * 36;
        }
        // 下联
        var right_lian_text = Couplet.couplet[2][Award.point_number[2]];
        var right_lian_text_1 = right_lian_text.substr(0, 2);
        var right_lian_text_2 = right_lian_text.substr(2, 7);
        for (var i in right_lian_text_1) {
            var right_lian_text_box_1 = Couplet.lian_text(right_lian_text_1[i], 1, 0);
            Couplet.xia_box.addChild(right_lian_text_box_1);
            right_lian_text_box_1.y = 44 + Number(i) * 36;
        }
        for (var i in right_lian_text_2) {
            var right_lian_text_box_2 = Couplet.lian_text(right_lian_text_2[i], 1, 1);
            Couplet.xia_box.addChild(right_lian_text_box_2);
            right_lian_text_box_2.y = 116 + Number(i) * 36;
        }
    };
    Couplet.lian_text = function (t, i, f) {
        var ts = createTextFieldByName(t);
        ts.size = 30;
        f == 0 ? ts.textColor = 0xF0C063 : ts.textColor = 0x5C0000;
        if (i == 0) {
            ts.height = 64;
            ts.verticalAlign = 'middle';
        }
        else {
            ts.width = 76;
            ts.textAlign = 'center';
        }
        return ts;
    };
    /**
     * 对联展开1S 弹框提示2S 总时间3S
     */
    Couplet.tween = function () {
        // 遮罩层动画
        var timer_hengpi;
        var w = 0;
        timer_hengpi = setInterval(function () {
            if (w >= 226) {
                clearInterval(timer_hengpi);
            }
            w += 22.6;
            Couplet.hengpi_box_mask.graphics.beginFill(0xED9846, 1);
            Couplet.hengpi_box_mask.graphics.drawRect((Couplet.hengpi_box.width - w) / 2, 0, w, 64);
            Couplet.hengpi_box_mask.graphics.endFill();
        }, 20);
        var timer_sxlian;
        var h = 0;
        timer_sxlian = setInterval(function () {
            if (h >= 337) {
                clearInterval(timer_sxlian);
            }
            h += 33.7;
            Couplet.shang_box_mask.graphics.beginFill(0xED9846, 1);
            Couplet.shang_box_mask.graphics.drawRect(0, 0, 76, h);
            Couplet.shang_box_mask.graphics.endFill();
            Couplet.xia_box_mask.graphics.beginFill(0xED9846, 1);
            Couplet.xia_box_mask.graphics.drawRect(0, 0, 76, h);
            Couplet.xia_box_mask.graphics.endFill();
        }, 30);
        // 展示文字结果
        setTimeout(function () {
            Couplet.openText();
        }, 1000);
    };
    Couplet.openText = function () {
        var box = new egret.Sprite();
        Couplet.viewBox.addChild(box);
        box.width = Couplet.viewBox.width;
        box.height = 140;
        box.y = (Couplet.viewBox.height - 140) / 2;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, .6);
        bg.graphics.drawRect(0, 0, box.width, box.height);
        bg.graphics.endFill();
        box.addChild(bg);
        var shp_1 = Couplet.shp();
        box.addChild(shp_1);
        shp_1.x = 150;
        shp_1.y = 55;
        var shp_2 = Couplet.shp();
        box.addChild(shp_2);
        shp_2.x = 490;
        shp_2.y = 55;
        var text_box = new egret.Sprite();
        box.addChild(text_box);
        text_box.width = 320;
        text_box.height = 140;
        text_box.x = (box.width - 320) / 2;
        var text_1 = Couplet.text(Game.pointCNList[0][Award.point_number[1]]);
        text_box.addChild(text_1);
        text_1.x = 20;
        var text_2 = Couplet.text(Game.pointCNList[1][Award.point_number[0]]);
        text_box.addChild(text_2);
        text_2.x = 157;
        var text_3 = Couplet.text(Game.pointCNList[2][Award.point_number[2]]);
        text_box.addChild(text_3);
        text_3.x = 248;
    };
    Couplet.shp = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x6B2120, 1);
        shp.graphics.drawRect(0, 0, 20, 20);
        shp.graphics.endFill();
        shp.rotation = 45;
        return shp;
    };
    Couplet.text = function (t) {
        var ts = createTextFieldByName(t);
        ts.size = 46;
        ts.bold = true;
        ts.textColor = 0xF0C063;
        ts.height = 140;
        ts.verticalAlign = 'middle';
        return ts;
    };
    // 对联 五福 金玉 生肖
    Couplet.couplet = [
        [
            '福光普照全家旺',
            '禄来祥和吉事多',
            '寿星临门永安康',
            '喜气环绕增门辉',
            '财源广进如意顺'
        ],
        [
            '金童迎新',
            '玉女贺岁'
        ],
        [
            '灵鼠迎春春色好',
            '金牛上门鸿运来',
            '猛虎初来气象新',
            '玉兔喜临世纪新',
            '金龙献瑞苏千里',
            '巳蛇出洞喜迎新',
            '骏马扬蹄国扬威',
            '灵羊衔穗稻花香',
            '金猴得意春开路',
            '雄鸡报喜春光好',
            '锦犬迎来大地春',
            '喜猪拱户院生财'
        ]
    ];
    return Couplet;
}(egret.DisplayObjectContainer));
__reflect(Couplet.prototype, "Couplet");
//# sourceMappingURL=Couplet.js.map