var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 创建房间
 * 接收弹框对象，便于绘制
 */
var OpenRoomView = (function (_super) {
    __extends(OpenRoomView, _super);
    function OpenRoomView(modal) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        // 玩法规则设置盒子
        _this.gruleBox = new egret.Sprite();
        // 玩法规则
        _this.grule = {
            'leadership': 0,
            'joker': 0,
            'pnum': 4,
            'rounds': 0,
            'addColor': 1,
            'buyhorse': 1,
            'maxfan': 5 //闲家最大倍数 1 2 3 4 5
        };
        _this.modalWarp = _this.modal.modalWarp;
        _this.addtional = Main.GAME_CONFIG.gameinfo.roomgame[0].addtional;
        _this.grule.rounds = _this.addtional[0].round;
        // 如果缓存中有用户已经开房规格,使用缓存中的人数与局数
        var _grule = egret.localStorage.getItem('grule');
        if (_grule != null) {
            var j_grule = JSON.parse(_grule);
            _this.grule.pnum = j_grule.pnum;
            _this.grule.rounds = j_grule.rounds;
        }
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    OpenRoomView.prototype.createView = function () {
        // title
        var title = createBitmapByName('home_open_room_title_png');
        this.modalWarp.addChild(title);
        title.width = 160;
        title.height = 44;
        title.x = 440;
        title.y = 6;
        // left
        var leftBox = new egret.Sprite();
        this.modalWarp.addChildAt(leftBox, 2);
        leftBox.width = 230;
        leftBox.height = 70;
        leftBox.x = -14;
        leftBox.y = 96;
        var left_bg = createBitmapByName('public_tab_cur_png');
        leftBox.addChild(left_bg);
        left_bg.width = leftBox.width;
        left_bg.height = leftBox.height;
        var left_text = createBitmapByName('home_open_room_tab_text_png');
        leftBox.addChild(left_text);
        left_text.width = 104;
        left_text.height = 35;
        left_text.x = 50;
        left_text.y = (leftBox.height - 35) / 2;
        // right
        var rightBox = new egret.Sprite();
        this.modalWarp.addChildAt(rightBox, 1);
        rightBox.width = 830;
        rightBox.height = 540;
        rightBox.x = 200;
        rightBox.y = 76;
        var right_bg = createBitmapByName('public_modal_bg_png');
        rightBox.addChild(right_bg);
        right_bg.width = rightBox.width;
        right_bg.height = rightBox.height;
        rightBox.addChild(this.gruleBox);
        this.gruleBox.width = 750;
        this.gruleBox.height = 500;
        this.gruleBox.x = 42;
        this.gruleBox.y = 14;
        // 玩法
        this.createMethodView();
        // 人数
        this.createPnumView();
        // 局数
        this.createRoundsView();
        // 加色
        this.createAddColorView();
        // 买马
        this.createBuyhorseView();
        // 倍数
        this.createMaxfanView();
        // 底部创建按钮与提示文字
        this.createBotView();
    };
    // 玩法
    OpenRoomView.prototype.createMethodView = function () {
        var _this = this;
        var textarea = new GruleTextarea('玩法:');
        this.gruleBox.addChild(textarea);
        var checkbox_1 = new eui.CheckBox();
        checkbox_1.skinName = skins.CheckBoxSkin;
        checkbox_1.label = "加一色坐庄";
        textarea.addChild(checkbox_1);
        checkbox_1.x = 120;
        checkbox_1.y = 12;
        checkbox_1.addEventListener(egret.Event.CHANGE, function () {
            checkbox_1.selected == false ? _this.grule.leadership = 0 : _this.grule.leadership = 1;
            _this.createPnumView();
            _this.createAddColorView();
            _this.createBuyhorseView();
            _this.createMaxfanView();
        }, this);
        var checkbox_2 = new eui.CheckBox();
        checkbox_2.skinName = skins.CheckBoxSkin;
        checkbox_2.label = "大小鬼";
        textarea.addChild(checkbox_2);
        checkbox_2.x = 390;
        checkbox_2.y = 12;
        checkbox_2.addEventListener(egret.Event.CHANGE, function () {
            checkbox_2.selected == false ? _this.grule.joker = 0 : _this.grule.joker = 1;
        }, this);
    };
    // 人数
    OpenRoomView.prototype.createPnumView = function () {
        var _this = this;
        var textarea = new GruleTextarea('人数:');
        this.gruleBox.addChild(textarea);
        textarea.y = 68;
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            var radioGroup = evt.target;
            _this.grule.pnum = radioGroup.selectedValue;
            _this.createRoundsView();
            _this.createAddColorView();
        }, this);
        // 选择加一色坐庄只允许4，5人
        if (this.grule.leadership == 1 && this.grule.pnum != 4 && this.grule.pnum != 5) {
            this.grule.pnum = 4;
        }
        radioGroup.selectedValue = this.grule.pnum;
        for (var i = 0; i < 5; i++) {
            var radioButton = new eui.RadioButton();
            radioButton.skinName = skins.RadioButtonSkin;
            radioButton.label = (i + 2) + '人';
            radioButton.value = i + 2;
            radioButton.group = radioGroup;
            textarea.addChild(radioButton);
            radioButton.x = (i * 124) + 120;
            radioButton.y = 12;
            // 选择加一色坐庄只允许4，5人
            if (this.grule.leadership == 1 && (i == 0 || i == 1 || i == 4)) {
                radioButton.enabled = false;
            }
        }
    };
    // 局数
    OpenRoomView.prototype.createRoundsView = function () {
        var _this = this;
        var textarea = new GruleTextarea('局数:');
        this.gruleBox.addChild(textarea);
        textarea.y = 136;
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            var radioGroup = evt.target;
            _this.grule.rounds = radioGroup.selectedValue;
        }, this);
        radioGroup.selectedValue = this.grule.rounds;
        // 根据所选人数筛选出所需房卡数组数据
        var _addtional = [];
        for (var j = 0; j < this.addtional.length; j++) {
            if (this.addtional[j].pnum == this.grule.pnum) {
                _addtional.push(this.addtional[j]);
            }
        }
        for (var i = 0; i < 3; i++) {
            var radioButton = new eui.RadioButton();
            radioButton.skinName = skins.RadioButtonSkin;
            radioButton.label = _addtional[i].round + '(房卡x' + _addtional[i].cost + ')';
            radioButton.value = _addtional[i].round;
            radioButton.group = radioGroup;
            textarea.addChild(radioButton);
            radioButton.x = (i * 200) + 120;
            radioButton.y = 12;
        }
    };
    // 加色
    OpenRoomView.prototype.createAddColorView = function () {
        var _this = this;
        var textarea = new GruleTextarea('加色:');
        this.gruleBox.addChild(textarea);
        textarea.y = 204;
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            var radioGroup = evt.target;
            _this.grule.addColor = radioGroup.selectedValue;
        }, this);
        //2,3人不加色，4人不加色、加一色，5人加一色，6人加两色
        var arr = [];
        if (this.grule.pnum == 2 || this.grule.pnum == 3) {
            arr.push(1, 0, 0);
            this.grule.addColor = 1;
        }
        else if (this.grule.pnum == 4 && this.grule.leadership == 1) {
            arr.push(0, 1, 0);
            this.grule.addColor = 2;
        }
        else if (this.grule.pnum == 4 && this.grule.leadership == 0) {
            arr.push(1, 1, 0);
            this.grule.addColor = 1;
        }
        else if (this.grule.pnum == 5) {
            arr.push(0, 1, 0);
            this.grule.addColor = 2;
        }
        else if (this.grule.pnum == 6) {
            arr.push(0, 0, 1);
            this.grule.addColor = 3;
        }
        radioGroup.selectedValue = this.grule.addColor;
        for (var i = 0; i < 3; i++) {
            var radioButton = new eui.RadioButton();
            radioButton.skinName = skins.RadioButtonSkin;
            var labelName = '';
            i == 0 ? labelName = '不加色' : i == 1 ? labelName = '加一色' : labelName = '加两色';
            radioButton.label = labelName;
            radioButton.value = i + 1;
            radioButton.group = radioGroup;
            textarea.addChild(radioButton);
            radioButton.x = (i * 200) + 120;
            radioButton.y = 12;
            arr[i] == 0 ? radioButton.enabled = false : '';
        }
    };
    // 买马
    OpenRoomView.prototype.createBuyhorseView = function () {
        var _this = this;
        var textarea = new GruleTextarea('买马:');
        this.gruleBox.addChild(textarea);
        textarea.y = 272;
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            var radioGroup = evt.target;
            _this.grule.buyhorse = radioGroup.selectedValue;
        }, this);
        if (this.grule.leadership == 1 && this.grule.buyhorse == 2) {
            this.grule.buyhorse = 1;
        }
        radioGroup.selectedValue = this.grule.buyhorse;
        for (var i = 0; i < 2; i++) {
            var radioButton = new eui.RadioButton();
            radioButton.skinName = skins.RadioButtonSkin;
            var labelName = '';
            i == 0 ? labelName = '无买马' : labelName = '有买马';
            radioButton.label = labelName;
            radioButton.value = i + 1;
            radioButton.group = radioGroup;
            textarea.addChild(radioButton);
            radioButton.x = (i * 200) + 120;
            radioButton.y = 12;
            if (this.grule.leadership == 1 && i == 1) {
                radioButton.enabled = false;
            }
        }
    };
    // 倍数
    OpenRoomView.prototype.createMaxfanView = function () {
        var _this = this;
        var textarea = new GruleTextarea('闲家最大倍数:');
        this.gruleBox.addChild(textarea);
        textarea.y = 340;
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            var radioGroup = evt.target;
            _this.grule.maxfan = radioGroup.selectedValue;
        }, this);
        radioGroup.selectedValue = this.grule.maxfan;
        for (var i = 0; i < 5; i++) {
            var radioButton = new eui.RadioButton();
            radioButton.skinName = skins.RadioButtonSkin;
            var labelName = '';
            radioButton.label = (i + 1) + '倍';
            radioButton.value = i + 1;
            radioButton.group = radioGroup;
            textarea.addChild(radioButton);
            radioButton.x = (i * 124) + 120;
            radioButton.y = 12;
            this.grule.leadership == 0 ? radioButton.enabled = false : '';
        }
    };
    // 底部创建按钮与提示文字
    OpenRoomView.prototype.createBotView = function () {
        var openRoomBtn = new Button('cjfj');
        this.gruleBox.addChild(openRoomBtn);
        openRoomBtn.x = (this.gruleBox.width - openRoomBtn.width) / 2;
        openRoomBtn.y = 412;
        var tip = createTextFieldByName('30分钟内未开启牌局或解散房间，会反还房卡');
        this.gruleBox.addChild(tip);
        tip.width = this.gruleBox.width;
        tip.textColor = 0x996F56;
        tip.size = 24;
        tip.textAlign = 'center';
        tip.y = 488;
        openRoomBtn.touchEnabled = true;
        openRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRoomFun, this);
    };
    // 创建房间http
    OpenRoomView.prototype.openRoomFun = function () {
        var _this = this;
        // 脱离modal层回到home层
        var self = HomeView.viewBox;
        // 关闭弹窗
        this.modal.$parent.removeChild(this.modal);
        // 加载框
        var loading = new Loading("正在创建房间", true);
        self.addChild(loading);
        // 买马
        var buyhorse = false;
        this.grule.buyhorse == 1 ? buyhorse = false : buyhorse = true;
        // 加一色坐庄
        var leadership = false;
        this.grule.leadership == 0 ? leadership = false : leadership = true;
        // http所需传值
        var param = '{"gid": ' + Main.Game_GID +
            ',"rounds": ' + this.grule.rounds +
            ',"maxfan": ' + this.grule.maxfan +
            ',"buyhorse": ' + buyhorse +
            ',"addColor": ' + (this.grule.addColor - 1) +
            ',"joker": ' + this.grule.joker +
            ',"leadership": ' + leadership +
            ',"pnum": ' + this.grule.pnum + '}';
        httpAjax(true, Main.DEFAULT_CONFIG.config.met_createRoom, param, function (event) {
            self.removeChild(loading);
            var request = event.currentTarget;
            var res = JSON.parse(request.response);
            if (res.ret != 0) {
                var toast = new Toast("创建房间失败");
                self.addChild(toast);
                return;
            }
            // 缓存开房规格
            egret.localStorage.setItem('grule', JSON.stringify(_this.grule));
            // 更改用户房卡数量
            Main.USER_INFO.card = res.account.card;
            HomeCardNumGroup.myCollection.replaceItemAt({ value: Main.USER_INFO.card }, 0);
            // 成功开房后提示窗
            var modal = new Modal(3);
            HomeView.viewBox.addChild(modal);
            var joinRoomModalView = new JoinRoomModalView(modal, res);
            modal.addChild(joinRoomModalView);
        });
    };
    return OpenRoomView;
}(egret.Sprite));
__reflect(OpenRoomView.prototype, "OpenRoomView");
// 开房规则底框类
var GruleTextarea = (function (_super) {
    __extends(GruleTextarea, _super);
    function GruleTextarea(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    GruleTextarea.prototype.createView = function () {
        var textarea = new egret.Sprite();
        textarea.width = 750;
        textarea.height = 60;
        this.addChild(textarea);
        var textareaBg = createBitmapByName('public_textarea_bg_png');
        textarea.addChild(textareaBg);
        textareaBg.width = textarea.width;
        textareaBg.height = textarea.height;
        var textareaName = createTextFieldByName(this.name);
        textarea.addChild(textareaName);
        textareaName.width = 92;
        textareaName.height = 44;
        textareaName.x = 30;
        textareaName.textColor = 0x7E5239;
        textareaName.verticalAlign = 'middle';
        this.name.length == 7 ? textareaName.size = 24 : textareaName.size = 28;
        this.name.length == 7 ? textareaName.y = 6 : textareaName.y = 10;
    };
    return GruleTextarea;
}(egret.Sprite));
__reflect(GruleTextarea.prototype, "GruleTextarea");
// 载入进入房间提示类
var JoinRoomModalView = (function (_super) {
    __extends(JoinRoomModalView, _super);
    function JoinRoomModalView(modal, res) {
        var _this = _super.call(this) || this;
        _this.modal = modal;
        _this.res = res;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    JoinRoomModalView.prototype.createView = function () {
        var modalWarp = this.modal.modalWarp;
        var title = createBitmapByName('public_tishi_title_png');
        modalWarp.addChild(title);
        title.width = 88;
        title.height = 42;
        title.x = (modalWarp.width - 88) / 2;
        title.y = 28;
        var text = createTextFieldByName('房间开设成功！房号：' + this.res.data.rno + '请确认你是否参与对局？');
        modalWarp.addChild(text);
        text.size = 32;
        text.textColor = 0x996F56;
        text.height = 94;
        text.textAlign = 'center';
        text.lineSpacing = 30;
        text.width = 440;
        text.x = (modalWarp.width - 440) / 2;
        text.y = 130;
        // 邀请好友
        var shareBtn = new Button('yqhy');
        modalWarp.addChild(shareBtn);
        shareBtn.x = 140;
        shareBtn.y = 276;
        // 进入房间
        var joinBtn = new Button('jrfj');
        modalWarp.addChild(joinBtn);
        joinBtn.x = 440;
        joinBtn.y = 276;
        // 邀请好友点击事件
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareRoomFun, this);
        // 进入房间点击事件
        joinBtn.touchEnabled = true;
        joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinRoomFun, this);
    };
    JoinRoomModalView.prototype.shareRoomFun = function () {
        console.log(this.res);
    };
    JoinRoomModalView.prototype.joinRoomFun = function () {
        var _this = this;
        this.modal.$parent.removeChild(this.modal);
        // 植入chessUri字段，供socket发送_chess使用
        Main.GAME_WEBSOCKET.chessUri = this.res.data.uri;
        // 转场动画
        var loading = new Loading("正在为您加载，即将进入游戏");
        HomeView.self.addChild(loading);
        // 加载游戏场景资源，跳转游戏
        ResUtils.getInstance().loadGroup("game", function () {
            HomeView.self.dispatchEvent(new egret.Event("GameStart"));
            // 成功进行enter
            var data = '{"accountc": {},\n\
            "cfg": {\n\
                "pnum" : ' + _this.res.data.cfg.pnum + ',\n\
                "rounds" : ' + _this.res.data.cfg.rounds + ',\n\
                "nGhostAdd" : ' + _this.res.data.cfg.joker + ',\n\
                "nColorAdd" : ' + _this.res.data.cfg.addColor + ',\n\
                "nBuyCode": ' + _this.res.data.cfg.buyhorse + ',\n\
                "nWaterBanker": ' + _this.res.data.cfg.leadership + ',\n\
                "nMaxMult": ' + _this.res.data.cfg.maxfan + '\n\
            },\n\
            "clog": {},\n\
            "cost": "' + _this.res.data.cost + '",\n\
            "ctime": "' + _this.res.data.ctime + '",\n\
            "expiretime": "' + _this.res.data.expiretime + '",\n\
            "gamedir": "G_3",\n\
            "gid": "' + _this.res.data.gid + '",\n\
            "log": "",\n\
            "rid": "' + _this.res.data.rid + '",\n\
            "rno": "' + _this.res.data.rno + '",\n\
            "status": "0",\n\
            "uid": "' + _this.res.data.uid + '",\n\
            "uri": "' + _this.res.data.uri + '"}';
            Main.WEBSOCKET.doSend(cfg_enter(data, false));
        }, this);
    };
    return JoinRoomModalView;
}(egret.Sprite));
__reflect(JoinRoomModalView.prototype, "JoinRoomModalView");
