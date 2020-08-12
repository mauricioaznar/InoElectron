import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import MauVueComponents from 'mau-vue-components/src/main'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import MauPlugin from 'renderer/components/mau-components/mau-components-plugin'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateDictionary from 'renderer/api/functions/VeeValidateDictionary'
import VeeValidateCustomRules from 'renderer/api/functions/VeeValidateCustomRules'
Vue.use(Notifications)
Vue.use(MauPlugin)
Vue.use(BootstrapVue)
Vue.use(MauVueComponents)
Vue.use(VueResource)
Validator.extend('object_required', VeeValidateCustomRules.objectRequired)
Validator.extend('remote_unique', VeeValidateCustomRules.remoteUnique, {immediate: false})
Validator.extend('kilo_to_group', VeeValidateCustomRules.kiloToGroup)
Validator.extend('is_number_equal', VeeValidateCustomRules.isNumberEqual)
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  locale: 'es',
  dictionary: VeeValidateDictionary
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = true
Vue.config.devtools = true
Vue.http.options.root = (process.env.NODE_ENV === 'development') ? 'http://inoserver.test/api' : 'https://inoserver.grupoinopack.com/api'
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
