/**
 * 大厅场景
 */
class HomeView extends egret.DisplayObjectContainer {
    
    // this指向
    public static self: any;
    // 场景盒子
    public static viewBox: egret.Sprite = new egret.Sprite();
    
    public constructor() {
        super();
        HomeView.self = this;
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
        // 初次登入不进行获取用户信息查询
        if(!Main.ISLOGINONE) {
            HomeView.getUserInfo();
        }
        this.createView();
        this.createWebsocket();
    }
    
    public static getUserInfo() {
        httpAjax(true,Main.DEFAULT_CONFIG.config.met_getAccount,'{}',(event: egret.Event) => {
            var res_1 = <egret.HttpRequest>event.currentTarget;
            var res = JSON.parse(res_1.response);
            if(res.ret != 0) { 
                var toast = new Toast('获取用户信息异常');
                HomeView.viewBox.addChild(toast);
                return;
            }
            // 更改用户信息
            Main.USER_INFO.card = res.account.card;
            HomeCardNumGroup.myCollection.replaceItemAt({ value: Main.USER_INFO.card },0);
        });
    }
    
    // 绘制场景
    private createView() {
        // 场景盒子
        this.addChild(HomeView.viewBox);
        HomeView.viewBox.width = this.stage.stageWidth;
        HomeView.viewBox.height = this.stage.stageHeight;
        
        // 背景
        var viewBg = createBitmapByName("home_bg_jpg");
        HomeView.viewBox.addChild(viewBg);
        viewBg.width = this.stage.stageWidth;
        viewBg.height = this.stage.stageHeight;
        
        // logo
        var logo = createBitmapByName("public_logo_png");
        HomeView.viewBox.addChild(logo);
        logo.width = 277;
        logo.height = 95;
        logo.x = (this.stage.stageWidth - 277) / 2;
        logo.y = 10;
        
        // 左上角用户信息
        var userBoxView = new UserBoxView();
        HomeView.viewBox.addChild(userBoxView);
        userBoxView.x = 28;
        userBoxView.y = 24;
        
        // 创建和加入房间
        var roomBtnView = new RoomBtnView();
        HomeView.viewBox.addChild(roomBtnView);
        roomBtnView.x = 284;
        roomBtnView.y = this.stage.stageHeight - 540;
    }
    
    private createWebsocket() {
        // 第一次进入大厅进行 query_state 查询用户状态
        if(Main.ISLOGINONE) {
            Main.ISLOGINONE = false;
            Main.WEBSOCKET.doSend(cfg_query_state());
        }
    }
    
}
