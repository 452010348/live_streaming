const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
	@property(cc.Prefab)
	video_Prefab=null;

	start() {
		cc.log(this.node);
		var node = cc.instantiate(this.video_Prefab) as cc.Node;
		var video = node.getComponent('video');
		cc.log( video.src)
		node.width = 400
		node.height = 300
		node.x = 200;
		this.node.addChild(node);
	}
	update(dt) {

	}
}
