var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var canvasFlv = (function () {
    function canvasFlv() {
    }
    return canvasFlv;
}());
__reflect(canvasFlv.prototype, "canvasFlv");
var VideoToCanvas = (function (window, document) {
    function VideoToCanvas(videoElement) {
        if (!videoElement) {
            return;
        }
        var canvas = document.createElement('canvas');
        canvas.width = videoElement.offsetWidth;
        canvas.height = videoElement.offsetHeight;
        var ctx = canvas.getContext('2d');
        var newVideo = videoElement.cloneNode(false);
        var timer = null;
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
        var cancelAnimationFrame = window.cancelAnimationFrame;
        // setInterval(e =>{
        //     drawCanvas();
        // },1000);
        function drawCanvas() {
            ctx.drawImage(newVideo, 0, 0, canvas.width, canvas.height);
            timer = requestAnimationFrame(drawCanvas);
        }
        function stopDrawing() {
            cancelAnimationFrame(timer);
        }
        newVideo.addEventListener('play', function () {
            drawCanvas();
        }, false);
        newVideo.addEventListener('pause', stopDrawing, false);
        newVideo.addEventListener('ended', stopDrawing, false);
        videoElement.parentNode.replaceChild(canvas, document.getElementById('flvmutliview9sa'));
        this.play = function () {
            newVideo.play();
        };
        this.pause = function () {
            newVideo.pause();
        };
        this.playPause = function () {
            if (newVideo.paused) {
                this.play();
            }
            else {
                this.pause();
            }
        };
        this.change = function (src) {
            if (!src) {
                return;
            }
            newVideo.src = src;
        };
        this.drawFrame = drawCanvas;
    }
    return VideoToCanvas;
})(window, document);
//# sourceMappingURL=canvasFlv.js.map