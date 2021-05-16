var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏音乐中控
 */
var MusicControl = (function () {
    function MusicControl() {
    }
    // 开启音乐
    MusicControl.playMusic = function () {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            Main.DEFAULT_CONFIG.isPlayMusic = true;
            MusicControl.bg_soundChannel = MusicControl.bg_sound.play();
        }
    };
    // 关闭音乐
    MusicControl.stopMusic = function () {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            Main.DEFAULT_CONFIG.isPlayMusic = false;
            MusicControl.bg_soundChannel.stop();
            MusicControl.bg_soundChannel = null;
        }
    };
    // 初始化播放背景音乐
    MusicControl.playBg = function () {
        if (Main.DEFAULT_CONFIG.isPlayMusic && !Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            MusicControl.bg_sound = RES.getRes("game_bg_mp3");
            MusicControl.bg_soundChannel = MusicControl.bg_sound.play();
        }
    };
    /**
     * 播放音乐 name：资源名称
     */
    MusicControl.playMusicList = function (name) {
        if (Main.DEFAULT_CONFIG.isPlayMusic && !Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            var sound = RES.getRes(name);
            sound.play(0, 1);
        }
    };
    // 发牌
    MusicControl.playDeal = function () {
        MusicControl.playMusicList("card_flop_mp3");
    };
    // 下注
    MusicControl.playBet = function () {
        MusicControl.playMusicList("gold_post_mp3");
    };
    // 收钱
    MusicControl.playGetGold = function () {
        MusicControl.playMusicList("gold_get_mp3");
    };
    // 倒计时
    MusicControl.playDownTime = function () {
        MusicControl.playMusicList("count_down_time_mp3");
    };
    // 通赔
    MusicControl.playOver = function () {
        MusicControl.playMusicList("over_mp3");
    };
    // 通杀
    MusicControl.playWin = function () {
        MusicControl.playMusicList("win_mp3");
    };
    // 喝彩
    MusicControl.playApplause = function () {
        MusicControl.playMusicList("applause_mp3");
    };
    // 开牌
    MusicControl.playOpen_poker = function () {
        MusicControl.playMusicList("open_poker_mp3");
    };
    // 开始下注
    MusicControl.playStart_add_chip = function () {
        MusicControl.playMusicList("start_add_chip_mp3");
    };
    // 停止下注
    MusicControl.playStop_add_chip = function () {
        MusicControl.playMusicList("stop_add_chip_mp3");
    };
    // 自己下注
    MusicControl.playOne_add_chips = function () {
        MusicControl.playMusicList("one_add_chips_mp3");
    };
    // 牌型
    MusicControl.playCardType = function (type) {
        MusicControl.playMusicList("card_type_" + (type - 1) + "_mp3");
    };
    return MusicControl;
}());
__reflect(MusicControl.prototype, "MusicControl");
//# sourceMappingURL=MusicControl.js.map