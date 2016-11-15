'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

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
   * @param axios
   */

  function plugin(Vue, axios) {

    if (plugin.installed) {
      return;
    }

    if (!axios) {
      console.error('You have to install axios');
      return;
    }

    Vue.axios = axios;

    Object.defineProperties(Vue.prototype, {

      axios: {
        get: function get() {
          return options(Vue.axios, this, this.$options.axios);
        }
      }

    });
  }

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == "object") {
    module.exports = plugin;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return plugin;
    });
  } else if (window.Vue && window.axios) {
    Vue.use(plugin, window.axios);
  }
})();