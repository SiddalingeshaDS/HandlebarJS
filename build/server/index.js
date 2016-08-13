'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Server = require('./Server');

var _Server2 = _interopRequireDefault(_Server);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var argv = (0, _minimist2['default'])(process.argv, {
    'default': {
        'config-server-port': 8889,
        'server-port': 8787
    }
});

var server = new _Server2['default'](argv['server-port']);

server.setConnectionType('perfect');
//# sourceMappingURL=index.js.map
