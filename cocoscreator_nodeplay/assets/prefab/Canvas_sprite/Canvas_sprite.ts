

const { ccclass, property } = cc._decorator;

@ccclass
export default class Canvas_sprite extends cc.Component {


	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	totalSharedTexture: cc.RenderTexture;
	spriteTotal: cc.Sprite;
	start() {
		this.creat_canvas();
		this.creat_video();
	}
	creat_canvas() {
		this.canvas = document.createElement('canvas');
		this.canvas.id = "c-" + Date.now()
		this.canvas.width = 200;
		this.canvas.height = 200;
		this.ctx = this.canvas.getContext("2d");
	}
	createLinearGradient() {
		// 创建渐变
		var grd = this.ctx.createLinearGradient(0, 0, 200, 0);
		var bg = ["red", "black", "yellow", "green", "orange", "violet"];
		var color = bg[Math.random() * bg.length << 0];
		grd.addColorStop(0, color);
		grd.addColorStop(1, "white");
		// 填充渐变
		this.ctx.fillStyle = grd;
		this.ctx.fillRect(0, 0, 150, 80);
	}
	creat_video() {
		this.totalSharedTexture = new cc.RenderTexture();
		//必须操作，否则readPixels返回null,且高度超过4096 ios崩溃
		this.totalSharedTexture.initWithSize(200, 200);
		this.totalSharedTexture.initWithElement(this.canvas);
		var spriteFrame = new cc.SpriteFrame(this.totalSharedTexture)
		this.spriteTotal = this.node.getComponent(cc.Sprite);
		this.spriteTotal.spriteFrame = spriteFrame;
		let data = this.totalSharedTexture.readPixels();//像素点数据
	}
	update(dt) {
		/**
		 * 经过测试内存不会溢出
		 */
		if (!!this.canvas) {
			this.createLinearGradient();
			this.creat_video();
		}
	}
}
