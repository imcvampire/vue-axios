'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Copied from vue-resource
 */

var slice = [].slice;


function isFunction(val) {
  return typeof val === 'function';
}

var isArray = Array.isArray;

function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

function merge(target) {

  var args = slice.call(arguments, 1);

  args.forEach(function (source) {
    _merge(target, source, true);
  });

  return target;
}

function options(fn, obj, opts) {

  opts = opts || {};

  if (isFunction(opts)) {
    opts = opts.call(obj);
  }

  return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

/**
 * Install plugin
 * @param Vue
 */

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  Vue.axios = _axios2.default;

  Object.defineProperties(Vue.prototype, {

    axios: {
      get: function get() {
        return options(Vue.axios, this, this.$options.axios);
      }
    }

  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;