import Server from './Server';
import minimist from 'minimist';

const argv = minimist(process.argv, {
    'default': {
        'config-server-port': 8889,
        'server-port': 8787
    }
});

const server = new Server(argv['server-port']);

server.setConnectionType('perfect');