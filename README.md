# vue-axios
A small wrapper for integrating axios to Vuejs

## Why 

I created this library because, in the past, I need a simple solution to migrate from `vue-resource` to `axios`.

It only has a small benefit that it binds axios to the `vue` instance so you don't have to import everytime you use `axios`.

## Support matrix

|VueJS \ VueAxios|1.x|2.x|3.x|
|-|-|-|-|
|1.x|&#10004;|&#10004;|&#10004;|
|2.x|&#10004;|&#10004;|&#10004;|
|3.x|&#10060;|&#10060;|&#10004;|

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

Please kindly check full documention of [axios](https://github.com/axios/axios) too 
