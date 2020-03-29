// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import store from './store'
// import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import vuemoment from "vue-momentjs"

import 'vuetify/dist/vuetify.min.css'

// Vue.use(Vuetify)
moment.locale('ko')

Vue.use(vuemoment,moment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  components: { App },
  store,
  template: '<App/>'
})
