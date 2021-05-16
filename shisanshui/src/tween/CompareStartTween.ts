/**
 * 开始比牌动画
 */
class CompareStartTween extends egret.Sprite {
    
    private viewBox: egret.Sprite = new egret.Sprite();
    
    public static tweenTime: number = 700; // 动画总执行时间
    
	public constructor() {
	    super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
    private onAddToStage() {
        // 初始化盒子
        this.addChild(this.viewBox);
        this.viewBox.width = GameView.viewBox.width;
        this.viewBox.height = GameView.viewBox.height;
        
        var sView1 = createBitmapByName('compareStart_json.s');
        this.viewBox.addChild(sView1);
        sView1.width = 740;
        sView1.height = 330;
        sView1.x = -340;
        sView1.y = (this.viewBox.height - 330) / 2;
        
        var sView2 = createBitmapByName('compareStart_json.s');
        this.viewBox.addChild(sView2);
        sView2.width = 740;
        sView2.height = 330;
        sView2.x = this.viewBox.width - 340;
        sView2.y = (this.viewBox.height - 330) / 2;
        
        var gView = createBitmapByName('compareStart_json.g');
        this.viewBox.addChild(gView);
        gView.width = 560;
        gView.height = 560;
        gView.x = (this.viewBox.width - 560) / 2;
        gView.y = (this.viewBox.height - 560) / 2;
        gView.alpha = 0;
        
        var g2View = createBitmapByName('compareStart_json.g2');
        this.viewBox.addChild(g2View);
        g2View.width = this.viewBox.width - 50;
        g2View.height = 560;
        g2View.x = 25;
        g2View.y = (this.viewBox.height - 560) / 2;
        g2View.alpha = 0;
        
        var zView = createBitmapByName('compareStart_json.z');
        this.viewBox.addChild(zView);
        zView.width = 700;
        zView.height = 260;
        zView.x = (this.viewBox.width - 700) / 2;
        zView.y = (this.viewBox.height - 260) / 2;
        zView.alpha = 0;
        
        var z1View = createBitmapByName('compareStart_json.z1');
        this.viewBox.addChild(z1View);
        z1View.width = 700;
        z1View.height = 260;
        z1View.x = (this.viewBox.width - 700) / 2;
        z1View.y = (this.viewBox.height - 260) / 2;
        z1View.alpha = 0;
        
        // 动画
        var tw_sView1 = egret.Tween.get(sView1);
        tw_sView1.to({ x: 100 },100);
        tw_sView1.to({ "alpha": 0 });
        tw_sView1.wait(350);
        tw_sView1.to({ "alpha": 1 });
        tw_sView1.to({ x: -340 },100);
        tw_sView1.to({ "alpha": 0 });
        
        var tw_sView2 = egret.Tween.get(sView2);
        tw_sView2.to({ x: this.viewBox.width - 840 },100);
        tw_sView2.to({ "alpha": 0 });
        tw_sView2.wait(350);
        tw_sView2.to({ "alpha": 1 });
        tw_sView2.to({ x: this.viewBox.width - 340 },100);
        tw_sView2.to({ "alpha": 0 });
        
        var tw_gView = egret.Tween.get(gView);
        tw_gView.wait(100);
        tw_gView.to({ "alpha": 1 });
        tw_gView.wait(300);
        tw_gView.to({ "alpha": 0 },100);

        var tw_g2View = egret.Tween.get(g2View);
        tw_g2View.wait(100);
        tw_g2View.to({ "alpha": 1 });
        tw_g2View.wait(250);
        tw_g2View.to({ "alpha": 0 },150);

        var tw_zView = egret.Tween.get(zView);
        tw_zView.wait(100);
        tw_zView.to({ "alpha": 1 });
        tw_zView.to({ "alpha": 0 },20);
        tw_zView.wait(300);
        tw_zView.to({ "alpha": 1 });
        tw_zView.to({ "alpha": 0 });
        
        var tw_z1View = egret.Tween.get(z1View);
        tw_z1View.wait(120);
        tw_z1View.to({ "alpha": 1 });
        tw_z1View.to({ "scaleX": .5,"scaleY": .5,x: (this.viewBox.width - (700 * .5)) / 2,y: (this.viewBox.height - (260 * .5)) / 2 },150);
        tw_z1View.to({ "scaleX": 1,"scaleY": 1,x: (this.viewBox.width - 700) / 2,y: (this.viewBox.height - 260) / 2 },150);
        tw_z1View.to({ "alpha": 0 });
    }
	
}
