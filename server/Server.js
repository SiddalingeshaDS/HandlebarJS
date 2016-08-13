import express from 'express';
import zlib from 'zlib';
import fs from 'fs';
import os from 'os';
import compression from 'compression';
import {Server as WebSocketServer} from 'ws';
import http from 'http';
import url from 'url';
import net from 'net';
import Throttle from 'throttle';
import random from 'lodash/number/random';
import indexTemplate from './templates/index';


const compressor = compression({
    flush : zlib.Z_PARTIAL_FLUSH
});

const appServerPath = os.platform() == 'win32' ? 
      '\\\\.\\pipe\\offlinefirst' + Date.now() + '.sock' : 
      'offlinefirst.sock';

const connectionProperties = {
    perfect: {bps: 100000000, delay: 0},
    slow: {bps: 4000, delay: 3000},
    'lie-fi': {bps: 1, delay: 10000}
};

export default class Server {
    constructor(port){
        this._app = express();
        this._sockets = [];
        this._serverUp = false;
        this._appServerUp = false;
        this._port = port;
        this._connectionType = '';
        this._connections = [];
        
        this._appServer = http.createServer(this._app);
        this._exposedServer = net.createServer();
        
        this._wss = new WebSocketServer({
            server: this._appServer,
            path: '/updates'
        });
        
        const staticOptions = {
            maxAge: 0
        };
        
        this._exposedServer.on('connection', socket =>
        this._onServerConnection(socket));
        this._wss.on('connection', ws=> this._onWsConnection(ws));
        this._app.use(compressor);
        this._app.use('/js',express.static('../public/js',staticOptions));
        this._app.use('/css',express.static('../public/css',staticOptions));
        this._app.use('/imgs',express.static('../public/imgs',staticOptions));
        this._app.use('/sw.js',express.static('../public/sw.js',staticOptions));
        this._app.use('/sw.js.map',express.static('../public/sw.js.map',staticOptions));
        this._app.use('/manifest.json',express.static('../public/manifest.json',staticOptions));
        
        this._app.get('/',(req,res) => {
           res.send(indexTemplate({
               scripts: '<script src="/js/main.js" defer></script>',
               content: '<h1>Hello World!</h1>'
           })); 
        });
    }
    
    _onServerConnection(scoket){
        let closed = false;
        this._connections.push(socket);
        
        socket.on('close', _ => {
            closed = true;
            this._connections.splice(this._connections.indexOf(socket), 1);
        });
        
        socket.on('error', err=> console.log(err));
        
        const connection = connectionProperties[this._connectionType];
        const makeConnection = _ => {
            if(closed) return;
            const appSocket = net.connect(appServerPath);
            appSocket.on('error', err=> console.log(err));
            socket.pipe(new Throttle(connection.bps)).pipe(appSocket);
            appSocket.pipe(new Throttle(connection.bps)).pipe(socket);
        };
        
        if(connection.delay){
            setTimeout(makeConnection, connection.delay);
            return;
        }
        makeConnection();
    }
    
    _listen(){
        this.serverUp = true;
        this._exposedServer.listen(this._port, _=> {
            console.log("Server listening at localhost:" + this._port);
        });
        
        if(!this._appServerUp){
            if(fs.existsSync(appServerPath)) fs.unlinkSync(appServerPath);
            this._appServer.listen(appServerPath);
            this._appServerUp = true;
        }
    }
    
    _destroyConnections(){
        this._connections.forEach(c => c.destroy());
    }
    
    setConnectionType(type){
        if(type === this._connectionType) return;
        this._connectionType = type;
        this._destroyConnections();
        
        if(type === 'offline'){
            if(!this._serverUp) return;
            this._exposedServer.close();
            this._serverUp = false;
            return;
        }
        
        if(!this._serverUp){
            this._listen;
        }
    }
}