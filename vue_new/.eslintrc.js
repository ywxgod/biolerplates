const path = require('path');

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'vue'
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@assets', './assets']
                ],
            }
        }
    },
    rules: {
        strict: 0,
        indent: ["error", 4],
        "comma-dangle": ["error", "never"],
        'no-console': 0,
        'import/no-unresolved': 2
    },
};
