var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家头像、分数等信息
 */
var GameUserInfo = (function () {
    function GameUserInfo() {
    }
    // 玩家头像昵称与断线标志
    GameUserInfo.createPortraitAndName = function (ent) {
        ent = ent._para;
        // 玩家所在位置
        var i = GameEnter.userPosition[ent._chair - 1];
        var vBox = GameEnterViewBox.userEnterChild(i, 0);
        // 头像
        var portrait_img = createBitmapByName("public_portrait_default_png");
        vBox.addChildAt(portrait_img, 1);
        portrait_img.width = 100;
        portrait_img.height = 100;
        portrait_img.y = 24;
        // 是否断线标志
        var offlineView = createBitmapByName('game_diaoxian_png');
        vBox.addChildAt(offlineView, 2);
        offlineView.width = 88;
        offlineView.height = 24;
        offlineView.x = 6;
        offlineView.y = 62;
        offlineView.alpha = 0;
        // 是房主
        if (ent._uid == GameConfig.owner_uid) {
            var owner = createBitmapByName('game_fangzhu_png');
            vBox.addChildAt(owner, 3);
            owner.width = 52;
            owner.height = 52;
            owner.y = 24;
        }
        // 昵称  其他玩家通过php接口获取昵称
        if (ent._uid == Main.USER_INFO.uid) {
            var name = nameStyle(createTextFieldByName(Main.USER_INFO.nickname));
            vBox.addChild(name);
        }
        else {
            var param = '{"type": 1,"uid": ' + ent._uid + '}';
            httpAjax(false, Main.DEFAULT_CONFIG.config.met_getGameInfo, param, function (event) {
                var res_1 = event.currentTarget;
                var res = JSON.parse(res_1.response);
                if (res.ret != 0) {
                    var name = createTextFieldByName('游客');
                }
                var _name = nameStyle(createTextFieldByName(res.data.nickname));
                vBox.addChild(_name);
            });
        }
        function nameStyle(name) {
            name.width = 100;
            name.height = 14;
            name.size = 14;
            name.textColor = 0xFFFFFF;
            name.textAlign = 'center';
            name.y = 4;
            return name;
        }
    };
    // 分数 chair 玩家chair所在位置 scoreNum 分数
    GameUserInfo.createScore = function (chair, scoreNum) {
        // 玩家所在位置
        var i = GameEnter.userPosition[chair - 1];
        var vBox = GameEnterViewBox.userEnterChild(i, 1);
        var viewBox = new egret.Sprite();
        vBox.addChild(viewBox);
        viewBox.width = 100;
        viewBox.height = 24;
        var bg = createBitmapByName('game_fenshu_bg_png');
        viewBox.addChild(bg);
        bg.width = vBox.width;
        bg.height = vBox.height;
        var _scoreNum = String(scoreNum);
        var text = createTextFieldByName(_scoreNum);
        viewBox.addChild(text);
        text.width = vBox.width;
        text.height = vBox.height;
        text.size = 24;
        text.textColor = 0xF4EF89;
        text.textAlign = 'center';
    };
    return GameUserInfo;
}());
__reflect(GameUserInfo.prototype, "GameUserInfo");
