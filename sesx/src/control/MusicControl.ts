/**
 * 游戏音乐中控
 */
class MusicControl {

    public static bg_sound:egret.Sound;
    public static bg_soundChannel:egret.SoundChannel;

    // 开启音乐
    public static playMusic() {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            Main.DEFAULT_CONFIG.isPlayMusic = true;
            MusicControl.bg_soundChannel = MusicControl.bg_sound.play();
        }
    }

    // 关闭音乐
    public static stopMusic() {
        if (!Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            Main.DEFAULT_CONFIG.isPlayMusic = false;
            MusicControl.bg_soundChannel.stop();
            MusicControl.bg_soundChannel = null;
        }
    }

    // 初始化播放背景音乐
    public static playBg() {
        if (Main.DEFAULT_CONFIG.isPlayMusic && !Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            MusicControl.bg_sound = RES.getRes("game_bg_mp3");
            MusicControl.bg_soundChannel = MusicControl.bg_sound.play();
        }
    }

    /**
     * 播放音乐 name：资源名称
     */
    public static playMusicList(name: any) {
        if(Main.DEFAULT_CONFIG.isPlayMusic && !Main.DEFAULT_CONFIG.isWechatdevtools && Main.DEFAULT_CONFIG.loadMusic) {
            let sound:egret.Sound = RES.getRes(name);
            sound.play(0, 1);
        }
    }

    // 倒计时
    public static playDownTime() {
        MusicControl.playMusicList("count_down_time_mp3");
    }

    // 下注
    public static playBet() {
        MusicControl.playMusicList("gold_post_mp3");
    }

    // 收钱
    public static playGetGold() {
        MusicControl.playMusicList("gold_get_mp3");
    }

    // 喝彩
    public static playApplause() {
        MusicControl.playMusicList("applause_mp3");
    }

}
