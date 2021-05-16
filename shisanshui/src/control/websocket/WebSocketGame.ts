/**
 * 游戏中配置
 */ 
class GameConfig {
    public static time: any;                          // 游戏心跳
    public static isPlayStart: boolean = false;       // 是否开始游戏
    public static game_cfg: any;                      // 房间配置
    public static owner_uid: number;                  // 房主uid
    public static session: any;                       // 自己的session
    public static chair: any;                         // 自己的位置
    public static enterData: any[] = [];              // 坐下的玩家信息
    public static game_vote_draw: number = -1;        // 游戏开始后和局状态 -1 未开启 1 已开启
}

/**
 * 统一派发socket事件
 */
class WebSocketGame {
    
    public init(evt: any) {
        this.wsGame(JSON.parse(evt));
	}
	
	private wsGame(evt: any) {
        if(evt._events != undefined) {
            for(var i = 0;i < evt._events.length;i++) {
                switch(evt._events[i]._cmd) {
                    case "pushmsg":
                        PublicControl.Handle_pushmsg(evt._events[i]);
                        break;
                    case "query_state":		
                        HomeControl.Handle_query_state(evt._events[i]);
                        break;
                    case "session":
                        PublicControl.Handle_session(evt._events[i]);
                        break;
                    case "game_cfg":
                        PublicControl.Handle_game_cfg(evt._events[i]);
                        break;
                    case "enter":
                        GamePublicControl.Handle_enter(evt._events[i]);
                        break;
                    case "leave":
                        GamePublicControl.Handle_leave(evt._events[i]);
                        break;
                    case "dissolution":
                        GamePublicControl.Handle_dissolution(evt._events[i]);
                        break;
                    case "offline":
                        GamePublicControl.Handle_offline(evt._events[i]);
                        break;
                    case "vote_draw_start":
                        GamePublicControl.Handle_vote_draw_start(evt._events[i]);
                        break;                 
                    case "vote_draw":
                        GamePublicControl.Handle_vote_draw(evt._events[i]);
                        break;
                    case "vote_draw_end":
                        GamePublicControl.Handle_vote_draw_end(evt._events[i]);
                        break;  
                    case "ask_ready":
                        GamePublicControl.Handle_ask_ready(evt._events[i]);
                        break;
                    case "ready":
                        GamePublicControl.Handle_ready(evt._events[i]);
                        break;
                    case "game_start":
                        GamePublicControl.Handle_game_start(evt._events[i]);
                        break;
                    case "deal":
                        GameControl.Handle_deal(evt._events[i]);
                        break;
                    case "recommend":
                        GameControl.Handle_recommend(evt._events[i]);
                        break;
                    case "ask_choose":
                        GameControl.Handle_ask_choose(evt._events[i]);
                        break;
                    case "choose_ok":
                        GameControl.Handle_choose_ok(evt._events[i]);
                        break;
                    case "compare_start":
                        GameControl.Handle_compare_start();
                        break;
                    case "compare_result":
                        GameControl.Handle_compare_result(evt._events[i]);
                        break;
                    case "compare_end":
                        GameControl.Handle_compare_end();
                        break;  
                    case "rewards":
                        GameControl.Handle_rewards(evt._events[i]);
                        break;
                    default:
                        break;	
                }
            }
        }
	}
    
}
