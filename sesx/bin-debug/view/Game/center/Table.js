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
 * 桌布
 */
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Table.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Table.prototype.init = function () {
        // 场景盒子
        this.addChild(Table.viewBox);
        Table.viewBox.width = 624;
        Table.viewBox.height = 624;
        // 桌布
        var tablebg = createBitmapByName('sesx_json.img_1');
        Table.viewBox.addChild(tablebg);
        tablebg.width = Table.viewBox.width;
        tablebg.height = Table.viewBox.height;
        // 展示结果与下注数量盒子
        var tableBetInfo = new TableBetInfo();
        Table.viewBox.addChild(tableBetInfo);
        // 下注盒子
        var tableTouch = new TableTouch();
        Table.viewBox.addChild(tableTouch);
    };
    /**
     * 展示相应倍率
     */
    Table.createBeishu = function () {
        var beishu_zodiac = Table.beishuStyle('x' + Game.multiple.zodiac);
        Table.viewBox.addChild(beishu_zodiac);
        beishu_zodiac.y = 2;
        var beishu_wufu = Table.beishuStyle('x' + Game.multiple.wufu);
        Table.viewBox.addChild(beishu_wufu);
        beishu_wufu.y = 132;
        var beishu_jinyu = Table.beishuStyle('x' + Game.multiple.jinyu);
        Table.viewBox.addChild(beishu_jinyu);
        beishu_jinyu.y = 230;
    };
    Table.beishuStyle = function (t) {
        var ts = createTextFieldByName(t);
        ts.size = 22;
        ts.textColor = 0xEFB177;
        ts.width = 90;
        ts.textAlign = 'center';
        ts.x = 266;
        return ts;
    };
    // 场景盒子
    Table.viewBox = new egret.Sprite();
    return Table;
}(egret.DisplayObjectContainer));
__reflect(Table.prototype, "Table");
//# sourceMappingURL=Table.js.map