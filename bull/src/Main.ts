class Main extends egret.DisplayObjectContainer {

    // 全局使用配置
    public static DEFAULT_CONFIG = {
        debug: false,  // 上服务器需切换为 false
        online: false,  // 是否线上，测试服 false 线上服 true
        http_origin: '',
        http_url: '',
        appid: '', 
        api_url: '',
        ws_url: '',  // socket地址
        sid: '',  // 微信appid的sid
        isMain: false, // 是否是主公众号
        game_id: 18,
        isWechat: !!navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i),  // 是否在微信内
        isWechatdevtools: !!navigator.userAgent.match(/wechatdevtools\/([\d\.]+)/i),  // 是否在微信开发者工具内
        isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
        isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isPlayMusic: true,  // 是否开启音乐
        loadMusic: false  //  加载音乐文件是否完成
    }

    public constructor() {
        super();

        // 获取基础配置信息
        let origin = Main.DEFAULT_CONFIG.debug ? 'http://192.168.2.26/config' : window.location.origin + '/default/config';
        loadExtentFile(origin + '/yxjc_config.js?ver=' + Math.random());

        let timer: any = setInterval(() => {
            if((<any>window).yxjc_public_config != undefined) {
                clearInterval(timer);

                let config: any = (<any>window).yxjc_public_config;

                Main.DEFAULT_CONFIG.api_url = Main.DEFAULT_CONFIG.debug ? config.api_url : Main.DEFAULT_CONFIG.online ? config.build.api_url : config.dev.api_url;

                Main.DEFAULT_CONFIG.ws_url = Main.DEFAULT_CONFIG.online ? 'wss://' + config.build.host  + '/wss' : 'ws://' + config.dev.host + ':9502';

                Main.DEFAULT_CONFIG.http_origin = Main.DEFAULT_CONFIG.debug ? config.dev.origin : window.location.origin;

                Main.DEFAULT_CONFIG.http_url = Main.DEFAULT_CONFIG.http_origin + '/jingcai/bull.html';

                Main.DEFAULT_CONFIG.sid = getQueryString('sid');

                Main.DEFAULT_CONFIG.appid = Main.DEFAULT_CONFIG.online ? config.build.appid[Main.DEFAULT_CONFIG.sid] : config.dev.appid[Main.DEFAULT_CONFIG.sid];
            
                Main.DEFAULT_CONFIG.isMain = this.isMainFun();

                RobotControl.is_open_robot = config.bull_rb;  // 是否开启机器人

                if (Main.DEFAULT_CONFIG.sid == null || Main.DEFAULT_CONFIG.sid == '') { // 来路不明，不合法
                    if (Main.DEFAULT_CONFIG.debug) {
                        this.viewInit();
                    } else {
                        if (Main.DEFAULT_CONFIG.isWechat) {
                            alert('地址不合法');
                        } else {
                            this.viewInit();
                        }
                    }
                } else {
                    this.viewInit();
                }
            }
        },50);

        // 如果在微信开发者工具内默认不开启音乐
        if (Main.DEFAULT_CONFIG.isWechatdevtools) {
            Main.DEFAULT_CONFIG.isPlayMusic = false;
        }
    }

    private isMainFun() {
        let arr = Main.DEFAULT_CONFIG.online ? (<any>window).yxjc_public_config.build.appid : (<any>window).yxjc_public_config.dev.appid;
        let flag = false;
        let i = 0;
        for (let k in arr) {
            if (i == 0 && k == Main.DEFAULT_CONFIG.sid) {
                flag = true;
            }
            i++;
        }
        return flag;
    }

    private viewInit() {
        if (window.sessionStorage.getItem('isLogin') == 'Y') {  // 已登入
            let url: any = '';
            if (Main.DEFAULT_CONFIG.isWechat) {
                url = Main.DEFAULT_CONFIG.http_url + '?current=wx&sid=' + Main.DEFAULT_CONFIG.sid;
            } else {
                url = Main.DEFAULT_CONFIG.http_url + '?current=web';
            }

            if (getQueryString("code") != null && !Main.DEFAULT_CONFIG.debug) {
                window.location.replace(url);
            }

            let cur: any = getQueryString("current");

            if (cur == null && !Main.DEFAULT_CONFIG.debug) {
                window.location.replace(url);
            }

            if (cur != null && !Main.DEFAULT_CONFIG.debug) {
                if (cur == 'wx' && !Main.DEFAULT_CONFIG.isWechat || cur == 'web' && Main.DEFAULT_CONFIG.isWechat) {
                    window.location.replace(url);
                }
            }

            this.init();
        } else {  // 未登入
            if (Main.DEFAULT_CONFIG.debug) {
                this.wxCode();
            } else {
                if (Main.DEFAULT_CONFIG.isWechat) {
                    this.wxinit();
                } else {
                    window.location.replace(Main.DEFAULT_CONFIG.http_origin + '/default/weblogin/index.html?source=' + encodeURIComponent(Main.DEFAULT_CONFIG.http_url + '?current=web'));
                }
            }
        }
    }

    /**
     * 微信登入初始化
     */
    private wxinit() {
        let code: any = getQueryString("code");
        let parent_id = getQueryString("parent_id");

        if(code == null) {
            let codeUrl = parent_id == null ? Main.DEFAULT_CONFIG.http_url + '?sid=' + Main.DEFAULT_CONFIG.sid : Main.DEFAULT_CONFIG.http_url + '?sid=' + Main.DEFAULT_CONFIG.sid + '&parent_id=' + parent_id;
            
            window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Main.DEFAULT_CONFIG.appid + "&redirect_uri=" + encodeURIComponent(codeUrl) + "&response_type=code&scope=snsapi_userinfo#wechat_redirect");
        } else {
            if (Main.DEFAULT_CONFIG.isWechat && !Main.DEFAULT_CONFIG.isMain) {  // 在微信内并且是次公众号，判断是否绑定手机号
                httpAjaxPost('/site/status',{ sid: Main.DEFAULT_CONFIG.sid, code: code },(event: egret.Event) => {
                    let req_1 = <egret.HttpRequest>event.currentTarget;
                    let req = JSON.parse(req_1.response);

                    if(req.code != 0) {
                        let toast = new Toast(req.data.msg);
                        this.addChild(toast);
                    } else {
                        if (req.data.status == 1) {  // 已经注册过，直接登入
                            this.wxCode();
                        } else {  //  没有注册过，跳转到主页完成注册流程
                            let url = Main.DEFAULT_CONFIG.http_origin + '/index/index.html?sid=' + Main.DEFAULT_CONFIG.sid;
                            parent_id == null ? url = url : url = url + '&parent_id=' + parent_id;
                            window.location.replace(url);
                        }
                    }
                });
            } else {
                this.wxCode();
            }
        }
    }

    private wxCode() {
        httpAjaxGet('/site/wx-code', '?code=' + getQueryString("code") + '&sid=' + Main.DEFAULT_CONFIG.sid,(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                var toast = new Toast("微信登录失败，请退出稍后重试");
                this.addChild(toast);
            } else {
                this.wxlogin();
            }
        });
    }

    /**
     * 微信登入
     */
    private wxlogin() {
        httpAjaxPost('/site/wx-login','',(event: egret.Event) => {
            let req_1 = <egret.HttpRequest>event.currentTarget;
            let req = JSON.parse(req_1.response);
            if(req.code != 0) {
                let toast = new Toast("微信登录失败，请退出稍后重试");
                this.addChild(toast);
            } else {
                window.sessionStorage.setItem('isLogin', 'Y');
                window.sessionStorage.setItem('token', req.data.token);
                let parent_id = getQueryString("parent_id");
                // 判断是否有父级id传入
                if(parent_id == null) {
                    this.urlReload();
                } else {
                    httpAjaxPost('/user/set-share',{ user_id: parent_id },(event: egret.Event) => {
                        this.urlReload();
                    });
                }
            }
        });
    }

    private urlReload() {
        if(!Main.DEFAULT_CONFIG.debug) {
            window.location.replace(Main.DEFAULT_CONFIG.http_url + '?current=wx&sid=' + Main.DEFAULT_CONFIG.sid);
        }
        this.init();
    }

    /**
     * 项目初始化
     */
    private init() {
        // 加载资源 添加资源配置加载完成事件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if(!Main.DEFAULT_CONFIG.debug) {
            if(!Main.DEFAULT_CONFIG.online) {
                RES.loadConfig("bull/resource/default.res.json?ver=" + Math.random(), "bull/resource/");
            } else {
                let cdnUrl = 'https://jcstatic.dstars.cc/jingcai/';
                RES.loadConfig(cdnUrl + "bull/resource/default.res.json?ver=" + Math.random(), cdnUrl + "bull/resource/");
            }
        } else {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        ResUtils.getInstance().loadGroup("game", () => {
            document.getElementById('loading').style.display = 'none';
            let game = new Game();
            this.addChild(game);
            game.width = this.stage.stageWidth;
            game.height = this.stage.stageHeight;
        }, this);
    }

}
