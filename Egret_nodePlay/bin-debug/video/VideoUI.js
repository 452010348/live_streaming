/**
 * 视频加载类
 *
 */
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
// var script = document.createElement('script');
// script.src = "NodePlayer-full-0.5.12-min.js";
// document.body.appendChild(script);
var nodePlayer;
var widths = 480;
var heights = 784;
var VideoUI = (function (_super) {
    __extends(VideoUI, _super);
    function VideoUI() {
        var _this = _super.call(this) || this;
        _this._url = "http://127.0.0.1:8000/live/STREAM_NAME.flv";
        // public nodePlayer: NodePlayer;
        _this.texture = null;
        _this.skinName = "Video";
        return _this;
    }
    VideoUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.canvasStream = new CanvasStreame();
        this.init();
        // var pathMask = this.getMask();
        // this.addChild(pathMask);
        // this.mask = pathMask;
    };
    VideoUI.prototype.getMask = function () {
        var mask = new egret.Shape();
        mask.blendMode = egret.BlendMode.ERASE;
        mask.graphics.beginFill(0x0000ff); //黑色
        mask.graphics.drawRect(0, 0, this.width, this.height);
        mask.graphics.endFill();
        return mask;
    };
    VideoUI.prototype.init = function () {
        //白鹭小鸟不停旋转
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.loadding_box.visible = true;
        this.video_box.visible = false;
        /**
         * 当前对象
         */
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.videoInit();
    };
    /**
     * 经过
     */
    VideoUI.prototype.onRollOver = function () {
        console.log("经过");
    };
    /**
     * 移出
     */
    VideoUI.prototype.onRollOut = function () {
        console.log("移出");
    };
    VideoUI.prototype.loop = function (evt) {
        // this.img_icon.rotation += 10;
        // this.img_icon.rotation %= 360;
        this.setBitmapData && this.setBitmapData(0, 0, widths, heights, 0, 0);
    };
    VideoUI.prototype.close = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    /**
     * 视频初始化 **************************************************************************
     */
    VideoUI.prototype.videoInit = function () {
        var _this = this;
        nodePlayer = new NodePlayer();
        nodePlayer.skipLoopFilter(32);
        nodePlayer.setVolume(0);
        nodePlayer.enableAudio(1);
        nodePlayer.setScaleMode(0);
        nodePlayer.setBufferTime(6e4);
        new nodePlayer.useMSE();
        var t = document.createElement("canvas");
        t.id = "my_video_canvas";
        t.width = widths;
        t.height = heights;
        t.hidden = !0;
        t.style.visibility = "hidden";
        document.body.appendChild(t);
        nodePlayer.setView(t.id);
        this.bitmap = new egret.Bitmap();
        this.play(this._url);
        this.video_box.addChild(this.bitmap);
        nodePlayer.on('start', function () {
            console.log('NodePlayer on start');
            setTimeout(function () {
                _this.loadding_box.visible = false;
                _this.video_box.visible = true;
            }, 3000);
        });
        nodePlayer.on('close', function () {
            console.log('NodePlayer on close');
            _this.video_box.visible = false;
            _this.loadding_box.visible = true;
            console.log("视屏close 重连中");
            _this.play(_this._url);
        });
        nodePlayer.on('error', function (err) {
            console.log('NodePlayer on error', err);
            _this.video_box.visible = false;
            _this.loadding_box.visible = true;
            // this.nodePlayerInit();
            _this.play(_this._url);
            console.log("视屏连接错误 重连中...");
        });
        nodePlayer.on('stop', function (err) {
            // console.log('NodePlayer on error', err);
            // this.video_box.visible = false;
            // this.loadding_box.visible = true;
            // this.play(this._url);
            // console.log("视屏连接错误 重连中...");
            console.log("视频stop");
        });
    };
    /**
     * 视频
     */
    VideoUI.prototype.play = function (_url) {
        this.stop();
        this._url = _url;
        this.video_box.x = -500;
        this.video_box.y = -100;
        nodePlayer.start(this._url);
        // this.videoInit();
    };
    /**
     * 设置流画布属性
     */
    VideoUI.prototype.setBitmapData = function (x, y, width, height, offsetX, offsetY) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = widths; }
        if (height === void 0) { height = heights; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var x = x;
        var y = y;
        var width = width;
        var height = height;
        var offsetX = offsetX;
        var offsetY = offsetY;
        // if (this.texture) {
        // 	// 必须调用此函数,要不然内存泄漏导致视频卡顿
        // 	this.texture.$dispose();
        // }
        try {
            this.bitmap.x = 0;
            this.bitmap.y = 0;
            this.bitmap.width = widths;
            this.bitmap.height = heights;
        }
        catch (error) {
        }
        if (!this.texture) {
            this.texture = new egret.BitmapData(document.getElementById("my_video_canvas"));
            nodePlayer.resizeView(widths, heights);
        }
        this.texture.$bitmapData = this.texture;
        this.texture.$bitmapX = x;
        this.texture.$bitmapY = y;
        this.texture.$offsetX = offsetX;
        this.texture.$offsetY = offsetY;
        this.texture.$bitmapWidth = width;
        this.texture.$bitmapHeight = height;
        this.texture.$getTextureWidth = function () {
            return width;
        };
        this.texture.$getTextureHeight = function () {
            return height;
        };
        this.texture.$sourceWidth = width;
        this.texture.$sourceHeight = height;
        try {
            this.bitmap.texture = this.texture;
        }
        catch (error) {
        }
        // if (PLACE == 2) {
        // 	Video2.setBitmapDataFun(450, 330, widths * 0.5, heights * 0.5, 0, 0);
        // }
    };
    /**
     * 清除 停止流
     */
    VideoUI.prototype.stop = function () {
        try {
            nodePlayer.stop();
            if (this.texture) {
                // 必须调用此函数,要不然内存泄漏导致视频卡顿
                this.texture.$dispose();
                this.texture = null;
            }
        }
        catch (error) {
        }
    };
    VideoUI.prototype.onRemove = function (e) {
        this.stop();
        this.close();
        // this.reward_btn_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        // this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return VideoUI;
}(eui.Component));
__reflect(VideoUI.prototype, "VideoUI");
//# sourceMappingURL=VideoUI.js.map