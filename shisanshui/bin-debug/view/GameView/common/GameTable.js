var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏桌子
 * num 几人局
 */
var GameTable = (function () {
    function GameTable(num) {
        var table_png;
        num < 5 ? table_png = 'game_four-table_png' : num == 5 ? table_png = 'game_five-table_png' : table_png = 'game_six-table_png';
        var table = createBitmapByName(table_png);
        GameView.viewBox.addChild(table);
        table.width = GameView.viewBox.width;
        table.height = GameView.viewBox.height;
    }
    return GameTable;
}());
__reflect(GameTable.prototype, "GameTable");
