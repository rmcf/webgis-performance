<template>
  <div id="app">
    <!-- fonts and material icons -->
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
    />
    <!-- toolbar -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
        <md-tooltip class="md-xsmall-hide md-small-hide" md-direction="bottom"
          >Layers navigation</md-tooltip
        >
      </md-button>
      <span class="md-title md-xsmall-hide md-small-hide"
        >Veekaitsevööndite reostustundlikkus (ja soovituslik puhverriba
        laius)</span
      >
      <div class="md-toolbar-section-end">
        <md-button @click="aboutProject = !aboutProject">About</md-button>
      </div>
    </md-toolbar>

    <!-- drawer -->
    <md-drawer :md-active.sync="menuVisible">
      <div class="manage">
        <div class="layers-group">
          <div class="md-layout md-alignment-center-center">
            <div class="layers-title">
              <md-icon>layers</md-icon> Kaardikihid
            </div>
          </div>
        </div>

        <!-- list of data layers -->
        <div class="drawer-layers-section">
          <!-- section subtitle -->
          <div class="md-layout md-alignment-top-right">
            <div class="drawer-layers-section_subtitle">data layers</div>
          </div>
          <div
            v-for="layer in sortedDataLayerListComputed"
            :key="layer.id"
            class="drawer-layer"
          >
            <div>
              <md-checkbox v-model="layer.visibility" class="md-primary"
                >{{ layer.name
                }}<span class="drawer-layer__zoom">
                  <!-- invisible layer -->
                  <span
                    v-if="
                      layer.minZoom > mapZoomDefault ||
                      layer.maxZoom < mapZoomDefault
                    "
                    class="accent-color"
                  >
                    (<md-icon class="drawer-layer__zoom_icon-red"
                      >crop_free</md-icon
                    >{{ layer.minZoom }}-{{ layer.maxZoom }})
                    <!-- tooltip -->
                    <md-tooltip md-direction="top"
                      >available at zoom level {{ layer.minZoom }}-{{
                        layer.maxZoom
                      }}</md-tooltip
                    >
                  </span>
                  <!-- visible layer -->
                  <span v-else>
                    (<md-icon class="drawer-layer__zoom_icon">crop_free</md-icon
                    >{{ layer.minZoom }}-{{ layer.maxZoom }})
                    <!-- tooltip -->
                    <md-tooltip md-direction="top"
                      >available at zoom level {{ layer.minZoom }}-{{
                        layer.maxZoom
                      }}</md-tooltip
                    >
                  </span>
                </span></md-checkbox
              >
            </div>
            <!-- layer info -->
            <div v-if="layer.visibility" class="layer-info-region">
              <!-- z-index buttons -->
              <div class="layer-info-region_zindex">
                <md-button
                  v-on:click="layer.zIndex = parseInt(layer.zIndex) + 1"
                  class="md-icon-button md-dense md-primary"
                >
                  <md-icon>keyboard_arrow_up</md-icon>
                </md-button>
                <md-button
                  v-on:click="layer.zIndex = parseInt(layer.zIndex) - 1"
                  class="md-icon-button md-dense md-primary"
                >
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
                <md-button class="md-dense md-primary"
                  >z-index: {{ layer.zIndex }}</md-button
                >
              </div>
              <!-- color schemes -->
              <div v-if="layer.colorSchemes" class="color-shemes">
                <div v-for="schema in layer.colorSchemes" :key="schema.value">
                  <input
                    type="radio"
                    :id="schema.value"
                    v-model="layer.layerColorScheme"
                    v-bind:value="schema.value"
                  />
                  <label :for="schema.value"> {{ schema.title }}</label>
                </div>
              </div>
              <!-- legend for USDA scheme -->
              <div
                class="layer-legend"
                v-if="layer.layerColorScheme == 'legendUSDA'"
              >
                <!-- layer labels -->
                <div v-if="layer.labels !== undefined" class="layer-labels">
                  <div class="input">
                    <label
                      ><input
                        type="checkbox"
                        v-model="layer.labels"
                        :true-value="true"
                        :false-value="false"
                        :value="true"
                      />
                      labels</label
                    >
                  </div>
                </div>
                <table class="layer-legend__table">
                  <tr v-for="soil in layer.legendUSDA" :key="soil.id">
                    <td class="soil-color">
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.soilColor }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.soilTitle }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- legend for VARV scheme -->
              <div
                class="layer-legend"
                v-if="layer.layerColorScheme == 'legendVARV'"
              >
                <!-- layer labels -->
                <div v-if="layer.labels !== undefined" class="layer-labels">
                  <div class="input">
                    <label
                      ><input
                        type="checkbox"
                        v-model="layer.labels"
                        :true-value="true"
                        :false-value="false"
                        :value="true"
                      />
                      labels</label
                    >
                  </div>
                </div>
                <table class="layer-legend__table">
                  <tr v-for="soil in layer.legendVARV" :key="soil.varv">
                    <td class="soil-color">
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.color }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.title }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- legend for WRB scheme -->
              <div
                class="layer-legend"
                v-if="layer.layerColorScheme == 'legendWRB'"
              >
                <!-- layer labels -->
                <div v-if="layer.labels !== undefined" class="layer-labels">
                  <div class="input">
                    <label
                      ><input
                        type="checkbox"
                        v-model="layer.labels"
                        :true-value="true"
                        :false-value="false"
                        :value="true"
                      />
                      labels</label
                    >
                  </div>
                </div>
                <table class="layer-legend__table">
                  <tr v-for="soil in layer.legendWRB" :key="soil.wrb_main">
                    <td class="soil-color">
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.color }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.title }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- legend for MSRVeekaitse -->
              <div
                class="layer-legend"
                v-if="layer.layerColorScheme == 'legendMSRVeekaitse'"
              >
                <table class="layer-legend__table">
                  <tr
                    v-for="soil in layer.legendMSRVeekaitse"
                    :key="soil.klassid"
                  >
                    <td class="soil-color">
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.color }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.title }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- legend for LVKVeekaitse -->
              <div
                class="layer-legend"
                v-if="layer.layerColorScheme == 'legendLVKVeekaitse'"
              >
                <table class="layer-legend__table">
                  <tr
                    v-for="soil in layer.legendLVKVeekaitse"
                    :key="soil.klassid"
                  >
                    <td class="soil-color">
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.color }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.title }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- list of base layers -->
        <div class="drawer-layers-section">
          <!-- section subtitle -->
          <div class="md-layout md-alignment-top-right">
            <div class="drawer-layers-section_subtitle">base layers</div>
          </div>
          <!-- list of layers -->
          <div
            v-for="layer in sortedBaseLayerListComputed"
            :key="layer.id"
            class="drawer-layer"
          >
            <div>
              <md-radio
                v-model="baseLayerSelected"
                :value="layer"
                class="md-primary"
                >{{ layer.name }}
                <span class="drawer-layer__zoom">
                  <!-- invisible layer -->
                  <span
                    v-if="
                      layer.minZoom > mapZoomDefault ||
                      layer.maxZoom < mapZoomDefault
                    "
                    class="accent-color"
                  >
                    (<md-icon class="drawer-layer__zoom_icon-red"
                      >crop_free</md-icon
                    >{{ layer.minZoom }}-{{ layer.maxZoom }})
                    <!-- tooltip -->
                    <md-tooltip md-direction="top"
                      >available at zoom level {{ layer.minZoom }}-{{
                        layer.maxZoom
                      }}</md-tooltip
                    >
                  </span>
                  <!-- visible layer -->
                  <span v-else>
                    (<md-icon class="drawer-layer__zoom_icon">crop_free</md-icon
                    >{{ layer.minZoom }}-{{ layer.maxZoom }})
                    <!-- tooltip -->
                    <md-tooltip md-direction="top"
                      >available at zoom level {{ layer.minZoom }}-{{
                        layer.maxZoom
                      }}</md-tooltip
                    >
                  </span>
                </span>
              </md-radio>
            </div>
          </div>
        </div>
      </div>
    </md-drawer>

    <div class="container">
      <!-- about project -->
      <transition name="fade">
        <About v-if="aboutProject" v-on:close-about="aboutProject = false" />
      </transition>

      <!-- Map -->
      <Map
        :selectedLayersProp="activeLayerListComputed"
        :mapZoomProp="mapZoomDefault"
        :mapCenterProp="mapCenterDefault"
        v-on:update-zoom="mapZoomDefault = $event"
        v-on:update-minzoom="mapMinZoomDefault = $event"
        v-on:update-center="mapCenterDefault = $event"
        v-on:remove-maplayers="cleanMap()"
        v-on:default-mapzoom="defaultMapZoom()"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import About from "./components/About.vue";
