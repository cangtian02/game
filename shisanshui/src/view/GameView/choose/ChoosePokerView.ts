/**
 * 选择牌型扑克牌
 */
class ChoosePokerView {
    
    public static pokerViewBox: any[] = [];  // 手牌dom
    
	public constructor() {
        var len: number = ChooseView.cards.length;
        ChoosePokerView.pokerViewBox.length = 0;
    	  for(var i: number = 0; i < len; i++) {
            var view = new PokerView(ChooseView.cards[i]);
            ChooseView.viewBox.addChildAt(view,i + 5);
            ChoosePokerView.pokerViewBox.push(view);
    	  }
        // 重置扑克牌的位置
        ChoosePokerView.resetPoker(true);
	}
	
	/**
	 * 重置牌到底部 j=true 初次绘制 j=false使用动画
	 */ 
    public static resetPoker(j: boolean) {
        var pokerViewBox = ChoosePokerView.pokerViewBox;
        var len: number = ChooseView.cards.length;
        var ch: number = ChooseView.viewBox.height;
        var ph: number = pokerViewBox[0].height;
        if(j) {
            var scale: number = 125 / pokerViewBox[0].width; // 计算牌的缩放比例
            for(var i: number = 0;i < len;i++) {
                pokerViewBox[i].scaleX = scale;
                pokerViewBox[i].scaleY = scale;
                pokerViewBox[i].x = (i * 85) + ((i + 1) * 10);
                pokerViewBox[i].y = ch - (72 + (ph * scale));
            }
        }else {
            var scale: number = 125 / pokerViewBox[0].width;
            for(var i: number = 0;i < len;i++) {
                var tw_p = egret.Tween.get(pokerViewBox[i]);
                tw_p.to({ "scaleX": scale,"scaleY": scale,"x": (i * 85) + ((i + 1) * 10),"y": ch - (72 + (ph * scale)) }, 300);
            }
        }
    }
	
    /**
     * 扑克牌移动到牌框动画
     */ 
    public static pokerToBoxView(cards: any) {
        for(var i = 0;i < cards.length;i++) {
            for(var j = 0;j < ChooseView.cards.length;j++) {
                if(cards[i] == ChooseView.cards[j]) {
                    var scale: number = 88 / ChoosePokerView.pokerViewBox[0].width;
                    var tw_p = egret.Tween.get(ChoosePokerView.pokerViewBox[j]);
                    var k: number = 0;
                    i < 5 ? k = i + 8 : i < 10 ? k = i - 2 : k = i - 10;
                    tw_p.to({ "scaleX": scale,"scaleY": scale,"x": ChooseLeftTopView.pokerBoxPostion[k].x + 8,"y": ChooseLeftTopView.pokerBoxPostion[k].y + 5.5 },150);
                }
            }
        }
    }
    
}
