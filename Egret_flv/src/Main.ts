//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

var script = document.createElement('script');
script.src = "flv.min.js";
document.body.appendChild(script);

class Main extends eui.UILayer {
	protected createChildren(): void {
		super.createChildren();

		egret.lifecycle.addLifecycleListener((context) => {
			// custom lifecycle plugin
		})

		egret.lifecycle.onPause = () => {
			// egret.ticker.pause();
		}

		egret.lifecycle.onResume = () => {
			// egret.ticker.resume();
		}

		//inject the custom material parser
		//注入自定义的素材解析器
		let assetAdapter = new AssetAdapter();
		egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
		this.runGame().catch(e => {
			console.log(e);
		})
	}

	private async runGame() {
		await this.loadResource()
		this.createGameScene();
		const result = await RES.getResAsync("description_json")

		await platform.login();
		const userInfo = await platform.getUserInfo();
		console.log(userInfo);
	}
	private async loadResource() {
		try {
			const loadingView = new LoadingUI();
			this.stage.addChild(loadingView);
			await RES.loadConfig("resource/default.res.json", "resource/");
			await this.loadTheme();
			await RES.loadGroup("preload", 0, loadingView);
			this.stage.removeChild(loadingView);
		}
		catch (e) {
			console.error(e);
		}
	}

	private loadTheme() {
		return new Promise((resolve, reject) => {
			// load skin theme configuration file, you can manually modify the file. And replace the default skin.
			//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, () => {
				resolve();
			}, this);

		})
	}
	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
	 */
	private createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}



	/**
	* 视频位图
	*/
	public bitmap: egret.Bitmap;
	public texture = null;
	private _canvasTag;
	private canvas = null;
	private ctx;
	private video;
	private video_box: eui.Group;

	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected createGameScene(): void {
		//代码加入背景
		let sky = this.createBitmapByName("bg_jpg");
		this.addChild(sky);

		//存放视频的容器
		this.video_box = new eui.Group();
		this.addChild(this.video_box);

		//视频加载播放按钮
		var button = new eui.Button();
		button.y = 650;
		button.label = "播放";
		button.horizontalCenter = 0;
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
		this.addChild(button);

	}







	private onPlay() {
		if (!this.bitmap) {
			this.bitmap = new egret.Bitmap();
			this.video_box.addChild(this.bitmap);
			this.bitmap.x = 80;
			this.bitmap.y = 10;
			this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);

			this.video = document.createElement("video")
			this._canvasTag = flvjs.createPlayer({
				type: "flv",
				isLive: !0,
				hasVideo: !0,
                url: "https://tw.004cdn.com/obs/011.flv"
				//url: "http://127.0.0.1:8000/live/STREAM_NAME.flv"
			});
			this._canvasTag.attachMediaElement(this.video);
			this._canvasTag.load(); //加载
			this.video.play();
			// document.body.appendChild(this.video);
			var canvas = document.createElement('canvas');
			canvas.width = 480;
			canvas.height = 784;
			this.ctx = canvas.getContext('2d');
			// n.parentNode.replaceChild(canvas, n);
			this.canvas = canvas;
			// setInterval(e => {
			//     this.ctx.drawImage(this.video, 0, 0, 300, 300);
			// }, 100);
			// document.body.appendChild(canvas);
		}

	}
	/**
	 * 核心更新位图纹理
	 */
	private updataVideo(x = 0, y = 0, width = 480, height = 784, offsetX = 0, offsetY = 0) {
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
			// this.bitmap.x = 0;
			// this.bitmap.y = 0;
			this.bitmap.width = width;
			this.bitmap.height = height;
		} catch (error) {

		}
		if (!this.texture) {
			// 如果这里使用 this.video 则不能控制大小
			//  this.texture = new egret.BitmapData(this.video) as any;

			this.texture = new egret.BitmapData(this.canvas) as any;
			// nodePlayer.resizeView(widths, heights);
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
	}
	private loop() {
		this.updataVideo(0, 0, 480, 784, 0, 0);
		this.ctx.drawImage(this.video, 0, 0, 480, 784);
	}

}
