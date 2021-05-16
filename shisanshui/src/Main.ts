/**
 * 项目入口
 */ 
class Main extends egret.DisplayObjectContainer {
  
    // 全局使用配置
    public static DEFAULT_CONFIG: any;                         // 项目配置
    public static USER_INFO: any;                              // 用户信息
    public static GAME_CONFIG: any;                            // 游戏配置
    public static Game_GID: number;                            // 十三水游戏id
    public static GAME_WEBSOCKET: any;                         // websocket连接地址
    public static WEBSOCKET: any = new WebSocketExample();     // 全局websocket类
    public static ISLOGINONE: boolean = true;                  // 是否第一次登入游戏
    
    // 各游戏场景
    public static STATE_START: number = 1;            // 启动
    public static STATE_LOGIN: number = 2;            // 登入
    public static STATE_HOME: number = 3;             // 大厅
    public static STATE_GAME: number = 4;             // 打牌
    
    // 当前游戏场景
    public static CUR_STATE: number = 1;
    
    private _state: number;
    private _curState: egret.DisplayObject;
    
    // 构造函数
    public constructor() {
        super();
        
        // 加载资源
        this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
            RES.loadConfig("resource/default.res.json","resource/");
        },this);
        // 游戏启动场景加载
        ResUtils.getInstance().loadGroup("viewStart",()=>{
            this._state = -1;
            this.state = Main.STATE_START;
        },this);
    }
    
    public set state(s: number) {
        if (this._state != s) {
            this._state = s;
            if (this._curState && this._curState.parent) {
                this.removeChild(this._curState);
            }
            switch (this._state) {
                case Main.STATE_START:
                    this._curState = new ViewStart();
                    this._curState.addEventListener("GameLogin",this.gameLogin,this);
                    this.addChild(this._curState);
                    break;
                case Main.STATE_LOGIN:
                    this._curState = new LoginView();
                    this._curState.addEventListener("GameHome",this.gameHome,this);
                    this.addChild(this._curState);
                    break;
                case Main.STATE_HOME:
                    this._curState = new HomeView();
                    this._curState.addEventListener("GameStart",this.gameStart,this);
                    this.addChild(this._curState);
                    break;
                case Main.STATE_GAME:
                    this._curState = new GameView();
                    this._curState.addEventListener("GameHome",this.gameHome,this);
                    this.addChild(this._curState);
                    break;                   
            }
        }
    }

    private gameLogin(e: egret.Event) {
        this.state = Main.STATE_LOGIN;
        Main.CUR_STATE = Main.STATE_LOGIN;
    }
    
    private gameHome(e: egret.Event) {
        this.state = Main.STATE_HOME;
        Main.CUR_STATE = Main.STATE_HOME;
    }
    
    private gameStart(e: egret.Event) {
        this.state = Main.STATE_GAME;
        Main.CUR_STATE = Main.STATE_GAME;
    }
    
}

