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

  if (app.version && app.version.split('.')[0] < 3) {
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
  } else if (app.version && app.version.split('.')[0] >= 3) {
    app.config.globalProperties.axios = axios;
    app.config.globalProperties.$http = axios;
  } else {
    console.error('Unknown Vue version');
    return;
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
