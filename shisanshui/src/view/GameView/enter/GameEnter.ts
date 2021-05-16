/**
 * 玩家坐下,并绘制所有资源的盒子
 */
class GameEnter {
    
    public static viewBoxArr: any[] = [];         // 玩家盒子
    public static enterWidth = 400;               // 玩家位置区域的宽
    public static enterHeight = 240;              // 玩家位置区域的高
    public static userCoordinate: any[] = [];     // 各个玩家位置区域的坐标
    public static userPosition: any[] = [];       // 玩家所在位置数组 以玩家_chair值减1为下标
    
    public constructor() {
        // 根据房间人数植入玩家所在位置数组长度，便于后面根据下标插入值
        GameEnter.userPosition.length = GameConfig.game_cfg.nPlayerNum;
        // 根据人数定义玩家坐标
        this.resetUserCoordinate();
	}
	
	// 保存玩家所在位置，便于后面定位
    public static resetUserPosition(chair: number) {
        var i: number = playUserPosition(chair);
        GameEnter.userPosition[chair - 1] = i;
        
        function playUserPosition(chair: number) {
            var i: number = 0;
            if(chair == GameConfig.chair) {
                // 自己进来
                i = 0;
            } else if(chair < GameConfig.chair) {
                // 在自己前面进来的
                i = (chair - GameConfig.chair) + GameConfig.game_cfg.nPlayerNum;
            } else {
                // 在自己后面进来的
                i = chair - GameConfig.chair;
            }
            return i;
        }
    }
    
    private resetUserCoordinate() {
        var num: number = GameConfig.game_cfg.nPlayerNum;
        GameEnter.userCoordinate.length = 0;
        if(num == 2) {
            GameEnter.userCoordinate.push(
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: GameView.viewBox.height - GameEnter.enterHeight }, 
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: 0 }
            );
        } else if(num == 3) {
            GameEnter.userCoordinate.push(
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: GameView.viewBox.height - GameEnter.enterHeight },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 100, y: (GameView.viewBox.height - GameEnter.enterHeight) / 2 },
                { x: 80, y: (GameView.viewBox.height - GameEnter.enterHeight) / 2 }
            );
        } else if(num == 4) {
            GameEnter.userCoordinate.push(
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: GameView.viewBox.height - GameEnter.enterHeight },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 80, y: (GameView.viewBox.height - GameEnter.enterHeight) / 2 },
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: 0 },
                { x: 80, y: (GameView.viewBox.height - GameEnter.enterHeight) / 2 }
            );
        } else if(num == 5){
            GameEnter.userCoordinate.push(
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: GameView.viewBox.height - GameEnter.enterHeight },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 36, y: 306 },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 180, y: 62 },
                { x: 180, y: 62 },
                { x: 39, y: 306 }
            );
        } else if(num == 6) {
            GameEnter.userCoordinate.push(
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: GameView.viewBox.height - GameEnter.enterHeight },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 36, y: 340 },
                { x: GameView.viewBox.width - GameEnter.enterWidth - 36, y: 90 },
                { x: (GameView.viewBox.width - GameEnter.enterWidth) / 2, y: 0 },
                { x: 36, y: 90 },
                { x: 36, y: 340 }
            );
        }

        // 根据各家玩家位置绘制各个层级的盒子
        this.createUserBox();
    }
    
    private createUserBox() {
        // 玩家人数
        var num: number = GameConfig.game_cfg.nPlayerNum;
        // 绘制盒子
        GameEnter.viewBoxArr.length = 0;
        for(var i: number = 0; i < num; i++) {
            GameEnter.viewBoxArr.push(new GameEnterViewBox(i));
        }
        for(var i: number = 0;i < GameEnter.viewBoxArr.length;i++) {
            GameView.viewBox.addChild(GameEnter.viewBoxArr[i]);
            GameEnter.viewBoxArr[i].x = GameEnter.userCoordinate[i].x;
            GameEnter.viewBoxArr[i].y = GameEnter.userCoordinate[i].y;
        }
    }
    
}

