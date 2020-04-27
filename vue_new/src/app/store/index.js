import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

// eslint-disable-next-line no-undef
const debug = $$_ENV[0] !== 'build';

const store = new Vuex.Store({
    modules: {
        user
    },
    strict: debug
});

export default store;
