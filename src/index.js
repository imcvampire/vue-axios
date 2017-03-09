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

  if (!axios) {
    console.error('You have to install axios')
    return
  }

  Vue.axios = axios

  Object.defineProperties(Vue.prototype, {

    axios: {
      get() {
        return axios;
      }
    },

    $http: {
      get() {
        return axios;
      }
    }

  });
}

if (typeof exports == "object") {
  module.exports = plugin;
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return plugin });
} else if (window.Vue && window.axios) {
  Vue.use(plugin, window.axios);
}

})();
