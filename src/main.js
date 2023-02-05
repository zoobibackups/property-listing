// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import wysiwyg from 'vue-wysiwyg'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import LightTimeline from 'vue-light-timeline'
import vue2editor from "vue2-editor";
import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'


import i18n from './i18n'

Vue.use(DynamicScroller, DynamicScrollerItem)
Vue.use(vue2editor)
Vue.use(LightTimeline)

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.use(wysiwyg, {})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
