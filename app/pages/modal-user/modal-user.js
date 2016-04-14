import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/modal-user/modal-user.html'
})
export class ModalUserPage {

	static get parameters() {
		return [[ViewController], [NavParams]];
	}
	constructor(view, params) {
		this.view = view;
		this.user = params.get("params") || { name: "" };
  }

	cancel(){
		this.view.dismiss();
	}

	save(){
		this.view.dismiss(this.user);
	}
}
