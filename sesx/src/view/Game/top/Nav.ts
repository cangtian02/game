/**
 * 菜单
 */
class Nav {
    
    private viewBox: egret.Sprite = new egret.Sprite();
    private musicBox: egret.Sprite = new egret.Sprite();

    public constructor() {
        this.init();
    }

    private init() {
        // 按钮
        let btn = createBitmapByName('sesx_json.nav');
        Game.viewBox.addChildAt(btn, 10);
        btn.width = 62;
        btn.height = 62;
        btn.x = Game.viewBox.width - 72;
        btn.y = 10;

        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.viewBox.y < 0 ? this.viewBox.y = 85 : this.viewBox.y = -200;
        },this);
        
        this.createBox();
    }
    
    private createBox() {
        Game.viewBox.addChildAt(this.viewBox, 11);
        this.viewBox.width = 150;
        this.viewBox.height = 180;
        this.viewBox.x = Game.viewBox.width - 160;
        this.viewBox.y = -200;

        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x7C4040,1);
        bg.graphics.drawRoundRect(0, 0, 150, 180, 10, 10);
        bg.graphics.endFill();
        this.viewBox.addChild(bg);

        let arr: egret.Shape = new egret.Shape();
        arr.graphics.beginFill(0x7C4040,1);
        arr.graphics.lineStyle(2, 0x7C4040);
        arr.graphics.moveTo(110, 0);
        arr.graphics.lineTo(120, -10);
        arr.graphics.lineTo(130, 0);
        arr.graphics.lineTo(110, 0);
        arr.graphics.endFill();
        this.viewBox.addChild(arr);

        let goHome = this.getItem('大厅首页');
        this.viewBox.addChild(goHome);
        this.getLine(1);

        let goOrder = this.getItem('游戏记录');
        goOrder.y = 60;
        this.viewBox.addChild(goOrder);
        this.getLine(2);

        let music = this.getItem('音乐');
        music.y = 120;
        this.viewBox.addChild(music);
        this.getLine(3);

        this.viewBox.addChild(this.musicBox);
        this.musicBox.width = 40;
        this.musicBox.height = 60;
        this.musicBox.x = 100;
        this.musicBox.y = 120;

        this.createMusic(Main.DEFAULT_CONFIG.isPlayMusic);

        goHome.touchEnabled = true;
        goHome.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            window.location.href = Main.DEFAULT_CONFIG.index_url;
        },this);

        goOrder.touchEnabled = true;
        goOrder.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            window.location.href = Main.DEFAULT_CONFIG.http_origin + '/order/index.html#/sesx';
        },this);

        music.touchEnabled = true;
        music.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Main.DEFAULT_CONFIG.isPlayMusic ? MusicControl.stopMusic() : MusicControl.playMusic();
            this.createMusic(Main.DEFAULT_CONFIG.isPlayMusic);
        },this);
    }

    private getItem(t: string){
        let text = createTextFieldByName(t);
        text.width = 150;
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 26;
        text.textColor = 0xFFD6BD;
        text.x = 20;
        return text;
    }

    private getLine(i: number){
        let shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(1, 0x824646);
        shp.graphics.moveTo(10, i * 60);
        shp.graphics.lineTo(140, i * 60);
        shp.graphics.endFill();
        this.viewBox.addChild(shp);
    }

    private createMusic(f: Boolean){
        if(this.musicBox.$children.length > 0) {
            this.musicBox.removeChild(this.musicBox.$children[0]);
        }

        let t: string = f ? '关' : '开';
        let text = createTextFieldByName(t);
        text.height = 60;
        text.verticalAlign = 'middle';
        text.size = 26;
        text.textColor = 0xFDFFFC;
        this.musicBox.addChild(text);
    }

}
