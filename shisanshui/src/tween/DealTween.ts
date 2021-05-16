/**
 * 发牌动画
 */
class DealTween extends egret.Sprite {
    
    private num: number = GameConfig.game_cfg.nPlayerNum; // 玩家人数
    private starPosition: any = { x: 0,y: 0 }; // 开始坐标
    private endPosition: any[] = []; // 结束坐标数组
    
    private viewBox: egret.Sprite = new egret.Sprite(); // 顶级盒子
    private centerPoker: egret.Sprite = new egret.Sprite(); // 中间牌墩盒子

    public static tweenTime: number; // 动画总执行时间

	public constructor() {
	    super();
        DealTween.tweenTime = ((7 - this.num) * 10) * 13 + 2400;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
    private onAddToStage() {
        // 初始化盒子
        this.addChild(this.viewBox);
        this.viewBox.width = GameView.viewBox.width;
        this.viewBox.height = GameView.viewBox.height;

        var deal_poker_data = RES.getRes("deal_poker_json");
        var deal_poker_png = RES.getRes("deal_poker_png");
        var deal_Factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(deal_poker_data,deal_poker_png);
        var deal_move: egret.MovieClip = new egret.MovieClip(deal_Factory.generateMovieClipData("deal"));
        this.viewBox.addChild(deal_move);
        deal_move.scaleX = .75;
        deal_move.scaleY = .75;
        deal_move.x = (GameView.viewBox.width - (300 * .75)) / 2;
        deal_move.y = 200;
        deal_move.play();

        setTimeout(() => {
            this.viewBox.removeChild(deal_move);
            this.createView();
        },1500);
    }
	
    private createView() {
        var poker = PokerBg();
        this.viewBox.addChild(this.centerPoker);
        this.centerPoker.width = poker.width;
        this.centerPoker.height = poker.height;
        this.centerPoker.x = (this.viewBox.width - poker.width) / 2;
        this.centerPoker.y = (this.viewBox.height - poker.height) / 2 - poker.height;
        this.centerPoker.addChild(poker);

        // 初始化结束坐标
        for(var i: number = 0;i < this.num;i++) {
            this.endPosition.push({
                x: GameEnter.userCoordinate[i].x + 110,
                y: GameEnter.userCoordinate[i].y + 100
            });
        }

        var pokerNum: number = 0;
        var pNum: number = 0;
        var timer = setInterval(() => {
            pokerNum++;
            pNum++;
            if(pNum == this.num) pNum = 0;
            if(pokerNum == (13 * this.num)) {
                clearInterval(timer);
                this.centerPoker.removeChild(this.centerPoker.$children[0]);
            }
            this.dealPoker(pokerNum,pNum);
        },(7 - this.num) * 10);
    }
	
    // 发牌动画
    private dealPoker(i: number,j: number) {
        var poker = PokerBg();
        this.viewBox.addChild(poker);
        poker.x = (this.viewBox.width - poker.width) / 2;
        poker.y = (this.viewBox.height - poker.height) / 2 - poker.height;
        
        var tw_poker = egret.Tween.get(poker);
        
        var x: number = Math.random() * 60;
        var y: number = Math.random() * 40;
        var r: number = -(Math.random() * 180);

        tw_poker.to({ x: this.endPosition[j].x + x,y: this.endPosition[j].y + y - 80,rotation: 0 },70);
        tw_poker.to({ x: this.endPosition[j].x + x,y: this.endPosition[j].y + y,rotation: r },30);
    }
    
}
