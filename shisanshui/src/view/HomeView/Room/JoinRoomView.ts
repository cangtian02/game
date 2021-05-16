/**
 * 进入房间
 * 接收弹框对象，便于绘制
 */
class JoinRoomView extends egret.Sprite {
    
    // 弹框对象的盒子
    private modalWarp: any;
    // 主要场景盒子
    private enterBox: egret.Sprite = new egret.Sprite();
    // 按键盒子
    private keyBox: egret.Sprite = new egret.Sprite();
    // 提示语盒子
    private promptBox: egret.Sprite = new egret.Sprite();
    // 房号盒子
    private roomBox: egret.Sprite = new egret.Sprite();
    // 房号
    private roomNum: number[] = [];
    
	public constructor(public modal: any) {
        super();
        this.modalWarp = this.modal.modalWarp;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
	}
	
    private createView() {
        // title
        var title = createBitmapByName('home_jojn_room_json.jr_room_16');
        this.modalWarp.addChild(title);
        title.width = 160;
        title.height = 44;
        title.x = 300;
        title.y = 6;
        // 主要场景
        this.modalWarp.addChild(this.enterBox);
        this.enterBox.width = 732;
        this.enterBox.height = 480;
        this.enterBox.x = 14;
        this.enterBox.y = 76;
        // 主要场景背景
        var enter_bg = createBitmapByName('public_modal_bg_png');
        this.enterBox.addChild(enter_bg);
        enter_bg.width = this.enterBox.width;
        enter_bg.height = this.enterBox.height;
        
        // 输入框
        this.createInputView();   
        // 提示语
        this.createPromptView('请输入房间号');
        // 键盘
        this.createKeyView();
    }
	
    private createInputView() {
        // 房号主场景盒子
        this.enterBox.addChild(this.roomBox);
        this.roomBox.width = 590;
        this.roomBox.height = 60;
        this.roomBox.x = 71;
        this.roomBox.y = 10;
        // 房号盒子
        this.enterBox.addChild(this.promptBox);
        this.promptBox.width = this.enterBox.width;
        this.promptBox.height = 28;
        this.promptBox.y = 84;
        // 房号底条纹
        var inputBox: egret.Sprite = new egret.Sprite();
        this.enterBox.addChild(inputBox);
        inputBox.width = 590;
        inputBox.height = 5;
        inputBox.x = 71;
        inputBox.y = 70;
        for (var i:number = 0; i < 6; i++) {
            var inpLine = createBitmapByName('home_jojn_room_json.jr_room_13');
            inputBox.addChild(inpLine);
            inpLine.width = 70;
            inpLine.height = 2.5;
            inpLine.x = i * (70 + 34);
        }
    }
    
    private createPromptView(text: string) {
        // 如果已经有绘制就先删除
        if (this.promptBox.$children.length > 0) {
            this.promptBox.removeChild(this.promptBox.$children[0]);
        }
        // 绘制文字
        var promptText = createTextFieldByName(text);
        this.promptBox.addChild(promptText);
        promptText.width = this.promptBox.width;
        promptText.height = 28;
        promptText.textColor = 0xE30000;
        promptText.size = 26;
        promptText.textAlign = 'center';
        promptText.verticalAlign = 'middle';
    }
    
