import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueLayers from 'vuelayers'
import App from './App.vue'

Vue.config.productionTip = false

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vuelayers/lib/style.css'

Vue.use(VueMaterial)
Vue.use(VueLayers)

new Vue({
  render: h => h(App),
}).$mount('#app')
