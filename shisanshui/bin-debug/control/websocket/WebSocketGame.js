var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏中配置
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
GameConfig.isPlayStart = false; // 是否开始游戏
GameConfig.enterData = []; // 坐下的玩家信息
GameConfig.game_vote_draw = -1; // 游戏开始后和局状态 -1 未开启 1 已开启
__reflect(GameConfig.prototype, "GameConfig");
/**
 * 统一派发socket事件
 */
var WebSocketGame = (function () {
    function WebSocketGame() {
    }
    WebSocketGame.prototype.init = function (evt) {
        this.wsGame(JSON.parse(evt));
    };
    WebSocketGame.prototype.wsGame = function (evt) {
        if (evt._events != undefined) {
            for (var i = 0; i < evt._events.length; i++) {
                switch (evt._events[i]._cmd) {
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
    };
    return WebSocketGame;
}());
__reflect(WebSocketGame.prototype, "WebSocketGame");
