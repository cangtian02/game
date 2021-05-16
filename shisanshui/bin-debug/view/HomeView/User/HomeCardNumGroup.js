var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅用户房卡数量
 * 主要利用eui的数据合集功能实现数据绑定模式，房卡数量改变时重绘场景
 */
var HomeCardNumGroup = (function (_super) {
    __extends(HomeCardNumGroup, _super);
    function HomeCardNumGroup() {
        return _super.call(this) || this;
    }
    HomeCardNumGroup.prototype.createChildren = function () {
        var dataGroup = new eui.DataGroup();
        dataGroup.dataProvider = HomeCardNumGroup.myCollection;
        this.addChild(dataGroup);
        dataGroup.itemRenderer = HomeCardNumRenderer;
    };
    return HomeCardNumGroup;
}(eui.Group));
HomeCardNumGroup.sourceArr = [{ value: 0 }];
HomeCardNumGroup.myCollection = new eui.ArrayCollection(HomeCardNumGroup.sourceArr);
__reflect(HomeCardNumGroup.prototype, "HomeCardNumGroup");
var HomeCardNumRenderer = (function (_super) {
    __extends(HomeCardNumRenderer, _super);
    function HomeCardNumRenderer() {
        var _this = _super.call(this) || this;
        _this.labelDisplay = new eui.Label();
        _this.addChild(_this.labelDisplay);
        _this.labelDisplay.textColor = 0xECD9A1;
        _this.labelDisplay.size = 24;
        return _this;
    }
    HomeCardNumRenderer.prototype.dataChanged = function () {
        this.labelDisplay.text = this.data.value;
    };
    return HomeCardNumRenderer;
}(eui.ItemRenderer));
__reflect(HomeCardNumRenderer.prototype, "HomeCardNumRenderer");
