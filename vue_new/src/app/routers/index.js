import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '../store';
import 'nprogress/nprogress.css';
import routes from './routes';

Vue.use(VueRouter);
NProgress.configure({ showSpinner: false });


const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const isLogin = store.getters['user/isLogin'];
        if (!isLogin) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
