/**
 * 最近10期与当前遗漏展示
 */
class Popup {
    
    // 场景盒子
    public static viewBox: egret.Sprite;
    // 最近10期盒子
    public static qihaoBox: egret.Sprite;
    // 当前遗漏盒子
    public static missBox: egret.Sprite;
    // 当前查看页面
    public static active: number = 0;
    // 报喜与遗漏数据
    public static qihaoData: any = [];
    public static missData: any = '';
    
    public static init() {
        this.createView();
    }
    
	public static createView() {
        Popup.active = 0;

        Popup.viewBox = new egret.Sprite();
        Game.viewBox.addChild(Popup.viewBox);
        Popup.viewBox.width = Game.viewBox.width;
        Popup.viewBox.height = Game.viewBox.height;
        
        Popup.viewBox.touchEnabled = true;
        
        // 黑色透明背景
        let m_mask = Game.m_mask();
        Popup.viewBox.addChild(m_mask);
        m_mask.width = Popup.viewBox.width;
        m_mask.height = Popup.viewBox.height;
        m_mask.alpha = 0;
        
        let tw_mask = egret.Tween.get(m_mask);
        tw_mask.to({ 'alpha': 1 },300);
        
        m_mask.touchEnabled = true;
        m_mask.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Game.viewBox.removeChild(Popup.viewBox);
        },this);
        
        let warpBox: egret.Sprite = new egret.Sprite();
        Popup.viewBox.addChild(warpBox);
        warpBox.width = Popup.viewBox.width;
        warpBox.height = 700;
        warpBox.y = -400;
        warpBox.alpha = .5;
        
        let tw_warpBox = egret.Tween.get(warpBox);
        tw_warpBox.to({ 'y': 0,'alpha': 1 },200);
        
        let navBox: egret.Sprite = new egret.Sprite();
        warpBox.addChild(navBox);
        navBox.width = warpBox.width;
        navBox.height = 60;
        
        let navBg: egret.Shape = new egret.Shape();
        navBg.graphics.beginFill(0xDB915B,1);
        navBg.graphics.drawRect(0,0,navBox.width,navBox.height);
        navBg.graphics.endFill();
        navBox.addChild(navBg);
        
        let navText: any = ['当前报喜','当前遗漏'];
        for(let i: number = 0;i < 2;i++) {
            let box: egret.Sprite = new egret.Sprite();
            navBox.addChild(box);
            box.width = 150;
            box.height = 60;
            box.x = i * 150 + 30;
            
            let box1: egret.Sprite = new egret.Sprite();
            box.addChildAt(box1,1);
            box1.width = box.width;
            box1.height = box.height;
            
            let shp1: egret.Shape = new egret.Shape();
            shp1.graphics.beginFill(0xA9663E,1);
            shp1.graphics.drawRect(0,0,box.width,box.height);
            shp1.graphics.endFill();
            box1.addChild(shp1);
            
            let ts1 = Popup.navText(navText[i]);
            ts1.textColor = 0xFFD5A7;
            box1.addChild(ts1);
            
            let box2: egret.Sprite = new egret.Sprite();
            box.addChildAt(box2,2);
            box2.width = box.width;
            box2.height = box.height;

            let shp2: egret.Shape = new egret.Shape();
            shp2.graphics.beginFill(0xDB915B,1);
            shp2.graphics.drawRect(0,0,box.width,box.height);
            shp2.graphics.endFill();
            box2.addChild(shp2);
            
            let ts2 = Popup.navText(navText[i]);
            ts2.textColor = 0x673A1F;
            box2.addChild(ts2);
            
            if(i == 0) {
                box.swapChildren(box.$children[0],box.$children[1]);
            }
            
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                Popup.navTab(navBox,i);
            },this);
        }
        
        Popup.qihaoBox = new egret.Sprite();
        warpBox.addChild(Popup.qihaoBox);
        Popup.qihaoBox.width = warpBox.width;
        Popup.qihaoBox.height = 670;
        Popup.qihaoBox.y = 60;
        
        Popup.missBox = new egret.Sprite();
        warpBox.addChild(Popup.missBox);
        Popup.missBox.width = warpBox.width;
        Popup.missBox.height = 330;
        Popup.missBox.y = 60;
        Popup.missBox.x = -Popup.viewBox.width;
        
        Popup.qihaoBox.touchEnabled = true;
        Popup.missBox.touchEnabled = true;
        
        PopupQihao.createView();
	}
	
    public static navText(t: string) {
        let ts = createTextFieldByName(t);
        ts.width = 150;
        ts.height = 60;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 26;
        return ts;
    }
	
    public static navTab(navBox: any,i: number) {
        if(i == Popup.active) return;
        
        if(i == 0) {
            Popup.navTabTween(navBox,i);
            Popup.qihaoBox.x = 0;
            Popup.missBox.x = -Popup.viewBox.width;
        } else {
            if(Popup.missData == '') {
                setTimeout(() => {
                    if(Popup.missData == '') {
                        let toast = new Toast("网络异常，请稍后重试");
                        Game.viewBox.addChild(toast);
                        return;
                    } else {
                        Popup.navTabTween(navBox,i);
                        PopupMiss.createView();
                        Popup.qihaoBox.x = -Popup.viewBox.width;
                        Popup.missBox.x = 0;
                    }
                },1000);
            } else {
                Popup.navTabTween(navBox,i);
                PopupMiss.createView();
                Popup.qihaoBox.x = -Popup.viewBox.width;
                Popup.missBox.x = 0;
            }
        }
    }
    
    public static navTabTween(navBox: any,i: number) {
        let item1: any = navBox.$children[i + 1];
        item1.swapChildren(item1.$children[0],item1.$children[1]);

        let j: number;
        i == 0 ? j = 2 : j = 1;
        let item2: any = navBox.$children[j];
        item2.swapChildren(item2.$children[0],item2.$children[1]);

        Popup.active = i;
    }
    
    public static botStyle() {
        let box: egret.Sprite = new egret.Sprite();
        
        let shp1: egret.Shape = new egret.Shape();
        shp1.graphics.beginFill(0xCC8A51,1);
        shp1.graphics.drawRect(0,0,Popup.viewBox.width,4);
        shp1.graphics.endFill();
        box.addChild(shp1);
        
        let shp2: egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0xE09C61,1);
        shp2.graphics.drawRect(0,0,Popup.viewBox.width,20);
        shp2.graphics.endFill();
        box.addChild(shp2);
        shp2.y = 4;
        
        let shp3: egret.Shape = new egret.Shape();
        shp3.graphics.beginFill(0xC7854C,1);
        shp3.graphics.drawRect(0,0,Popup.viewBox.width,6);
        shp3.graphics.endFill();
        box.addChild(shp3);
        shp3.y = 24;
        
        let x = (box.width - 30) / 2;
        let shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(8,0x663A1F);
        shp.graphics.moveTo(x,18);
        shp.graphics.lineTo(x + 15,4);
        shp.graphics.lineTo(x + 30,18);
        shp.graphics.endFill();
        box.addChild(shp);
        
        box.touchEnabled = true;
        box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Game.viewBox.removeChild(Popup.viewBox);
        },this);
        
        return box;
    }
    
}
