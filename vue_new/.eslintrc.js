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
        'vue',
    ],
    rules: {
        strict: 0,
        indent: ["error", 4],
        'no-console': 0
    },
};
