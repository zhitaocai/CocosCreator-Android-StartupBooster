const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSceneCtrl extends cc.Component {
	onLoad() {
		cc.error("进入主场景");
	}
}
