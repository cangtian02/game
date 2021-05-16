/**
 * Modal 弹出框
 * index number 1，2，3代表几级弹框
 */
class Modal extends egret.Sprite {

    // modal顶级盒子
    private modalBox: egret.Sprite = new egret.Sprite();
    
    // 弹框盒子
    private modalWarp: egret.Sprite = new egret.Sprite();
        
    // 各级弹框的宽高
    private moadl_size: any = [
        { "width": 1040,"height": 660 },
        { "width": 760,"height": 600 },
        { "width": 760,"height": 420 }
    ];
    
    // 弹框宽高
    private modalWidth: number = 0;
    private modalHeight: number = 0;
    
    // 舞台宽高
    private stageWidth: number = 0;
    private stageHeight: number = 0;

    public constructor(public index:number) {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private createView() {
        // 框宽高
        this.modalWidth = this.moadl_size[this.index - 1].width;
        this.modalHeight = this.moadl_size[this.index - 1].height;
        
        // 舞台宽高
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
        
        // 绘制modal盒子
        this.addChild(this.modalBox);
        this.modalBox.width = this.stageWidth;
        this.modalBox.height = this.stageHeight;
        
        // 设置modal盒子点击事件，阻止点击事件穿透
        this.modalBox.touchEnabled = true;
        
        // 绘制黑色透明背景
        var m_mask:egret.Sprite = new egret.Sprite();
        this.modalBox.addChild(m_mask);
        m_mask.graphics.beginFill(0x000000);
        m_mask.graphics.drawRect(0,0,this.stageWidth,this.stageHeight);
        m_mask.graphics.endFill();
        m_mask.alpha = .6;
        
        // 弹框盒子
        this.modalBox.addChild(this.modalWarp);
        this.modalWarp.width = this.modalWidth;
        this.modalWarp.height = this.modalHeight;
        this.modalWarp.x = (this.stageWidth - this.modalWidth) / 2;
        this.modalWarp.y = (this.stageHeight - this.modalHeight) / 2;
        
        // 根据传入index判断弹出几级弹框
        if (this.index == 1 || this.index == 2) {
            this.render_moadl_one_and_two();
        } else if (this.index == 3) {
            this.render_moadl_tree();
        }  
    }
         
    private render_moadl_one_and_two() {        
        // 盒子透明底
        var warp_mask = createBitmapByName("public_modal_mask_png");
        this.modalWarp.addChild(warp_mask);
        warp_mask.width = this.modalWarp.width + 12;
        warp_mask.height = this.modalWarp.height - 20;
        warp_mask.x = -6;
        warp_mask.y = 20;
        
        // 盒子顶部条
        if (this.index == 1) {
            var warp_top_left = createBitmapByName("public_modal_json.modal_1_top");
        } else {
            var warp_top_left = createBitmapByName("public_modal_json.modal_2_top");
        }
        this.modalWarp.addChild(warp_top_left);
        warp_top_left.width = this.modalWidth / 2 + 3;
        warp_top_left.height = 66;
        warp_top_left.skewY = 180;
        warp_top_left.x = this.modalWidth / 2;
        
        if (this.index == 1) {
            var warp_top_right = createBitmapByName("public_modal_json.modal_1_top");
        } else {
            var warp_top_right = createBitmapByName("public_modal_json.modal_2_top");
        }
        this.modalWarp.addChild(warp_top_right);
        warp_top_right.width = this.modalWidth / 2 + 3;
        warp_top_right.height = 66;
        warp_top_right.x = this.modalWidth / 2;
        
        // 盒子底部条
        var warp_bot_left = createBitmapByName("public_modal_json.modal_bot");
        this.modalWarp.addChild(warp_bot_left);
        warp_bot_left.width = this.modalWidth / 2;
        warp_bot_left.height = 38;
        warp_bot_left.skewY = 180;
        warp_bot_left.x = this.modalWidth / 2;
        warp_bot_left.y = this.modalHeight - 38;
        
        var warp_bot_right = createBitmapByName("public_modal_json.modal_bot");
        this.modalWarp.addChild(warp_bot_right);
        warp_bot_right.width = this.modalWidth / 2;
        warp_bot_right.height = 38;
        warp_bot_right.x = this.modalWidth / 2;
        warp_bot_right.y = this.modalHeight - 38;
        
        // 关闭盒子
        var close_modal = createBitmapByName("public_button_json.button_01");
        this.modalWarp.addChild(close_modal);
        close_modal.width = 46;
        close_modal.height = 46;
        close_modal.x = this.modalWidth - 64;
        close_modal.y = 6;
        
        // 弹框打开动画
        this.warpTween(this.modalWarp);
        // 关闭弹框事件
        this.closeMoadl(close_modal);
    }
    
    private render_moadl_tree() {
        // 盒子透明底
        var warp_mask = createBitmapByName("public_modal_mask_png");
        this.modalWarp.addChild(warp_mask);
        warp_mask.width = this.modalWarp.width;
        warp_mask.height = this.modalWarp.height;
        
        var warp_bg = createBitmapByName('public_modal_bg_png');
        this.modalWarp.addChild(warp_bg);
        warp_bg.width = this.modalWarp.width - 36;
        warp_bg.height = this.modalWarp.height - 32;
        warp_bg.x = 18;
        warp_bg.y = 18;
        
        // 顶部条
        var warp_top_left = createBitmapByName("public_modal_json.modal_3_top");
        this.modalWarp.addChild(warp_top_left);
        warp_top_left.width = (this.modalWidth - 36) / 2;
        warp_top_left.height = 66;
        warp_top_left.skewY = 180;
        warp_top_left.x = (this.modalWidth - 36) / 2 + 18;
        warp_top_left.y = 18;

        var warp_top_right = createBitmapByName("public_modal_json.modal_3_top");
        this.modalWarp.addChild(warp_top_right);
        warp_top_right.width = (this.modalWidth - 12) / 2;
        warp_top_right.height = 66;
        warp_top_right.x = (this.modalWidth - 36) / 2 + 4;
        warp_top_right.y = 18;
        
        // 关闭盒子
        var close_modal = createBitmapByName("public_button_json.button_00");
        this.modalWarp.addChild(close_modal);
        close_modal.width = 86;
        close_modal.height = 86;
        close_modal.x = this.modalWidth - 100;
        close_modal.y = 6;

        // 弹框打开动画
        this.warpTween(this.modalWarp);
        // 关闭弹框事件
        this.closeMoadl(close_modal);
    }
    
    private warpTween(box: any) {
        // 定义动画盒子
        var tw_box = egret.Tween.get(box);

        var tw_props_1 = {
            "alpha": .8,
            "scaleX": .9,
            "scaleY": .9,
            "x": (this.stageWidth - (this.modalWidth * .9)) / 2,
            "y": (this.stageHeight - (this.modalHeight * .9)) / 2
        };

        var tw_props_2 = {
            "alpha": 1,
            "scaleX": 1.05,
            "scaleY": 1.05,
            "x": (this.stageWidth - (this.modalWidth * 1.05)) / 2,
            "y": (this.stageHeight - (this.modalHeight * 1.05)) / 2
        };

        var tw_props_3 = {
            "alpha": 1,
            "scaleX": 1,
            "scaleY": 1,
            "x": (this.stageWidth - this.modalWidth) / 2,
            "y": (this.stageHeight - this.modalHeight) / 2
        };

        tw_box.to(tw_props_1);
        tw_box.to(tw_props_2,180);
        tw_box.to(tw_props_3,120);
    }
    
    private closeMoadl(box: any) { 
        box.touchEnabled = true;
        box.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.removeChild(this.modalBox);
        },this);
    }
    
}
