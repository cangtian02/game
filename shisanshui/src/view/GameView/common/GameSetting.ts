/**
 * 开房规则
 */
class GameSetting {
    
    public constructor(flag1: boolean,flag2: boolean,flag3: boolean) {
        // 是否有加一色坐庄
        if(flag1) {
            var x: number = 870;
            if(!flag2){ x = 960; }
            
            var t1 = this.returnSprite(114,x);
            GameView.viewBox.addChild(t1);
            
            var bg1 = this.returnBg(t1.width,t1.height);
            t1.addChild(bg1);

            var tt1 = this.returnText('加一色坐庄',t1.width,t1.height);
            t1.addChild(tt1);
        }
        
        // 是否有大小鬼
        if(flag2) {
            var t2 = this.returnSprite(75,1000);
            GameView.viewBox.addChild(t2);

            var textBg2 = this.returnBg(t2.width,t2.height);
            t2.addChild(textBg2);

            var tt2 = this.returnText('大小鬼',t2.width,t2.height);
            t2.addChild(tt2);
        }
        
        // 有无买马
        var t3 = this.returnSprite(75,1090);
        GameView.viewBox.addChild(t3);

        var textBg3 = this.returnBg(t3.width,t3.height);
        t3.addChild(textBg3);

        var t: string;
        flag3 == false ? t = '无马牌' : t = '有马牌';
        var tt3 = this.returnText(t,t3.width,t3.height);
        t3.addChild(tt3);
    }
    
    private returnBg(w: number,h: number) {
        var bg = createBitmapByName('game_text_bg_png');
        bg.width = w;
        bg.height = h;
        return bg;
    }
    
    private returnSprite(w: number,x: number) {
        var sprite: egret.Sprite = new egret.Sprite();
        sprite.width = w;
        sprite.height = 34;
        sprite.x = x;
        sprite.y = GameView.viewBox.height - 44;
        return sprite;
    }
    
    private returnText(t: string,w: number,h: number) {
        var tt = createTextFieldByName(t);
        tt.width = w;
        tt.height = h;
        tt.size = 18;
        tt.textColor = 0xFFFFFF;
        tt.textAlign = 'center';
        tt.verticalAlign = 'middle';
        return tt;
    }
    
}
