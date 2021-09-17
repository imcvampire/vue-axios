# vue-axios

[![npm version](https://img.shields.io/npm/v/vue-axios.svg?style=flat-square)](https://www.npmjs.org/package/vue-axios)
[![install size](https://packagephobia.now.sh/badge?p=vue-axios)](https://packagephobia.now.sh/result?p=vue-axios)
[![npm downloads](https://img.shields.io/npm/dm/vue-axios.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vue-axios)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/vue-axios/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-axios)
[![License](https://img.shields.io/npm/l/vue-axios.svg)](https://www.npmjs.com/package/vue-axios)

A small wrapper for integrating axios to Vuejs

## Why 

I created this library because, in the past, I needed a simple solution to migrate from `vue-resource` to `axios`.

It only binds axios to the `vue` instance so you don't have to import everytime you use `axios`.

## Support matrix

| VueJS \ VueAxios | 1.x      | 2.x      | 3.x      |
| ---------------- | -------- | -------- | -------- |
| 1.x              | &#10004; | &#10004; | &#10004; |
| 2.x              | &#10004; | &#10004; | &#10004; |
| 3.x              | &#10060; | &#10060; | &#10004; |

## How to install:
### ES6 Module:
```bash
npm install --save axios vue-axios
```
Import libraries in entry file:
```js
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
```

Usage in Vue 2:
```js
Vue.use(VueAxios, axios)
```

Usage in Vue 3:
```js
const app = Vue.createApp(...)
app.use(VueAxios, axios)
```

### Script:
Just add 3 scripts in order: `vue`, `axios` and `vue-axios` to your `document`.

## Usage:

### in Vue 2

This wrapper bind `axios` to `Vue` or `this` if you're using single file component.

You can use `axios` like this:
```js
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

### in Vue 3

This wrapper bind `axios` to `app` instance or `this` if you're using single file component.

in option API, you can use `axios` like this:

```js
// App.vue
export default {
  name: 'App',
  methods: {
    getList() {
      this.axios.get(api).then((response) => {
        console.log(response.data)
      })
      // or
      this.$http.get(api).then((response) => {
        console.log(response.data)
      })
    }
  }
}
```

however, in composition API `setup` we can't use `this`, you should use `provide` API to share the globally instance properties first, then use `inject` API to inject `axios` to `setup`:

```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.mount('#app')

// App.vue
import { inject } from 'vue'

export default {
  name: 'Comp',
  setup() {
    const axios: any = inject('axios')  // inject axios

    const getList = (): void => {
      axios
        .get(api)
        .then((response: { data: any }) => {
          console.log(response.data)
        });
    };

    return { getList }
  }
}
```

Please kindly check full documention of [axios](https://github.com/axios/axios) too 
