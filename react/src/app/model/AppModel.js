import { BaseModel } from '@libs/BaseModel';
import { observable } from 'mobx';

export class AppModel extends BaseModel{

	@observable showIcon = false;
	@observable icon = 'setting';

}