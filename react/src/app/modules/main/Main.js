import React from 'react';
import { Button,Icon } from 'antd';
import { BaseView } from '@libs/BaseView';
import { HeaderView } from '../header/HeaderView';
import { HeaderAction } from '../header/HeaderAction';
import { observer, inject, Provider } from 'mobx-react';
import 'antd/dist/antd.css';


@inject('model','action')
@observer
export class Main extends BaseView{

	constructor(){
		super(...arguments);
		this.onClick = this.onClick.bind(this);
		this.headerAction = new HeaderAction(this.props.model);
	}

	onClick(){
		let {action} = this.props;
		action.toggleIcon();
	}

	render(){
		let {model}=this.props;
		return (
			<div>
				<Provider action={this.headerAction}>
					<HeaderView />
				</Provider>
				<Button type="primary" onClick={this.onClick}>Test</Button>
				{model.showIcon && <Icon type={model.icon} theme="filled" />}
			</div>
		);
	}

}