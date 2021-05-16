var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 当前遗漏
 */
var PopupMiss = (function () {
    function PopupMiss() {
    }
    PopupMiss.createView = function () {
        var box = Popup.missBox;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xFCD09A, 1);
        bg.graphics.drawRect(0, 0, box.width, box.height);
        bg.graphics.endFill();
        box.addChild(bg);
        var data = [];
        for (var key in Popup.missData.miss.zodiac) {
            data.push({
                'name': Game.pointCNList[2][Game.pointList[2].indexOf(key)],
                'num': Popup.missData.miss.zodiac[key]
            });
        }
        for (var key in Popup.missData.miss.wufu) {
            data.push({
                'name': Game.pointCNList[1][Game.pointList[1].indexOf(key)],
                'num': Popup.missData.miss.wufu[key]
            });
        }
        for (var key in Popup.missData.miss.jinyu) {
            data.push({
                'name': Game.pointCNList[0][Game.pointList[0].indexOf(key)],
                'num': Popup.missData.miss.jinyu[key]
            });
        }
        PopupMiss.createItem(data);
        var bot = Popup.botStyle();
        box.addChild(bot);
        bot.y = 300;
    };
    PopupMiss.createItem = function (data) {
        var box = Popup.missBox;
        var color = [0xFDC18C, 0xFDC899];
        for (var i = 0; i < 19; i++) {
            var item = new egret.Sprite();
            box.addChild(item);
            item.width = box.width / 4;
            item.height = 60;
            var j = void 0;
            if (i < 4) {
                item.x = i * item.width;
                j = 0;
            }
            else if (i < 8) {
                item.x = (i - 4) * item.width;
                item.y = 60;
                j = 1;
            }
            else if (i < 12) {
                item.x = (i - 8) * item.width;
                item.y = 120;
                j = 0;
            }
            else if (i < 16) {
                item.x = (i - 12) * item.width;
                item.y = 180;
                j = 1;
            }
            else {
                item.x = (i - 16) * item.width;
                item.y = 240;
                j = 0;
            }
            var shp = new egret.Shape();
            shp.graphics.beginFill(color[j], 1);
            shp.graphics.drawRect(0, 0, item.width, 60);
            shp.graphics.endFill();
            item.addChild(shp);
            var tsBox = new egret.Sprite();
            var ts1 = createTextFieldByName(data[i].name);
            tsBox.addChild(ts1);
            ts1.size = 22;
            ts1.height = 60;
            ts1.verticalAlign = 'middle';
            ts1.textColor = 0x6D402C;
            var ts2_text = void 0;
            Number(data[i].num) == 0 ? ts2_text = '上期已出' : ts2_text = String(data[i].num);
            var ts2 = createTextFieldByName(ts2_text);
            tsBox.addChild(ts2);
            ts2.size = 22;
            ts2.height = 60;
            ts2.verticalAlign = 'middle';
            ts2.textColor = 0xC1411E;
            if (i < 17) {
                ts2.x = 26;
            }
            else {
                ts2.x = 52;
            }
            item.addChild(tsBox);
            tsBox.x = (item.width - tsBox.width) / 2;
        }
        for (var i = 1; i < 4; i++) {
            var shp = new egret.Shape();
            shp.graphics.beginFill(0xF2A867, 1);
            shp.graphics.drawRect(0, 0, 1, 300);
            shp.graphics.endFill();
            box.addChild(shp);
            shp.x = i * (box.width / 4);
        }
    };
    PopupMiss.updateItem = function () {
        httpAjaxGet('/zodiac/get-miss', '', function (event) {
            var res_1 = event.currentTarget;
            var res = JSON.parse(res_1.response);
            if (res.code != 0)
                return;
            Popup.missData = res.data;
            commonRemoveChild(Popup.missBox);
            PopupMiss.createView();
        });
    };
    return PopupMiss;
}());
__reflect(PopupMiss.prototype, "PopupMiss");
//# sourceMappingURL=PopupMiss.js.map