class GameEnterViewBox extends egret.Sprite {
    
    public constructor(i: number) {
        super();

        /**
         * 玩家场景外层顶级盒子，所有的场景盒子将在此绘制，此节点下的盒子将按固定位置排序，往后使用需按此排序使用
         * 以数组下标方式使用，0位顶级盒子，不做使用，事实从此下级开始
         * GameEnter.viewBoxArr[i].$children[0].$children[0] i为玩家所在位置（不是c++返回的chair位置，是用chair拿取的玩家真实坐下的位置 类似GameEnter.userPosition[ent._chair - 1]获取）
         * 0.昵称和头像 1.分数 2.准备 3.理牌中 4.比牌 5.单局比牌墩数得分 6.单局比牌总得分
         */ 
        var userEnterBox: egret.Sprite = new egret.Sprite();
        this.addChild(userEnterBox);
        userEnterBox.width = GameEnter.enterWidth;
        userEnterBox.height = GameEnter.enterHeight;
    
        userEnterBox.graphics.beginFill(0x000000, .1);
        userEnterBox.graphics.drawRect(0, 0, GameEnter.enterWidth, GameEnter.enterHeight);
        userEnterBox.graphics.endFill();
        
        // 昵称和头像
        var portraitAndNameBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(portraitAndNameBox);
        portraitAndNameBox.width = 100;
        portraitAndNameBox.height = 124;
        portraitAndNameBox.y = 60;
        
        // 分数
        var scoreBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(scoreBox);
        scoreBox.width = 100;
        scoreBox.height = 24;
        scoreBox.y = 184;
        
        // 准备
        var readyBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(readyBox);
        readyBox.width = 184;
        readyBox.height = 74;
        readyBox.x = (userEnterBox.width - 184) / 2 ;
        readyBox.y = 90;
        
        // 理牌中
        var chooseBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(chooseBox);
        chooseBox.width = 230;
        chooseBox.height = 80;
        chooseBox.y = 90;
        chooseBox.x = 120;
        
        // 比牌
        var compareBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(compareBox);
        compareBox.width = 210;
        compareBox.height = 240;
        compareBox.x = 120;
        
        // 单局比牌墩数得分
        var coreListBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(coreListBox);
        coreListBox.width = 60;
        coreListBox.height = 240;
        coreListBox.x = 340;
        
        // 单局比牌总得分
        var allcoreBox: egret.Sprite = new egret.Sprite();
        userEnterBox.addChild(allcoreBox);
        allcoreBox.width = 100;
        allcoreBox.height = 30;
        allcoreBox.x = 0;
        allcoreBox.y = 20;
        
        // 特殊位置定位
        var _nPlayerNum: number = GameConfig.game_cfg.nPlayerNum;
        if(
            (_nPlayerNum == 2 && i == 1) ||
            (_nPlayerNum == 3 && i == 1) ||
            ((_nPlayerNum == 4 && i == 1) || (_nPlayerNum == 4 && i == 2)) ||
            ((_nPlayerNum == 5 && i == 1) || (_nPlayerNum == 5 && i == 2)) ||
            ((_nPlayerNum == 6 && i == 1) || (_nPlayerNum == 6 && i == 2) || (_nPlayerNum == 6 && i == 3))
        ) {
            portraitAndNameBox.x = userEnterBox.width - 100;
            scoreBox.x = userEnterBox.width - 100;
            chooseBox.x = 20;
            compareBox.x = 70;
            coreListBox.x = 0;
            allcoreBox.x = userEnterBox.width - 100;
        }
    }
    
    // 玩家的相应节点 i: 玩家所在位置 j: 所要节点下标
    public static userEnterChild(i: number,j: number) {
        return GameEnter.viewBoxArr[i].$children[0].$children[j];
    }
    
}
