import Vue from 'vue';

import {
    Button
} from 'element-ui';

const uis = [
    Button
];

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

uis.forEach((C) => Vue.use(C));

export default uis;
