/**
 * 选择牌型右上角区域
 */
class ChooseRightTopView {
    
	public constructor() {
        var bg = createBitmapByName('game_choose_box_bg_png');
        ChooseView.viewBox.addChildAt(bg,1);
        bg.width = 495;
        bg.height = 425;
        bg.x = GameView.viewBox.width - 505;
        bg.y = 10;
        
        this.createTitle();
        
        // 推荐牌型列表
        var scrollerPosition = new ScrollerPosition();
        ChooseView.viewBox.addChildAt(scrollerPosition,2);
        scrollerPosition.x = GameView.viewBox.width - 492.5;
        scrollerPosition.y = 60;
	}
	
    private createTitle() {
        for(var i: number = 0;i < 3;i++) {
            var t: string = '';
            i == 0 ? t = '第一墩' : i == 1 ? t = '第二墩' : t = '第三墩';
            var text = createTextFieldByName(t);
            ChooseView.viewBox.addChildAt(text,2);
            text.width = 85;
            text.height = 36;
            text.textAlign = 'center';
            text.verticalAlign = 'middle';
            text.size = 22;
            text.textColor = 0xFFFFFF;
            text.x = (i * 155) + 48 + (GameView.viewBox.width - 505);
            text.y = 15;
        }
    }	
	
}

// 推荐牌型列表
class ScrollerPosition extends eui.Group {
    
    public constructor() {
        super();
    }
    
    private list: eui.List;
    
    protected createChildren() {
        super.createChildren();

        var recommend: any = ChooseView.recommend;
        var bg1: egret.Texture = RES.getRes('game_choose_list_json.list_bg_1');
        var bg2: egret.Texture = RES.getRes('game_choose_list_json.list_bg_2');
        var text: any[] = [
            'game_choose_fonts_json.wl',
            'game_choose_fonts_json.dz',
            'game_choose_fonts_json.ld',
            'game_choose_fonts_json.st',
            'game_choose_fonts_json.sz',
            'game_choose_fonts_json.th',
            'game_choose_fonts_json.hl',
            'game_choose_fonts_json.tz',
            'game_choose_fonts_json.ths',
            'game_choose_fonts_json.wt'];
        var arr: any[] = [];
        
        for(var i: number = 0;i < recommend.length;i++) {
            arr.push({
                ft1: RES.getRes(text[recommend[i].Types[2] - 1]),
                ft2: RES.getRes(text[recommend[i].Types[1] - 1]),
                ft3: RES.getRes(text[recommend[i].Types[0] - 1]),
                bg1: bg1,
                bg2: bg2
            });
        }
        
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection(arr);
        list.itemRendererSkinName = skins.List;
        this.addChild(list);
        
        this.list = list;
        list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
        
        var scrollView: egret.ScrollView = new egret.ScrollView();
        scrollView.setContent(list);
        scrollView.width = 470;
        scrollView.height = 355;
        this.addChild(scrollView);
    }
    
    public static tapFlag: boolean = false; // 是否点击过
    
    // 列表点击事件
    private onChange(e: eui.PropertyEvent) {
        // 整个开始第一次点击
        if(!ScrollerPosition.tapFlag) {
            ScrollerPosition.tapFlag = true;
            ChooseBtnView.viewBox.alpha = 1;
            ChooseBotView.viewBox.alpha = 0;
            ChooseLeftTopView.dunLableBox.alpha = 0;
            ChooseLeftTopView.closeBtnBox.alpha = 1;
        }
        var recommend: any = ChooseView.recommend[this.list.selectedIndex].Cards;
        // 保存选中的牌型
        ChooseBtnView.recommend = recommend;
        // 移动牌到相应位置动画
        ChoosePokerView.pokerToBoxView(recommend);
    }
    
}
