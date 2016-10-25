'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  Vue.axios = _axios2.default;

  Object.defineProperties(Vue.prototype, {

    axios: {
      get: function get() {
        return (0, _utils.options)(Vue.axios, this, this.$options.axios);
      }
    }

  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;