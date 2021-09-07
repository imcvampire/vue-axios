import { createApp } from 'vue'
import Vueaxios from '../../../dist/vue-axios.esm.min'
import axios from 'axios'
createApp(App).use(Vueaxios, axios).mount('#app')
