# vue-axios
A small wrapper for integrating axios to Vuejs

## Support matrix

|VueJS \ VueAxios|1.x|2.x|3.x|
|-|-|-|-|
|1.x|&#10004;|&#10004;|&#10060;|
|2.x|&#10004;|&#10004;|&#10060;|
|3.x|&#10060;|&#10060;|&#10004;|

## How to install:
### ES6 Module:
```bash
npm install --save axios vue-axios
```

And in your entry file:
```js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

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
