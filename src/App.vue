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

        <!-- vector layers geoJSON services-->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">remote geoJSON services</span>
          </div>
          <div>
            <md-radio v-model="geoJsonServicesSelected" :value="false"
              >none</md-radio
            >
          </div>
          <div v-for="layer in layersList.geoJsonService" :key="layer.id">
            <md-radio
              v-model="geoJsonServicesSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
            <div
              class="layer-info-region"
              v-if="geoJsonServicesSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- vector layers geoJSON URL-->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">remote geoJSON URL</span>
          </div>
          <div>
            <md-radio v-model="geoJsonUrlSelected" :value="false"
              >none</md-radio
            >
          </div>
          <div v-for="layer in layersList.geoJsonUrl" :key="layer.id">
            <md-radio
              v-model="geoJsonUrlSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
            <div
              class="layer-info-region"
              v-if="geoJsonUrlSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- vector tile layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">vector tiles services</span>
          </div>
          <div>
            <md-radio v-model="vectorTileLayerSelected" :value="false"
              >none</md-radio
            >
          </div>
          <div v-for="layer in layersList.vectorTileLayers" :key="layer.id">
            <md-radio
              v-model="vectorTileLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
            <div
              class="layer-info-region"
              v-if="vectorTileLayerSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- wmts layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">web map tile services</span>
          </div>
          <div v-for="layer in layersList.wmtsLayers" :key="layer.id">
            <md-radio
              v-model="rasterLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
            <div
              class="layer-info-region"
              v-if="rasterLayerSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- wms layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">web map services</span>
          </div>
          <!-- dynamic wms layers list -->
          <div v-for="layer in layersList.wmsLayers" :key="layer.id">
            <md-radio
              v-model="rasterLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}
            </md-radio>
            <div
              class="layer-info-region"
              v-if="rasterLayerSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- raster tile layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">raster tiles services</span>
          </div>
          <div v-for="layer in layersList.rasterTileLayers" :key="layer.id">
            <md-radio
              v-model="rasterLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
            <div
              class="layer-info-region"
              v-if="rasterLayerSelected.id === layer.id"
            >
              <!-- layer visible zoom -->
              <div>
                <span class="sublayer-zoom">
                  visible at zoom: {{ layer.minZoom }}-{{ layer.maxZoom }}</span
                >
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
        :rasterLayerProp="rasterLayerSelected"
        :geoJsonUrlProp="geoJsonUrlSelected"
        :geoJsonServicesProp="geoJsonServicesSelected"
        :vectorTileLayerProp="vectorTileLayerSelected"
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
    // testting raster layer
    rasterLayerSelected: false,
    geoJsonUrlSelected: false,
    geoJsonServicesSelected: false,
    vectorLayerUrlSelected: false,
    vectorTileLayerSelected: false,
    // map options
    mapZoomDefault: 7,
    mapCenterDefault: [24.728699075440534, 58.699046154309144],
    // menu in left sidebar
    menuVisible: false,
  }),

  methods: {
    // loading raster layer on webpage start
    loadLayer() {
      this.rasterLayerSelected = this.layersList.rasterTileLayers[1];
    },
    // return map settings to default values
    cleanMap() {
      this.rasterLayerSelected = this.layersList.rasterTileLayers[1];
      this.geoJsonUrlSelected = false;
      this.geoJsonServicesSelected = false;
      this.vectorTileLayerSelected = false;
      this.clickOnMapDetection = false;
      this.mapCenterDefault = [24.728699075440534, 58.699046154309144];
      this.mapZoomDefault = 7;
    },
  },
  computed: {
    // returning min&max zoom of selected raster layer
    zoomsArray: function () {
      let arrayZoom = [
        this.rasterLayerSelected.minZoom,
        this.rasterLayerSelected.maxZoom,
      ];
      return arrayZoom;
    },
  },
  mounted() {
    this.loadLayer();
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.md-card-content {
  padding: 0.5em 1.5em 1em 1.5em;
}
.card-header-title {
  font-size: 1.3em;
}

.md-card {
  margin-bottom: 3em;
}

div.layer-type {
  padding: 5px;
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

.sublayer-zoom {
  color: gray;
  font-size: 0.7rem;
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

/* mobile styles */
@media only screen and (max-width: 768px) {
  div.container {
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>
