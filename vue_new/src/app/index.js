// app entry
import Vue from 'vue';
import VMec from 'v-mec';
import store from './store';
import router from './routers';
import './modules/main/eleui';

import App from './modules/main/App.vue';
import '@assets/index.scss';

// eslint-disable-next-line no-unused-expressions
// import(/* webpackChunkName: "app_sync_style" */ '@assets/index.scss');

Vue.config.devtools = false;

Vue.use(VMec);

new Vue({
    el: '#app',
    store,
    router,
    component: { App },
    render: (h) => h(App)
});
