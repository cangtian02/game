var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 选择牌型底部按钮
 */
var ChooseBotView = (function () {
    function ChooseBotView() {
        this.btnBg = ['game_choose_list_json.btn_1', 'game_choose_list_json.btn_2'];
        this.btnText_1 = [
            'game_choose_fonts_json.dz',
            'game_choose_fonts_json.st',
            'game_choose_fonts_json.sz',
            'game_choose_fonts_json.th',
            'game_choose_fonts_json.hl',
            'game_choose_fonts_json.tz',
            'game_choose_fonts_json.ths',
            'game_choose_fonts_json.wt'
        ];
        this.btnText_2 = [
            'game_choose_fonts_json.dz01',
            'game_choose_fonts_json.st01',
            'game_choose_fonts_json.sz01',
            'game_choose_fonts_json.th01',
            'game_choose_fonts_json.hl01',
            'game_choose_fonts_json.tz01',
            'game_choose_fonts_json.ths01',
            'game_choose_fonts_json.wt01'
        ];
        ChooseBotView.viewBox = new egret.Sprite();
        ChooseView.viewBox.addChild(ChooseBotView.viewBox);
        ChooseBotView.viewBox.width = ChooseView.viewBox.width;
        ChooseBotView.viewBox.height = 70;
        ChooseBotView.viewBox.y = ChooseView.viewBox.height - 72.5;
        this.createView();
    }
    ChooseBotView.prototype.createView = function () {
        var recommend = ChooseView.recommend;
        var btnArr = [
            { type: 2, dis: 0 },
            { type: 4, dis: 0 },
            { type: 5, dis: 0 },
            { type: 6, dis: 0 },
            { type: 7, dis: 0 },
            { type: 8, dis: 0 },
            { type: 9, dis: 0 },
            { type: 10, dis: 0 }
        ];
        for (var k = 0; k < btnArr.length; k++) {
            for (var i = 0; i < recommend.length; i++) {
                for (var j = 0; j < recommend[i].Types.length; j++) {
                    if (btnArr[k].type == recommend[i].Types[j]) {
                        btnArr[k].dis = 1;
                    }
                }
            }
        }
        for (var i = 0; i < btnArr.length; i++) {
            var btn = new egret.Sprite();
            ChooseBotView.viewBox.addChild(btn);
            btn.width = 155;
            btn.height = 70;
            if (i == 0) {
                btn.x = 10;
            }
            else {
                btn.x = i * 155 + (i * 3.65) + 9;
            }
            if (btnArr[i].dis == 1) {
                var btnBg = createBitmapByName(this.btnBg[0]);
                var btnText = createBitmapByName(this.btnText_1[i]);
            }
            else {
                var btnBg = createBitmapByName(this.btnBg[1]);
                var btnText = createBitmapByName(this.btnText_2[i]);
            }
            btn.addChild(btnBg);
            btnBg.width = 155;
            btnBg.height = 70;
            btn.addChild(btnText);
            btnText.width = 111;
            btnText.height = 44;
            btnText.x = 22;
            btnText.y = 12;
        }
    };
    return ChooseBotView;
}());
__reflect(ChooseBotView.prototype, "ChooseBotView");
