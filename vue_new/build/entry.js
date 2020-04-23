const config = require('./config');

module.exports = ([action, target]) => {
    return {
        app: config.entry
    };
};