import Layers from "./store/layers.json";

export default {
  name: "App",
  components: {
    Map,
    About,
  },

  data: () => ({
    // loading layers list from json
    layersList: Layers,
    // base layer selected
    baseLayerSelected: {},
    // map options
    mapZoomDefault: 7,
    mapCenterDefault: [25.423976698208374, 58.71616523767932],
    // menu in left sidebar
    menuVisible: false,
    // about project visibility
    aboutProject: false,
  }),

  methods: {
    // return map settings to default values
    cleanMap() {
      let list = this.layersList;
      list.forEach(function (item) {
        if (item.id !== "OpenStreetMap" && item.layerType === "data") {
          item.visibility = false;
        }
      });
      let selectedLayerArray = list.filter(function (el) {
        return el.id === "OpenStreetMap";
      });
      this.baseLayerSelected = selectedLayerArray[0];
    },
    // return default map zoom
    defaultMapZoom() {
      this.mapZoomDefault = 7;
      this.mapCenterDefault = [25.423976698208374, 58.71616523767932];
    },
    // selecting base layer on page load
    loadBaseLayer() {
      let list = this.layersList;
      let selectedLayerArray = list.filter(function (el) {
        return el.id === "OpenStreetMap";
      });
      this.baseLayerSelected = selectedLayerArray[0];
    },
  },
  mounted() {
    this.loadBaseLayer();
  },
  computed: {
    // layers sorted list in sidebar
    sortedLayerListComputed: function () {
      let list = this.layersList;
      let sortedLayersList = list.sort(function (a, b) {
        // visibility comparison
        if (a.visibility < b.visibility) {
          return 1;
        }
        if (a.visibility > b.visibility) {
          return -1;
        }
        if (a.visibility == b.visibility) {
          // z-index comparison
          if (parseInt(a.zIndex) < parseInt(b.zIndex)) {
            return 1;
          }
          if (parseInt(a.zIndex) > parseInt(b.zIndex)) {
            return -1;
          }
          if (parseInt(a.zIndex) == parseInt(b.zIndex)) {
            // orderInList comparison
            if (a.orderInList < b.orderInList) {
              return 1;
            }
            if (a.orderInList > b.orderInList) {
              return -1;
            }
          }
        }
      });
      return sortedLayersList;
    },
    // data layers list
    sortedDataLayerListComputed: function () {
      let list = this.sortedLayerListComputed;
      let dataList = list.filter(function (el) {
        return el.layerType === "data";
      });
      return dataList;
    },
    // base layers list
    sortedBaseLayerListComputed: function () {
      let list = this.layersList;
      let baseList = list.filter(function (el) {
        return el.layerType === "base";
      });
      let sortedLayersList = baseList.sort(function (a, b) {
        if (a.orderInList < b.orderInList) {
          return 1;
        }
        if (a.orderInList > b.orderInList) {
          return -1;
        }
      });
      return sortedLayersList;
    },
    // active layer list for map prop
    activeLayerListComputed: function () {
      let list = this.sortedDataLayerListComputed;
      let activeList = list.filter(function (el) {
        return el.visibility === true && el.layerType === "data";
      });
      activeList.push(this.baseLayerSelected);
      return activeList;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.layer-type {
  padding: 5px;
}

div.drawer-layer {
  padding: 5px 10px 5px 10px;
}

div.drawer-layers-section {
  border-bottom: 1px solid #e0e0e0;
}

div.drawer-layers-section_subtitle {
  padding: 10px;
  color: gray;
  font-size: 0.8rem;
}

div.wms-sublayers,
div.layer-info-region {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  margin-left: 3em;
  padding: 5px;
}

.md-radio,
.md-checkbox {
  margin: 5px;
}

div.layers-title {
  color: #616161;
  padding: 0.5rem;
  font-size: 1.3rem;
}

div.layers-title .md-icon {
  color: #448aff;
  font-size: 2rem !important;
  margin-right: 3px;
}

div.layers-group {
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-bottom: 2px solid #e0e0e0;
}

div.container {
  padding: 2rem 1rem 2rem 1rem;
}

.md-title {
  margin-left: 0.2rem !important;
}

.button-margin {
  margin-left: 5px !important;
  margin-right: 5px !important;
}

.layer-info-text {
  padding-left: 0.25em;
  color: gray;
  font-size: 0.8rem;
}

span.drawer-layer__zoom {
  color: gray;
  font-size: 0.8rem;
}

.drawer-layer__zoom_icon {
  color: gray;
  font-size: 1rem !important;
}

.drawer-layer__zoom_icon-red {
  color: #ff5252 !important;
  font-size: 1rem !important;
}

span.drawer-layer__zoom sup {
  color: #ff5252;
}

/* legend of tile layers */

div.layer-legend {
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid #dcdcdc;
}

table.layer-legend__table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.7rem;
}

table.layer-legend__table tr:hover {
  background-color: #f5f5f5;
}

table.layer-legend__table td {
  padding-left: 2px;
  padding-right: 2px;
  vertical-align: top;
}

td.soil-color {
  width: 40px;
}

div.layer-legend__table-color {
  width: 30px;
  height: 20px;
  border: 1px solid #dcdcdc;
}

div.layer-legend__table-index {
  text-align: center;
}

.accent-color {
  color: #ff5252;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

div.layer-labels {
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 0.5rem;
}

div.layer-info-region_zindex .md-button {
  margin: 0px !important;
}

div.color-shemes {
  border-top: 1px solid #dcdcdc;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

div.color-shemes > div {
  margin-top: 5px;
  margin-bottom: 5px;
}

/* mobile styles */
@media only screen and (max-width: 768px) {
  div.container {
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>

<style lang="css">
.md-radio .md-radio-label,
.md-checkbox .md-checkbox-label {
  height: auto !important;
}
</style>