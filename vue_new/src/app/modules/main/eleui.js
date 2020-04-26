import Vue from 'vue';

import {
    Button, Select, Tooltip, Main, Container, Aside, Footer, Header, Link
} from 'element-ui';

const uis = [
    Button, Select, Tooltip, Main, Container, Aside, Footer, Header, Link
];

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

uis.forEach((C) => Vue.use(C));

export default uis;
