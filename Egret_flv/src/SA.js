 var SA;
!function(t) {
    var e = function() {
        function t() {}
        var e = (__define,
        t);
        e.prototype;
        return t.start = "video_start",
        t.stop = "video_stop",
        t
    }();
    t.VideoEvent = e,
    egret.registerClass(e, "SA.VideoEvent");
    var i = function() {
        function t() {
            this.source = new egret.Rectangle(0,0,1,1),
            this.destination = new egret.Rectangle(0,0,1,1),
            this.bm = new egret.Rectangle(0,0,1,1)
        }
        var e = (__define,
        t);
        e.prototype;
        return t
    }();
    t.ViewSetting = i,
    egret.registerClass(i, "SA.ViewSetting");
    var n = function(e) {
        function n() {
            e.call(this),
            this._isPause = !1,
            this._isShowSmallView = !0,
            this._isShowBigViewFrame = !1,
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this),
            this.isSupportMse() ? this._player = new Flvjsplayer : console.log("this is node player "),
            this._player.addEventListener(t.VideoEvent.start, this.onstart, this),
            this._player.addEventListener(t.VideoEvent.stop, this.onclose, this),
            this._canvasBigTag = this.createCanvas(n.getRandomCanvasId(), 1, 1),
            this._canvas2dBigcx = this._canvasBigTag.getContext("2d"),
            this._canvasSmallTag = this.createCanvas(n.getRandomCanvasId(), 1, 1),
            this._canvas2dSmallcx = this._canvasSmallTag.getContext("2d"),
            this._bigViewFrameBitmap = new egret.Bitmap,
            this._videoBigBitmap = new egret.Bitmap,
            this._videoSmallBitmap = new egret.Bitmap,
            this._timerVideo = new egret.Timer(20,0),
            this._timerVideo.addEventListener(egret.TimerEvent.TIMER, this.draw, this)
        }
        __extends(n, e);
        var s = (__define,
        n)
          , a = s.prototype;
        return n.getRandomCanvasId = function(t) {
            void 0 === t && (t = "flvmutliview");
            n.canvasid++;
            return t + n.canvasid + "sa"
        }
        ,
        a.showBigviewFrame = function(t) {
            var e = RES.getRes(t);
            this._bigViewFrameBitmap.texture = e,
            this._isShowBigViewFrame = !0
        }
        ,
        a.hideBigviewFrame = function() {
            this._isShowBigViewFrame = !1
        }
        ,
        a.resume = function() {
            this._isPause = !1
        }
        ,
        a.pause = function() {
            this._isPause = !0
        }
        ,
        a.hideSmallView = function() {
            this._isShowSmallView = !1
        }
        ,
        a.showSmallView = function() {
            this._isShowSmallView = !0
        }
        ,
        a.onstart = function(e) {
            try {
                this._canvas2dBigcx.clearRect(0, 0, this._canvasBigTag.width, this._canvasBigTag.height),
                this._canvas2dSmallcx.clearRect(0, 0, this._canvasSmallTag.width, this._canvasSmallTag.height)
            } catch (i) {
                console.log("[draw error:]", i)
            }
            this._videoBigBitmap.visible = !0,
            this._videoSmallBitmap.visible = !0,
            this.dispatchEventWith(t.VideoEvent.start),
            this._timerVideo.start()
        }
        ,
        a.getSignal = function() {
            return this._player.flvsignal()
        }
        ,
        a.onclose = function(e) {
            this.dispatchEventWith(t.VideoEvent.stop),
            this.stop()
        }
        ,
        a.onAddToStage = function(t) {
            this.addChild(this._videoBigBitmap),
            this.addChild(this._bigViewFrameBitmap),
            this.addChild(this._videoSmallBitmap),
            this._bigViewFrameBitmap.visible = !1
        }
        ,
        a.updateViewSize = function(t, e) {
            this._bigSetting = t,
            e ? (this._smallSetting = e,
            (0 == e.source.width || 0 == e.bm.width || 0 == e.destination.width) && this.hideSmallView()) : (this.hideSmallView(),
            this._smallSetting = new i),
            this._canvasBigTag.width = this._bigSetting.destination.width,
            this._canvasBigTag.height = this._bigSetting.destination.height,
            this._canvasSmallTag.width = this._smallSetting.destination.width,
            this._canvasSmallTag.height = this._smallSetting.destination.height
        }
        ,
        a.slowMotion = function(t) {
            0 >= t && (t = 1)
        }
        ,
        a.draw = function(t) {
            if (!this._isPause)
                try {
                    this._canvas2dBigcx.drawImage(this._canvasTag, this._bigSetting.source.x, this._bigSetting.source.y, this._bigSetting.source.width, this._bigSetting.source.height, this._bigSetting.destination.x, this._bigSetting.destination.y, this._bigSetting.destination.width, this._bigSetting.destination.height),
                    this.updateVideo(this._canvasBigTag, this._textureBig, this._videoBigBitmap, this._bigSetting),
                    this._isShowBigViewFrame ? (this._bigViewFrameBitmap.x = this._videoBigBitmap.x,
                    this._bigViewFrameBitmap.y = this._videoBigBitmap.y,
                    this._bigViewFrameBitmap.width = this._videoBigBitmap.width,
                    this._bigViewFrameBitmap.height = this._videoBigBitmap.height,
                    this._bigViewFrameBitmap.visible = !0) : this._bigViewFrameBitmap.visible = !1,
                    this._isShowSmallView ? this._smallSetting && "undefined" != typeof this._smallSetting.source && this._smallSetting.source.width > 0 && (this._videoSmallBitmap.visible = !0,
                    this._canvas2dSmallcx.drawImage(this._canvasTag, this._smallSetting.source.x, this._smallSetting.source.y, this._smallSetting.source.width, this._smallSetting.source.height, this._smallSetting.destination.x, this._smallSetting.destination.y, this._smallSetting.destination.width, this._smallSetting.destination.height),
                    this.updateVideo(this._canvasSmallTag, this._textureSmall, this._videoSmallBitmap, this._smallSetting)) : this._videoSmallBitmap.visible = !1
                } catch (e) {
                    console.log("draw error:", e)
                }
        }
        ,
        a.updateVideo = function(t, e, i, n) {
            e && (e.dispose(),
            e = null),
            i && (i.texture && (i.texture.dispose(),
            i.texture = null),
            e = new egret.Texture,
            e.bitmapData = new egret.BitmapData(t),
            i.texture = e,
            i.x = n.bm.x,
            i.y = n.bm.y,
            i.width = n.bm.width,
            i.height = n.bm.height)
        }
        ,
        a.createCanvas = function(t, e, i) {
            void 0 === e && (e = 720),
            void 0 === i && (i = 406);
            var n;
            return (n = document.getElementById(t)) ? n : (n = document.createElement("canvas"),
            n.style.position = "absolute",
            n.width = e,
            n.height = i,
            n.id = t,
            n.hidden = !1,
            n.style.zIndex = "-999",
            n.style.width = "1px",
            n.style.height = "1px",
            document.body.appendChild(n),
            n)
        }
        ,
        a.setVolume = function(t) {
            this._player.setVolume(t)
        }
        ,
        a.isSupportMse = function() {
            return window.supportMSEH264Playback
        }
        ,
        a.play = function(t, e, i, n, s, a) {
            void 0 === e && (e = "http://v2.gooddawn.com/wogphmain/"),
            void 0 === i && (i = 1024),
            void 0 === n && (n = 540),
            void 0 === s && (s = !0),
            void 0 === a && (a = ""),
            this._videoLink = e,
            this._videoDesk = t,
            this._videoW = i,
            this._videoH = n;
            var r = e + t + ".flv" + a;
            return this._player.play(r, i, n, s),
            this._canvasTag = this._player.getCanvasOrVideoTag(),
            r
        }
        ,
        a.stop = function() {
            this._timerVideo.stop(),
            this._videoBigBitmap.visible = !1,
            this._videoSmallBitmap.visible = !1,
            this._player.stop();
            try {
                this._canvas2dBigcx.clearRect(0, 0, this._canvasBigTag.width, this._canvasBigTag.height),
                this._canvas2dSmallcx.clearRect(0, 0, this._canvasSmallTag.width, this._canvasSmallTag.height)
            } catch (t) {}
        }
        ,
        a.destory = function() {
            this.stop(),
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onAddToStage, this),
            this._player.removeEventListener(t.VideoEvent.start, this.onstart, this),
            this._player.removeEventListener(t.VideoEvent.stop, this.onclose, this),
            this.removeChild(this._videoBigBitmap),
            this.removeChild(this._videoSmallBitmap),
            this.removeChild(this._bigViewFrameBitmap),
            this._textureBig && this._textureBig.dispose(),
            this._textureSmall && this._textureSmall.dispose(),
            this._timerVideo.stop(),
            this._timerVideo.removeEventListener(egret.TimerEvent.TIMER, this.draw, this),
            this._canvasBigTag.remove(),
            this._canvasSmallTag.remove(),
            this._canvasTag = null
        }
        ,
        n.canvasid = 1,
        n
    }(egret.DisplayObjectContainer);
    t.FLVMutiView = n,
    egret.registerClass(n, "SA.FLVMutiView")
}(SA || (SA = {}));