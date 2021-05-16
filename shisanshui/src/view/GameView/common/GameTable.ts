/**
 * 游戏桌子
 * num 几人局
 */
class GameTable {
    
	public constructor(num: number) {
        var table_png: string;
        num < 5 ? table_png = 'game_four-table_png' : num == 5 ? table_png = 'game_five-table_png' : table_png = 'game_six-table_png';
        var table = createBitmapByName(table_png);
        GameView.viewBox.addChild(table);
        table.width = GameView.viewBox.width;
        table.height = GameView.viewBox.height;
	}
	
}