    private createKeyView() {
        // 按键主要场景
        this.enterBox.addChild(this.keyBox);
        this.keyBox.width = 590;
        this.keyBox.height = 320;
        this.keyBox.x = 71;
        this.keyBox.y = 120;
        //--------- 绘制按键开始
        for (var i:number = 0; i < 12; i++) {
            // 按键盒子
            var keyList: egret.Sprite = new egret.Sprite();
            this.keyBox.addChild(keyList);
            keyList.width = 144;
            keyList.height = 72;
            if (i < 3) {
                keyList.x = i * (144 + 79);
            } else if(i > 2 && i < 6) {
                keyList.x = (i - 3) * (144 + 79);
                keyList.y = 84;   
            } else if (i > 5 && i < 9) {
                keyList.x = (i - 6) * (144 + 79);
                keyList.y = 168;   
            } else {
                keyList.x = (i - 9) * (144 + 79);
                keyList.y = 256;
            }
            // 按键背景
            if (i == 9 || i == 11) {
                var keyBg = createBitmapByName('home_jojn_room_json.jr_room_15');
            } else {
                var keyBg = createBitmapByName('home_jojn_room_json.jr_room_14');
            }
            keyList.addChild(keyBg);
            keyBg.width = 144;
            keyBg.height = 72;
            // 按键文字
            if (i == 9) {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_12');
            } else if (i == 11) {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_11');
            } else if (i == 10) {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_00');
            } else {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_0' + (i + 1));
            }
            keyList.addChild(keyText);
            if (i == 9 || i == 11) {
                keyText.width = 80;
                keyText.x = 32;
            } else {
                keyText.width = 26;
                keyText.x = 59;
            }
            keyText.height = 40;
            keyText.y = 14;
        }
        //---------- 绘制按键结束
        // 按键点击事件
        this.keyBox.touchEnabled = true;
        this.keyBox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.keyTouch,this);
    }
    
    private keyTouch(evt: egret.TouchEvent) {
        // 可点击区域的X Y轴坐标
        var keyBox_X:number = (this.stage.stageWidth - this.keyBox.width) / 2;
        var keyBox_Y:number = this.modalWarp.y + this.enterBox.y + this.keyBox.y;
        // 点击坐标
        var evtX:number = evt.stageX;
        var evtY:number = evt.stageY;
        // 根据点击坐标得出点击的是哪个按键
        evtX = Math.floor((evtX - keyBox_X) / 223);
        evtY = Math.floor((evtY - keyBox_Y) / 84);
        // 点击的按键下标
        var i:number = evtX + (evtY * 3);
        // 添加动画
        var tw_key = egret.Tween.get(this.keyBox.$children[i]);
        tw_key.to({ "alpha": .5 },150);
        tw_key.to({ "alpha": 1 },150);
        // 输入事件
        if (i == 10) {  // 输入0
            this.createInputNumView(-1,1);
        } else if (i == 9) { // 清空
            this.createInputNumView(0,2);
        } else if (i == 11) { // 删除
            this.createInputNumView(0,3);
        } else { // 输入1-9
            this.createInputNumView(i,1);
        }
    }
    
    /**
     * 绘制输入房号
     * i 输入下标
     * f 1 输入数字 2 清空房号 3 删除房号
     */ 
    private createInputNumView(i: number,f: number) {
        // 输入房号
        if (f == 1 && this.roomNum.length < 6) {
            // 绘制输入房号
            if (i == -1) {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_00');
            } else {
                var keyText = createBitmapByName('home_jojn_room_json.jr_room_0' + (i + 1));
            }
            this.roomBox.addChild(keyText);
            keyText.width = 26;
            keyText.height = 40;
            keyText.y = 10;
            keyText.x = (70 + 34) * this.roomNum.length + 22;
            // 保存输入房号
            this.roomNum.push(i + 1);
            // 当输入6位房号后，调用进入房间方法
            if (this.roomNum.length == 6) {
                this.jojnRoomFun(this.roomNum.join(''));
            }
        }
        // 清空已输入房号
        if (f == 2 && this.roomNum.length > 0) {
            // 重置存储房号数组
            this.roomNum.length = 0;
            // 清空已绘制房号
            for (var j: number = this.roomBox.$children.length - 1; j > -1; j--) {
                this.roomBox.removeChild(this.roomBox.$children[j]);
            }
        }
        // 删除已输入房号
        if (f == 3 && this.roomNum.length > 0) {
            // 删除存储房号数组
            this.roomNum.splice(this.roomNum.length - 1,1);
            // 删除已绘制房号
            this.roomBox.removeChild(this.roomBox.$children[this.roomBox.$children.length - 1]);
        }
    }
    
    /**
     * 进入房间
     * n 房号
     */ 
    private jojnRoomFun(n: string) {
        this.modal.$parent.removeChild(this.modal);
        var self = HomeView.self;
        
        var param: any = '{"gid":' + Main.Game_GID + ',"rno":' + n + '}';
        httpAjax(true,Main.DEFAULT_CONFIG.config.met_getRoomByRno,param,(event: egret.Event) => {
            var request = <egret.HttpRequest>event.currentTarget;
            var res = JSON.parse(request.response);
            if(res.ret != 0) {
                var toast = new Toast("进入房间异常");
                self.addChild(toast);
                return;
            }
            // 植入chessUri字段，供socket发送_chess使用
            Main.GAME_WEBSOCKET.chessUri = res.data.uri;
            // 转场动画
            var loading = new Loading("正在为您加载，即将进入游戏");
            HomeView.self.addChild(loading);
            // 加载游戏场景资源，跳转游戏
            ResUtils.getInstance().loadGroup("game",() => {
                HomeView.self.dispatchEvent(new egret.Event("GameStart"));
                // 进行enter
                var data: string = '{"accountc": {},\n\
                    "cfg": {\n\
                        "pnum" : ' + res.data.cfg.pnum + ',\n\
                        "rounds" : ' + res.data.cfg.rounds + ',\n\
                        "nGhostAdd" : ' + res.data.cfg.joker + ',\n\
                        "nColorAdd" : ' + res.data.cfg.addColor + ',\n\
                        "nBuyCode": ' + res.data.cfg.buyhorse + ',\n\
                        "nWaterBanker": ' + res.data.cfg.leadership + ',\n\
                        "nMaxMult": ' + res.data.cfg.maxfan + '\n\
                    },\n\
                    "clog": {},\n\
                    "cost": "' + res.data.cost + '",\n\
                    "ctime": "' + res.data.ctime + '",\n\
                    "expiretime": "' + res.data.expiretime + '",\n\
                    "gamedir": "G_3",\n\
                    "gid": "' + res.data.gid + '",\n\
                    "log": "",\n\
                    "rid": "' + res.data.rid + '",\n\
                    "rno": "' + res.data.rno + '",\n\
                    "status": "0",\n\
                    "uid": "' + res.data.uid + '",\n\
                    "uri": "' + res.data.uri + '"}';
                Main.WEBSOCKET.doSend(cfg_enter(data,false));
            },this);
        });
    }
    
}
