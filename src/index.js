import semver from 'semver';

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

  if (semver.valid(app.version) == null) {
    console.error('Unknown vue version');
    return;
  }

  plugin.installed = true;

  if (semver.lt(app.version, '3.0.0')) {
    Object.defineProperties(app.prototype, {

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
  } else {
    app.config.globalProperties.axios = axios;
    app.config.globalProperties.$http = axios;
  }

  app.axios = axios;
  app.$http = axios;
}

if (typeof exports == "object") {
  module.exports = plugin;
} else if (typeof define == "function" && define.amd) {
  define([], function () { return plugin });
} else if (window.Vue && window.axios && window.Vue.use) { // Vue.use is only available in VueJS 2.0
  Vue.use(plugin, window.axios);
}

export default plugin;
