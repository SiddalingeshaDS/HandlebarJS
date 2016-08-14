(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = IndexController;

function IndexController(container) {
  this._container = container;
  this._registerServiceWorker();
  //  this._cleanImageCache();

  var indexController = this;

  setInterval(function () {
    indexController._cleanImageCache();
  }, 1000 * 60 * 5);
}

IndexController.prototype._registerServiceWorker = function () {
  if (!navigator.serviceWorker) return;

  var indexController = this;

  navigator.serviceWorker.register('./sw.js').then(function (reg) {
    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      indexController._updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      indexController._trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', function () {
      indexController._trackInstalling(reg.installing);
    });
  });

  // Ensure refresh is only called once.
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
};

IndexController.prototype._trackInstalling = function (worker) {
  var indexController = this;
  worker.addEventListener('statechange', function () {
    if (worker.state == 'installed') {
      indexController._updateReady(worker);
    }
  });
};

IndexController.prototype._updateReady = function (worker) {
  worker.postMessage({ action: 'skipWaiting' });
};
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsLoadScripts = require('../utils/loadScripts');

var _utilsLoadScripts2 = _interopRequireDefault(_utilsLoadScripts);

var _IndexController = require('./IndexController');

var _IndexController2 = _interopRequireDefault(_IndexController);

var polyfillsNeeded = [];

if (!('Promise' in self)) polyfillsNeeded.push('/js/polyfills/promise.js');

try {
  new URL('b', 'http://a');
} catch (e) {
  polyfillsNeeded.push('/js/polyfills/url.js');
}

(0, _utilsLoadScripts2['default'])(polyfillsNeeded, function () {
  new _IndexController2['default'](document.querySelector('.main'));
});

},{"../utils/loadScripts":3,"./IndexController":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = loadScripts;

function loadScripts(urls, success, failure) {
  var count = urls.length;
  var errored = false;

  if (urls.length == 0) return success();

  urls.forEach(function (url) {
    var script = document.createElement('script');
    script.onload = function () {
      if (errored) return;
      if (! --count) success();
    };
    script.onerror = function () {
      if (errored) return;
      failure();
      errored = true;
    };
    script.src = url;
    document.head.insertBefore(script, document.head.firstChild);
  });
}

;
module.exports = exports['default'];

},{}]},{},[2])


//# sourceMappingURL=main.js.map
