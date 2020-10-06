"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  /**
   * Install plugin
   * @param app
   * @param axios
   */
  function plugin(app, axios) {
    if (plugin.installed) {
      return;
    }

    if (!axios) {
      console.error('You have to install axios');
      return;
    }

    plugin.installed = true;
    app.axios = axios;
    app.config.globalProperties.axios = axios;
    app.config.globalProperties.$http = axios;
  }

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object") {
    module.exports = plugin;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return plugin;
    });
  } else if (window.Vue && window.axios) {
    Vue.use(plugin, window.axios);
  }
})();