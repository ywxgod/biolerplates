import Vue from 'vue';
import uis from './eleui';
import router from './router';
import App from './App';
import '@assets/index.scss';


Vue.prototype.$ELEMENT = {size: 'small'};
uis.forEach(C=>{
    Vue.use(C);
}); 

new Vue({
    el: '#app',
    router,
    components: {App},
    render(h){
        return h(App)
    }
});