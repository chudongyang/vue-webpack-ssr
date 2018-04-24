import Vue from 'vue'
import App from './App.vue'

import './assets/css/reset.styl'
import './assets/css/base.css'

var root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
