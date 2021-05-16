/**
 *  * 根据sockt信息做公共场景的相关控制
 */

class PublicControl {
    
	/**
	 * 推送消息
	 * 10001 福利推送  10002 公告推送 10003邮件推送 10004用户信息变更 10007 广播['appid'=>1,'dtype'=>0 1安卓 2IOS,'ptype'=>0 1代理商 2 普通玩家,'msg'=>''] 10008封号推送
	 */   
    public static Handle_pushmsg(e: any) {
        var msg: any = JSON.parse(e._para.msg);
        if(msg.type == 10004 && (Main.CUR_STATE == Main.STATE_HOME)) { // 只在大厅场景下才获取用户信息去更新
            HomeView.getUserInfo();
        }
    }
	
    // 保存玩家信息
    public static Handle_session(e: any) {
        GameConfig.session = e._para;
        GameConfig.chair = e._para._chair;
    }
    
    // 更新并保存游戏配置
    public static Handle_game_cfg(e: any) {
        GameConfig.isPlayStart = false;
        GameConfig.game_cfg = e._para;
        GameConfig.owner_uid = GameConfig.game_cfg.owner_uid;
        GameConfig.enterData.length = 0;
        GameConfig.game_vote_draw = -1;
        // 初始化游戏场景
        GameView.createView();
        new GameEnter();
    }
    
}
