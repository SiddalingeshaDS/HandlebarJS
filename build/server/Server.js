'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _ws = require('ws');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _throttle = require('throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _lodashNumberRandom = require('lodash/number/random');

var _lodashNumberRandom2 = _interopRequireDefault(_lodashNumberRandom);

var _templatesIndex = require('./templates/index');

var _templatesIndex2 = _interopRequireDefault(_templatesIndex);

var _templatesHomeContent = require('./templates/homeContent');

var _templatesHomeContent2 = _interopRequireDefault(_templatesHomeContent);

var _templatesTopNavbar = require('./templates/topNavbar');

var _templatesTopNavbar2 = _interopRequireDefault(_templatesTopNavbar);

var _templatesMainNavbar = require('./templates/mainNavbar');

var _templatesMainNavbar2 = _interopRequireDefault(_templatesMainNavbar);

var _templatesHeroSlider = require('./templates/heroSlider');

var _templatesHeroSlider2 = _interopRequireDefault(_templatesHeroSlider);

var _templatesFeatured = require('./templates/featured');

var _templatesFeatured2 = _interopRequireDefault(_templatesFeatured);

var _templatesFeaturedTile = require('./templates/featuredTile');

var _templatesFeaturedTile2 = _interopRequireDefault(_templatesFeaturedTile);

var _templatesInfoSlider = require('./templates/infoSlider');

var _templatesInfoSlider2 = _interopRequireDefault(_templatesInfoSlider);

var _templatesContact = require('./templates/contact');

var _templatesContact2 = _interopRequireDefault(_templatesContact);

var _templatesSitemap = require('./templates/sitemap');

var _templatesSitemap2 = _interopRequireDefault(_templatesSitemap);

var _templatesFooter = require('./templates/footer');

var _templatesFooter2 = _interopRequireDefault(_templatesFooter);

var _templatesMedia = require('./templates/media');

var _templatesMedia2 = _interopRequireDefault(_templatesMedia);

var _templatesScripts = require('./templates/scripts');

var _templatesScripts2 = _interopRequireDefault(_templatesScripts);

var _templatesStyles = require('./templates/styles');

var _templatesStyles2 = _interopRequireDefault(_templatesStyles);

var compressor = (0, _compression2['default'])({
    flush: _zlib2['default'].Z_PARTIAL_FLUSH
});

var appServerPath = _os2['default'].platform() == 'win32' ? '\\\\.\\pipe\\offlinefirst' + Date.now() + '.sock' : 'offlinefirst.sock';

var connectionProperties = {
    perfect: { bps: 100000000, delay: 0 },
    slow: { bps: 4000, delay: 3000 },
    'lie-fi': { bps: 1, delay: 10000 }
};

