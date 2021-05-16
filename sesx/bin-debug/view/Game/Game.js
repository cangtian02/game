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
 * 主要场景
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
        this.checkLocal();
        this.createView();
        this.getUserInfo();
    };
    /**
     * 检查localStorage 更新大小富贵信息
     */
    Game.prototype.checkLocal = function () {
        if (window.localStorage.getItem('Game_small') != null) {
            var Game_small = JSON.parse(window.localStorage.getItem('Game_small'));
            if (typeof Game_small === 'object') {
                if (window.localStorage.getItem('Game_small_type') != null) {
                    Game.small = Game_small;
                    Game.small_type = Number(window.localStorage.getItem('Game_small_type'));
                }
                else {
                    window.localStorage.removeItem('Game_small');
                }
            }
            else {
                window.localStorage.removeItem('Game_small');
            }
        }
        if (window.localStorage.getItem('Game_big') != null) {
            var Game_big = JSON.parse(window.localStorage.getItem('Game_big'));
            if (typeof Game_big === 'object') {
                Game.big = Game_big;
            }
            else {
                window.localStorage.removeItem('Game_big');
            }
        }
    };
    /**
     * 场景绘制
     */
    Game.prototype.createView = function () {
        // 场景盒子
        this.addChild(Game.viewBox);
        Game.viewBox.width = this.stage.stageWidth;
        Game.viewBox.height = this.stage.stageHeight;
        // 绘制背景
        this.createViewBg();
        // 上部盒子
        Game.topViewBox.width = Game.viewBox.width;
        Game.topViewBox.height = 920;
        // 创建 ScrollView  因很多安卓机的宽高比不正常，所以加入滚动
        var scrollView = new egret.ScrollView();
        // 设置滚动内容
        scrollView.setContent(Game.topViewBox);
        scrollView.bounces = false;
        // 设置滚动区域宽高
        scrollView.width = Game.viewBox.width;
        scrollView.height = Game.viewBox.height - 110; // 底部区域高度为110
        Game.viewBox.addChild(scrollView);
        // 底部盒子
        var botBox = new Bot();
        Game.viewBox.addChild(botBox);
        botBox.y = Game.viewBox.height - 110;
        // top
        Game.topViewBox.addChild(new Top());
        // center
        var center = new Center();
        Game.topViewBox.addChild(center);
        center.y = 190;
        // user
        var user = new User();
        Game.topViewBox.addChild(user);
        user.y = 820;
        // 遮罩盒子,接口不成功阻止页面点击事件
        Game.viewBox.addChild(Game.maskBox);
        Game.maskBox.width = this.stage.stageWidth;
        Game.maskBox.height = this.stage.stageHeight;
        Game.maskBox.graphics.beginFill(0xff0000, 0);
        Game.maskBox.graphics.drawRect(0, 0, Game.maskBox.width, Game.maskBox.height);
        Game.maskBox.graphics.endFill();
        // 阻止点击事件穿透
        Game.maskBox.touchEnabled = true;
        // 展示教育图层
        this.educationPopup();
    };
    /**
     * 绘制背景
     */
    Game.prototype.createViewBg = function () {
        var bgBox = new egret.Sprite();
        var bgBox_shp = new egret.Shape();
        bgBox_shp.graphics.beginFill(0x1f1616, 1);
        bgBox_shp.graphics.drawRect(0, 0, Game.viewBox.width, Game.viewBox.height);
        bgBox_shp.graphics.endFill();
        bgBox.addChild(bgBox_shp);
        var point = function () {
            var a = new egret.Sprite();
            for (var i = 0; i < 40; i++) {
                var b = new egret.Shape();
                b.graphics.beginFill(0x302219, 1);
                b.graphics.drawRect(0, 0, 2, 2);
                b.graphics.endFill();
                b.x = i * 18;
                a.addChild(b);
            }
            return a;
        };
        for (var i = 0; i < 71; i++) {
            var a = point();
            i % 2 == 0 ? a.x = 0 : a.x = 9;
            a.y = i * 18;
            bgBox.addChild(a);
        }
        Game.viewBox.addChild(bgBox);
        bgBox.width = Game.viewBox.width;
        bgBox.height = Game.viewBox.height;
        bgBox.cacheAsBitmap = true; // 因背景颜色和点绘制后不会变化，所以使用位图缓存，使draw变成一个，做最大优化
    };
    /**
     * 展示教育图层 缓存内不为Y时展示图层
     */
    Game.prototype.educationPopup = function () {
        var _this = this;
        if (window.localStorage.getItem('EducationPopup') != 'Y') {
            ResUtils.getInstance().loadGroup("guide", function () {
                var w = _this.stage.stageWidth;
                var h = _this.stage.stageHeight;
                var box = new egret.Sprite();
                _this.addChild(box);
                box.width = w;
                box.height = h;
                var maskBox = new egret.Shape();
                maskBox.graphics.beginFill(0x000000, .5);
                maskBox.graphics.drawRect(0, 0, w, h);
                maskBox.graphics.endFill();
                box.addChild(maskBox);
                var view = createBitmapByName('guide_png');
                box.addChild(view);
                view.width = w;
                box.touchEnabled = true;
                box.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    window.localStorage.setItem('EducationPopup', 'Y');
                    _this.removeChild(box);
                }, _this);
            }, this);
        }
    };
    /**
     * 获取自己的 相关信息
     */
    Game.prototype.getUserInfo = function () {
        var _this = this;
        httpAjaxGet('/dice/user', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取用户信息异常，请刷新页面重试");
                Game.viewBox.addChild(toast);
                return;
            }
            Game.userinfo = req.data;
            Bot.createCur(Game.userinfo.point);
            // 显示自己的头像昵称
            User.userList[2] = {
                'uid': Game.userinfo.uid,
                'name': Game.userinfo.name,
                'headimg': Game.userinfo.headimg
            };
            User.createUserList(2);
            // 暂时先展示游客的头像昵称，有玩家进入后会替代现有场景
            User.createUserList(0);
            User.createUserList(1);
            User.createUserList(3);
            User.createUserList(4);
            // 获取同桌玩家信息
            new UserControl();
            // 获取赔率
            _this.getOdds();
            // 获取用户其他信息
            _this.getOtherInfo();
            // 获取最近10期信息
            _this.getQihaoList();
            // 在微信内 加载分享js库 调用微信分享配置 并加装音乐
            _this.loadMusic();
        });
    };
    Game.prototype.loadMusic = function () {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools) {
            ResUtils.getInstance().loadGroup("music", function () {
                Main.DEFAULT_CONFIG.loadMusic = true;
                if (Main.DEFAULT_CONFIG.isWechat) {
                    if (window.yxjc_share == undefined) {
                        loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/share/yxjc_share.js?ver=' + window.yxjc_public_config.ver.share);
                        var timer_1 = setInterval(function () {
                            if (window.yxjc_share != undefined) {
                                clearInterval(timer_1);
                                window.yxjc_share.wxjssdk({
                                    apiurl: Main.DEFAULT_CONFIG.api_url,
                                    sid: Main.DEFAULT_CONFIG.sid,
                                    cuid: Game.userinfo.cuid,
                                    icon: Main.DEFAULT_CONFIG.http_origin + '/static/img/zodiac_icon.png',
                                    appMessageTitle: '财神到！新春送财神。快来测测今年运势！',
                                    appMessageDesc: '十二生肖送财气，金童玉女祝安康，五福临门，财源滚滚。',
                                    timelineTitle: '财神到！新春送财神。快来测测今年运势！十二生肖送财气，金童玉女祝安康，五福临门，财源滚滚。',
                                    callback: function () {
                                        MusicControl.playBg();
                                    }
                                });
                            }
                        }, 50);
                    }
                }
                else {
                    if (Main.DEFAULT_CONFIG.isAndroid) {
                        MusicControl.playBg();
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
                                f_1 = false;
                                MusicControl.playBg();
                            }
                        });
                    }
                }
            }, this);
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
            if (Main.DEFAULT_CONFIG.isWechat && Main.DEFAULT_CONFIG.isMain && req.data.isBind == 0 && Game.userinfo.point > 2000 && getCookie('isOpenBindPhone') != 'Y') {
                loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/bindphone/yxjc_bindphone.js?ver=' + window.yxjc_public_config.ver.bindphone);
                var timer_2 = setInterval(function () {
                    if (window.yxjc_bindphone != undefined) {
                        clearInterval(timer_2);
                        window.yxjc_bindphone.init({
                            apiurl: Main.DEFAULT_CONFIG.api_url,
                            isMain: Main.DEFAULT_CONFIG.isMain,
                            callback: function () {
                                var toast = new Toast("恭喜您，绑定成功");
                                Game.viewBox.addChild(toast);
                            }
                        });
                    }
                }, 50);
            }
        });
    };
    /**
     * 获取赔率信息
     */
    Game.prototype.getOdds = function () {
        httpAjaxGet('/zodiac/get-odds', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取赔率异常，请刷新页面重试");
                Game.viewBox.addChild(toast);
                return;
            }
            Game.multiple = req.data;
            Table.createBeishu();
            SmallFugui.createBeishu(Game.small_type);
            BigFugui.createBeishu();
        });
    };
    /**
     * 获取最近10期信息
     */
    Game.prototype.getQihaoList = function () {
        var _this = this;
        httpAjaxGet('/zodiac/qihao-list', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0)
                return;
            // 第一次保存当前10期报喜数据
            Popup.qihaoData = req.data;
            // 页面展示最新一期报喜信息
            req = req.data[0].point;
            var point_number = [-1, -1, -1];
            point_number[0] = Game.pointList[1].indexOf(req[1]);
            point_number[1] = Game.pointList[0].indexOf(req[0]);
            point_number[2] = Game.pointList[2].indexOf(req[2]);
            Top.baoxi_text(Game.pointCNList[0][point_number[1]] + ' • ' + Game.pointCNList[1][point_number[0]] + ' • ' + Game.pointCNList[2][point_number[2]]);
            // 获取下注信息
            _this.getBetList();
            // 获取当前期状态信息
            _this.getCurrent();
        });
    };
    /**
     * 获取自己下注区间信息
     */
    Game.prototype.getBetList = function () {
        httpAjaxGet('/zodiac/bet-list', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                Game.betList = [100, 1000, 10000];
            }
            else {
                Game.betList = req.data;
            }
            Bot.createBetList(Game.betList);
            Game.betItem = Game.betList[0];
        });
    };
    /**
     * 获取当前期状态信息
     */
    Game.prototype.getCurrent = function () {
        var _this = this;
        httpAjaxGet('/zodiac/current', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取当前期信息异常，请刷新页面重试");
                Game.viewBox.addChild(toast);
                return;
            }
            // 撤销遮罩
            Game.viewBox.removeChild(Game.maskBox);
            // 更新相关配置
            Game.status = req.data.status;
            Game.time = req.data.time;
            Game.qihao = req.data.qihao;
            // 初始化游戏中控
            new GameControl();
            // 每天第一次登入游戏上报
            _this.todayFirstLogin();
            // 获取公共的组件
            _this.getComponents();
        });
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
        var first_login_sesx = window.localStorage.getItem('first_login_sesx');
        // 今日已经登入过
        if (this.getYMD() == first_login_sesx)
            return;
        // 上报今日登入十二生肖
        httpAjaxGet('/task/enter-game?game_id=' + Main.DEFAULT_CONFIG.game_id, '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0)
                return;
            window.localStorage.setItem('first_login_sesx', _this.getYMD());
        });
    };
    /**
     * 获取公共的组件
     */
    Game.prototype.getComponents = function () {
        // 公共菜单
        // loadExtentFile(Main.DEFAULT_CONFIG.http_origin + '/default/menu/yxjc_menu.js?ver=' + (<any>window).yxjc_public_config.ver.menu);
        // let timer = setInterval(() => {
        //     if ((<any>window).yxjc_menu != undefined) {
        //         clearInterval(timer);
        //         (<any>window).yxjc_menu.init({
        //             musicConfig: {
        //                 switch: true,  // 默认音乐开还是关  true 开  false 关
        //                 playCallback: () => {  // 开启音乐回调
        //                     MusicControl.playMusic();
        //                 },
        //                 stopCallback: () => {  // 关闭音乐回调
        //                     MusicControl.stopMusic();
        //                 }
        //             }
        //         });
        //     }
        // }, 50);
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
    /**
     * 70%透明黑色背景
     */
    Game.m_mask = function () {
        var m_mask = new egret.Shape();
        m_mask.graphics.beginFill(0x000000, .7);
        m_mask.graphics.drawRect(0, 0, Game.viewBox.width, Game.viewBox.height);
        m_mask.graphics.endFill();
        return m_mask;
    };
    /**
     * 获取区间 （是大小富贵还是生肖或者五福等）
     * 0金玉 1五福 2生肖 3小富贵 4大富贵
     */
    Game.getSection = function (key) {
        var section;
        switch (key) {
            case 'jinyu':
                section = 0;
                break;
            case 'wufu':
                section = 1;
                break;
            case 'zodiac':
                section = 2;
                break;
            case 'small':
                section = 3;
                break;
            case 'big':
                section = 4;
                break;
        }
        return section;
    };
    /**
     * 根据下注的区间与key获取下注位置
     */
    Game.getBetPos = function (s, k) {
        var j;
        switch (s) {
            case 0:
                j = Game.pointList[s].indexOf(k) + 17;
                break;
            case 1:
                j = Game.pointList[s].indexOf(k) + 12;
                break;
            case 2:
                j = Game.pointList[s].indexOf(k);
                break;
            case 3:
                j = 19;
                break;
            case 4:
                j = 20;
                break;
        }
        return j;
    };
    Game.viewBox = new egret.Sprite(); // 场景盒子
    Game.topViewBox = new egret.Sprite(); // 上部盒子，溢出可滚动
    Game.maskBox = new egret.Sprite(); // 遮罩盒子，接口错误就遮罩页面不能点击
    // 全部注 字母  金玉 五福 生肖
    Game.pointList = [
        ['M', 'N'],
        ['O', 'P', 'Q', 'R', 'S'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    ];
    // 全部注 按照画布顺序 外圈到内圈
    Game.pointCVList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'O', 'P', 'Q', 'R', 'S', 'M', 'N'];
    // 全部注 中文  金玉 五福 生肖
    Game.pointCNList = [
        ['金童', '玉女'],
        ['福', '禄', '寿', '喜', '财'],
        ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
    ];
    Game.small = [1, 0]; // 小富贵  pointList相应下标
    Game.small_type = 1; // 小富贵类型 0 金玉+五福 1 金玉+生肖 2 五福加生肖 
    Game.big = [1, 0, 2]; // 大富贵  pointList相应下标
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map