/**
 * 倒计时动画
 * time: number 倒计时时间=》秒
 */
class CountdownTween extends egret.Sprite {
    
    private cbConnect: Array<any>;  // 时间到了回调
    
    private viewBox: egret.Sprite = new egret.Sprite();
    private timeBox: egret.Sprite = new egret.Sprite();
    private shapeBox: egret.Sprite = new egret.Sprite();
    
	public constructor(time: number) {
	    super();
	    
	    // 缓存倒计时总时间
	    var zTime: number = time;
	    
	    this.addChild(this.viewBox);
	    this.viewBox.width = 130;
        this.viewBox.height = 130;
	    
        var bg = createBitmapByName("countdown_bg_png");
        this.viewBox.addChild(bg);
        bg.width = 130;
        bg.height = 130;
        
        var line = createBitmapByName('countdown_line_png');
        this.viewBox.addChild(line);
        line.width = 106;
        line.height = 106;
        line.x = 12;
        line.y = 10.5;
        
        this.viewBox.addChild(this.timeBox);
        this.timeBox.width = 70;
        this.timeBox.height = 70;
        this.timeBox.x = 30;
        this.timeBox.y = 28;
        
        this.viewBox.addChild(this.shapeBox);
        this.shapeBox.width = 130;
        this.shapeBox.height = 130;
        
        this.timeBox.addChild(this.labelStyle(time));
        this.shapeBox.addChild(this.shapeStyle(time,time));
        
        var timer: any = setInterval(()=>{
            time--;
            if(time == 0) {
                clearInterval(timer);
                // 时间到了回调
                if(this.cbConnect.length > 0) {
                    var obj: Object = this.cbConnect[0];
                    var func: Function = this.cbConnect[1];
                    func.call(obj);
                    this.cbConnect.length = 0;
                }
            }
            // 重置数字
            this.timeBox.removeChild(this.timeBox.$children[0]);
            this.timeBox.addChild(this.labelStyle(time));

            // 重置圆弧
            this.shapeBox.removeChild(this.shapeBox.$children[0]);
            this.shapeBox.addChild(this.shapeStyle(zTime,time));
        },1000);
        
	}
	
    private labelStyle(n: number) {
    	  var _num: string = String(n);
        var label = createTextFieldByName(_num);
        label.width = 70;
        label.height = 70;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        label.size = 36;
        label.textColor = 0xFFFFFF;
        label.strokeColor = 0x103375;
        label.stroke = 4;
        return label;
	}
	
	// n: 总时间， z：已经走的时间
	private shapeStyle(n: number,z: number) {
    	  // (Math.PI / 180) * (360 / n)为全部时间已走多少，乘与剩下的时间就是绘制已经走过时间的圆弧
        var l:number = ((Math.PI / 180) * (360 / n)) * (n - z);
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(16,0x0C153C);
        shape.graphics.drawArc(64,64,47,0,l,false);
        shape.graphics.endFill();
        return shape;
	}
	
	// 植入回调事件，供时间到了执行该回调
    public setConnectHandler(_func: Function,_obj: Object) {
        this.cbConnect = [_obj,_func];
    }
    
}

/**
    var countdownTween = new CountdownTween(60);
    GameView.viewBox.addChild(countdownTween);
    countdownTween.setConnectHandler(() => {
        console.log("时间到了");
    },this);
 */ 
        