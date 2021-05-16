var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 右上角局数与房号信息
 */
var RnoAndJnum = (function () {
    function RnoAndJnum(rno) {
        // 盒子
        this.viewBox = new egret.Sprite();
        this.rno = rno;
        this.createView();
    }
    RnoAndJnum.prototype.createView = function () {
        GameView.viewBox.addChild(this.viewBox);
        this.viewBox.width = 276;
        this.viewBox.height = 48;
        this.viewBox.x = 84;
        this.viewBox.y = 12;
        var bg = createBitmapByName('game_msg_bg_png');
        this.viewBox.addChild(bg);
        bg.width = 276;
        bg.height = 48;
        var rnoAndJnum = new RnoAndJnumGroup();
        this.viewBox.addChild(rnoAndJnum);
        var rnoText = createTextFieldByName('房号:' + this.rno);
        this.viewBox.addChild(rnoText);
        rnoText.width = 138;
        rnoText.height = 48;
        rnoText.size = 20;
        rnoText.textColor = 0xFFFFFF;
        rnoText.textAlign = 'center';
        rnoText.verticalAlign = 'middle';
        rnoText.x = 138;
    };
    return RnoAndJnum;
}());
__reflect(RnoAndJnum.prototype, "RnoAndJnum");
var RnoAndJnumGroup = (function (_super) {
    __extends(RnoAndJnumGroup, _super);
    function RnoAndJnumGroup() {
        return _super.call(this) || this;
    }
    RnoAndJnumGroup.prototype.createChildren = function () {
        var dataGroup = new eui.DataGroup();
        dataGroup.dataProvider = RnoAndJnumGroup.myCollection;
        this.addChild(dataGroup);
        dataGroup.itemRenderer = RnoAndJnumRenderer;
    };
    return RnoAndJnumGroup;
}(eui.Group));
// 局数
RnoAndJnumGroup.sourceArr = [{ nCurrJu: 0, nJuNum: 0 }];
RnoAndJnumGroup.myCollection = new eui.ArrayCollection(HomeCardNumGroup.sourceArr);
__reflect(RnoAndJnumGroup.prototype, "RnoAndJnumGroup");
var RnoAndJnumRenderer = (function (_super) {
    __extends(RnoAndJnumRenderer, _super);
    function RnoAndJnumRenderer() {
        var _this = _super.call(this) || this;
        _this.textDisplay = new eui.Label();
        _this.addChild(_this.textDisplay);
        _this.textDisplay.textColor = 0xFFFFFF;
        _this.textDisplay.size = 20;
        _this.textDisplay.textAlign = 'center';
        _this.textDisplay.verticalAlign = 'middle';
        _this.textDisplay.width = 138;
        _this.textDisplay.height = 48;
        return _this;
    }
    RnoAndJnumRenderer.prototype.dataChanged = function () {
        this.textDisplay.text = '局数:' + this.data.nCurrJu + '/' + this.data.nJuNum;
    };
    return RnoAndJnumRenderer;
}(eui.ItemRenderer));
__reflect(RnoAndJnumRenderer.prototype, "RnoAndJnumRenderer");
