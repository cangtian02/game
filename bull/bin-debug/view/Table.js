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
 * 桌子盒子
 */
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super.call(this) || this;
        // 全面屏
        if (window.innerHeight / window.innerWidth > 1.8) {
            Table.bet_block_box_coordinate = [
                { x: 90, y: 230 },
                { x: 480, y: 230 },
                { x: 90, y: 740 },
                { x: 480, y: 740 }
            ];
            Table.qihao_result_box_coordinate = [
                { x: 72, y: 520 },
                { x: 462, y: 520 },
                { x: 72, y: 1030 },
                { x: 462, y: 1030 }
            ];
            Table.card_box_coordinate = [
                { x: 84, y: 580 },
                { x: 474, y: 580 },
                { x: 84, y: 1090 },
                { x: 474, y: 1090 }
            ];
        }
        else {
            Table.bet_block_box_coordinate = [
                { x: 90, y: 180 },
                { x: 476, y: 180 },
                { x: 90, y: 640 },
                { x: 476, y: 640 }
            ];
            Table.qihao_result_box_coordinate = [
                { x: 72, y: 460 },
                { x: 458, y: 460 },
                { x: 72, y: 920 },
                { x: 458, y: 920 }
            ];
            Table.card_box_coordinate = [
                { x: 84, y: 510 },
                { x: 470, y: 510 },
                { x: 84, y: 970 },
                { x: 470, y: 970 }
            ];
        }
        _this.init();
        return _this;
    }
    Table.prototype.init = function () {
        var _loop_1 = function (i) {
            var bet_block_box = this_1.betBlockBoxStyle(i);
            this_1.addChild(bet_block_box);
            Table.bet_block_box.push(bet_block_box);
            bet_block_box.touchEnabled = true;
            bet_block_box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new BetControl(i);
            }, this_1);
            var qihao_reqult_box = this_1.qihaoResultBoxStyle(i);
            this_1.addChild(qihao_reqult_box);
            Table.qihao_result_box.push(qihao_reqult_box);
            var card_box_bg = this_1.cardBoxBgStyle(i);
            this_1.addChild(card_box_bg);
            var card_box = this_1.cardBoxStyle(i);
            this_1.addChild(card_box);
            Table.card_box.push(card_box);
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    Table.prototype.betBlockBoxStyle = function (i) {
        var box = new egret.Sprite();
        box.width = 260;
        box.height = 280;
        box.x = Table.bet_block_box_coordinate[i].x;
        box.y = Table.bet_block_box_coordinate[i].y;
        var bg = createBitmapByName('Spirit_json.table_list_bg_' + (i + 1));
        box.addChild(bg);
        bg.width = 260;
        bg.height = 280;
        var top_box = new egret.Sprite(); // 顶部下注总额盒子
        box.addChild(top_box);
        top_box.width = box.width;
        top_box.height = 40;
        top_box.y = 6;
        var center_box = new egret.Sprite(); // 中部下注星币图标盒子
        box.addChild(center_box);
        center_box.width = box.width;
        center_box.height = 190;
        center_box.y = 46;
        var bot_box = new egret.Sprite(); // 底部自己下注数量盒子
        box.addChild(bot_box);
        bot_box.width = 167;
        bot_box.height = 35;
        bot_box.x = 46.5;
        bot_box.y = 236;
        return box;
    };
    Table.prototype.qihaoResultBoxStyle = function (i) {
        var box = new egret.Sprite();
        box.width = 300;
        box.height = 50;
        box.x = Table.qihao_result_box_coordinate[i].x;
        box.y = Table.qihao_result_box_coordinate[i].y;
        var bg = createBitmapByName('Spirit_json.outcome_bg');
        box.addChild(bg);
        bg.width = 300;
        bg.height = 50;
        var content = new egret.Sprite();
        content.width = 300;
        content.height = 50;
        box.addChild(content);
        return box;
    };
    Table.prototype.cardBoxBgStyle = function (i) {
        var card_box_bg = createBitmapByName('Spirit_json.card_bg');
        card_box_bg.width = 276;
        card_box_bg.height = 124;
        card_box_bg.x = Table.card_box_coordinate[i].x;
        card_box_bg.y = Table.card_box_coordinate[i].y;
        return card_box_bg;
    };
    Table.prototype.cardBoxStyle = function (i) {
        var box = new egret.Sprite();
        box.width = 276;
        box.height = 124;
        box.x = Table.card_box_coordinate[i].x;
        box.y = Table.card_box_coordinate[i].y;
        return box;
    };
    Table.createQihaoResult = function () {
        for (var i = 0; i < 4; i++) {
            var box = Table.qihao_result_box[i].$children[1];
            if (box.$children.length > 0) {
                commonRemoveChild(box);
            }
            var k1 = 'player' + (i + 1);
            var data = Game.qihao_result[k1];
            var len = data.length;
            for (var j = 0; j < len; j++) {
                var img_soure = data[j] == 1 ? 'win' : 'loser';
                var img = createBitmapByName('Spirit_json.' + img_soure);
                box.addChild(img);
                img.width = 29;
                img.height = 29;
                img.x = j * 31 + 27;
                img.y = 10.5;
            }
        }
    };
    /**
     * 重置四手盒子成点击下注状态
     */
    Table.betInit = function () {
        for (var i = 0; i < 4; i++) {
            var box = Table.bet_block_box[i].$children[1];
            if (box.$children.length > 0) {
                commonRemoveChild(box);
            }
            var t = createTextFieldByName('点击下注');
            box.addChild(t);
            t.width = box.width;
            t.height = box.height;
            t.textAlign = 'center';
            t.verticalAlign = 'middle';
            t.size = 28;
            t.textColor = 0x329C51;
        }
    };
    /**
     * 0：请下注 1：买定离手
     */
    Table.showTip = function (f) {
        var box = new egret.Sprite();
        Game.view_box.addChild(box);
        box.width = 757;
        box.height = 135;
        box.x = (Game.view_box.width - 757) / 2;
        box.y = 460;
        var bg = createBitmapByName('Spirit_json.popup_tip_bg');
        box.addChild(bg);
        bg.width = box.width;
        bg.height = box.height;
        var w = f == 0 ? 235 : 313;
        var img = f == 0 ? 'popup_tip_qxz' : 'popup_tip_mdls';
        var bitmap = createBitmapByName('Spirit_json.' + img);
        box.addChild(bitmap);
        bitmap.width = w;
        bitmap.height = 78;
        bitmap.x = (box.width - w) / 2;
        bitmap.y = (box.height - 78) / 2;
        setTimeout(function () {
            Game.view_box.removeChild(box);
        }, 2000);
    };
    /**
     * 把没有下注的位置隐藏点击下注提示
     */
    Table.removeNoHitTitle = function () {
        for (var i = 0; i < 4; i++) {
            if (Table.bet_block_box[i].$children[2].$children.length == 0) {
                commonRemoveChild(Table.bet_block_box[i].$children[1]);
            }
        }
    };
    /**
     * 绘制自己下注数量 i 第几手
     */
    Table.createMyBetNum = function (i) {
        var box = Table.bet_block_box[i].$children[3];
        if (box.$children.length > 0) {
            commonRemoveChild(box);
        }
        var bg = createBitmapByName('Spirit_json.my_bet_bg');
        box.addChild(bg);
        bg.width = box.width;
        bg.height = box.height;
        var n = BetControl.my_bet_num_arr[i];
        var tx;
        n >= 10000000 ? tx = Math.round(n / 10000) + '万' : tx = String(n);
        var t = createTextFieldByName(tx);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 28;
        t.textColor = 0xEFCE34;
    };
    /**
     * 绘制全部玩家下注数量 i 第几手
     */
    Table.createTotalBetNum = function (i) {
        var box = Table.bet_block_box[i].$children[1];
        if (box.$children.length > 0) {
            commonRemoveChild(box);
        }
        var n = BetControl.total_bet_num_arr[i];
        var tx;
        n >= 1000000 ? tx = Math.round(n / 10000) + '万' : tx = String(n);
        var t = createTextFieldByName(tx);
        box.addChild(t);
        t.width = box.width;
        t.height = box.height;
        t.textAlign = 'center';
        t.verticalAlign = 'middle';
        t.size = 28;
        t.textColor = 0x7CF49D;
    };
    /**
     * 请桌
     */
    Table.resetTable = function () {
        for (var i = 0; i < 4; i++) {
            commonRemoveChild(Table.card_box[i]);
            var len = Table.bet_block_box[i].$children.length;
            if (Table.bet_block_box[i].$children.length == 5) {
                Table.bet_block_box[i].removeChild(Table.bet_block_box[i].$children[len - 1]);
            }
            commonRemoveChild(Table.bet_block_box[i].$children[2]);
            commonRemoveChild(Table.bet_block_box[i].$children[3]);
        }
        Table.betInit();
        commonRemoveChild(Top.card_box);
        BetControl.bet_total_num = 0;
        BetControl.my_bet_num_arr = [0, 0, 0, 0];
        BetControl.other_bet_num_arr = [0, 0, 0, 0];
        BetControl.total_bet_num_arr = [0, 0, 0, 0];
        BetControl.step_bet_diff = [0, 0, 0, 0];
    };
    Table.bet_block_box = []; // 下注盒子
    Table.qihao_result_box = []; // 历史开奖信息盒子
    Table.card_box = []; // 牌盒子
    return Table;
}(egret.DisplayObjectContainer));
__reflect(Table.prototype, "Table");
//# sourceMappingURL=Table.js.map