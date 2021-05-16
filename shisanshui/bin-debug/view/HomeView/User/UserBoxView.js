var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅左上角用户信息
 */
var UserBoxView = (function (_super) {
    __extends(UserBoxView, _super);
    function UserBoxView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    UserBoxView.prototype.createView = function () {
        var userBox = new egret.Sprite();
        this.addChild(userBox);
        userBox.width = 320;
        userBox.height = 108;
        var portrait_bg = createBitmapByName("public_portrait_bg_png");
        userBox.addChildAt(portrait_bg, 1);
        portrait_bg.width = 108;
        portrait_bg.height = 108;
        // 头像 imagetype = 1 用默认头像 = 2 使用imageurl
        // http://intest.dstars.cc/dstars_3/images/robotImages/u=967161426,2010435884&fm=26&gp=0.jpg
        if (Main.USER_INFO.imagetype == 1) {
            var portrait_img = createBitmapByName("public_portrait_default_png");
            userBox.addChildAt(portrait_img, 2);
            portrait_img.width = 100;
            portrait_img.height = 100;
            portrait_img.x = 3.5;
            portrait_img.y = 3.5;
        }
        else {
        }
        var name = createTextFieldByName(Main.USER_INFO.nickname);
        userBox.addChild(name);
        name.width = 206;
        name.height = 28;
        name.x = 114;
        name.y = 6;
        name.textColor = 0xFFFFFF;
        name.size = 26;
        var uid = createTextFieldByName('ID:' + Main.USER_INFO.uid);
        userBox.addChild(uid);
        uid.width = 206;
        uid.height = 24;
        uid.x = 114;
        uid.y = 34;
        uid.textColor = 0xFFFFFF;
        uid.size = 24;
        var card_bg = createBitmapByName("home_fk_bg_png");
        userBox.addChildAt(card_bg, 0);
        card_bg.width = 240;
        card_bg.height = 44;
        card_bg.x = 80;
        card_bg.y = 60;
        var card_icon = createBitmapByName("public_fk_png");
        userBox.addChild(card_icon);
        card_icon.width = 48;
        card_icon.height = 32;
        card_icon.x = 114;
        card_icon.y = 66;
        // 绘制房卡数量
        var card_num = new HomeCardNumGroup();
        userBox.addChild(card_num);
        card_num.width = 108;
        card_num.height = 24;
        card_num.x = 174;
        card_num.y = 70;
        // 利用eui的数据合集（类似vue的数据双向绑定）改变房卡数量
        HomeCardNumGroup.myCollection.replaceItemAt({ value: Main.USER_INFO.card }, 0);
        var card_add = createBitmapByName("home_fk_add_png");
        userBox.addChild(card_add);
        card_add.width = 40;
        card_add.height = 40;
        card_add.x = 278;
        card_add.y = 62;
    };
    return UserBoxView;
}(egret.Sprite));
__reflect(UserBoxView.prototype, "UserBoxView");
