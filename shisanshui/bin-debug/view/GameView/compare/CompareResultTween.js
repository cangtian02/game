var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 比牌动画
 */
var CompareResultTween = (function () {
    function CompareResultTween(data) {
        var _this = this;
        this.data = data._para;
        var allCompare = this.data.stAllCompareData;
        var compareScores = this.data.stCompareScores[0];
        // 单墩获得分数
        var coreListBox = GameEnterViewBox.userEnterChild(GameConfig.chair - 1, 5);
        var coreArr = [
            compareScores.nFirstScore + compareScores.nFirstScoreExt,
            compareScores.nSecondScore + compareScores.nSecondScoreExt,
            compareScores.nThirdScore + compareScores.nThirdScoreExt
        ];
        for (var i = 0; i < 3; i++) {
            var tt;
            coreArr[i] > 0 ? tt = '+' + coreArr[i] : tt = coreArr[i];
            var text = createTextFieldByName(tt);
            coreListBox.addChild(text);
            text.width = coreListBox.width;
            text.height = 60;
            text.y = i * 60 + 20;
            text.textAlign = 'center';
            text.verticalAlign = 'middle';
            text.bold = true;
            coreArr[i] > 0 ? text.textColor = 0xF3F347 : text.textColor = 0x56B1F8;
            text.alpha = 0;
        }
        // 牌型
        for (var i = 0; i < allCompare.length; i++) {
            var vBox = GameEnterViewBox.userEnterChild(allCompare[i].chairid - 1, 4);
            for (var j = 0; j < 3; j++) {
                var poker;
                var stCards = [];
                for (var k = 0; k < allCompare[i].stCards.length; k++) {
                    stCards.push(allCompare[i].stCards[k]);
                }
                j == 0 ? poker = stCards.splice(10, 3) : j == 1 ? poker = stCards.splice(5, 5) : poker = stCards.splice(0, 5);
                this.pokerView(vBox.$children[j], poker, j);
            }
            var allcoreBox = GameEnterViewBox.userEnterChild(allCompare[i].chairid - 1, 6);
            var tt;
            allCompare[i].nTotallScore > 0 ? tt = '+' + allCompare[i].nTotallScore : tt = allCompare[i].nTotallScore;
            var text = createTextFieldByName(tt);
            allcoreBox.addChild(text);
            text.width = allcoreBox.width;
            text.height = allcoreBox.height;
            text.textAlign = 'center';
            text.verticalAlign = 'middle';
            text.bold = true;
            allCompare[i].nTotallScore > 0 ? text.textColor = 0xF3F347 : text.textColor = 0x56B1F8;
            text.alpha = 0;
        }
        // 比牌动画
        var t = -1;
        var j = -1;
        var i = -1;
        var timer = setInterval(function () {
            t++;
            j++;
            // 走完一轮比牌再进行下一轮
            if (t % allCompare.length == 0)
                i++;
            // 比牌完毕后停止计时器
            if (t == (3 * allCompare.length - 1)) {
                clearInterval(timer);
                // 展示各家总得分
                setTimeout(function () {
                    for (var z = 0; z < allCompare.length; z++) {
                        var allcoreBox = GameEnterViewBox.userEnterChild(allCompare[z].chairid - 1, 6).$children[0];
                        allcoreBox.alpha = 1;
                    }
                }, 1000);
            }
            // 每次轮巡到人数相等时，重置成0，从新开始
            if (j == allCompare.length) {
                j = 0;
            }
            var type;
            i == 0 ? type = allCompare[j].nFirstType : i == 1 ? type = allCompare[j].nSecondType : type = allCompare[j].nThirdType;
            var poker;
            var stCards = [];
            for (var h = 0; h < allCompare[j].stCards.length; h++) {
                stCards.push(allCompare[j].stCards[h]);
            }
            i == 0 ? poker = stCards.splice(10, 3) : i == 1 ? poker = stCards.splice(5, 5) : poker = stCards.splice(0, 5);
            var vBox = GameEnterViewBox.userEnterChild(allCompare[j].chairid - 1, 4).$children[i];
            _this.pokerTween(vBox, type, poker, i);
        }, 600);
    }
    // 比牌扑克dom
    CompareResultTween.prototype.pokerView = function (vbox, poker, k) {
        commonRemoveChild(vbox);
        for (var i = 0; i < poker.length; i++) {
            var pBox = new PokerView(poker[i]);
            vbox.addChild(pBox);
            var pokerBg = PokerBg();
            vbox.addChild(pokerBg);
            var scale = pokerBg.width / pBox.width;
            pBox.scaleX = scale;
            pBox.scaleY = scale;
            pBox.x = i * 37;
            pokerBg.x = i * 37;
        }
    };
    // 比牌扑克动画
    CompareResultTween.prototype.pokerTween = function (vbox, type, poker, k) {
        var tw_poker = egret.Tween.get(vbox);
        var width = vbox.width;
        var height = vbox.height;
        var x = vbox.x;
        var y = vbox.y;
        var s = 1.2;
        var tx = x - ((width * s - width) / 2);
        var ty = y - ((height * s - height) / 2);
        var compareResultType = this.compareResultType(type, k, poker);
        vbox.addChild(compareResultType);
        compareResultType.x = (width - compareResultType.width) / 2;
        compareResultType.y = height - 24;
        for (var i = 1; i < vbox.$children.length; i += 2) {
            vbox.$children[i].alpha = 0;
        }
        vbox.parent.setChildIndex(vbox, 4);
        tw_poker.to({ "scaleX": s, "scaleY": s, x: tx, y: ty }, 300);
        tw_poker.to({ "scaleX": 1, "scaleY": 1, x: x, y: y }, 300);
        setTimeout(function () {
            vbox.parent.setChildIndex(vbox, k);
            vbox.removeChild(compareResultType);
            var cBox = GameEnterViewBox.userEnterChild(GameConfig.chair - 1, 5);
            cBox.$children[k].alpha = 1;
        }, 570);
    };
    // 根据牌型与牌面和第几墩返回dom
    CompareResultTween.prototype.compareResultType = function (type, i, poker) {
        // 如果是第一墩
        var _type;
        if (i == 0) {
            if (type == 4) {
                // 如果是有大小鬼那就是对鬼冲前
                if (poker.indexOf(79) > 0 && poker.indexOf(95) > 0) {
                    _type = 12;
                }
                else {
                    // 没有大小鬼就是冲三
                    _type = 11;
                }
            }
            else if (type == 2) {
                _type = 13;
            }
            else {
                _type = type;
            }
        }
        // 如果是第二墩
        if (i == 1) {
            // 如果是葫芦那就是中墩葫芦
            if (type == 7) {
                _type = 14;
            }
            else {
                _type = type;
            }
        }
        // 如果是第三墩
        if (i == 2) {
            _type = type;
        }
        return this.pokerType(_type);
    };
    // 根据牌型返回dom
    CompareResultTween.prototype.pokerType = function (type) {
        var typeArr = ['wulong', 'yidui', 'erdui', 'santiao', 'shunzi', 'tonghua', 'hulu', 'tiezhi', 'tonghuashun', 'wutong', 'chongsan', 'duiguichongqian', 'duizi', 'zhongdunhulu'];
        var pokertype = createBitmapByName('compareResultTween_json.' + typeArr[type - 1]);
        pokertype.width = 160;
        pokertype.height = 40;
        return pokertype;
    };
    return CompareResultTween;
}());
__reflect(CompareResultTween.prototype, "CompareResultTween");
//--普通牌型
//1 --散牌(乌龙)
//2 --一对
//3 --两对
//4 --三条
//5 --顺子
//6 --同花
//7 --葫芦
//8 --铁支
//9 --同花顺
//10 --五同
// 临时牌型
// 11 冲三
// 12 对鬼冲前
//13 对子
//14 中墩葫芦
