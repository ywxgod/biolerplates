
const getBrowserTargets = browserlist => {
    let targets = 'defaults';
    switch (browserlist) {
        case 'legacy':
            targets = 'IE 8';
            break;
        case 'modern':
            targets = '> 1% # Browser usage over 1%';
            break;
        case 'chrome':
            targets = 'last 2 Chrome versions';
            break;
    }
    console.log('targets: ', targets);
    return targets;
};

module.exports = api => {
    return {
        plugins: [
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-optional-chaining",
            ['@babel/plugin-transform-runtime', {
                "version": "^7.16.3",
                "corejs": 3
            }]
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    // debug: true,
                    corejs: { version: "3", proposals: true },
                    // caller.target 等于 webpack 配置的 target 选项
                    targets: api.caller(caller => caller && caller.target === "node")
                        ? { node: "current" }
                        : getBrowserTargets(process.env.BROWSERSLIST_ENV)
                }
            ]
        ]
    }
}
