const entry = require('./entry');
const output = require('./output');
const rules = require('./rules');
const resolve = require('./resolve');
const plugins = require('./plugins');
const devServer = require('./devServer');
const optimization = require('./optimization');

const parseEnv = (env) => {
    const validEnvGroup = [
        'dev:mock', 'dev:dev', 'dev:test',
        'build:dev', 'build:test', 'build:prod',
        'deploy:dev', 'deploy:test', 'deploy:prod'
    ];
    const envGroup = validEnvGroup.find((i) => i === env);
    if (!envGroup) { throw new Error('无效的命令'); }
    return envGroup.split(':');
};

module.exports = ({ env, analyzer }) => {
    const [action, target] = parseEnv(env);
    const isDev = action === 'dev';

    const webpackConfig = {
        mode: action === isDev ? 'development' : 'production',
        entry: entry([action, target]),
        output: output([action, target]),
        module: { rules: rules([action, target]) },
        devServer: devServer([action, target]),
        plugins: plugins([action, target], analyzer),
        resolve: resolve([action, target]),
        stats: {
            entrypoints: false,
            children: false
        }
    };

    if (isDev) {
        webpackConfig.devtool = 'source-map';
    } else {
        webpackConfig.optimization = optimization([action, target]);
    }

    return webpackConfig;
};
