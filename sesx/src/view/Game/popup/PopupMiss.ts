/**
 * 当前遗漏
 */
class PopupMiss {

    public static createView() {
        let box = Popup.missBox;
        
        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xFCD09A,1);
        bg.graphics.drawRect(0,0,box.width,box.height);
        bg.graphics.endFill();
        box.addChild(bg);
        
        let data: any = [];
        for(let key in Popup.missData.miss.zodiac) {
            data.push({
                'name': Game.pointCNList[2][Game.pointList[2].indexOf(key)],
                'num': Popup.missData.miss.zodiac[key]
            });
        }
        for(let key in Popup.missData.miss.wufu) {
            data.push({
                'name': Game.pointCNList[1][Game.pointList[1].indexOf(key)],
                'num': Popup.missData.miss.wufu[key]
            });
        }
        for(let key in Popup.missData.miss.jinyu) {
            data.push({
                'name': Game.pointCNList[0][Game.pointList[0].indexOf(key)],
                'num': Popup.missData.miss.jinyu[key]
            });
        }
        
        PopupMiss.createItem(data);
        
        let bot = Popup.botStyle();
        box.addChild(bot);
        bot.y = 300;
    }
    
    public static createItem(data: any) {
        let box = Popup.missBox;
        let color: any = [0xFDC18C,0xFDC899];
        
        for(let i: number = 0;i < 19;i++) {
            let item: egret.Sprite = new egret.Sprite();
            box.addChild(item);
            item.width = box.width / 4;
            item.height = 60;
            
            let j: number;
            
            if(i < 4) {
                item.x = i * item.width;
                j = 0;
            } else if(i < 8) {
                item.x = (i - 4) * item.width;
                item.y = 60;
                j = 1;
            } else if(i < 12) {
                item.x = (i - 8) * item.width;
                item.y = 120;
                j = 0;
            } else if(i < 16) {
                item.x = (i - 12) * item.width;
                item.y = 180;
                j = 1;
            } else {
                item.x = (i - 16) * item.width;
                item.y = 240;
                j = 0;
            }
            
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.beginFill(color[j],1);
            shp.graphics.drawRect(0,0,item.width,60);
            shp.graphics.endFill();
            item.addChild(shp);

            let tsBox: egret.Sprite = new egret.Sprite();

            let ts1 = createTextFieldByName(data[i].name);
            tsBox.addChild(ts1);
            ts1.size = 22;
            ts1.height = 60;
            ts1.verticalAlign = 'middle';
            ts1.textColor = 0x6D402C;

            let ts2_text: any;
            Number(data[i].num) == 0 ? ts2_text = '上期已出' : ts2_text = String(data[i].num);
            let ts2 = createTextFieldByName(ts2_text);
            tsBox.addChild(ts2);
            ts2.size = 22;
            ts2.height = 60;
            ts2.verticalAlign = 'middle';
            ts2.textColor = 0xC1411E;
            if(i < 17) {
                ts2.x = 26;
            } else {
                ts2.x = 52;
            }

            item.addChild(tsBox);
            tsBox.x = (item.width - tsBox.width) / 2;
        }
        for(let i: number = 1;i < 4;i++) {
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.beginFill(0xF2A867,1);
            shp.graphics.drawRect(0,0,1,300);
            shp.graphics.endFill();
            box.addChild(shp);
            shp.x = i * (box.width / 4);
        } 
    }
    
    public static updateItem() {
        httpAjaxGet('/zodiac/get-miss','',(event: egret.Event) => {
            let res_1 = <egret.HttpRequest>event.currentTarget;
            let res = JSON.parse(res_1.response);
            if(res.code != 0) return;
            Popup.missData = res.data;
            commonRemoveChild(Popup.missBox);
            PopupMiss.createView();
        });
    }
    
}
