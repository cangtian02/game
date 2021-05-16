/**
 * 当前报喜场景
 */
class PopupQihao {
	
    public static itemWidth: any = [100,170,290,80];
    public static itemLeft: any = [0,100,270,560];
    
    /**
     * 当前报喜
     */
    public static createView() {
        let box = Popup.qihaoBox;

        let topBox: egret.Sprite = new egret.Sprite();
        box.addChild(topBox);
        topBox.width = box.width;
        topBox.height = 40;

        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xF8B57B,1);
        bg.graphics.drawRect(0,0,topBox.width,topBox.height);
        bg.graphics.endFill();
        topBox.addChild(bg);

        let text: any = [
            ['吉时'],
            ['金童','玉女'],
            ['福','禄','寿','喜','财'],
            ['生肖']
        ];

        for(let i: number = 0;i < 4;i++) {
            let item = PopupQihao.itemBox(i,40);
            topBox.addChild(item);
            for(let j: number = 0,len = text[i].length;j < len;j++) {
                let ts = PopupQihao.itemText(text[i][j],i,j);
                item.addChild(ts);
            }
        }

        PopupQihao.createBox();
        
        let bot = Popup.botStyle();
        box.addChild(bot);
        bot.y = 640;
    }

    public static itemBox(i: number,h: number) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = PopupQihao.itemWidth[i];
        box.height = h;
        box.x = PopupQihao.itemLeft[i];
        return box;
    }

    public static itemText(t: string,i: number,j: number) {
        let ts = createTextFieldByName(t);
        if(i == 0 || i == 3) {
            ts.width = PopupQihao.itemWidth[i];
        } else if(i == 1) {
            ts.width = PopupQihao.itemWidth[i] / 2;
            ts.x = j * PopupQihao.itemWidth[i] / 2;
        } else {
            ts.width = PopupQihao.itemWidth[i] / 5;
            ts.x = j * PopupQihao.itemWidth[i] / 5;
        }
        ts.height = 40;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 24;
        ts.textColor = 0x6D402C;
        return ts;
    }

    public static createBox() {
        let box = Popup.qihaoBox;

        for(let i: number = 0;i < 10;i++) {
            let item: egret.Sprite = new egret.Sprite();
            box.addChild(item);
            item.width = box.width;
            item.height = 60;
            item.y = i * 60 + 40;

            let color: any = [0xFDC899,0xFDC18C];

            let bg: egret.Shape = new egret.Shape();
            bg.graphics.beginFill(color[i % 2],1);
            bg.graphics.drawRect(0,0,item.width,item.height);
            bg.graphics.endFill();
            item.addChild(bg);

            PopupQihao.createItem(item,Popup.qihaoData[i]);
        }
    }

    public static createItem(item: any,data: any) {
        for(let i: number = 0;i < 4;i++) {
            let box = PopupQihao.itemBox(i,60);
            item.addChild(box);
            if(i == 0) { // 吉时
                let ts = PopupQihao.qihaoItemText(data.qihao,box.width);
                box.addChild(ts);
            } else if(i == 1) { // 金玉
                let j: number = Game.pointList[0].indexOf(data.point[0]);
                let ar = createBitmapByName('sesx_json.img_35');
                box.addChild(ar);
                ar.width = 22;
                ar.height = 20;
                ar.x = box.width / 2 * j + (box.width / 2 - 22) / 2;
                ar.y = 20;
            } else if(i == 2) { // 五福
                let j: number = Game.pointList[1].indexOf(data.point[1]);
                let ar = createBitmapByName('sesx_json.img_36');
                box.addChild(ar);
                ar.width = 22;
                ar.height = 20;
                ar.x = box.width / 5 * j + (box.width / 5 - 22) / 2;
                ar.y = 20;
            } else if(i == 3) { // 生肖
                let ts = PopupQihao.qihaoItemText(Game.pointCNList[2][Game.pointList[2].indexOf(data.point[2])],box.width);
                box.addChild(ts);
            }
        }
        for(let i: number = 1;i < 4;i++) {
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.beginFill(0xF2A867,1);
            shp.graphics.drawRect(0,0,1,640);
            shp.graphics.endFill();
            Popup.qihaoBox.addChild(shp);
            shp.x = PopupQihao.itemLeft[i];
        }
    }

    public static qihaoItemText(t: string,w: number) {
        let ts = createTextFieldByName(t);
        ts.width = w;
        ts.height = 60;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.size = 22;
        ts.textColor = 0x6D402C;
        return ts;
    }
    
    public static updateItem() {
        commonRemoveChild(Popup.qihaoBox);
        PopupQihao.createView();
    }
    
}
