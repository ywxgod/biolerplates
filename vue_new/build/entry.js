const config = require('./config');

module.exports = ([action, target]) => ({
    app: config.entry
});
