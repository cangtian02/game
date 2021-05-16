/**
 * 理牌中动画
 */
class ChooseTween extends egret.Sprite {
    
    private viewBox: egret.Sprite = new egret.Sprite();
    
	public constructor() {
	    super();

        this.addChild(this.viewBox);
        this.viewBox.width = 230;
        this.viewBox.height = 80;

        this.createPoker();
        setTimeout(()=>{
            this.createChoose();
        },500);
	}
	
    private createPoker() {
        var poker = PokerBg();
        this.viewBox.addChild(poker);
        for(var i: number = 1; i < 13; i++) {
            var _poker = PokerBg();
            this.viewBox.addChild(_poker);
            var tw_ppker = egret.Tween.get(_poker);
            tw_ppker.to({ x: i * 14 },500);
        }
    }	

    private createChoose() {
        var bg = createBitmapByName('choose_2_png');
        this.viewBox.addChild(bg);
        bg.width = 200;
        bg.height = 48;
        bg.y = 16; 
        bg.alpha = 0;
        
        var tw_bg = egret.Tween.get(bg);
        tw_bg.to({ "alpha": 1 },200);
        
        var p1 = this.point();
        this.viewBox.addChild(p1);
        p1.x = 130;

        var p2 = this.point();
        this.viewBox.addChild(p2);
        p2.x = 150;

        var p3 = this.point();
        this.viewBox.addChild(p3);
        p3.x = 170;

        var tw_p1 = egret.Tween.get(p1);
        var tw_p2 = egret.Tween.get(p2);
        var tw_p3 = egret.Tween.get(p3);

        tw_p1.wait(500);
        tw_p1.to({ "alpha": 1 },100);

        tw_p2.wait(1000);
        tw_p2.to({ "alpha": 1 },100);

        tw_p3.wait(1500);
        tw_p3.to({ "alpha": 1 },100);

        setInterval(() => {
            var tw_p1 = egret.Tween.get(p1);
            var tw_p2 = egret.Tween.get(p2);
            var tw_p3 = egret.Tween.get(p3);

            tw_p1.to({ "alpha": 0 });
            tw_p2.to({ "alpha": 0 });
            tw_p3.to({ "alpha": 0 });

            tw_p1.wait(500);
            tw_p1.to({ "alpha": 1 },100);

            tw_p2.wait(1000);
            tw_p2.to({ "alpha": 1 },100);

            tw_p3.wait(1500);
            tw_p3.to({ "alpha": 1 },100);
        },2000);
    }
    
    private point() {
        var p = createBitmapByName('choose_1_png');
        p.width = 16;
        p.height = 16;
        p.y = 16;
        p.alpha = 0;
        p.y = 32;
        return p;
    }
    
}
