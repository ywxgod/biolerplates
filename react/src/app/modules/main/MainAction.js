import { BaseAction } from '@libs/BaseAction';
import { action } from 'mobx';

export class MainAction extends BaseAction{

	@action
	toggleIcon(){
		console.log(this.store);
		this.store.showIcon = !this.store.showIcon;
	}

}