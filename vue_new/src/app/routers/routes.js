import App from '../modules/main/App.vue';

export default [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: App
    },
    {
        path: '/login',
        name: 'login',
        component: {
            template: '<div>login</div>'
        }
    },
    {
        path: '/error',
        name: 'error',
        component: {
            template: '<div>Error</div>'
        }
    },
    {
        path: '*',
        redirect: '/error'
    }
];
