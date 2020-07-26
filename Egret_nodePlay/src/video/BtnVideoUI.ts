// 视频切换类
class BtnVideoUI extends eui.Component {
	/**
	 * 按钮group
	 */
	private btn_group: eui.Group;
	private videoUI: VideoUI;
	public constructor() {
		super();
		this.skinName = "BtnVideo";
		this.init();
	}
	private init() {
		this.btn_group.$children.forEach((el, i) => {
			el.name = "btn" + i;
			el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		});

		this.videoUI = new VideoUI();
		this.videoUI.y = 10;
		this.videoUI.horizontalCenter = 0;
		MAIN.addChild(this.videoUI);
	}

	private onClick(e: egret.TouchEvent) {
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
	}
}