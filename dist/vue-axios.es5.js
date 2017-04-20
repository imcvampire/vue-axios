"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

  /**
   * Install plugin
   * @param Vue
   * @param axios
   */

  function plugin(Vue, axios) {

    if (plugin.installed) {
      return;
    }
    plugin.installed = true;

    if (!axios) {
      console.error('You have to install axios');
      return;
    }

    Vue.axios = axios;

    Object.defineProperties(Vue.prototype, {

      axios: {
        get: function get() {
          return axios;
        }
      },

      $http: {
        get: function get() {
          return axios;
        }
      }

    });
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