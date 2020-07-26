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
// 视频切换类
var BtnVideoUI = (function (_super) {
    __extends(BtnVideoUI, _super);
    function BtnVideoUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "BtnVideo";
        _this.init();
        return _this;
    }
    BtnVideoUI.prototype.init = function () {
        var _this = this;
        this.btn_group.$children.forEach(function (el, i) {
            el.name = "btn" + i;
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        });
        this.videoUI = new VideoUI();
        this.videoUI.y = 10;
        this.videoUI.horizontalCenter = 0;
        MAIN.addChild(this.videoUI);
    };
    BtnVideoUI.prototype.onClick = function (e) {
        var btn = e.$currentTarget.name;
        switch (btn) {
            case "btn0":
                // widths = 300;
                this.videoUI.play("https://tw.004cdn.com/obs/011.flv");
                break;
            case "btn1":
                this.videoUI.play("http://127.0.0.1:8000/live/STREAM_NAME.flv");
                // widths = 540;
                break;
            case "btn2":
                this.videoUI.play("ws://127.0.0.1:8000/live/STREAM_NAME.flv");
            default:
                break;
        }
    };
    return BtnVideoUI;
}(eui.Component));
__reflect(BtnVideoUI.prototype, "BtnVideoUI");
//# sourceMappingURL=BtnVideoUI.js.map