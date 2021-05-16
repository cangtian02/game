/**
 * 玩家开始游戏准备
 */

class GameReady {

    // 提示准备
    public static createAskReady(ent: any) {
        // ask_ready 只有自己，所以玩家所在位置为0
        var vBox = GameEnterViewBox.userEnterChild(0,2);

        var btn = new Button('zb');
        vBox.addChild(btn);
        btn.scaleX = .8;
        btn.scaleY = .8;
        btn.x = 18;

        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Main.WEBSOCKET.doSend(cfg_ready());
        },this);
    }

    // 玩家已准备
    public static createReady(ent: any) {
        ent = ent._para;
        // 玩家所在位置
        var i: number = GameEnter.userPosition[ent._chair - 1];
        var vBox = GameEnterViewBox.userEnterChild(i,2);
        // 先去除准备按钮
        commonRemoveChild(vBox);
        // 已准备手势
        var ready = createBitmapByName('game_askplay_png');
        vBox.addChild(ready);
        ready.width = 70;
        ready.height = 74;
        ready.x = (vBox.width - 70) / 2;
    }
    
}
