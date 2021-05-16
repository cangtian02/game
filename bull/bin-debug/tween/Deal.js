var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 发牌动画
 */
var Deal = (function () {
    function Deal() {
        // 全面屏
        if (window.innerHeight / window.innerWidth > 1.8) {
            Deal.target_coordinate = [
                { x: 283, y: 14 },
                { x: 91, y: 580 },
                { x: 481, y: 580 },
                { x: 91, y: 1090 },
                { x: 481, y: 1090 } // 第四手
            ];
        }
        else {
            Deal.target_coordinate = [
                { x: 283, y: 14 },
                { x: 91, y: 510 },
                { x: 481, y: 510 },
                { x: 91, y: 970 },
                { x: 481, y: 970 } // 第四手
            ];
        }
        Game.top_view_box.addChild(Deal.view_box);
        Deal.view_box.width = Game.top_view_box.width;
        Deal.view_box.height = Game.top_view_box.height;
    }
    Deal.dealTween = function () {
        for (var i = 0; i < 25; i++) {
            var card = Deal.originalCardStyle(i);
            Deal.view_box.addChild(card);
        }
        var card_num = 25;
        var user_num = -1;
        var step = 0;
        var timer = setInterval(function () {
            card_num--;
            user_num++;
            if (user_num == 5) {
                user_num = 0;
                step++;
            }
            if (card_num == 0) {
                clearInterval(timer);
                setTimeout(function () {
                    commonRemoveChild(Deal.view_box);
                }, 2000);
            }
            Deal.dealTweenStyle(card_num, user_num, step);
            if (card_num > 12) {
                setTimeout(function () {
                    MusicControl.playDeal();
                }, (25 - card_num) * 50);
            }
        }, 40);
    };
    Deal.originalCardStyle = function (i) {
        var card = createBitmapByName('card_json.card_bg_bot');
        card.width = 55;
        card.height = 75;
        card.x = Deal.original_coordinate.x;
        card.y = Deal.original_coordinate.y + (25 - i) * 0.8;
        return card;
    };
    Deal.dealTweenStyle = function (card_num, user_num, step) {
        if (Deal.view_box.$children[card_num] == undefined)
            return;
        var tw_card = egret.Tween.get(Deal.view_box.$children[card_num]);
        tw_card.to({
            'x': Deal.target_coordinate[user_num].x + step * 45 + 7,
            'y': Deal.target_coordinate[user_num].y + 7,
            'width': 80,
            'height': 110
        }, 240).to({ 'alpha': 0 }).call(function () {
            var card = createBitmapByName('card_json.card_bg_bot');
            card.width = 80;
            card.height = 110;
            card.x = step * 45 + 7;
            card.y = 7;
            if (user_num != 0) {
                Table.card_box[user_num - 1].addChildAt(card, (step + 1));
            }
            else {
                Top.card_box.addChildAt(card, (step + 1));
            }
        }, this);
    };
    /**
     * 没发牌动画，直接渲染牌
     */
    Deal.createCard = function () {
        for (var i = 0; i < 5; i++) {
            var card = Deal.cardStyle();
            card.x = i * 45 + 7;
            card.y = 7;
            Top.card_box.addChildAt(card, (i + 1));
        }
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 5; i++) {
                var card = Deal.cardStyle();
                card.x = i * 45 + 7;
                card.y = 7;
                Table.card_box[j].addChildAt(card, (i + 1));
            }
        }
    };
    Deal.cardStyle = function () {
        var card = createBitmapByName('card_json.card_bg_bot');
        card.width = 80;
        card.height = 110;
        return card;
    };
    Deal.view_box = new egret.Sprite(); // 场景盒子
    Deal.original_coordinate = { x: 376.5, y: 200 }; // 发牌原始位置
    return Deal;
}());
__reflect(Deal.prototype, "Deal");
//# sourceMappingURL=Deal.js.map