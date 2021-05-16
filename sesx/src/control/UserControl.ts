/**
 * websocket同桌玩家
 */
class UserControl {
    
    private websocket: any;
    
	public constructor() {
        if(!Main.DEFAULT_CONFIG.debug) {
            this.init();
        }
	}
	
    private init() {
        this.websocket = new WebSocket(Main.DEFAULT_CONFIG.ws_url + "?channel=zodiac_table&user_id=" + Game.userinfo.uid + '&token=' + window.sessionStorage.getItem('token'));
        this.websocket.onopen = (evt) => {
            this.onOpen(evt);
        }
        this.websocket.onclose = (evt) => {
            this.init();
            console.log('ws onclose');
        }
        this.websocket.onmessage = (evt) => {
            this.onMessage(evt);
        }
        this.websocket.onerror = (evt) => {
            let toast = new Toast("您的网络异常，请刷新页面重试");
            Game.viewBox.addChild(toast);
            console.log('ws onerror');
        }
    }

    private onOpen(evt) {
        if(evt.isTrusted) {
            // 随意发送一段信息给后端，第一次进入页面获取同桌玩家信息，后期的同桌信息由后端推送
            this.websocket.send('open');
            console.log('ws online');
        }
    }
    
    private onMessage(evt) {
        let data: any = JSON.parse(evt.data);
        if(data.length > 0) {
            // 拷贝一份原有数组，留作与新有数组对比
            let userList: any = JSON.parse(JSON.stringify(User.userList));
            // 依据现有数据更新数组
            for(let i: number = 0;i < data.length;i++) {
                let j: number;
                i > 1 ? j = i + 1 : j = i;
                if(data[i].uid != User.userList[j].uid) {
                    if(User.userList[j].uid == undefined) {
                        User.userList[j] = {
                            'uid': data[i].uid,
                            'name': data[i].name,
                            'headimg': data[i].headimg,
                            'bets': data[i].bets
                        };
                    } else {
                        User.userList[j].uid = data[i].uid;
                        User.userList[j].name = data[i].name;
                        User.userList[j].headimg = data[i].headimg;
                        User.userList[j].bets = data[i].bets;
                    }
                    // 绘制玩家信息
                    User.createUserList(j);
                } else {
                    User.userList[j].bets = data[i].bets;
                }
            }
            // 玩家下注动画与数量展示,只在下注状态才做展示
            if (Game.status == 1) {
                this.userBetsTween(userList);
            }
        }
    }
    
    // 玩家下注动画与数量展示 list: 原有玩家信息数组
    private userBetsTween(list: any) {
        // 处理下注动画
        for(let i: number = 0,len: number = User.userList.length;i < len;i++) {
            if(User.userList[i] == '') continue;  // 如果没有这个玩家就跳出到下一个
            if(i == 2) continue;  // 如果是自己就跳出到下一个
            if(User.userList[i].bets == undefined) continue;  // 如果没有下注就跳出到下一个
            
            if (list[i].bets == undefined) {  // 最新下注
                let bet: any = User.userList[i].bets.bet;
                for(let key in bet) {
                    let section: number = Game.getSection(key);
                    if (section > 2) { // 为大小富贵
                        let j: number = Game.getBetPos(section,'');
                        TableBetInfo.betTween(i,j);
                    } else {
                        for(let k in bet[key]) {
                            let j: number = Game.getBetPos(section,k);
                            TableBetInfo.betTween(i,j);
                        }
                    }
                }
            } else {  // 已有下注
                let bets_1: any = User.userList[i].bets.bet;
                let bets_2: any = list[i].bets.bet;
                for(let k1 in bets_1) {
                    let section: number = Game.getSection(k1);
                    if(bets_2[k1] == undefined) {  // 最新下注
                        if(section > 2) { // 为大小富贵
                            let j: number = Game.getBetPos(section,'');
                            TableBetInfo.betTween(i,j);
                        } else {
                            for(let k3 in bets_1[k1]) {
                                let j: number = Game.getBetPos(section,k3);
                                TableBetInfo.betTween(i,j);
                            }
                        }
                    } else {  // 已有下注
                        let bets_1_1: any = bets_1[k1];
                        let bets_2_1: any = bets_2[k1];
                        for(let k2 in bets_1_1) {
                            // 比较最新下注数量与原有下注数量，大于的话代表玩家继续下注，等于的话就是没有再次下注该位置
                            if(bets_1_1[k2] > bets_2_1[k2]) {
                                if(section > 2) {
                                    let j: number = Game.getBetPos(section,'');
                                    TableBetInfo.betTween(i,j);
                                }else{
                                    let j: number = Game.getBetPos(section,k2);
                                    TableBetInfo.betTween(i,j);
                                }
                            }
                        }
                    }
                }
            }
        }
        // 处理下注数量显示
        let betNum: any = {};  // 记录所有下过的注和相应数量
        for(let i: number = 0,len: number = User.userList.length;i < len;i++) {
            if(User.userList[i].bets == undefined) continue;
            let bet: any = User.userList[i].bets.bet;
            for(let k1 in bet) {
                if(k1 == 'small' || k1 == 'big') {
                    let n: any = JSON.stringify(bet[k1]);
                    n = n.split(':');
                    n = Number(n[1].substr(0,n[1].length - 1));
                    betNum[k1] == undefined ? betNum[k1] = n : betNum[k1] = betNum[k1] + n;
                } else {
                    let bet_1: any = bet[k1];
                    for(let k2 in bet_1) {
                        let n: number = bet_1[k2];
                        betNum[k2] == undefined ? betNum[k2] = n : betNum[k2] = betNum[k2] + n;
                    }
                }
            }
        }
        TableBetInfo.isRefreshBet = true;
        for(let k in betNum) {
            let n: number;
            if(k == 'small' || k == 'big') {
                let section: number = Game.getSection(k);
                n = Game.getBetPos(section,'');
            } else {
                n = Game.pointCVList.indexOf(k);
            }
            // 展示全部下注数量加上自己下注的
            BetControl.otherBetNum[n] = betNum[k] + BetControl.betNum[n];
            TableBetInfo.createOtherBetNum(n, BetControl.otherBetNum[n]);
        }
    }

}
