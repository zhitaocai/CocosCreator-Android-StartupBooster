const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSceneCtrl extends cc.Component {
	onLoad() {
		cc.error("进入主场景");
	}

	start() {
		this.scheduleOnce(() => {
			this._hideNativeSplash();
		}, 1);
	}

	private _hideNativeSplash() {
		if (CC_JSB) {
			if (cc.sys.os == cc.sys.OS_ANDROID) {
				jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideSplash", "()V");
			}
		}
	}
}
