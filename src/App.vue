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
      <span class="md-title">Web GIS SPA</span>
      <div class="md-toolbar-section-end">
        <!-- remove all layers button -->
        <md-button
          @click="cleanMap()"
          class="md-icon-button md-raised md-primary button-margin"
          ><md-icon>layers_clear</md-icon
          ><md-tooltip
            class="md-xsmall-hide md-small-hide"
            md-direction="bottom"
            >Remove all layers</md-tooltip
          ></md-button
        >
      </div>
    </md-toolbar>

    <!-- drawer -->
    <md-drawer :md-active.sync="menuVisible">
      <div class="manage">
        <div class="layers-group">
          <div class="md-layout md-alignment-center-center">
            <div class="layers-title"><md-icon>layers</md-icon> Navigation</div>
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
              <md-checkbox v-model="layer.visibility" class="md-primary">{{
                layer.name
              }}</md-checkbox>
            </div>
            <!-- layer info -->
            <div class="layer-info-region" v-if="layer.visibility">
              <div class="layer-info-text">
                available at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}
              </div>
              <div class="layer-info-text_select">
                <div class="mdl-selectfield">
                  <select
                    v-model="layer.zIndex"
                    name="zIndex"
                    id="zIndex"
                    class="browser-default"
                  >
                    <option
                      v-for="z in sortedDataLayerListComputed.length"
                      :key="z"
                      :value="z"
                    >
                      z-index: {{ z }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- layer's legend -->
              <div class="layer-legend" v-if="layer.legend">
                <table class="layer-legend__table">
                  <tr v-for="soil in layer.legend" :key="soil.id">
                    <td>
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.soilColor }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-index">
                        {{ soil.soilIndex }}
                      </div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.soilTitle }}
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
                >{{ layer.name }}</md-radio
              >
            </div>
            <!-- layer info -->
            <div
              class="layer-info-region"
              v-if="layer.id == baseLayerSelected.id"
            >
              <div class="layer-info-text">
                available at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}
              </div>
              <!-- layer's legend -->
              <div class="layer-legend" v-if="layer.legend">
                <table class="layer-legend__table">
                  <tr v-for="soil in layer.legend" :key="soil.id">
                    <td>
                      <div
                        class="layer-legend__table-color"
                        :style="{ 'background-color': soil.soilColor }"
                      ></div>
                    </td>
                    <td>
                      <div class="layer-legend__table-index">
                        {{ soil.soilIndex }}
                      </div>
                    </td>
                    <td>
                      <div class="layer-legend__table-title">
                        {{ soil.soilTitle }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </md-drawer>

    <div class="container">
      <!-- Map -->
      <Map
        :selectedLayersProp="activeLayerListComputed"
        :mapZoomProp="mapZoomDefault"
        :mapCenterProp="mapCenterDefault"
        :zoomMinMaxProp="zoomsArray"
        v-on:update-zoom="mapZoomDefault = $event"
        v-on:update-minzoom="mapMinZoomDefault = $event"
        v-on:update-center="mapCenterDefault = $event"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Layers from "./store/layers.json";

export default {
  name: "App",
  components: {
    Map,
  },

  data: () => ({
    // loading layers list from json
    layersList: Layers,
    // base layer selected
    baseLayerSelected: {},
    // map options
    mapZoomDefault: 7,
    mapCenterDefault: [24.728699075440534, 58.699046154309144],
    // menu in left sidebar
    menuVisible: false,
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
    // returning min&max zoom of selected raster layer
    zoomsArray: function () {
      if (this.activeLayerListComputed.length > 0) {
        let list = this.activeLayerListComputed;
        let listSortedbyZoom = list.sort(function (a, b) {
          if (a.minZoom < b.minZoom) {
            return -1;
          }
          if (a.minZoom > b.minZoom) {
            return 1;
          }
          if (a.minZoom == b.minZoom) {
            if (a.maxZoom < b.maxZoom) {
              return -1;
            }
            if (a.maxZoom > b.maxZoom) {
              return 1;
            }
          }
          return 0;
        });
        let lastLayerInSortedByZoom =
          listSortedbyZoom[listSortedbyZoom.length - 1];
        let minMaxZoom = [
          lastLayerInSortedByZoom.minZoom,
          lastLayerInSortedByZoom.maxZoom,
        ];
        return minMaxZoom;
      } else {
        return [2, 18];
      }
    },
    // layer list in sidebar
    sortedLayerListComputed: function () {
      let list = this.layersList;
      let sortedLayersList = list.sort(function (a, b) {
        if (a.visibility < b.visibility) {
          return 1;
        }
        if (a.visibility > b.visibility) {
          return -1;
        }
        if (a.visibility == b.visibility) {
          if (a.zIndex < b.zIndex) {
            return 1;
          }
          if (a.zIndex > b.zIndex) {
            return -1;
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
  margin-bottom: 0.5rem;
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
  vertical-align: middle;
}

div.layer-legend__table-color {
  width: 30px;
  height: 20px;
  border: 1px solid #dcdcdc;
}

div.layer-legend__table-index {
  text-align: center;
}

/* custom material select */

div.layer-info-text_select {
  width: 9rem;
  margin-bottom: 10px;
  margin-top: 10px;
}

div.layer-info-text_select select {
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 0px;
  font-size: 0.8rem;
  color: gray;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

/* Remove focus */
select:focus {
  outline: none;
}

/* Hide label */
.mdl-selectfield label {
  display: none;
}

/* Use custom arrow */
.mdl-selectfield select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.mdl-selectfield {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  position: relative;
}

.mdl-selectfield:after {
  position: absolute;
  top: 0.75em;
  right: 0.5em;
  /* Styling the down arrow */
  width: 0;
  height: 0;
  padding: 0;
  content: "";
  border-left: 0.25em solid transparent;
  border-right: 0.25em solid transparent;
  border-top: 0.375em solid rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

/* mobile styles */
@media only screen and (max-width: 768px) {
  div.container {
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>
