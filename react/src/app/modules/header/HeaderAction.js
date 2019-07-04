import { BaseAction } from '@libs/BaseAction';
import { action } from 'mobx';

export class HeaderAction extends BaseAction{

	@action
	toggleIcon(){
		let icon = this.store.icon;
		if(icon=='setting'){
			icon = 'book';
		}else{
			icon = 'setting';
		}
		this.store.icon = icon;
	}

}