var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏主界面
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Game.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Game.prototype.init = function () {
        this.todayFirstLogin();
        this.createView();
    };
    /**
     * 获取当前年月日
     */
    Game.prototype.getYMD = function () {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1) + '-';
        var D = date.getDate();
        return Y + M + D;
    };
    /**
     * 日第一次登陆该游戏
     */
    Game.prototype.todayFirstLogin = function () {
        var _this = this;
        var first_login_bull = window.localStorage.getItem('first_login_bull');
        // 今日已经登入过
        if (this.getYMD() == first_login_bull)
            return;
        // 上报今日登入百人牛牛
        httpAjaxGet('/task/enter-game?game_id=' + Main.DEFAULT_CONFIG.game_id, '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0)
                return;
            window.localStorage.setItem('first_login_bull', _this.getYMD());
        });
    };
    Game.prototype.createView = function () {
        this.addChild(Game.view_box);
        Game.view_box.width = this.stage.stageWidth;
        Game.view_box.height = this.stage.stageHeight;
        var view_bg = new egret.Shape();
        view_bg.graphics.beginFill(0x47281C, 1);
        view_bg.graphics.drawRect(0, 0, Game.view_box.width, Game.view_box.height);
        view_bg.graphics.endFill();
        Game.view_box.addChild(view_bg);
        var top_bg = createBitmapByName('view_bg_json.view_bg_top');
        Game.view_box.addChild(top_bg);
        top_bg.width = Game.view_box.width;
        top_bg.height = 247;
        for (var i = 0; i < 14; i++) {
            var view_bg_rep = this.view_bg_rep();
            Game.view_box.addChild(view_bg_rep);
            view_bg_rep.y = i * view_bg_rep.height + 247;
        }
        Game.top_view_box.width = Game.view_box.width;
        // 全面屏
        if (window.innerHeight / window.innerWidth > 1.8) {
            Game.top_view_box.height = 1225;
        }
        else {
            Game.top_view_box.height = 1125;
        }
        // 创建 ScrollView  因很多安卓机的宽高比不正常，所以加入滚动
        var scroll_view = new egret.ScrollView();
        // 设置滚动内容
        scroll_view.setContent(Game.top_view_box);
        scroll_view.bounces = false;
        // 设置滚动区域宽高
        scroll_view.width = Game.view_box.width;
        scroll_view.height = Game.view_box.height - 110;
        Game.view_box.addChild(scroll_view);
        var table_bg = createBitmapByName('view_bg_json.table');
        Game.top_view_box.addChild(table_bg);
        table_bg.width = 800;
        table_bg.x = (Game.view_box.width - 800) / 2;
        table_bg.y = 110;
        Game.view_box.addChild(Game.bot_view_box);
        Game.bot_view_box.width = Game.view_box.width;
        Game.bot_view_box.height = 115;
        // 全面屏
        if (window.innerHeight / window.innerWidth > 1.8) {
            table_bg.height = 1250;
            Game.bot_view_box.y = Game.view_box.height - 130;
        }
        else {
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
        Game.mask_box.graphics.drawRect(0, 0, Game.mask_box.width, Game.mask_box.height);
        Game.mask_box.graphics.endFill();
        // 阻止点击事件穿透
        Game.mask_box.touchEnabled = true;
        // 获取信息
        this.getUserInfo();
        // 公共菜单
        loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/menu/yxjc_menu.js?ver=' + window.yxjc_public_config.ver.menu);
        var timer = setInterval(function () {
            if (window.yxjc_menu != undefined) {
                clearInterval(timer);
                window.yxjc_menu.init({
                    musicConfig: {
                        switch: true,
                        playCallback: function () {
                            MusicControl.playMusic();
                        },
                        stopCallback: function () {
                            MusicControl.stopMusic();
                        }
                    }
                });
            }
        }, 50);
        // 奖励展示
        loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/prizeShow/yxjc_prizeshow.js?ver=' + window.yxjc_public_config.ver.prizeShow);
        var timer2 = setInterval(function () {
            if (window.yxjc_prizeshow != undefined) {
                clearInterval(timer2);
                window.yxjc_prizeshow.init(Main.DEFAULT_CONFIG.api_url);
                setTimeout(function () {
                    if (window.yxjc_prizeshow.flag && Game.status == 1) {
                        window.yxjc_prizeshow.start();
                    }
                }, 1000);
            }
        }, 50);
    };
    Game.prototype.view_bg_rep = function () {
        var view_bg_rep = createBitmapByName('view_bg_json.view_bg_rep');
        view_bg_rep.width = Game.view_box.width;
        view_bg_rep.height = 135;
        return view_bg_rep;
    };
    Game.prototype.getUserInfo = function () {
        var _this = this;
        httpAjaxGet('/dice/user', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取用户信息异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            Game.user_info = req.data;
            // 绘制自己的信息
            Bot.createUserInfo();
            Bot.createUserPoint();
            // 获取当前期状态信息
            _this.getCurrent();
            // 获取下注区间
            _this.getBetList();
            // 连接其他玩家
            new OtherControl();
            // 获取信息
            _this.getOtherInfo();
            // 设置分享
            _this.setShare();
        });
    };
    Game.prototype.setShare = function () {
        var _this = this;
        if (Main.DEFAULT_CONFIG.isWechat) {
            // 加载分享js库 调用微信分享配置
            loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/share/yxjc_share.js?ver=' + window.yxjc_public_config.ver.share);
            var timer_1 = setInterval(function () {
                if (window.yxjc_share != undefined) {
                    clearInterval(timer_1);
                    window.yxjc_share.wxjssdk({
                        apiurl: Main.DEFAULT_CONFIG.api_url,
                        sid: Main.DEFAULT_CONFIG.sid,
                        cuid: Game.user_info.cuid,
                        icon: Main.DEFAULT_CONFIG.http_origin + '/static/img/bull_icon.png',
                        appMessageTitle: '百人牛牛投一投，轻轻松松买层楼！',
                        appMessageDesc: '100万奖金，多投多中，新年就要发大财！',
                        timelineTitle: '百人牛牛投一投，轻轻松松买层楼！100万奖金，多投多中，新年就要发大财！',
                        callback: function () {
                            _this.loadMusic();
                        }
                    });
                }
            }, 50);
        }
        else {
            if (Main.DEFAULT_CONFIG.isAndroid) {
                this.loadMusic();
            }
            else {
                var dom_1 = document.createElement("div");
                dom_1.id = 'yxjc_bull_mask';
                dom_1.style.position = 'absolute';
                dom_1.style.left = '0';
                dom_1.style.right = '0';
                dom_1.style.top = '0';
                dom_1.style.bottom = '0';
                dom_1.style.zIndex = '99999';
                document.body.appendChild(dom_1);
                var f_1 = true;
                document.body.addEventListener('touchstart', function () {
                    if (f_1) {
                        document.body.removeChild(dom_1);
                        _this.loadMusic();
                        f_1 = false;
                    }
                });
            }
        }
    };
    Game.prototype.getOtherInfo = function () {
        httpAjaxGet('/user/other-info', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0)
                return;
            // 是否关注公众号
            if (Main.DEFAULT_CONFIG.isWechat && req.data.isFollow == 0) {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/firstfocus/yxjc_firstfocus.js?ver=' + window.yxjc_public_config.ver.focus);
            }
            // 没绑定手机号
            if (Main.DEFAULT_CONFIG.isWechat && Main.DEFAULT_CONFIG.isMain && req.data.isBind == 0 && Game.user_info.point > 2000 && getCookie('isOpenBindPhone') != 'Y') {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/bindphone/yxjc_bindphone.js?ver=' + window.yxjc_public_config.ver.bindphone);
                var timer_2 = setInterval(function () {
                    if (window.yxjc_bindphone != undefined) {
                        clearInterval(timer_2);
                        window.yxjc_bindphone.init({
                            apiurl: Main.DEFAULT_CONFIG.api_url,
                            isMain: Main.DEFAULT_CONFIG.isMain,
                            callback: function () {
                                var toast = new Toast("恭喜您，绑定成功");
                                Game.view_box.addChild(toast);
                            }
                        });
                    }
                }, 50);
            }
        });
    };
    Game.prototype.getCurrent = function () {
        var _this = this;
        httpAjaxGet('/bull/current', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取当前期信息异常，请刷新页面重试");
                Game.view_box.addChild(toast);
                return;
            }
            // 更新相关配置
            Game.status = req.data.status;
            Game.time = req.data.time;
            Game.qihao = req.data.qihao;
            // 获取最近8期开奖结果
            _this.getQihaoResult();
            // 初始化发牌动画类
            new Deal();
            // 初始化星币动画类
            new Currency();
            // 初始化游戏中控类
            new GameControl();
            // 撤销遮罩
            Game.view_box.removeChild(Game.mask_box);
        });
    };
    Game.prototype.getBetList = function () {
        httpAjaxGet('/bull/bet-list', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                Game.bet_list = [100, 1000, 10000];
            }
            else {
                Game.bet_list = req.data;
            }
            // 绘制下注item
            Bot.createBetList();
        });
    };
    Game.prototype.getQihaoResult = function () {
        httpAjaxGet('/bull/qihao-result', '?qihao=' + Game.qihao, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                Game.qihao_result = {
                    "player1": [1, 0, 1, 0, 1, 0, 1, 0],
                    "player2": [1, 0, 1, 0, 1, 0, 1, 0],
                    "player3": [1, 0, 1, 0, 1, 0, 1, 0],
                    "player4": [1, 0, 1, 0, 1, 0, 1, 0]
                };
            }
            else {
                req = req.data;
                // 后端返回每一手的输赢信息是字符串形式，前端转成数组形式，编译下轮数据添加
                for (var i = 0; i < 4; i++) {
                    var k = 'player' + (i + 1);
                    Game.qihao_result[k] = (req[k]).split(',');
                }
            }
            // 绘制最近8期开奖结果
            Table.createQihaoResult();
        });
    };
    Game.prototype.loadMusic = function () {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools) {
            ResUtils.getInstance().loadGroup("music", function () {
                Main.DEFAULT_CONFIG.loadMusic = true;
                MusicControl.playBg();
            }, this);
        }
    };
    Game.view_box = new egret.Sprite(); // 场景盒子
    Game.mask_box = new egret.Sprite(); // 遮罩盒子，接口错误就遮罩页面不能点击
    Game.top_view_box = new egret.Sprite(); // 上部盒子，溢出可滚动
    Game.bot_view_box = new egret.Sprite(); // 底部盒子
    Game.first_go_home = true; // 是否第一次进页面
    Game.bet_list = []; // 下注区间
    Game.bet_num = 0; // 选中下注数量
    Game.qihao_result = {}; // 最近8期开奖结果
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map