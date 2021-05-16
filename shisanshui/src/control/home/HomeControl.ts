/**
 * 根据sockt信息做大厅相关控制
 */

class HomeControl {
	
    public static Handle_query_state(e: any) {
        // 有query_state进行重入
        if(e._para.uri != undefined) {
            // 植入chessUri字段，供socket发送_chess使用
            Main.GAME_WEBSOCKET.chessUri = e._para.uri;
            // 转场动画
            var loading = new Loading("正在为您加载，即将进入游戏");
            HomeView.self.addChild(loading);
            // 加载游戏场景资源，跳转游戏
            ResUtils.getInstance().loadGroup("game",() => {
                HomeView.self.dispatchEvent(new egret.Event("GameStart"));
                Main.WEBSOCKET.doSend(cfg_enter(e._para._dst,true));
            },this);
        }
    }
	
	
}
