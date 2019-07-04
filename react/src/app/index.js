import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from '@app/modules/main/Main';
import { MainAction } from '@app/modules/main/MainAction';
import { AppModel } from '@app/model/AppModel';
import { Provider, observer, inject } from 'mobx-react';

const appModel = new AppModel();
const mainAction = new MainAction(appModel);

ReactDOM.render((
	<Provider model={appModel} action={mainAction}>
		<Main />
	</Provider>
), document.getElementById('app'));