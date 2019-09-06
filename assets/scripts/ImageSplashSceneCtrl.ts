const { ccclass, property } = cc._decorator;

@ccclass
export default class ImageSplashSceneCtrl extends cc.Component {
	@property(cc.Label)
	titleLabel: cc.Label = null;

	@property(cc.ProgressBar)
	progressBar: cc.ProgressBar = null;

	start() {
		this.progressBar.progress = 0;
		this.scheduleOnce(() => {
			this._hideNativeSplash();
			this._simulateLoading();
			this._playTitleAnim();
		}, 1);
	}

	private _hideNativeSplash() {
		if (CC_JSB) {
			if (cc.sys.os == cc.sys.OS_ANDROID) {
				jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImageSplashActivity", "hideSplash", "()V");
			}
		}
	}

	private _playTitleAnim() {
		this.titleLabel.node.runAction(
			cc.repeatForever(
				cc.sequence(
					cc.scaleTo(0.8, 1.2).easing(cc.easeCircleActionOut()),
					cc.scaleTo(0.8, 1).easing(cc.easeCircleActionIn())
				)
			)
		);
	}

	private isStartLoaded = false;

	private _simulateLoading() {
		this.isStartLoaded = true;
	}

	update(dt) {
		if (this.isStartLoaded && this.progressBar.progress <= 1) {
			this.progressBar.progress += 0.002;
		}
	}
}
