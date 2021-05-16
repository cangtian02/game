var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 倒计时动画
 * time: number 倒计时时间=》秒
 */
var CountdownTween = (function (_super) {
    __extends(CountdownTween, _super);
    function CountdownTween(time) {
        var _this = _super.call(this) || this;
        _this.viewBox = new egret.Sprite();
        _this.timeBox = new egret.Sprite();
        _this.shapeBox = new egret.Sprite();
        // 缓存倒计时总时间
        var zTime = time;
        _this.addChild(_this.viewBox);
        _this.viewBox.width = 130;
        _this.viewBox.height = 130;
        var bg = createBitmapByName("countdown_bg_png");
        _this.viewBox.addChild(bg);
        bg.width = 130;
        bg.height = 130;
        var line = createBitmapByName('countdown_line_png');
        _this.viewBox.addChild(line);
        line.width = 106;
        line.height = 106;
        line.x = 12;
        line.y = 10.5;
        _this.viewBox.addChild(_this.timeBox);
        _this.timeBox.width = 70;
        _this.timeBox.height = 70;
        _this.timeBox.x = 30;
        _this.timeBox.y = 28;
        _this.viewBox.addChild(_this.shapeBox);
        _this.shapeBox.width = 130;
        _this.shapeBox.height = 130;
        _this.timeBox.addChild(_this.labelStyle(time));
        _this.shapeBox.addChild(_this.shapeStyle(time, time));
        var timer = setInterval(function () {
            time--;
            if (time == 0) {
                clearInterval(timer);
                // 时间到了回调
                if (_this.cbConnect.length > 0) {
                    var obj = _this.cbConnect[0];
                    var func = _this.cbConnect[1];
                    func.call(obj);
                    _this.cbConnect.length = 0;
                }
            }
            // 重置数字
            _this.timeBox.removeChild(_this.timeBox.$children[0]);
            _this.timeBox.addChild(_this.labelStyle(time));
            // 重置圆弧
            _this.shapeBox.removeChild(_this.shapeBox.$children[0]);
            _this.shapeBox.addChild(_this.shapeStyle(zTime, time));
        }, 1000);
        return _this;
    }
    CountdownTween.prototype.labelStyle = function (n) {
        var _num = String(n);
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
    };
    // n: 总时间， z：已经走的时间
    CountdownTween.prototype.shapeStyle = function (n, z) {
        // (Math.PI / 180) * (360 / n)为全部时间已走多少，乘与剩下的时间就是绘制已经走过时间的圆弧
        var l = ((Math.PI / 180) * (360 / n)) * (n - z);
        var shape = new egret.Shape();
        shape.graphics.lineStyle(16, 0x0C153C);
        shape.graphics.drawArc(64, 64, 47, 0, l, false);
        shape.graphics.endFill();
        return shape;
    };
    // 植入回调事件，供时间到了执行该回调
    CountdownTween.prototype.setConnectHandler = function (_func, _obj) {
        this.cbConnect = [_obj, _func];
    };
    return CountdownTween;
}(egret.Sprite));
__reflect(CountdownTween.prototype, "CountdownTween");
/**
    var countdownTween = new CountdownTween(60);
    GameView.viewBox.addChild(countdownTween);
    countdownTween.setConnectHandler(() => {
        console.log("时间到了");
    },this);
 */
