# vue-axios
A small wrapper for integrating axios to Vuejs

## How to install:
### CommonJS:
```bash
npm install --save axios vue-axios
```

And in your entry file:
```js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

### Script:
Just add 3 scripts in order: `vue`, `axios` and `vue-axios` to your `document`.

## Usage:
This wrapper bind `axios` to `Vue` or `this` if you're using single file component.

You can `axios` like this:
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
