/**
 * Install plugin
 * @param app
 * @param {axios|Record<string:axios>}options
 */
function plugin(app, options) {
  if (app.vueAxiosInstalled) {
    return
  }

  const normalizedConfig = isAxiosLike(options) ? migrateToMultipleInstances(options) : options;
  if (!isValidConfig(normalizedConfig)) {
    console.error('[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }');
    return;
  }

  const vueVersion = getVueVersion(app);
  if (!vueVersion) {
    console.error('[vue-axios] unknown Vue version');
    return;
  }
  const handler = vueVersion < 3 ? registerOnVue2 : registerOnVue3;
  Object.keys(normalizedConfig).forEach(registrationKey => {
    handler(app, registrationKey, normalizedConfig[registrationKey])
  })
  
  app.vueAxiosInstalled = true;
}

if (typeof exports == "object") {
  module.exports = plugin;
} else if (typeof define == "function" && define.amd) {
  define([], function () { return plugin });
} else if (window.Vue && window.axios && window.Vue.use) { // Vue.use is only available in VueJS 2.0
  Vue.use(plugin, window.axios);
}

export default plugin;

/**
 * @param {Vue} app
 * @param {string} key
 * @param {axios} axiosInstance
 * @returns {void}
 */
function registerOnVue2(app, key, axiosInstance) {
  Object.defineProperty(app.prototype, key, {
    get() {
      return axiosInstance
    }
  })
  app[key] = axiosInstance;
}

/**
 * @param {Vue} app
 * @param {string} key
 * @param {axios} axiosInstance
 * @returns {void}
 */
function registerOnVue3(app, key, axiosInstance) {
  app.config.globalProperties[key] = axiosInstance;
  app[key] = axiosInstance;
}

/**
 * @param {axios|Record<string|axios>}obj
 * @returns {boolean}
 */
function isAxiosLike(obj) {
  return obj && typeof obj.get === 'function' && typeof obj.post === 'function'
}

/**
 * Migrates previous configuration to support multiple instances
 * @param axiosInstance
 * @returns {Record<string, axios>}
 */
function migrateToMultipleInstances(axiosInstance) {
  return {
    axios: axiosInstance,
    $http: axiosInstance,
  }
}

function isValidConfig(config) {
  if (typeof config !== 'object') return false
  return Object.keys(config).every(key => isAxiosLike(config[key]))
}

/**
 * Return Vue version as a number
 * @param {Vue} app
 * @returns {?number}
 */
function getVueVersion (app) {
  return app && app.version && Number(app.version.split('.')[0])
}
