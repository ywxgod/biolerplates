module.exports = (api) => ({
    plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            'component',
            {
                libraryName: 'element-ui',
                style: false
            }
        ]
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                // debug: true,
                corejs: '3.6',
                // caller.target will be the same as the target option from webpack
                targets: api.caller((caller) => caller && caller.target === 'node')
                    ? { node: 'current' }
                    : { chrome: '58', ie: '11' }
            }
        ]
    ]
});
