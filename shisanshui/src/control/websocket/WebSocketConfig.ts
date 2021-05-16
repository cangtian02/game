/**
 * ws 发送配置
 */
function _online(_events) {
    return 'host=dstars&uri=' + Main.GAME_WEBSOCKET.uri + '&msgid=http_req@@@@\n\
	{\n\
		"_sn": 223343,\n\
		"_ver": 1,\n\
		"_events": [{\n\
	    	' + _events + '\n\
		}]\n\
	}';
}

function _chess(_events,_dst) {
    if(_dst == '') {
        _dst = '';
    } else {
        _dst = '"_dst": ' + JSON.stringify(_dst) + ',';
    }
    return 'host=dstars&uri=' + Main.GAME_WEBSOCKET.chessUri + '&msgid=http_req@@@@\n\
	{\n\
	    "_check": "223343",\n\
	    "_ver": 1,\n\
	    ' + _dst + '\n\
	    "_events": [{\n\
	    	' + _events + '\n\
	    }]\n\
	}';
}

// 全局心跳
function cfg_heart_beat() {
    var _events = '"_cmd": "heart_beat",\n\
	        "_st": "req",\n\
	        "_para": {}';
    return _online(_events);
}

// 玩牌心跳
function cfg_heart_beat_chess(_dst) {
    var _events = '"_cmd": "heart_beat",\n\
	        "_st": "req",\n\
	        "_para": {}';
    return _chess(_events,_dst);
}

// 状态查询
function cfg_query_state() {
    var _events = '"_cmd": "query_state",\n\
		"_st": "req",\n\
		"_para": {"_gids": [' + Main.Game_GID + ']}';
    return _online(_events);
}

// 坐下
function cfg_enter(data,flag) {
    var _gt_cfg: string;
    flag == true ? _gt_cfg = '""' : _gt_cfg = data;

    var _events = '"_cmd": "enter",\n\
	        "_st": "req",\n\
	        "_para":{\n\
	            "_gid": ' + Main.Game_GID + ', \n\
	            "_gsc": "default",\n\
	            "_from": "byCard",\n\
	            "_gt_key": "",\n\
	            "_gt_cfg": ' + _gt_cfg + ',\n\
                "ability" : {"use_total_rewards": 1,"need_recommand": 1}\n\
	        }';
      
    // need_recommand为1代表需要服务端下发推荐牌型
    if(flag) {
        return _chess(_events,data);
    } else {
        return _chess(_events,'');
    }
}

// 退出房间
function cfg_leave() {
    var _events = '"_cmd": "leave",\n\
	        "_st": "req",\n\
	        "_para":{}';
    return _chess(_events,GameConfig.session);
}

// 解散房间
function cfg_dissolution() {
    var _events = '"_cmd": "dissolution",\n\
	        "_st": "req",\n\
	        "_para":{"gid": "' + Main.Game_GID + '","_gsc":"default"}';
    return _chess(_events,GameConfig.session);
}

// 请求和局
function cfg_vote_draw(f: boolean) {
    var _events = '"_cmd": "vote_draw",\n\
	        "_st": "req",\n\
	        "_para":{"accept": ' + f + '}';
    return _chess(_events,GameConfig.session);
}

// 准备
function cfg_ready() {
    var _events = '"_cmd": "ready",\n\
	        "_st": "req",\n\
	        "_para":{}';
    return _chess(_events,GameConfig.session);
}

// 选择牌型
function cfg_choose_normal(cards) {
    var _events = '"_cmd": "choose_normal",\n\
	        "_st": "req",\n\
	        "_para":{"cards": [' + cards.join(',') + ']}';
    return _chess(_events,GameConfig.session);
}






