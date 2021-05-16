/**
 * 大厅创建与加入房间场景
 */
class RoomBtnView extends egret.Sprite {
    
    // 场景盒子
    private roomBox: egret.Sprite = new egret.Sprite();
    
    public constructor() {
	    super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
	}
	
    private createView() {
        // 绘制场景盒子
        this.addChild(this.roomBox);
        this.roomBox.width = 750;
        this.roomBox.height = 490;

        // 创建房间
        var roomBtn_1_box: egret.Sprite = new egret.Sprite();
        this.roomBox.addChild(roomBtn_1_box);
        roomBtn_1_box.width = 290;
        roomBtn_1_box.height = 490;

        var room_btn_1_1 = createBitmapByName("home_room_btn_1_1_png");
        roomBtn_1_box.addChild(room_btn_1_1);
        room_btn_1_1.width = 286;
        room_btn_1_1.height = 408;

        var room_btn_1_2_bg = createBitmapByName("home_room_btn_bg_png");
        roomBtn_1_box.addChild(room_btn_1_2_bg);
        room_btn_1_2_bg.width = 280;
        room_btn_1_2_bg.height = 130;
        room_btn_1_2_bg.x = 10;
        room_btn_1_2_bg.y = 364;

        var room_btn_1_2_text = createBitmapByName("home_room_btn_2_png");
        roomBtn_1_box.addChild(room_btn_1_2_text);
        room_btn_1_2_text.width = 190;
        room_btn_1_2_text.height = 48;
        room_btn_1_2_text.x = 52;
        room_btn_1_2_text.y = 386;

        // 加入房间
        var roomBtn_2_box: egret.Sprite = new egret.Sprite();
        this.roomBox.addChild(roomBtn_2_box);
        roomBtn_2_box.width = 340;
        roomBtn_2_box.height = 490;
        roomBtn_2_box.x = 410;

        var room_btn_2_2 = createBitmapByName("home_room_btn_2_2_png");
        roomBtn_2_box.addChild(room_btn_2_2);
        room_btn_2_2.width = 380;
        room_btn_2_2.height = 408;
        room_btn_2_2.x = -40;

        var room_btn_2_2_bg = createBitmapByName("home_room_btn_bg_png");
        roomBtn_2_box.addChild(room_btn_2_2_bg);
        room_btn_2_2_bg.width = 280;
        room_btn_2_2_bg.height = 130;
        room_btn_2_2_bg.x = 20;
        room_btn_2_2_bg.y = 364;

        var room_btn_2_2_text = createBitmapByName("home_room_btn_1_png");
        roomBtn_2_box.addChild(room_btn_2_2_text);
        room_btn_2_2_text.width = 190;
        room_btn_2_2_text.height = 48;
        room_btn_2_2_text.x = 62;
        room_btn_2_2_text.y = 386;

        // 点击创建房间
        roomBtn_1_box.touchEnabled = true;
        roomBtn_1_box.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openRoom,this);

        // 点击加入房间
        roomBtn_2_box.touchEnabled = true;
        roomBtn_2_box.addEventListener(egret.TouchEvent.TOUCH_TAP,this.joinRoom,this);
    }
	
    private openRoom(evt: egret.TouchEvent) {
        var modal = new Modal(1);
        HomeView.self.addChild(modal);
        // 载入创建房间类
        var openRoomView = new OpenRoomView(modal);
        modal.addChild(openRoomView);
    }

    private joinRoom(evt: egret.TouchEvent) {
        var modal = new Modal(2);
        HomeView.self.addChild(modal);
        // 载入进入房间类
        var joinRoomView = new JoinRoomView(modal);
        modal.addChild(joinRoomView);
    }
    
}