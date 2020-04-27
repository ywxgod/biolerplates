/**
 *
 * wyin
 * 4/27 027
 *
 */
export default {
    namespaced: true,
    state: {
        userInfo: {
            userName: 'wyin'
        }
    },
    getters: {
        userInfo: (state) => state.userInfo,
        isLogin: (state) => state.userInfo && state.userInfo.userId
    },
    mutations: {
        setUserInfo: (state, value) => {
            state.userInfo = { ...state.userInfo, ...value };
        }
    },
    actions: {}
};
