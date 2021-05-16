/**
 *
 * loading动画
 * toastText: string laoding动画显示提示语文本
 * flag: boolean 是否使用透明背景 默认不启用
 */
class Loading extends egret.Sprite {
    
    private loadText: string;
    private loadFlag: boolean;
    
    public constructor(loadText: string,loadFlag: boolean = false) {
        super();
        this.loadText = loadText;
        this.loadFlag = loadFlag;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private createView() {
        var loadingBox: egret.Sprite = new egret.Sprite();
        this.addChild(loadingBox);
        loadingBox.width = this.stage.stageWidth;
        loadingBox.height = this.stage.stageHeight;
        
        // 设置loading盒子点击事件，阻止点击事件穿透
        loadingBox.touchEnabled = true;
        
        // 绘制loading背景
        if(!this.loadFlag) {
            var loading_bg = createBitmapByName("loading_bg_jpg");
            loadingBox.addChild(loading_bg);
            loading_bg.width = this.stage.stageWidth;
            loading_bg.height = this.stage.stageHeight;
        } else {
            var loading_bg_ap: egret.Shape = new egret.Shape();
            loading_bg_ap.graphics.beginFill(0x000000,0);
            loading_bg_ap.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
            loading_bg_ap.graphics.endFill();
            loadingBox.addChild(loading_bg_ap);
        }
        
        // 绘制loading盒子
        var loadingView: egret.Sprite = new egret.Sprite();
        loadingView.width = 600;
        loadingView.height = 320;
        loadingView.x = (this.stage.stageWidth - 600) / 2;
        loadingView.y = (this.stage.stageHeight - 320) / 2;
        loadingBox.addChild(loadingView);
        
        // 绘制loading动画
        egret.setTimeout(() => {
            var loading_data = RES.getRes("loading_move_json");
            var loading_png = RES.getRes("loading_move_png");
            var loading_Factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(loading_data,loading_png);
            var loading_move: egret.MovieClip = new egret.MovieClip(loading_Factory.generateMovieClipData("loading_move"));
            loadingView.addChild(loading_move);
            loading_move.scaleX = 2;
            loading_move.scaleY = 2;
            loading_move.x = (600 - 220) / 2;
            loading_move.play(-1);
        },this,10);
        
        // 绘制loading提示语背景
        var loading_text_bg = createBitmapByName("loading_text_bg_png");
        loadingView.addChild(loading_text_bg);
        loading_text_bg.width = 600;
        loading_text_bg.height = 60;
        loading_text_bg.y = 260;
        
        // 绘制loading提示语
        var _loadText = createTextFieldByName(this.loadText);
        loadingView.addChild(_loadText);
        _loadText.textColor = 0xFFFFFF;
        _loadText.size = 24;
        _loadText.textAlign = 'center';
        _loadText.verticalAlign = 'middle';
        _loadText.width = 600;
        _loadText.height = 60;
        _loadText.y = 260;
        
    }
    
}
