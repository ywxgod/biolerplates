const config = require('./config');
const entry = require('./entry');
const output = require('./output');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./devServer');

const parseEnv = (env) => {
    const validEnvGroup = [
        'dev:mock', 'dev:dev', 'dev:test',
        'build:dev', 'build:test', 'build:prod',
        'deploy:dev', 'deploy:test', 'deploy:prod',
    ];
    const envGroup = validEnvGroup.find((i) => i === env);
    if (!envGroup) { throw new Error('无效的命令'); }
    return envGroup.split(':');
};

module.exports = ({ env }) => {
    const [action, target] = parseEnv(env);

    const webpackConfig = {
        mode: action === 'dev' ? 'development' : 'production',
        entry: entry([action, target]),
        output: output([action, target]),
        module: { rules: rules([action, target]) },
        devServer: devServer([action, target]),
        plugins: plugins([action, target]),
    };

    return webpackConfig;
};
