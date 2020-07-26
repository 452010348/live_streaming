/**
 * 视频加载类
 * 
 */

// var script = document.createElement('script');
// script.src = "NodePlayer-full-0.5.12-min.js";
// document.body.appendChild(script);

var nodePlayer;
var widths = 480;
var heights = 784;
class VideoUI extends eui.Component {
	_url = "http://127.0.0.1:8000/live/STREAM_NAME.flv";

	loadding_box: eui.Group;
	video_box: eui.Group;
	img_icon: eui.Image;
	timer: egret.Timer;
	isUpdate: Boolean;

	private shang: eui.Group;
	private zhong: eui.Group;
	private xia: eui.Group;
    /**
	 * 打赏按钮
	 */
	private reward_btn_group: eui.Group;

    /**
	 * 视频
	 */
	public bitmap: egret.Bitmap;
	// public nodePlayer: NodePlayer;
	public texture = null;

	public constructor() {
		super();
		this.skinName = "Video";
	}

	protected createChildren(): void {
		super.createChildren();
		// this.canvasStream = new CanvasStreame();
		this.init();
		// var pathMask = this.getMask();
		// this.addChild(pathMask);
		// this.mask = pathMask;
	}

	private getMask(): egret.Shape {
		let mask = new egret.Shape();
		mask.blendMode = egret.BlendMode.ERASE;
		mask.graphics.beginFill(0x0000ff);//黑色
		mask.graphics.drawRect(0, 0, this.width, this.height);
		mask.graphics.endFill();
		return mask;
	}
	init() {
		//白鹭小鸟不停旋转
		this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
		this.loadding_box.visible = true
		this.video_box.visible = false;
        /**
		 * 当前对象
		 */
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		
        this.videoInit();
	}
    /**
	 * 经过
	 */
	private onRollOver() {
		console.log("经过");
	}
    /**
	 * 移出
	 */
	private onRollOut() {
		console.log("移出");
	}

	loop(evt: egret.Event) {
		// this.img_icon.rotation += 10;
		// this.img_icon.rotation %= 360;
		this.setBitmapData && this.setBitmapData(0, 0, widths, heights, 0, 0);
	}

	close() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
	}

	/**
	 * 视频初始化 **************************************************************************
	 */
	private videoInit() {

		nodePlayer = new NodePlayer();
		nodePlayer.skipLoopFilter(32)
		nodePlayer.setVolume(0)
		nodePlayer.enableAudio(1);
		nodePlayer.setScaleMode(0);
		nodePlayer.setBufferTime(6e4);
		new nodePlayer.useMSE();
		var t = document.createElement("canvas") as any;
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
		nodePlayer.on('start', () => {
			console.log('NodePlayer on start');
			setTimeout(() => {
				this.loadding_box.visible = false
				this.video_box.visible = true;
			}, 3000)
		});
		nodePlayer.on('close', () => {
			console.log('NodePlayer on close');
			this.video_box.visible = false;
			this.loadding_box.visible = true;
			console.log("视屏close 重连中");
			this.play(this._url);

		});
		nodePlayer.on('error', (err) => {
			console.log('NodePlayer on error', err);
			this.video_box.visible = false;
			this.loadding_box.visible = true;
			// this.nodePlayerInit();
			this.play(this._url);
			console.log("视屏连接错误 重连中...");

		});
		nodePlayer.on('stop', (err) => {
			// console.log('NodePlayer on error', err);
			// this.video_box.visible = false;
			// this.loadding_box.visible = true;

			// this.play(this._url);
			// console.log("视屏连接错误 重连中...");
			console.log("视频stop");


		});
	}

    /**
	 * 视频
	 */
	play(_url?) {
		this.stop();
		this._url = _url;
		this.video_box.x = -500;
		this.video_box.y = -100;
		nodePlayer.start(this._url);
		// this.videoInit();
	}
	/**
	 * 设置流画布属性
	 */
	public setBitmapData(x = 0, y = 0, width = widths, height = heights, offsetX = 0, offsetY = 0) {
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
		} catch (error) {

		}
		if (!this.texture) {
			this.texture = new egret.BitmapData(document.getElementById("my_video_canvas")) as any;
			nodePlayer.resizeView(widths, heights);
		}
		this.texture.$bitmapData = this.texture;
		this.texture.$bitmapX = x;
		this.texture.$bitmapY = y;
		this.texture.$offsetX = offsetX;
		this.texture.$offsetY = offsetY;
		this.texture.$bitmapWidth = width;
		this.texture.$bitmapHeight = height;
		this.texture.$getTextureWidth = () => {
			return width;
		};
		this.texture.$getTextureHeight = () => {
			return height;
		};
		this.texture.$sourceWidth = width;
		this.texture.$sourceHeight = height;
		try {
			this.bitmap.texture = this.texture;
		} catch (error) {

		}

		// if (PLACE == 2) {
		// 	Video2.setBitmapDataFun(450, 330, widths * 0.5, heights * 0.5, 0, 0);
		// }

	}

	/**
     * 清除 停止流
     */
	public stop() {
		try {
			nodePlayer.stop();
			if (this.texture) {
				// 必须调用此函数,要不然内存泄漏导致视频卡顿
				this.texture.$dispose();
				this.texture = null;
			}
		} catch (error) {

		}
	}



	public onRemove(e: egret.Event) {
		this.stop();
		this.close();
		// this.reward_btn_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		// this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
}