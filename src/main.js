// vue
import Vue from 'vue'

// vue-material
import { MdToolbar, MdButton, MdDrawer, MdIcon, MdRadio, MdBadge, MdCard, MdCheckbox, MdDialog, MdDialogAlert, MdProgress, MdTable, MdTooltip, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdDrawer)
Vue.use(MdIcon)
Vue.use(MdRadio)
Vue.use(MdBadge)
Vue.use(MdCard)
Vue.use(MdCheckbox)
Vue.use(MdDialog)
Vue.use(MdProgress)
Vue.use(MdTable)
Vue.use(MdTooltip)
Vue.use(MdDialogAlert)
Vue.use(MdContent)

// vue-layers
import { Map, VectorLayer, VectorSource, StyleBox, StrokeStyle, FillStyle, VectorTileLayer, VectorTileSource, TileLayer, WmtsSource, WmsSource, XyzSource } from 'vuelayers'
import 'vuelayers/lib/style.css'
Vue.use(Map)
Vue.use(VectorLayer)
Vue.use(VectorSource)
Vue.use(StyleBox)
Vue.use(StrokeStyle)
Vue.use(FillStyle)
Vue.use(VectorTileLayer)
Vue.use(VectorTileSource)
Vue.use(TileLayer)
Vue.use(WmtsSource)
Vue.use(WmsSource)
Vue.use(XyzSource)

import App from './App.vue'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
