var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var VideoTest = (function (_super) {
    __extends(VideoTest, _super);
    function VideoTest() {
        var _this = _super.call(this) || this;
        _this.video = new egret.Video();
        _this.video.x = 0; //设置视频坐标x
        _this.video.y = 0; //设置视频坐标y
        _this.video.width = 640; //设置视频宽
        _this.video.height = 320; //设置视频高
        _this.video.fullscreen = false; //设置是否全屏（暂不支持移动设备）
        _this.video.poster = "resource/assets/Button/button_up.png"; //设置loding图
        _this.video.load("http://media.w3.org/2010/05/sintel/trailer.mp4");
        _this.addChild(_this.video); //将视频添加到舞台
        //监听视频加载完成
        _this.video.once(egret.Event.COMPLETE, _this.onLoad, _this);
        //监听视频加载失败
        _this.video.once(egret.IOErrorEvent.IO_ERROR, _this.onLoadErr, _this);
        return _this;
    }
    VideoTest.prototype.onLoad = function (e) {
        var btnPlay = new eui.Button(); //新建播放按钮
        btnPlay.label = "播放";
        btnPlay.x = this.video.x + 20;
        btnPlay.y = this.video.y + this.video.height + 20;
        this.addChild(btnPlay);
        //监听按钮行为，当按下时调用播放函数。
        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play, this);
        //获取视频长度
        console.log(this.video.length);
    };
    VideoTest.prototype.onLoadErr = function (e) {
        console.log("video load error happened");
    };
    VideoTest.prototype.play = function (e) {
        this.video.play();
    };
    return VideoTest;
}(egret.DisplayObjectContainer));
__reflect(VideoTest.prototype, "VideoTest");
//# sourceMappingURL=VideoTest.js.map