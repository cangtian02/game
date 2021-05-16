/**
 * 牌局结算
 */
class GameRewards {
	
    public static viewBox: egret.Sprite;
    public static data: any;
    
    public constructor() {
	
    }
    
    public static askReadyAndRewards(data: any,timeo: number) {
        GameRewards.data = data;
        GameRewards.viewBox = new egret.Sprite();
        var gv: any = GameView.viewBox;
        var cv: any = GameRewards.viewBox;
        gv.addChild(cv);
        cv.width = gv.width;
        cv.height = gv.height;

        // 更新各玩家总得分
        var rewards: any = GameRewards.data.rewards;
        var len: number = rewards.length;
        for(var i: number = 0;i < len;i++) {
            var l = Number(rewards[i]._chair.substr(1,1)) - 1;
            var allcoreBox = GameEnterViewBox.userEnterChild(l,1);
            allcoreBox.$children[0].removeChild(allcoreBox.$children[0].$children[1]);

            var text = createTextFieldByName(rewards[i].all_score);
            allcoreBox.$children[0].addChild(text);
            text.width = allcoreBox.width;
            text.height = allcoreBox.height;
            text.size = 24;
            text.textColor = 0xF4EF89;
            text.textAlign = 'center';
        }
        
        var mask: egret.Sprite = new egret.Sprite();
        cv.addChild(mask);
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0,0,cv.width,cv.height);
        mask.graphics.endFill();
        mask.alpha = .65;

        // 设置盒子点击事件，阻止点击事件穿透
        cv.touchEnabled = true;
        
        // 倒计时计时按钮
        GameRewards.askReady(timeo);
        
        // 小结算面板
        new GameRewardsPanel();
    }
    
    public static askReady(timeo: number) {
        var gv: any = GameView.viewBox;
        var cv: any = GameRewards.viewBox;
        var btnBox: egret.Sprite = new egret.Sprite();
        cv.addChild(btnBox);
        btnBox.width = 180;
        btnBox.height = 70;
        btnBox.x = (cv.width - 180) / 2;
        btnBox.y = cv.height - 95;
        
        var btnBg = createBitmapByName('public_button_json.button_04');
        btnBox.addChild(btnBg);
        btnBg.width = 180;
        btnBg.height = 70;
        
        btnBox.addChild(btnTextStyle(timeo));

        var timer: any = setInterval(() => {
            timeo--;
            if(timeo == 0) {
                clearInterval(timer);
//                ready();
            }
            // 重置数字
            btnBox.removeChild(btnBox.$children[1]);
            btnBox.addChild(btnTextStyle(timeo));

        },1000);
        
        function btnTextStyle(t) {
            var btnText = createTextFieldByName('继续（' + t + 'S）');
            btnText.width = 190;
            btnText.height = 65;
            btnText.textAlign = 'center';
            btnText.verticalAlign = 'middle';
            btnText.size = 24;
            btnText.textColor = 0xFFFFFF;
            btnText.strokeColor = 0xB73700;
            btnText.stroke = 2;
            return btnText;
        }
        
        btnBox.touchEnabled = true;
        btnBox.addEventListener(egret.TouchEvent.TOUCH_TAP,ready,this);
        
        function ready() {
            Main.WEBSOCKET.doSend(cfg_ready());
            gv.removeChild(cv);
        }
    }
    
}
