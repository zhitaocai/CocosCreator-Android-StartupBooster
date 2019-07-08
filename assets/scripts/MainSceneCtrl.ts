const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSceneCtrl extends cc.Component {
	@property(cc.Label)
	label: cc.Label = null;

	start() {
		cc.error("进入主场景");
	}
}
