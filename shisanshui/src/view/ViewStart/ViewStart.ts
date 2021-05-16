/**
 * 游戏启动场景
 */
class ViewStart extends egret.DisplayObjectContainer{
    
	public constructor() {
        super();
        if (this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
	}
	
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }
    
    private init() {
        // 绘制游戏启动背景
        var viewBg = createBitmapByName("viewStart_png");
        this.addChild(viewBg);
        viewBg.width = this.stage.stageWidth;
        viewBg.height = this.stage.stageHeight;
        // 加载场景切换资源
        ResUtils.getInstance().loadGroup("loading",() => {
            this.loginReload();
        },this);
    }
    
    // 加载登入资源，成功后跳转登入
    private loginReload() {
        var loading = new Loading("正在努力加载，即将进入游戏");
        this.addChild(loading);
        ResUtils.getInstance().loadGroup(["config","login"],() => {
            // 获取配置json植入Main类的CONFIG变量
            Main.DEFAULT_CONFIG = RES.getRes("default.config_json");
            // 替代eui主题，预加载exml文件
            new eui.Theme("resource/config/default.thm.json",this.stage);
            // 跳转登入
            this.dispatchEvent(new egret.Event("GameLogin"));
        },this);
    }
    
}
