import {OnInit} from 'angular2/core';
import {Page, Modal, NavController} from 'ionic-angular';
import {UserDAO} from '../../dao/user.dao.js';
import {ModalUserPage} from '../modal-user/modal-user';
import {UserService} from './user.service';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/user/user.html',
  providers: [UserService]
})

export class UserPage {

	static get parameters() {
		return [[NavController], [UserService]];
	}

	constructor(nav,userService) {
		this.dao = new UserDAO();
		this.userService = userService;
		this.nav = nav;

		this.userService.findAll().subscribe(
	        data => this.listUser = data
	    );
	}

	ngOnInit() {
        this.userService.findAll().subscribe(
            data => this.listUser = data
        );
    }

    list(){
    	this.userService.findAll().subscribe(
	        data => this.listUser = data
	    );
    }

	insert(){
		let modal = Modal.create(ModalUserPage);
		modal.onDismiss((data) => {
			this.userService.insert(data).subscribe();
			this.listUser.push(data);
		});
		this.nav.present(modal);
	}

	edit(event,user){
		let modal = Modal.create(ModalUserPage, { params: user });
		modal.onDismiss((data) => {
			this.userService.update(data).subscribe();
		});

		this.nav.present(modal);
	}

  delete(event, user){
    this.userService.delete(user).subscribe();
    let pos = this.listUser.indexOf(user);
    this.listUser.splice(pos,1);

  }
}
