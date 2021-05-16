/**
 * 游戏主界面
 */
class Game extends egret.DisplayObjectContainer {
	
    public static view_box: egret.Sprite = new egret.Sprite();  // 场景盒子
    public static mask_box: egret.Sprite = new egret.Sprite();  // 遮罩盒子，接口错误就遮罩页面不能点击
    public static top_view_box: egret.Sprite = new egret.Sprite();  // 上部盒子，溢出可滚动
    public static bot_view_box: egret.Sprite = new egret.Sprite();  // 底部盒子
    
    public static first_go_home: Boolean = true;  // 是否第一次进页面

    public static user_info: any;  // 自己的信息
    public static bet_list: any = [];  // 下注区间
    public static bet_num: number = 0;  // 选中下注数量
    public static qihao_result: any = {};  // 最近8期开奖结果
    
    public static qihao: string;  // 当前期号
    public static status: number;  // 当前状态  1 投注，2 算奖，3 派奖
    public static time: number;  // 当前状态剩余时间  剩余时间(秒)

    public constructor() {
	    super();
        if(this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage, this);
        }
	}
	
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage, this);
        this.init();
    }
    
    private init() {
        this.todayFirstLogin();
        this.createView();
    }

    /**
     * 获取当前年月日
     */
    private getYMD() {
        let date = new Date();
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1) + '-';
        let D = date.getDate();
        return Y + M + D;
    }

    /**
     * 日第一次登陆该游戏
     */
    private todayFirstLogin() {
        let first_login_bull = window.localStorage.getItem('first_login_bull');
        // 今日已经登入过
        if (this.getYMD() == first_login_bull) return
        // 上报今日登入百人牛牛
        httpAjaxGet('/task/enter-game?game_id=' + Main.DEFAULT_CONFIG.game_id, '', (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) return;
            window.localStorage.setItem('first_login_bull', this.getYMD());
        });
    }

    private createView() {
        this.addChild(Game.view_box);
        Game.view_box.width = this.stage.stageWidth;
        Game.view_box.height = this.stage.stageHeight;
        
        let view_bg: egret.Shape = new egret.Shape();
        view_bg.graphics.beginFill(0x47281C,1);
        view_bg.graphics.drawRect(0,0,Game.view_box.width,Game.view_box.height);
        view_bg.graphics.endFill();
        Game.view_box.addChild(view_bg);
        
        let top_bg = createBitmapByName('view_bg_json.view_bg_top');
        Game.view_box.addChild(top_bg);
        top_bg.width = Game.view_box.width;
        top_bg.height = 247;
        
        for(let i: number = 0;i < 14;i++) {
            let view_bg_rep = this.view_bg_rep();
            Game.view_box.addChild(view_bg_rep);
            view_bg_rep.y = i * view_bg_rep.height + 247;
        }
        
        Game.top_view_box.width = Game.view_box.width;
        // 全面屏
        if(window.innerHeight / window.innerWidth > 1.8) {
            Game.top_view_box.height = 1225;
        } else {
            Game.top_view_box.height = 1125;
        }

        // 创建 ScrollView  因很多安卓机的宽高比不正常，所以加入滚动
        let scroll_view: egret.ScrollView = new egret.ScrollView();
        // 设置滚动内容
        scroll_view.setContent(Game.top_view_box);
        scroll_view.bounces = false;
        // 设置滚动区域宽高
        scroll_view.width = Game.view_box.width;
        scroll_view.height = Game.view_box.height - 110;
        Game.view_box.addChild(scroll_view);
        
        let table_bg = createBitmapByName('view_bg_json.table');
        Game.top_view_box.addChild(table_bg);
        table_bg.width = 800;
        table_bg.x = (Game.view_box.width - 800) / 2;
        table_bg.y = 110;
        
        Game.view_box.addChild(Game.bot_view_box);
        Game.bot_view_box.width = Game.view_box.width;
        Game.bot_view_box.height = 115;

        // 全面屏
        if(window.innerHeight / window.innerWidth > 1.8) {
            table_bg.height = 1250;
            Game.bot_view_box.y = Game.view_box.height - 130;        
        } else {
            table_bg.height = 1050;
            Game.bot_view_box.y = Game.view_box.height - 110;
        }
        
        Game.bot_view_box.addChild(new Bot());
        Game.top_view_box.addChild(new Top());
        Game.top_view_box.addChild(new Table());
        
        // 遮罩盒子,接口不成功阻止页面点击事件
        Game.view_box.addChild(Game.mask_box);
        Game.mask_box.width = this.stage.stageWidth;
        Game.mask_box.height = this.stage.stageHeight;
        Game.mask_box.graphics.beginFill(0xff0000, 0);
        Game.mask_box.graphics.drawRect(0,0,Game.mask_box.width,Game.mask_box.height);
        Game.mask_box.graphics.endFill();

        // 阻止点击事件穿透
        Game.mask_box.touchEnabled = true;

        // 获取信息
        this.getUserInfo();

        // 公共菜单
        loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/menu/yxjc_menu.js?ver=' + (<any>window).yxjc_public_config.ver.menu);
        let timer = setInterval(() => {
            if ((<any>window).yxjc_menu != undefined) {
                clearInterval(timer);
                (<any>window).yxjc_menu.init({
                    musicConfig: {
                        switch: true,  // 默认音乐开还是关  true 开  false 关
                        playCallback: () => {  // 开启音乐回调
                            MusicControl.playMusic();
                        },
                        stopCallback: () => {  // 关闭音乐回调
                            MusicControl.stopMusic();
                        }
                    }
                });
            }
        }, 50);

        // 奖励展示
        loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/prizeShow/yxjc_prizeshow.js?ver=' + (<any>window).yxjc_public_config.ver.prizeShow);
        let timer2 = setInterval(() => {
            if ((<any>window).yxjc_prizeshow != undefined) {
                clearInterval(timer2);
                (<any>window).yxjc_prizeshow.init(Main.DEFAULT_CONFIG.api_url);
                setTimeout(() => {
                    if ((<any>window).yxjc_prizeshow.flag && Game.status == 1) {
                        (<any>window).yxjc_prizeshow.start();
                    }                    
                }, 1000);
            }
        }, 50);
    }

    private view_bg_rep() {
        let view_bg_rep = createBitmapByName('view_bg_json.view_bg_rep');
        view_bg_rep.width = Game.view_box.width;
        view_bg_rep.height = 135;
        return view_bg_rep;
    }

    private getUserInfo() {
        httpAjaxGet('/dice/user', '', (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast("获取用户信息异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            Game.user_info = req.data;
            // 绘制自己的信息
            Bot.createUserInfo();
            Bot.createUserPoint();
            // 获取当前期状态信息
            this.getCurrent();
            // 获取下注区间
            this.getBetList();
            // 连接其他玩家
            new OtherControl();
            // 获取信息
            this.getOtherInfo();
            // 设置分享 并加装音乐
            this.loadMusic();
        });        
    }

    private loadMusic(){
        if (!Main.DEFAULT_CONFIG.isWechatdevtools) {
            ResUtils.getInstance().loadGroup("music", () => {
                Main.DEFAULT_CONFIG.loadMusic = true;
                
                if(Main.DEFAULT_CONFIG.isWechat) {
                    // 加载分享js库 调用微信分享配置
                    loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/share/yxjc_share.js?ver=' + (<any>window).yxjc_public_config.ver.share);
                    let timer = setInterval(() => {
                        if((<any>window).yxjc_share != undefined) {
                            clearInterval(timer);
                            (<any>window).yxjc_share.wxjssdk({
                                apiurl: Main.DEFAULT_CONFIG.api_url,  // 接口地址
                                sid: Main.DEFAULT_CONFIG.sid,
                                cuid: Game.user_info.cuid, // 父级id
                                icon: Main.DEFAULT_CONFIG.http_origin + '/static/img/bull_icon.png', // 分享图片
                                appMessageTitle: '百人牛牛投一投，轻轻松松买层楼！',  // 朋友标题
                                appMessageDesc: '100万奖金，多投多中，新年就要发大财！',  // 朋友简述
                                timelineTitle: '百人牛牛投一投，轻轻松松买层楼！100万奖金，多投多中，新年就要发大财！', // 朋友圈标题
                                callback: () => {
                                    MusicControl.playBg();
                                }
                            });
                        }
                    },50);
                } else {
                    if(Main.DEFAULT_CONFIG.isAndroid) {
                        MusicControl.playBg();
                    } else {
                        let dom = document.createElement("div");
                        dom.id = 'yxjc_bull_mask';
                        dom.style.position = 'absolute';
                        dom.style.left = '0';
                        dom.style.right = '0';
                        dom.style.top = '0';
                        dom.style.bottom = '0';
                        dom.style.zIndex = '99999';
                        document.body.appendChild(dom);

                        let f: Boolean = true;
                        document.body.addEventListener('touchstart', () => {
                            if(f) {
                                document.body.removeChild(dom);
                                f = false;
                                MusicControl.playBg();
                            }
                        });
                    }
                }
            }, this);
        }
    }

    private getOtherInfo() {
        httpAjaxGet('/user/other-info', '', (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) return;
            
            // 是否关注公众号
            if(Main.DEFAULT_CONFIG.isWechat && req.data.isFollow == 0) {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/firstfocus/yxjc_firstfocus.js?ver=' + (<any>window).yxjc_public_config.ver.focus);
            }

            // 没绑定手机号
            if (Main.DEFAULT_CONFIG.isWechat && Main.DEFAULT_CONFIG.isMain && req.data.isBind == 0 && Game.user_info.point > 2000 && getCookie('isOpenBindPhone') != 'Y') {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/bindphone/yxjc_bindphone.js?ver=' + (<any>window).yxjc_public_config.ver.bindphone);
                let timer = setInterval(() => {
                    if ((<any>window).yxjc_bindphone != undefined) {
                        clearInterval(timer);
                        (<any>window).yxjc_bindphone.init({
                            apiurl: Main.DEFAULT_CONFIG.api_url,  // 接口地址
                            isMain: Main.DEFAULT_CONFIG.isMain,  // 是否是主公众号
                            callback: () => {  // 绑定成功回调方法
                                let toast = new Toast("恭喜您，绑定成功");
                                Game.view_box.addChild(toast);
                            }
                        });
                    }
                }, 50);
            }
        });  
    }

    private getCurrent() {
        httpAjaxGet('/bull/current','',(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast("获取当前期信息异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            // 更新相关配置
            Game.status = req.data.status;
            Game.time = req.data.time;
            Game.qihao = req.data.qihao;
            // 获取最近8期开奖结果
            this.getQihaoResult();
            // 初始化发牌动画类
            new Deal();
            // 初始化星币动画类
            new Currency();
            // 初始化游戏中控类
            new GameControl();
            // 撤销遮罩
            Game.view_box.removeChild(Game.mask_box);
        });
    }
    
    private getBetList() {
        httpAjaxGet('/bull/bet-list', '', (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                Game.bet_list = [100, 1000, 10000];
            } else {
                Game.bet_list = req.data;
            }
            // 绘制下注item
            Bot.createBetList();
        });
    }

    private getQihaoResult() {
        httpAjaxGet('/bull/qihao-result', '?qihao=' + Game.qihao, (event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                Game.qihao_result = {
                    "player1": [1,0,1,0,1,0,1,0],
                    "player2": [1,0,1,0,1,0,1,0],
                    "player3": [1,0,1,0,1,0,1,0],
                    "player4": [1,0,1,0,1,0,1,0]
                };
            } else {
                req = req.data;
                // 后端返回每一手的输赢信息是字符串形式，前端转成数组形式，编译下轮数据添加
                for(let i: number = 0;i < 4;i++) {
                    let k: any = 'player' + (i + 1);
                    Game.qihao_result[k] = (req[k]).split(',');
                }
            }
            // 绘制最近8期开奖结果
            Table.createQihaoResult();
        });
    }

}
