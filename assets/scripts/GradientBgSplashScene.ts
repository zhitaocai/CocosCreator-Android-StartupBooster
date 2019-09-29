const { ccclass, property } = cc._decorator;

@ccclass
export default class BgSplashSceneCtrl extends cc.Component {
	@property({
		type: cc.Graphics,
		tooltip: "仅支持从上下平行渐变绘图组件"
	})
	graphics: cc.Graphics = null;

	@property(cc.Color)
	topColor: cc.Color = cc.Color.WHITE;

	@property(cc.Color)
	bottomColor: cc.Color = cc.Color.RED;

	onLoad() {
		let widget = this.graphics.getComponent(cc.Widget);
		if (widget) {
			widget.updateAlignment();
		}
		this.drawGradientBg();
	}

	drawGradientBg() {
		// 预乘
		let bottomColorR = this.bottomColor.getR() * (this.bottomColor.getA() / 255);
		let bottomColorG = this.bottomColor.getG() * (this.bottomColor.getA() / 255);
		let bottomColorB = this.bottomColor.getB() * (this.bottomColor.getA() / 255);

		let topColorR = this.topColor.getR() * (this.topColor.getA() / 255);
		let topColorG = this.topColor.getG() * (this.topColor.getA() / 255);
		let topColorB = this.topColor.getB() * (this.topColor.getA() / 255);

		// Graphics 组件的节点的锚点在（0，0），这里为从下往上一行一行绘制
		for (let curYPosition = 0; curYPosition < this.graphics.node.height; curYPosition++) {
			let bottomColorPercent = (this.graphics.node.height - curYPosition) / this.graphics.node.height;
			let topColorPercent = curYPosition / this.graphics.node.height;
			this.graphics.strokeColor = cc.color(
				Math.round(bottomColorR * bottomColorPercent + topColorR * topColorPercent),
				Math.round(bottomColorG * bottomColorPercent + topColorG * topColorPercent),
				Math.round(bottomColorB * bottomColorPercent + topColorB * topColorPercent)
			);

			this.graphics.moveTo(0, curYPosition);
			this.graphics.lineTo(this.graphics.node.width, curYPosition);
			this.graphics.stroke();
		}
	}

	start() {
		this.scheduleOnce(() => {
			this._hideNativeSplash();
		}, 1);
	}

	private _hideNativeSplash() {
		if (CC_JSB) {
			if (cc.sys.os == cc.sys.OS_ANDROID) {
				jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GradientBgSplashActivity", "hideSplash", "()V");
			}
		}
	}
}
