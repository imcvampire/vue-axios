import axios from 'axios';
import { options } from './utils'

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  Vue.axios = axios

  Object.defineProperties(Vue.prototype, {

    axios: {
      get() {
        return options(Vue.axios, this, this.$options.axios);
      }
    },

  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
