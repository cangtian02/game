/**
 * 右上角局数与房号信息
 */
class RnoAndJnum {
    
    // 盒子
    private viewBox: egret.Sprite = new egret.Sprite();
    // 房号
    private rno: number;

	public constructor(rno: number) {
    	  this.rno = rno;
        this.createView();
	}
	
    private createView() {
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
    }
	
}

class RnoAndJnumGroup extends eui.Group {
    
    // 局数
    public static sourceArr: any[] = [{ nCurrJu: 0,nJuNum: 0 }];
    public static myCollection: eui.ArrayCollection = new eui.ArrayCollection(HomeCardNumGroup.sourceArr);
    
    public constructor() {
        super();
    }
    
    protected createChildren(): void {
        var dataGroup: eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = RnoAndJnumGroup.myCollection;
        this.addChild(dataGroup);
        dataGroup.itemRenderer = RnoAndJnumRenderer;
    }
}

class RnoAndJnumRenderer extends eui.ItemRenderer {
    private textDisplay: eui.Label;
    public constructor() {
        super();
        this.textDisplay = new eui.Label();
        this.addChild(this.textDisplay);
        this.textDisplay.textColor = 0xFFFFFF;
        this.textDisplay.size = 20;
        this.textDisplay.textAlign = 'center';
        this.textDisplay.verticalAlign = 'middle';
        this.textDisplay.width = 138;
        this.textDisplay.height = 48;
    }
    protected dataChanged(): void {
        this.textDisplay.text = '局数:' + this.data.nCurrJu + '/' + this.data.nJuNum;
    }
}
