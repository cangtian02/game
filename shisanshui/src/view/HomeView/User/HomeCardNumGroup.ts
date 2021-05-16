/**
 * 大厅用户房卡数量
 * 主要利用eui的数据合集功能实现数据绑定模式，房卡数量改变时重绘场景
 */
class HomeCardNumGroup extends eui.Group {

    public static sourceArr: any[] = [{ value: 0 }];
    public static myCollection: eui.ArrayCollection = new eui.ArrayCollection(HomeCardNumGroup.sourceArr);

    public constructor() {
        super();
    }
    protected createChildren(): void {
        var dataGroup: eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = HomeCardNumGroup.myCollection;
        this.addChild(dataGroup);
        dataGroup.itemRenderer = HomeCardNumRenderer;
    }
}

class HomeCardNumRenderer extends eui.ItemRenderer {
    private labelDisplay: eui.Label;
    public constructor() {
        super();
        this.labelDisplay = new eui.Label();
        this.addChild(this.labelDisplay);
        this.labelDisplay.textColor = 0xECD9A1;
        this.labelDisplay.size = 24;
    }
    protected dataChanged(): void {
        this.labelDisplay.text = this.data.value;
    }
}
