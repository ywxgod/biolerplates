const MainView = ()=>import('@app/modules/main/MainView');

let beforeEnter = (to,from,next)=>{
    if((!from.name)){
        next({path:'/'});
        console.log('aaa');
        return;
    }
    next();
};

export const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView,
        children: []
    }
];