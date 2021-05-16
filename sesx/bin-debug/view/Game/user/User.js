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
 * 玩家
 */
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.init();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    User.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    User.prototype.init = function () {
        // 场景盒子
        this.addChild(User.viewBox);
        User.viewBox.width = this.stage.stageWidth;
        User.viewBox.height = 80;
        // 背景
        var viewBg = createBitmapByName('default_json.default_2');
        User.viewBox.addChild(viewBg);
        viewBg.width = User.viewBox.width;
        viewBg.height = 62;
        // 玩家位置盒子
        for (var i = 0; i < 5; i++) {
            var userBox = User.userBox(i);
            userBox.x = User.userPos[i].x;
            userBox.y = User.userPos[i].y;
            userBox.width = 130;
            userBox.height = 140;
            User.viewBox.addChild(userBox);
        }
    };
    User.userBox = function (i) {
        var item;
        if (i == 0) {
            item = User.userBox_1;
        }
        else if (i == 1) {
            item = User.userBox_2;
        }
        else if (i == 2) {
            item = User.userBox_3;
        }
        else if (i == 3) {
            item = User.userBox_4;
        }
        else {
            item = User.userBox_5;
        }
        return item;
    };
    // 绘制玩家 i:哪位玩家
    User.createUserList = function (i) {
        var userBox = User.userBox(i);
        if (userBox.$children.length > 0) {
            commonRemoveChild(userBox);
        }
        var headimg;
        if (User.userList[i].name == undefined) {
            headimg = i % 2 == 0 ? '/default/static/head_nan_64.png' : '/default/static/head_nv_64.png';
            headimg = Main.DEFAULT_CONFIG.http_origin + headimg;
        }
        else {
            headimg = User.userList[i].headimg == '' ? Main.DEFAULT_CONFIG.http_origin + '/default/static/head_nan_64.png' : User.userList[i].headimg;
            headimg = headimg.split('/');
            if (headimg[headimg.length - 1] == '0' || headimg[headimg.length - 1] == '132') {
                headimg = headimg.splice(0, headimg.length - 1);
                headimg = headimg.join("/") + '/64';
            }
            else {
                headimg = headimg.join("/");
            }
        }
        // 因使用了webgl，微信头像地址跨域，采用图片转base64模式加载微信头像
        httpAjaxGet('/common/trans-base', '?url=' + headimg, function (event) {
            var req_1 = event.currentTarget;
            var req = JSON.parse(req_1.response);
            if (req.code != 0) {
                var toast = new Toast("获取用户头像异常，请刷新页面重试");
                Game.viewBox.addChild(toast);
                return;
            }
            var img = new Image();
            img.src = req.data.code;
            img.onload = function () {
                var texture = new egret.Texture();
                var bitmapdata = new egret.BitmapData(img);
                texture._setBitmapData(bitmapdata);
                var bmp = new egret.Bitmap(texture);
                bmp.width = 87.6;
                bmp.height = 87.6;
                bmp.x = 23;
                bmp.y = 5;
                userBox.addChild(bmp);
                // 头像遮罩
                var circle = new egret.Shape();
                circle.graphics.beginFill(0xCB9A52);
                circle.graphics.drawCircle(50, 50, 44);
                circle.graphics.endFill();
                circle.x = 15;
                userBox.addChild(circle);
                bmp.mask = circle;
                // 头像边框
                var shp = new egret.Shape();
                shp.graphics.lineStyle(3, 0xCB9A52);
                shp.graphics.beginFill(0xCB9A52, 0);
                shp.graphics.drawCircle(50, 50, 44);
                shp.graphics.endFill();
                shp.x = 15;
                userBox.addChild(shp);
            };
        });
        if (User.userList[i].name != undefined) {
            var t = User.userList[i].name;
            if (t.length > 4)
                t = t.substr(0, 4) + '...';
            var name_1 = createTextFieldByName(t);
            name_1.width = 130;
            name_1.height = 40;
            name_1.size = 24;
            name_1.textAlign = 'center';
            name_1.verticalAlign = 'middle';
            name_1.textColor = 0x6E5454;
            name_1.y = 100;
            userBox.addChild(name_1);
        }
    };
    // 玩家所得奖励展示 n奖励数 i位置
    User.userPoint = function (n, i) {
        var box = new egret.Sprite();
        User.viewBox.addChild(box);
        box.width = 80;
        box.height = 34;
        box.x = User.userPos[i].x + 10;
        box.y = User.userPos[i].y + 20;
        var line = new egret.Shape();
        line.graphics.beginFill(0xE34849, 1);
        line.graphics.drawRect(15, 0, 80, 34);
        line.graphics.endFill();
        box.addChild(line);
        var line_left = new egret.Shape();
        line_left.graphics.beginFill(0xE34849, 1);
        line_left.graphics.drawArc(0, 17, 17, 0, Math.PI, true);
        line_left.graphics.endFill();
        box.addChild(line_left);
        line_left.rotation = 270;
        line_left.x = 0;
        line_left.y = 17;
        var line_right = new egret.Shape();
        line_right.graphics.beginFill(0xE34849, 1);
        line_right.graphics.drawArc(80, 17, 17, 0, Math.PI, true);
        line_right.graphics.endFill();
        box.addChild(line_right);
        line_right.rotation = 90;
        line_right.x = 110;
        line_right.y = -62;
        var ts = createTextFieldByName('+' + n);
        box.addChild(ts);
        ts.x = 10;
        ts.size = 28;
        ts.height = 34;
        ts.verticalAlign = 'middle';
        setTimeout(function () {
            User.viewBox.removeChild(box);
        }, 2000);
    };
    // 场景盒子
    User.viewBox = new egret.Sprite();
    // 玩家盒子
    User.userBox_1 = new egret.Sprite();
    User.userBox_2 = new egret.Sprite();
    User.userBox_3 = new egret.Sprite();
    User.userBox_4 = new egret.Sprite();
    User.userBox_5 = new egret.Sprite();
    // 玩家坐标
    User.userPos = [
        { x: -10, y: -160 },
        { x: 100, y: -68 },
        { x: 256, y: -44 },
        { x: 410, y: -68 },
        { x: 520, y: -160 }
    ];
    // 用户信息
    User.userList = ['', '', '', '', ''];
    return User;
}(egret.DisplayObjectContainer));
__reflect(User.prototype, "User");
//# sourceMappingURL=User.js.map