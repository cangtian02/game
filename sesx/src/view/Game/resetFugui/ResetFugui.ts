/**
 * ResetFugui 公用方法
 */
class ResetFugui {

    public static is_res: Boolean = false;  // 是否已加载富贵资源

	/**
	 * 选择项 t 文字
	 */ 
	public static item(t: string) {
	    let box: egret.Sprite = new egret.Sprite();
	    
	    // 绘制两个背景，做深度切换达到高亮效果
        let bg_1: egret.Shape = new egret.Shape();
        bg_1.graphics.beginFill(0xE5BC94,1);
        bg_1.graphics.drawCircle(30,30,30);
        bg_1.graphics.endFill();
        box.addChildAt(bg_1,1);
	    
        let bg_2: egret.Shape = new egret.Shape();
        bg_2.graphics.beginFill(0xBF9973,1);
        bg_2.graphics.drawCircle(30,30,30);
        bg_2.graphics.endFill();
        box.addChildAt(bg_2,2);
        
        let ts = createTextFieldByName(t);
        box.addChild(ts);
        ts.size = 24;
        ts.width = 60;
        ts.height = 60;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.textColor = 0x5A3B24;
        
	    return box;
	}
	
	/**
	 * 教育层背景
	 */ 
    public static resetFugui_one_bg() {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 600;
        box.height = 580;
        
        let bg_1: egret.Shape = new egret.Shape();
        bg_1.graphics.beginFill(0x9D3131,1);
        bg_1.graphics.drawRect(30,50,box.width - 60,box.height - 50);
        bg_1.graphics.endFill();
        box.addChildAt(bg_1,1);

        let bg_2: egret.Shape = new egret.Shape();
        bg_2.graphics.beginFill(0x0B0C0C,1);
        bg_2.graphics.drawRect(36,50,box.width - 72,box.height - 56);
        bg_2.graphics.endFill();
        box.addChildAt(bg_2,1);

        let bg_3: egret.Shape = new egret.Shape();
        bg_3.graphics.beginFill(0x322121,1);
        bg_3.graphics.drawRect(40,60,box.width - 80,410);
        bg_3.graphics.endFill();
        box.addChildAt(bg_3,2);

        let bg_4: egret.Shape = new egret.Shape();
        bg_4.graphics.beginFill(0x3F2424,1);
        bg_4.graphics.drawRect(40,470,box.width - 80,100);
        bg_4.graphics.endFill();
        box.addChildAt(bg_4,2);
        
        let top_line = createBitmapByName('reset_fugui_json.reset_fugui_1');
        box.addChildAt(top_line,4);
        top_line.width = box.width;
        top_line.height = 60;

        let decorate = createBitmapByName('reset_fugui_json.reset_fugui_3');
        box.addChildAt(decorate,5);
        decorate.width = 40;
        decorate.height = 106;
        decorate.x = 60;
        decorate.y = 26;
        
        return box;
    }
	
    /**
     * 教育层标题 s=>来源 small big
     */ 
    public static resetFugui_one_title(s: string) {
        let title_one: string;
        s == 'small' ? title_one = '小' : title_one = '大';
        let title = createTextFieldByName(title_one + '富贵可自由选择');
        title.width = 600;
        title.height = 100;
        title.textAlign = 'center';
        title.verticalAlign = 'middle';
        title.size = 34;
        title.textColor = 0xFFE2E2;
        title.bold = true;
        title.y = 60;
        return title;
    }
    
    /**
     * 教育层tips
     */
    public static resetFugui_one_tips() {
        let tips = createTextFieldByName('选择完成将会出现在投注面板上');
        tips.size = 24;
        tips.textColor = 0x815050;
        tips.width = 600;
        tips.textAlign = 'center';
        tips.y = 430;
        return tips;
    }
    
    /**
     * 教育层btn
     */
    public static resetFugui_one_btn() {
        let btnBox: egret.Sprite = new egret.Sprite();
        btnBox.width = 274;
        btnBox.height = 60;
        btnBox.x = (600 - btnBox.width) / 2;
        btnBox.y = 490;

        let bg = createBitmapByName('reset_fugui_json.reset_fugui_4');
        btnBox.addChild(bg);
        bg.width = btnBox.width;
        bg.height = btnBox.height;

        let ts = createTextFieldByName('我知道了');
        btnBox.addChild(ts);
        ts.size = 26;
        ts.width = btnBox.width;
        ts.height = btnBox.height;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        ts.textColor = 0x722F0E;
        ts.italic = true;
        
        return btnBox;
    }
    
	/**
	 * 修改富贵盒子 s => small || big
	 */ 
    public static resetFugui_modalBox(s: string) {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 617;
        box.height = 629;
        
        let bg = createBitmapByName('reset_fugui_5_png');
        box.addChild(bg);
        bg.width = box.width;
        bg.height = box.height;
        
        let title_one: string;
        s == 'small' ? title_one = '小' : title_one = '大';
        let title = createTextFieldByName('选择' + title_one + '富贵');
        box.addChild(title);
        title.width = box.width;
        title.textAlign = 'center';
        title.textColor = 0xffffff;
        title.size = 24;
        title.italic = true;
        title.y = 20;
        
        let tips_one: string;
        s == 'small' ? tips_one = '二' : tips_one = '三';
        let tips = createTextFieldByName('自由选择串关，选项' + tips_one + '串一');
        box.addChild(tips);
        tips.width = box.width;
        tips.textAlign = 'center';
        tips.textColor = 0xA67C52;
        tips.size = 22;
        tips.y = 74;
        
        let arr_1 = createBitmapByName('reset_fugui_json.reset_fugui_6');
        box.addChild(arr_1);
        arr_1.width = 14;
        arr_1.height = 16;
        arr_1.y = 78;
        arr_1.x = 460;
        
        let arr_2 = createBitmapByName('reset_fugui_json.reset_fugui_6');
        box.addChild(arr_2);
        arr_2.width = 14;
        arr_2.height = 16;
        arr_2.skewY = 180;
        arr_2.y = 78;
        arr_2.x = 162;
        
        let warp_bg: egret.Shape = new egret.Shape();
        warp_bg.graphics.beginFill(0xA48262,1);
        warp_bg.graphics.drawRect(50,110,box.width - 100,400);
        warp_bg.graphics.endFill();
        box.addChild(warp_bg);
        
        return box;
    }

    /**
     * 确认修改富贵按钮
     */ 
    public static resetFugui_btnBox() {
        let box: egret.Sprite = new egret.Sprite();
        box.width = 517;
        box.height = 60;
        box.x = 50;
        box.y = 534;
        
        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xC8504B,1);
        bg.graphics.drawRect(0,0,box.width,60);
        bg.graphics.endFill();
        box.addChild(bg);
        
        let ts = createTextFieldByName('确 认');
        box.addChild(ts);
        ts.size = 26;
        ts.textColor = 0xFFFFFF;
        ts.width = box.width;
        ts.height = box.height;
        ts.textAlign = 'center';
        ts.verticalAlign = 'middle';
        
        return box;
    }
    
}
