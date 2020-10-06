(function () {

/**
 * Install plugin
 * @param app
 * @param axios
 */

function plugin(app, axios) {
  if (plugin.installed) {
    return
  }

  if (!axios) {
    console.error('You have to install axios')
    return
  }

  plugin.installed = true;

  app.axios = axios;

  app.config.globalProperties.axios = axios;
  app.config.globalProperties.$http = axios;
}

if (typeof exports == "object") {
  module.exports = plugin
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return plugin })
} else if (window.Vue && window.axios) {
  Vue.use(plugin, window.axios)
}
})();
