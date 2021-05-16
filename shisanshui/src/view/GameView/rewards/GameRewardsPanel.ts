/**
 * 小结算面板 
 */
class GameRewardsPanel {
    
    private viewBox: egret.Sprite;
    
	public constructor() {
        this.viewBox = new egret.Sprite();
        GameRewards.viewBox.addChild(this.viewBox);
        this.viewBox.width = 1060;
        this.viewBox.height = 580;
        this.viewBox.x = (GameRewards.viewBox.width - 1060) / 2;
        this.viewBox.y = 30;
        
        this.createPanel();
        this.createTop();
        this.createList();
	}
	
    private createPanel() {
        var panelBg = createBitmapByName('game_rewards_dikuang_png');
        this.viewBox.addChild(panelBg);
        panelBg.width = this.viewBox.width;
        panelBg.height = this.viewBox.height;
    }
	
    private createTop() {
        var vBox: egret.Sprite = new egret.Sprite();
        this.viewBox.addChild(vBox);
        vBox.width = 1000;
        vBox.height = 45;
        vBox.x = 30;
        vBox.y = 15;
        
        var bgLeft = createBitmapByName('game_rewards_top_png');
        vBox.addChild(bgLeft);
        bgLeft.width = 500;
        bgLeft.height = 45;
        
        var bgRight = createBitmapByName('game_rewards_top_png');
        vBox.addChild(bgRight);
        bgRight.width = 500;
        bgRight.height = 45;
        bgRight.skewY = 180;
        bgRight.x = 1000;
        
        var nc = text('昵称');
        vBox.addChild(nc);
        nc.x = 25;
        
        var df = text('得分');
        vBox.addChild(df);
        df.x = 120;
        
        var sd = text('首墩');
        vBox.addChild(sd);
        sd.x = 255;
        
        var zd = text('中墩');
        vBox.addChild(zd);
        zd.x = 505;
        
        var wd = text('尾墩');
        vBox.addChild(wd);
        wd.x = 815;
        
        function text(t: string) {
            var tb = createTextFieldByName(t);
            tb.width = 55;
            tb.height = 45;
            tb.textAlign = 'center';
            tb.verticalAlign = 'middle';
            tb.size = 24;
            tb.textColor = 0xFFFFFF;
            return tb;
        }
    }
    
    private createList() {
        var scrollList = this.scrollList();
        var scrollView: egret.ScrollView = new egret.ScrollView();
        scrollView.setContent(scrollList);
        scrollView.width = 1060;
        scrollView.height = 500;
        this.viewBox.addChild(scrollView);
        scrollView.y = 75;
    }
    
    private scrollList() {
        var data: any = GameRewards.data.rewards;
        var len: number = data.length;
        var vBox: egret.Sprite = new egret.Sprite();
        vBox.width = 1060;
        vBox.height = 110 * len;
        for(var i = 0;i < len;i++) {
            var list: egret.Sprite = new egret.Sprite();
            vBox.addChild(list);
            list.width = 1060;
            list.height = 110;
            list.y = i * 110;
            // 是否是自己
            if(data[i]._uid == Main.USER_INFO.uid) {
                list.addChild(this.myKuang());
            }
            // 昵称头像等
            list.addChild(this.createNc(data[i]));
            // 得分
            list.addChild(this.createDf(data[i]));
            // 牌面
            list.addChild(this.createPoker(data[i]));
        }
        return vBox;
    }
    
    private myKuang() {
        var vBox: egret.Sprite = new egret.Sprite();
        vBox.width = 1000;
        vBox.height = 110;
        vBox.x = 30;
        
        var bgLeft = createBitmapByName('game_rewards_cur_png');
        vBox.addChild(bgLeft);
        bgLeft.width = 500;
        bgLeft.height = 110;
        bgLeft.skewY = 180;
        bgLeft.x = 500;

        var bgRight = createBitmapByName('game_rewards_cur_png');
        vBox.addChild(bgRight);
        bgRight.width = 500;
        bgRight.height = 110;
        bgRight.x = 500;
        
        return vBox;
    }
    
