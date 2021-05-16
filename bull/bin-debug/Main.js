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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        // 获取基础配置信息
        var origin = Main.DEFAULT_CONFIG.debug ? 'http://192.168.2.26/config' : window.location.origin + '/default/config';
        loadExtentFile(origin + '/yxjc_config.js?ver=' + Math.random());
        var timer = setInterval(function () {
            if (window.yxjc_public_config != undefined) {
                clearInterval(timer);
                var config = window.yxjc_public_config;
                Main.DEFAULT_CONFIG.api_url = Main.DEFAULT_CONFIG.debug ? config.api_url : Main.DEFAULT_CONFIG.online ? config.build.api_url : config.dev.api_url;
                Main.DEFAULT_CONFIG.ws_url = Main.DEFAULT_CONFIG.online ? 'wss://' + config.build.host + '/wss' : 'ws://' + config.dev.host + ':9502';
                Main.DEFAULT_CONFIG.http_origin = Main.DEFAULT_CONFIG.debug ? config.dev.origin : window.location.origin;
                Main.DEFAULT_CONFIG.http_url = Main.DEFAULT_CONFIG.http_origin + '/jingcai/bull.html';
                Main.DEFAULT_CONFIG.sid = getQueryString('sid');
                Main.DEFAULT_CONFIG.appid = Main.DEFAULT_CONFIG.online ? config.build.appid[Main.DEFAULT_CONFIG.sid] : config.dev.appid[Main.DEFAULT_CONFIG.sid];
                Main.DEFAULT_CONFIG.isMain = _this.isMainFun();
                RobotControl.is_open_robot = config.bull_rb; // 是否开启机器人
                if (Main.DEFAULT_CONFIG.sid == null || Main.DEFAULT_CONFIG.sid == '') {
                    if (Main.DEFAULT_CONFIG.debug) {
                        _this.viewInit();
                    }
                    else {
                        if (Main.DEFAULT_CONFIG.isWechat) {
                            alert('地址不合法');
                        }
                        else {
                            _this.viewInit();
                        }
                    }
                }
                else {
                    _this.viewInit();
                }
            }
        }, 50);
        // 如果在微信开发者工具内默认不开启音乐
        if (Main.DEFAULT_CONFIG.isWechatdevtools) {
            Main.DEFAULT_CONFIG.isPlayMusic = false;
        }
        return _this;
    }
    Main.prototype.isMainFun = function () {
        var arr = Main.DEFAULT_CONFIG.online ? window.yxjc_public_config.build.appid : window.yxjc_public_config.dev.appid;
        var flag = false;
        var i = 0;
        for (var k in arr) {
            if (i == 0 && k == Main.DEFAULT_CONFIG.sid) {
                flag = true;
            }
            i++;
        }
        return flag;
    };
    Main.prototype.viewInit = function () {
        if (window.sessionStorage.getItem('isLogin') == 'Y') {
            var url = '';
            if (Main.DEFAULT_CONFIG.isWechat) {
                url = Main.DEFAULT_CONFIG.http_url + '?current=wx&sid=' + Main.DEFAULT_CONFIG.sid;
            }
            else {
                url = Main.DEFAULT_CONFIG.http_url + '?current=web';
            }
            if (getQueryString("code") != null && !Main.DEFAULT_CONFIG.debug) {
                window.location.replace(url);
            }
            var cur = getQueryString("current");
            if (cur == null && !Main.DEFAULT_CONFIG.debug) {
                window.location.replace(url);
            }
            if (cur != null && !Main.DEFAULT_CONFIG.debug) {
                if (cur == 'wx' && !Main.DEFAULT_CONFIG.isWechat || cur == 'web' && Main.DEFAULT_CONFIG.isWechat) {
                    window.location.replace(url);
                }
            }
            this.init();
        }
        else {
            if (Main.DEFAULT_CONFIG.debug) {
                this.wxCode();
            }
            else {
                if (Main.DEFAULT_CONFIG.isWechat) {
                    this.wxinit();
                }
                else {
                    window.location.replace(Main.DEFAULT_CONFIG.http_origin + '/default/weblogin/index.html?source=' + encodeURIComponent(Main.DEFAULT_CONFIG.http_url + '?current=web'));
                }
            }
        }
    };
    /**
     * 微信登入初始化
     */
    Main.prototype.wxinit = function () {
        var _this = this;
        var code = getQueryString("code");
        var parent_id = getQueryString("parent_id");
        if (code == null) {
            var codeUrl = parent_id == null ? Main.DEFAULT_CONFIG.http_url + '?sid=' + Main.DEFAULT_CONFIG.sid : Main.DEFAULT_CONFIG.http_url + '?sid=' + Main.DEFAULT_CONFIG.sid + '&parent_id=' + parent_id;
            window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Main.DEFAULT_CONFIG.appid + "&redirect_uri=" + encodeURIComponent(codeUrl) + "&response_type=code&scope=snsapi_userinfo#wechat_redirect");
        }
        else {
            if (Main.DEFAULT_CONFIG.isWechat && !Main.DEFAULT_CONFIG.isMain) {
                httpAjaxPost('/site/status', { sid: Main.DEFAULT_CONFIG.sid, code: code }, function (event) {
                    var req_1 = event.currentTarget;
                    var req = JSON.parse(req_1.response);
                    if (req.code != 0) {
                        var toast = new Toast(req.data.msg);
                        _this.addChild(toast);
                    }
                    else {
                        if (req.data.status == 1) {
                            _this.wxCode();
                        }
                        else {
                            var url = Main.DEFAULT_CONFIG.http_origin + '/index/index.html?sid=' + Main.DEFAULT_CONFIG.sid;
                            parent_id == null ? url = url : url = url + '&parent_id=' + parent_id;
                            window.location.replace(url);
                        }
                    }
                });
            }
            else {
                this.wxCode();
            }
        }
    };
    Main.prototype.wxCode = function () {
        var _this = this;
        httpAjaxGet('/site/wx-code', '?code=' + getQueryString("code") + '&sid=' + Main.DEFAULT_CONFIG.sid, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("微信登录失败，请退出稍后重试");
                _this.addChild(toast);
            }
            else {
                _this.wxlogin();
            }
        });
    };
    /**
     * 微信登入
     */
    Main.prototype.wxlogin = function () {
        var _this = this;
        httpAjaxPost('/site/wx-login', '', function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("微信登录失败，请退出稍后重试");
                _this.addChild(toast);
            }
            else {
                window.sessionStorage.setItem('isLogin', 'Y');
                var parent_id = getQueryString("parent_id");
                // 判断是否有父级id传入
                if (parent_id == null) {
                    _this.urlReload();
                }
                else {
                    httpAjaxPost('/user/set-share', { user_id: parent_id }, function (event) {
                        _this.urlReload();
                    });
                }
            }
        });
    };
    Main.prototype.urlReload = function () {
        if (!Main.DEFAULT_CONFIG.debug) {
            window.location.replace(Main.DEFAULT_CONFIG.http_url + '?current=wx&sid=' + Main.DEFAULT_CONFIG.sid);
        }
        this.init();
    };
    /**
     * 项目初始化
     */
    Main.prototype.init = function () {
        // 加载资源 添加资源配置加载完成事件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if (!Main.DEFAULT_CONFIG.debug) {
            if (!Main.DEFAULT_CONFIG.online) {
                RES.loadConfig("bull/resource/default.res.json", "bull/resource/");
            }
            else {
                var cdnUrl = 'https://jcstatic.dstars.cc/jingcai/';
                RES.loadConfig(cdnUrl + "bull/resource/default.res.json?ver=" + Math.random(), cdnUrl + "bull/resource/");
            }
        }
        else {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
    };
    Main.prototype.onConfigComplete = function (event) {
        var _this = this;
        ResUtils.getInstance().loadGroup("game", function () {
            document.getElementById('loading').style.display = 'none';
            var game = new Game();
            _this.addChild(game);
            game.width = _this.stage.stageWidth;
            game.height = _this.stage.stageHeight;
        }, this);
    };
    // 全局使用配置
    Main.DEFAULT_CONFIG = {
        debug: true,
        online: false,
        http_origin: '',
        http_url: '',
        appid: '',
        api_url: '',
        ws_url: '',
        sid: '',
        isMain: false,
        game_id: 18,
        isWechat: !!navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i),
        isWechatdevtools: !!navigator.userAgent.match(/wechatdevtools\/([\d\.]+)/i),
        isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
        isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isPlayMusic: true,
        loadMusic: false //  加载音乐文件是否完成
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map