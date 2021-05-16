/**
 * 项目中所用到的button按钮
 */
class Button extends egret.Sprite {
    
    private t: any = [
        {
            bgWidth: 232,
            bgHeight: 74,
            textWidth: 140,
            textHeight: 38
        },
        {
            bgWidth: 184,
            bgHeight: 74,
            textWidth: 140,
            textHeight: 38
        },
        {
            bgWidth: 184,
            bgHeight: 74,
            textWidth: 90,
            textHeight: 38
        }
    ]
    
    private b: any = [
        'public_button_json.button_02',
        'public_button_json.button_03',
        'public_button_json.button_04',
        'public_button_json.button_05'
    ]
    
    /**
     * cjfj 创建房间，yqhy 邀请好友，jrfj 进入房间
     * qr 确认，yqhy_2 黄色背景邀请好友，jsfj 解散房间
     * qx 取消 zb 准备 
     * qxcp 取消出牌， qrcp 确认出牌
     * jujue 拒绝 ty 同意
     */ 
    private arr: any = [
        {
            name: 'cjfj',
            bg: this.b[2],
            text: 'home_open_room_btn_text_png',
            type: this.t[0]
        },
        {
            name: 'yqhy',
            bg: this.b[1],
            text: 'home_open_room_yqhy_png',
            type: this.t[1]
        },
        {
            name: 'jrfj',
            bg: this.b[0],
            text: 'home_open_room_jrfj_png',
            type: this.t[1]
        },
        {
            name: 'qr',
            bg: this.b[0],
            text: 'game_fonts_queren_png',
            type: this.t[2]
        },
        {
            name: 'yqhy_2',
            bg: this.b[0],
            text: 'game_fonts_yaoqing_png',
            type: this.t[1]
        },
        {
            name: 'jsfj',
            bg: this.b[1],
            text: 'game_fonts_jiesan_png',
            type: this.t[1]
        },
        {
            name: 'qx',
            bg: this.b[1],
            text: 'game_fonts_quxiao_png',
            type: this.t[2]
        },
        {
            name: 'zb',
            bg: this.b[0],
            text: 'game_fonts_zhunbei_png',
            type: this.t[2]
        },
        {
            name: 'qxcp',
            bg: this.b[3],
            text: 'game_choose_fonts_json.quxiao',
            type: this.t[0]
        },
        {
            name: 'qrcp',
            bg: this.b[2],
            text: 'game_choose_fonts_json.queding',
            type: this.t[0]
        },
        {
            name: 'jujue',
            bg: this.b[1],
            text: 'game_fonts_quxiao_png',
            type: this.t[2]
        },
        {
            name: 'ty',
            bg: this.b[0],
            text: 'game_fonts_queren_png',
            type: this.t[2]
        }
    ]
    
	public constructor(n: string) {
    	  super();
    	  
        var btn: any;
        for(var i:number = 0; i < this.arr.length; i++) {
            if(this.arr[i].name == n) {
                btn = this.arr[i];
            }
        }
    	  
        var btnBox: egret.Sprite = new egret.Sprite();
        this.addChild(btnBox);
        btnBox.width = btn.type.bgWidth;
        btnBox.height = btn.type.bgHeight;
        
        var btnBg = createBitmapByName(btn.bg);
        btnBox.addChild(btnBg);
        btnBg.width = btnBox.width;
        btnBg.height = btnBox.height;
        
        var btnText = createBitmapByName(btn.text);
        btnBox.addChild(btnText);
        btnText.width = btn.type.textWidth;
        btnText.height = btn.type.textHeight;
        btnText.x = (btnBox.width - btnText.width) / 2;
        btnText.y = (btnBox.height - btnText.height) / 2 - 4;
	}
	
}
