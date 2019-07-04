import { BaseView } from '@libs/BaseView';
import { observer, inject } from 'mobx-react';
import React from 'react';
import { Button } from 'antd';

@inject('action')
@observer
export class HeaderView extends BaseView{

	constructor(){
		super(...arguments);
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		let {action} = this.props;
		
		action.toggleIcon();
	}

	render(){
		return (
			<div style={{height:'40px',backgroundColor:'#ccc'}}>
				<Button type="primary" onClick={this.onClick}>set icon</Button>
			</div>
		);
	}

}