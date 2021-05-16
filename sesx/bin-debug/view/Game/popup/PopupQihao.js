var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 当前报喜场景
 */
var PopupQihao = (function () {
    function PopupQihao() {
    }
    /**
     * 当前报喜
     */
    PopupQihao.createView = function () {
        var box = Popup.qihaoBox;
        var topBox = new egret.Sprite();
        box.addChild(topBox);
        topBox.width = box.width;
        topBox.height = 40;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xF8B57B, 1);
        bg.graphics.drawRect(0, 0, topBox.width, topBox.height);
        bg.graphics.endFill();
        topBox.addChild(bg);
        var text = [
            ['吉时'],
            ['金童', '玉女'],
            ['福', '禄', '寿', '喜', '财'],
            ['生肖']
        ];
        for (var i = 0; i < 4; i++) {
            var item = PopupQihao.itemBox(i, 40);
            topBox.addChild(item);
            for (var j = 0, len = text[i].length; j < len; j++) {
                var ts = PopupQihao.itemText(text[i][j], i, j);
                item.addChild(ts);
            }
        }
        PopupQihao.createBox();
        var bot = Popup.botStyle();
        box.addChild(bot);
        bot.y = 640;
    };
    PopupQihao.itemBox = function (i, h) {
        var box = new egret.Sprite();
        box.width = PopupQihao.itemWidth[i];
        box.height = h;
        box.x = PopupQihao.itemLeft[i];
        return box;
    };
    PopupQihao.itemText = function (t, i, j) {
        var ts = createTextFieldByName(t);
        if (i == 0 || i == 3) {
            ts.width = PopupQihao.itemWidth[i];
        }
        else if (i == 1) {
            ts.width = PopupQihao.itemWidth[i] / 2;
            ts.x = j * PopupQihao.itemWidth[i] / 2;
        }
        else {
            ts.width = PopupQihao.itemWidth[i] / 5;
            ts.x = j * PopupQihao.itemWidth[i] / 5;
        }
        ts.height = 40;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 24;
        ts.textColor = 0x6D402C;
        return ts;
    };
    PopupQihao.createBox = function () {
        var box = Popup.qihaoBox;
        for (var i = 0; i < 10; i++) {
            var item = new egret.Sprite();
            box.addChild(item);
            item.width = box.width;
            item.height = 60;
            item.y = i * 60 + 40;
            var color = [0xFDC899, 0xFDC18C];
            var bg = new egret.Shape();
            bg.graphics.beginFill(color[i % 2], 1);
            bg.graphics.drawRect(0, 0, item.width, item.height);
            bg.graphics.endFill();
            item.addChild(bg);
            PopupQihao.createItem(item, Popup.qihaoData[i]);
        }
    };
    PopupQihao.createItem = function (item, data) {
        for (var i = 0; i < 4; i++) {
            var box = PopupQihao.itemBox(i, 60);
            item.addChild(box);
            if (i == 0) {
                var ts = PopupQihao.qihaoItemText(data.qihao, box.width);
                box.addChild(ts);
            }
            else if (i == 1) {
                var j = Game.pointList[0].indexOf(data.point[0]);
                var ar = createBitmapByName('sesx_json.img_35');
                box.addChild(ar);
                ar.width = 22;
                ar.height = 20;
                ar.x = box.width / 2 * j + (box.width / 2 - 22) / 2;
                ar.y = 20;
            }
            else if (i == 2) {
                var j = Game.pointList[1].indexOf(data.point[1]);
                var ar = createBitmapByName('sesx_json.img_36');
                box.addChild(ar);
                ar.width = 22;
                ar.height = 20;
                ar.x = box.width / 5 * j + (box.width / 5 - 22) / 2;
                ar.y = 20;
            }
            else if (i == 3) {
                var ts = PopupQihao.qihaoItemText(Game.pointCNList[2][Game.pointList[2].indexOf(data.point[2])], box.width);
                box.addChild(ts);
            }
        }
        for (var i = 1; i < 4; i++) {
            var shp = new egret.Shape();
            shp.graphics.beginFill(0xF2A867, 1);
            shp.graphics.drawRect(0, 0, 1, 640);
            shp.graphics.endFill();
            Popup.qihaoBox.addChild(shp);
            shp.x = PopupQihao.itemLeft[i];
        }
    };
    PopupQihao.qihaoItemText = function (t, w) {
        var ts = createTextFieldByName(t);
        ts.width = w;
        ts.height = 60;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 22;
        ts.textColor = 0x6D402C;
        return ts;
    };
    PopupQihao.updateItem = function () {
        commonRemoveChild(Popup.qihaoBox);
        PopupQihao.createView();
    };
    PopupQihao.itemWidth = [100, 170, 290, 80];
    PopupQihao.itemLeft = [0, 100, 270, 560];
    return PopupQihao;
}());
__reflect(PopupQihao.prototype, "PopupQihao");
//# sourceMappingURL=PopupQihao.js.map