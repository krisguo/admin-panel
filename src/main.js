/* Vue */
import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

/* App sass */
import './assets/style/app.scss'

/* App component */
import App from './components/App/App.vue'

import moment from 'moment'
import { Sdk } from '@/sdk'

/* Vue plugins */
import Auth from './auth'
import api from './api'
import params from './config'
import VeeValidate, { Validator } from 'vee-validate'

/* Vue filters */

import {
  filterDateWithTime,
  localizeIssuanceRequestState,
  adminSignerType,
  cropAddress,
  roleIdToString,
  assetTypeToString,
  lowerCase,
  formatVersion,
} from './components/App/filters/filters'

/* Logger module */

import log from 'loglevel'
Vue.use(VueResource)

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
  Vue.config.productionTip = false
}

Object.isEmpty = function (obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }

  return JSON.stringify(obj) === JSON.stringify({})
}

/* Create and Mount our Vue instance */
new Vue({
  components: { App },
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.vue = this
  },
  router,
  store,
  template: '<App/>',
}).$mount('#app')

Validator.installDateTimeValidators(moment)
Validator.extend('accountId', {
  getMessage: field => 'The ' + field + ' invalid.',
  validate: value => Sdk.base.Keypair.isValidPublicKey(value),
})

Vue.use(Auth)
Vue.use(params)
Vue.use(VeeValidate)
Vue.use(api)

Vue.filter('dateTime', filterDateWithTime)
Vue.filter('localizeIssuanceRequestState', localizeIssuanceRequestState)
Vue.filter('adminSignerType', adminSignerType)
Vue.filter('cropAddress', cropAddress)
Vue.filter('roleIdToString', roleIdToString)
Vue.filter('assetTypeToString', assetTypeToString)
Vue.filter('lowerCase', lowerCase)
Vue.filter('formatVersion', formatVersion)
log.setDefaultLevel(params.LOG_LEVEL)