var Server = (function () {
    function Server(port) {
        var _this = this;

        _classCallCheck(this, Server);

        this._app = (0, _express2['default'])();
        this._sockets = [];
        this._serverUp = false;
        this._appServerUp = false;
        this._port = port;
        this._connectionType = '';
        this._connections = [];
        this._featuredList = [{ content: 'TEST1' }, { content: 'TEST2' }];

        this._appServer = _http2['default'].createServer(this._app);
        this._exposedServer = _net2['default'].createServer();

        this._wss = new _ws.Server({
            server: this._appServer,
            path: '/updates'
        });

        var staticOptions = {
            maxAge: 0
        };

        this._exposedServer.on('connection', function (socket) {
            return _this._onServerConnection(socket);
        });
        this._wss.on('connection', function (ws) {
            return _this._onWsConnection(ws);
        });
        this._app.use(compressor);
        this._app.use('/js', _express2['default']['static']('../public/js', staticOptions));
        this._app.use('/css', _express2['default']['static']('../public/css', staticOptions));
        this._app.use('/imgs', _express2['default']['static']('../public/imgs', staticOptions));
        this._app.use('/sw.js', _express2['default']['static']('../public/sw.js', staticOptions));
        this._app.use('/sw.js.map', _express2['default']['static']('../public/sw.js.map', staticOptions));
        this._app.use('/manifest.json', _express2['default']['static']('../public/manifest.json', staticOptions));

        this._app.get('/', function (req, res) {
            res.send((0, _templatesIndex2['default'])({
                scripts: (0, _templatesScripts2['default'])(),
                extraCss: (0, _templatesStyles2['default'])(),
                topNavbar: (0, _templatesTopNavbar2['default'])(),
                mainNavbar: (0, _templatesMainNavbar2['default'])(),
                content: (0, _templatesHomeContent2['default'])({
                    slider: (0, _templatesHeroSlider2['default'])(),
                    featured: (0, _templatesFeatured2['default'])({
                        tiles: _this._featuredList.map(function (content) {
                            return (0, _templatesFeaturedTile2['default'])(content);
                        }).join('')
                    }),
                    infoSlider: (0, _templatesInfoSlider2['default'])(),
                    contact: (0, _templatesContact2['default'])()
                }),
                sitemap: (0, _templatesSitemap2['default'])(),
                footer: (0, _templatesFooter2['default'])(),
                media: (0, _templatesMedia2['default'])()
            }));
        });

        this._app.get('/skeleton', function (req, res) {
            res.send((0, _templatesIndex2['default'])({

                scripts: (0, _templatesScripts2['default'])(),
                extraCss: (0, _templatesStyles2['default'])(),
                topNavbar: (0, _templatesTopNavbar2['default'])(),
                mainNavbar: (0, _templatesMainNavbar2['default'])(),
                content: 'MAIN CONTENT',
                sitemap: (0, _templatesSitemap2['default'])(),
                footer: (0, _templatesFooter2['default'])(),
                media: (0, _templatesMedia2['default'])()
            }));
        });

        this._app.get('/photos/:img', function (req, res) {
            res.sendFile('imgs/test.jpeg', {
                root: __dirname + '/../public/'
            });
        });
    }

    _createClass(Server, [{
        key: '_onServerConnection',
        value: function _onServerConnection(socket) {
            var _this2 = this;

            var closed = false;
            this._connections.push(socket);

            socket.on('close', function (_) {
                closed = true;
                _this2._connections.splice(_this2._connections.indexOf(socket), 1);
            });

            socket.on('error', function (err) {
                return console.log(err);
            });

            var connection = connectionProperties[this._connectionType];
            var makeConnection = function makeConnection(_) {
                if (closed) return;
                var appSocket = _net2['default'].connect(appServerPath);
                appSocket.on('error', function (err) {
                    return console.log(err);
                });
                socket.pipe(new _throttle2['default'](connection.bps)).pipe(appSocket);
                appSocket.pipe(new _throttle2['default'](connection.bps)).pipe(socket);
            };

            if (connection.delay) {
                setTimeout(makeConnection, connection.delay);
                return;
            }
            makeConnection();
        }
    }, {
        key: '_listen',
        value: function _listen() {
            var _this3 = this;

            this.serverUp = true;
            this._exposedServer.listen(this._port, function (_) {
                console.log("Server listening at localhost:" + _this3._port);
            });

            if (!this._appServerUp) {
                if (_fs2['default'].existsSync(appServerPath)) _fs2['default'].unlinkSync(appServerPath);
                this._appServer.listen(appServerPath);
                this._appServerUp = true;
            }
        }
    }, {
        key: '_destroyConnections',
        value: function _destroyConnections() {
            this._connections.forEach(function (c) {
                return c.destroy();
            });
        }
    }, {
        key: 'setConnectionType',
        value: function setConnectionType(type) {
            if (type === this._connectionType) return;
            this._connectionType = type;
            this._destroyConnections();

            if (type === 'offline') {
                if (!this._serverUp) return;
                this._exposedServer.close();
                this._serverUp = false;
                return;
            }
            if (!this._serverUp) {
                this._listen();
            }
        }
    }]);

    return Server;
})();

exports['default'] = Server;
module.exports = exports['default'];
//# sourceMappingURL=Server.js.map
