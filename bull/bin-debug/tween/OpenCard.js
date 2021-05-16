var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 开奖翻牌
 */
var OpenCard = (function () {
    function OpenCard() {
    }
    /**
     * 翻开庄家的牌  f 0：开前4张  1：开最后一张
     */
    OpenCard.bankerCard = function (f, award_info) {
        commonRemoveChild(Top.card_box);
        var cards = award_info.point[0];
        if (f == 0) {
            for (var i = 0; i < 5; i++) {
                var card = void 0;
                if (i < 4) {
                    var c = parseInt(cards[i], 16);
                    card = new Card(c.toString(10));
                }
                else {
                    card = createBitmapByName('card_json.card_bg_bot');
                }
                Top.card_box.addChildAt(card, (i + 1));
                card.x = i * 45 + 7;
                card.y = 7;
                card.width = 80;
                card.height = 110;
            }
        }
        if (f == 1) {
            var hit = award_info.hit.player0;
            for (var j = 0; j < 5; j++) {
                var c = parseInt(cards[j], 16);
                var card = new Card(c.toString(10));
                Top.card_box.addChildAt(card, (j + 1));
                card.x = j * 45 + 7;
                card.y = 7;
            }
            var bg = OpenCard.cardTypeBgStyle();
            Top.card_box.addChildAt(bg, 6);
            var content = OpenCard.cardTypeStyle(hit);
            var c_x = (Top.card_box.width - content.width) / 2;
            var c_y = (70 - content.height) / 2 + 54;
            var c_w = content.width;
            var c_h = content.height;
            Top.card_box.addChildAt(content, 7);
            content.x = c_x - (c_w * .3) / 2;
            content.y = c_y - (c_h * .3) / 2;
            content.scaleX = 1.4;
            content.scaleY = 1.4;
            OpenCard.twContentTween(content, c_x, c_y, c_w, c_h);
        }
    };
    /**
     * 翻开闲家四手牌
     */
    OpenCard.otherCard = function (award_info) {
        var point = award_info.point;
        var step = 0;
        var timer = setInterval(function () {
            step++;
            if (step == 4)
                clearInterval(timer);
            var box = Table.card_box[step - 1];
            commonRemoveChild(box);
            for (var j = 0; j < 5; j++) {
                var c = parseInt(point[step][j], 16);
                var card = new Card(c.toString(10));
                box.addChildAt(card, (j + 1));
                card.x = j * 45 + 7;
                card.y = 7;
            }
            var hit = award_info.hit;
            var key = 'player' + step;
            hit = hit[key];
            var to_hit = {};
            if (hit.hit == 0) {
                var m = 0;
                if (hit.type == 1) {
                    m = 1;
                }
                else if (hit.type > 1 && hit.type < 11) {
                    m = hit.type - 1;
                }
                else {
                    m = 10;
                }
                to_hit.multi = m;
            }
            else {
                to_hit.multi = hit.multi;
            }
            to_hit.type = hit.type;
            to_hit.hit = hit.hit;
            var bg = OpenCard.cardTypeBgStyle();
            box.addChildAt(bg, 6);
            var content = OpenCard.cardTypeStyle(to_hit);
            var c_x = (box.width - content.width) / 2;
            var c_y = (70 - content.height) / 2 + 54;
            var c_w = content.width;
            var c_h = content.height;
            box.addChildAt(content, 7);
            content.x = c_x - (c_w * .3) / 2;
            content.y = c_y - (c_h * .3) / 2;
            content.scaleX = 1.4;
            content.scaleY = 1.4;
            OpenCard.twContentTween(content, c_x, c_y, c_w, c_h);
        }, 600);
    };
    OpenCard.cardTypeBgStyle = function () {
        var bg = createBitmapByName('Spirit_json.card_type_bg');
        bg.width = 290;
        bg.height = 70;
        bg.x = -7;
        bg.y = 54;
        return bg;
    };
    OpenCard.twContentTween = function (content, c_x, c_y, c_w, c_h) {
        var tw_content = egret.Tween.get(content);
        tw_content.to({ 'scaleX': 1.2, 'scaleY': 1.2, 'x': c_x - (c_w * .2) / 2, 'y': c_y - (c_h * .2) / 2 }, 40);
        tw_content.to({ 'scaleX': .9, 'scaleY': .9, 'x': c_x + c_w * .1 / 2, 'y': c_y + c_y * .1 / 2 }, 40);
        tw_content.to({ 'scaleX': .8, 'scaleY': .8, 'x': c_x + c_w * .2 / 2, 'y': c_y + c_y * .2 / 2 }, 40);
        tw_content.to({ 'scaleX': 1.1, 'scaleY': 1.1, 'x': c_x - (c_w * .1) / 2, 'y': c_y - (c_h * .1) / 2 }, 40);
        tw_content.to({ 'scaleX': 1, 'scaleY': 1, 'x': c_x, 'y': c_y }, 40);
    };
    /**
     * 牌型
     */
    OpenCard.cardTypeStyle = function (hit) {
        var bitmap_arr = ['meiniu', 'niu1', 'niu2', 'niu3', 'niu4', 'niu5', 'niu6', 'niu7', 'niu8', 'niu9', 'niuniu', 'wuhuaniu', 'zhadanniu', 'wuxiaoniu', 'wuhuazhadanniu'];
        var style_arr = [
            { 'w': 104, 'h': 59 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 106, 'h': 62 },
            { 'w': 134, 'h': 62 },
            { 'w': 132, 'h': 52 },
            { 'w': 134, 'h': 52 },
            { 'w': 221, 'h': 52 }
        ];
        var hit_type = hit.type;
        var hit_hit = hit.hit;
        var hit_multi = hit.multi;
        MusicControl.playCardType(hit_type);
        var box = new egret.Sprite();
        var type_img = createBitmapByName('card_type_json.' + bitmap_arr[hit_type - 1]);
        box.addChild(type_img);
        type_img.width = style_arr[hit_type - 1].w;
        type_img.height = style_arr[hit_type - 1].h;
        var multi_icon = createBitmapByName('card_type_json.x');
        box.addChild(multi_icon);
        multi_icon.width = 30;
        multi_icon.height = 33;
        multi_icon.x = style_arr[hit_type - 1].w + 5;
        multi_icon.y = style_arr[hit_type - 1].h - 40;
        var multi_img;
        if (hit_multi < 10) {
            multi_img = createBitmapByName('card_type_json.' + hit_multi);
        }
        else {
            multi_img = createBitmapByName('card_type_json.1');
            var multi_img_2 = createBitmapByName('card_type_json.0');
            box.addChild(multi_img_2);
            multi_img_2.width = 29;
            multi_img_2.height = 42;
            multi_img_2.x = style_arr[hit_type - 1].w + 66;
            multi_img_2.y = style_arr[hit_type - 1].h - 47;
        }
        box.addChild(multi_img);
        multi_img.width = 22;
        multi_img.height = 40;
        multi_img.x = style_arr[hit_type - 1].w + 40;
        multi_img.y = style_arr[hit_type - 1].h - 47;
        return box;
    };
    return OpenCard;
}());
__reflect(OpenCard.prototype, "OpenCard");
//# sourceMappingURL=OpenCard.js.map