    private createNc(data: any) {
        var vBox: egret.Sprite = new egret.Sprite();
        vBox.width = 130;
        vBox.height = 100;
        vBox.y = 5;
        
        // 昵称  其他玩家通过php接口获取昵称
        if(data._uid == Main.USER_INFO.uid) {
            var name = nameStyle(createTextFieldByName(Main.USER_INFO.nickname));
            vBox.addChild(name);
        } else {
            var param = '{"type": 1,"uid": ' + data._uid + '}';
            httpAjax(false,Main.DEFAULT_CONFIG.config.met_getGameInfo,param,(event: egret.Event) => {
                var res_1 = <egret.HttpRequest>event.currentTarget;
                var res = JSON.parse(res_1.response);
                if(res.ret != 0) { 
                    var name = nameStyle(createTextFieldByName('游客'));
                }else {
                    var name = nameStyle(createTextFieldByName(res.data.nickname));
                }
                vBox.addChild(name);
            });
        }
        
        function nameStyle(name: any) {
            name.width = 100;
            name.height = 20;
            name.size = 14;
            name.textColor = 0xFFFFFF;
            name.textAlign = 'center';
            name.verticalAlign = 'middle';
            name.x = 30;
            return name;
        }
        
        var portrait_img = createBitmapByName("public_portrait_default_png");
        vBox.addChild(portrait_img);
        portrait_img.width = 60;
        portrait_img.height = 60;
        portrait_img.x = 50;
        portrait_img.y = 20; 
        
        // 是否是房主
        if(data._uid == GameConfig.owner_uid) {
            var owner = createBitmapByName('game_fangzhu_png');
            vBox.addChild(owner);
            owner.width = 32;
            owner.height = 32;
            owner.x = 50;
            owner.y = 20;
        }
        
        var uid = uidStyle(createTextFieldByName('ID:' + data._uid));
        vBox.addChild(uid);
        
        function uidStyle(uid: any) {
            uid.width = 100;
            uid.height = 20;
            uid.size = 14;
            uid.textColor = 0xF3F347;
            uid.textAlign = 'center';
            uid.verticalAlign = 'middle';
            uid.x = 30;
            uid.y = 80;
            return uid;
        }
        
        // 是否是大赢家
        if(data.bBigWinner) {
            var bBigWinner = createBitmapByName('game_rewards_dyj_png');
            vBox.addChild(bBigWinner);
            bBigWinner.width = 56;
            bBigWinner.height = 56;
            bBigWinner.x = 8;
            bBigWinner.y = 24;
        }
        return vBox;
    }
    
    private createDf(data: any) {
        var t: string = '';
        if(data.all_score < 0) {
            t = '-' + (String(data.all_score)).split('-')[1];
        }else {
            t = '+' + data.all_score;
        }
        var vBox = createTextFieldByName(t);
        vBox.width = 90;
        vBox.height = 110;
        vBox.size = 32;
        vBox.textAlign = 'center';
        vBox.verticalAlign = 'middle';
        vBox.bold = true;
        vBox.x = 130;
        if(data.all_score > 0) {
            vBox.textColor = 0xF3F347;
        } else {
            vBox.textColor = 0x56B1F8;
        }
        return vBox;
    }
    
    private createPoker(data: any) {
        var vBox: egret.Sprite = new egret.Sprite();
        vBox.width = 755;
        vBox.height = 110;
        vBox.x = 229;
        
        var stCards: any = data.stCards.reverse();
        
        for(var i: number = 0, len = stCards.length;i < len;i++) {
            var view = new PokerView(stCards[i]);
            vBox.addChild(view);
            var s: number = 56 / view.width;
            view.scaleX = s;
            view.scaleY = s;
            view.y = 18;
            if(data.nSpecialType != 0) {
                // 是特殊牌型
                view.x = i * 58;
            } else {
                // 普通牌型
                if(i < 3) {
                    view.x = i * 58;
                }else if(i < 8) {
                    view.x = i * 58 + 20;
                }else {
                    view.x = i * 58 + 40;
                }
            }
        }
        
        return vBox;
    }
    
}
