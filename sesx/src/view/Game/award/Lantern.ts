/**
 * 开奖灯笼
 */
class Lantern extends egret.DisplayObjectContainer {

    public static viewBox: egret.Sprite;  // 场景盒子
    public static mask: any;  // 透明背景
    public static lanternBox: egret.Sprite;  // 灯笼盒子

    public constructor() {
        super();
        if(this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }

    private init() {
        // 场景盒子
        Lantern.viewBox = new egret.Sprite();
        this.addChild(Lantern.viewBox);
        Lantern.viewBox.width = this.stage.stageWidth;
        Lantern.viewBox.height = this.stage.stageHeight;

        // 黑色透明背景
        Lantern.mask = Game.m_mask();
        Lantern.viewBox.addChild(Lantern.mask);
        Lantern.mask.alpha = 0;

        // 灯笼盒子
        Lantern.lanternBox = new egret.Sprite();
        Lantern.viewBox.addChild(Lantern.lanternBox);
        Lantern.lanternBox.width = Lantern.viewBox.width;
        Lantern.lanternBox.height = Lantern.viewBox.height;
        
        let secondRect:egret.Rectangle = new egret.Rectangle(0, 230, Lantern.viewBox.width, 420);

        Lantern.lanternBox.mask = secondRect;

        // 绘制灯笼落下的初始状态
        Lantern.createLanternInitView();
    }

    /**
     * 绘制灯笼落下的初始状态
     */
    public static createLanternInitView() {
        for(let i: number = 0;i < 3;i++) {
            let box: egret.Sprite = new egret.Sprite();
            box.width = 135;
            box.height = 427;
            box.x = i * box.width + (i + 1) * ((Lantern.lanternBox.width - box.width * 3) / 4);
            box.y = 110;
            box.alpha = 0;

            let bg = createBitmapByName('sesx_json.img_6');
            bg.width = box.width;
            bg.height = box.height;
            box.addChild(bg);

            let content = Lantern.itemFirstImg(i);
            box.addChild(content);
            content.x = 37;
            content.y = 190;

            Lantern.lanternBox.addChild(box);
        }
    }

    /**
     * 灯笼内容第一张图片
     */
    public static itemFirstImg(i: number) {
        let item: any = [
            createBitmapByName('sesx_json.img_ani_1'),
            createBitmapByName('sesx_json.img_ani_2'),
            createBitmapByName('sesx_json.img_ani_3')
        ][i];
        item.width = 62;
        item.height = 116;
        return item;
    }

    /**
     * 绘制滚动动画场景
     */
    public static createScrollView(){
        for(let i: number = 0;i < 3;i++) {
            let box: any = Lantern.lanternBox.$children[i];
            box.removeChild(box.$children[1]);

            let scrollBox: egret.Sprite = new egret.Sprite();
            scrollBox.width = box.width;
            scrollBox.height = box.height;
            box.addChild(scrollBox);

            let secondRect:egret.Rectangle = new egret.Rectangle(37, 190, 62, 116);

            scrollBox.mask = secondRect;

            scrollBox.addChild(Lantern.scrollContentBox(i));
        }
    }

    public static scrollContentBox(i: number) {
        let len: number = i == 0 ? 5 : i == 1 ? 2 : 12;
        let num: number = i == 0 ? 12 : i == 1 ? 36 : 12;
        let box: egret.Sprite = new egret.Sprite();
        box.width = len * num * 82 + 62;
        box.height = 116;
        box.x = 37;
        box.y = 190;
        
        let firstImg = Lantern.itemFirstImg(i);
        box.addChild(firstImg);

        for(let k: number = 0;k < num;k++) {
            for(let j: number = 0;j < len;j++) {
                let itemOther = Lantern.itemOther(i,j,k);
                box.addChild(itemOther);
            }
        }
        
        return box;
    }

    public static itemOther(i: number,j: number,k: number) {
        let item: any = [
            createBitmapByName('sesx_json.img_wf_' + (j + 1)),
            createBitmapByName('sesx_json.img_jy_' + (j + 1)),
            createBitmapByName('sesx_json.img_sx_' + (j + 1))
        ][i];
        item.width = 62;
        item.height = 116;
        let l: number = i == 0 ? 4 : i == 1 ? 1 : 11;
        let x: number = j * item.width + (j + 1) * 20 + 62;
        item.x = k > 0 ? x + k * (l * item.width + (l + 1) * 20 + 62) : x;
        return item;
    }

    /**
     * 灯笼掉下1S  滚动动画10S 停留2S 灯笼收回1S 灯笼区间动画总时间14S
     */
    public static LanternTween() {
        Lantern.mask.alpha = 1;
        
        for(let i: number = 0;i < 3;i++) {
            let tw_box = egret.Tween.get(Lantern.lanternBox.$children[i]);
            tw_box.wait(i * 300).to({'alpha': 1}).to({'y': 210}, 200).to({'y': 190}, 100);
        }

        setTimeout(() => {
            // 绘制播放结果动画场景
            Lantern.createScrollView();
            // 播放结果动画
            setTimeout(() => {
                Lantern.LanternTween_2();
            }, 50);
        }, 950);
    }

    public static LanternTween_2() {
        for(let i: number = 0;i < 3;i++) {
            let box: any = Lantern.lanternBox.$children[i].$children[1].$children[0];
            let tw_box = egret.Tween.get(box);

            let l: number = (box.width - 62) / 6 * 5 + Award.point_number[i] * 82 + 82 - 37;
            tw_box.to({ 'x': -(l - 82 * 15)}, 2000 + i * 2000);
            tw_box.to({ 'x': -l }, 4000, egret.Ease.sineOut);
        }

        setTimeout(() => {
            // 灯笼收回
            for(let i: number = 0;i < 3;i++) {
                let tw_box = egret.Tween.get(Lantern.lanternBox.$children[i]);
                tw_box.wait(i * 300).to({'y': 210},200).to({'y': 110},100).to({'alpha': 0});
            }

            setTimeout(() => {
                Lantern.mask.alpha = 0;
            }, 900);
        }, 11500);
    }

}
