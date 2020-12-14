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
          </div>
        </div>

        <!-- wmts layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">web map tile services</span>
          </div>
          <div>
            <md-radio v-model="wmtsLayerSelected" :value="false">none</md-radio>
          </div>
          <div v-for="layer in layersList.wmtsLayers" :key="layer.id">
            <md-radio
              v-model="wmtsLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
          </div>
        </div>

        <!-- wms layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">web map services</span>
          </div>
          <!-- default wms layer value -->
          <div>
            <md-radio v-model="wmsLayerSelected" :value="false">none</md-radio>
          </div>
          <!-- dynamic wms layers list -->
          <div v-for="layer in layersList.wmsLayers" :key="layer.id">
            <md-radio
              v-model="wmsLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}
            </md-radio>
            <!-- wms sublayers section -->
            <div v-if="layer.id == wmsLayerSelected.id" class="wms-sublayers">
              <!-- checkbox for all layers -->
              <!-- enabled "all" checkbox -->
              <div
                v-if="
                  layer.subLayerSelected.some(
                    (sublayer) => sublayer == layer.sublayerAll.name
                  ) || layer.subLayerSelected.length == 0
                "
              >
                <md-checkbox
                  v-model="layer.subLayerSelected"
                  :value="layer.sublayerAll.name"
                  class="md-primary"
                  >all
                </md-checkbox>
              </div>
              <!-- disabled "all" checkbox -->
              <div v-else>
                <md-checkbox
                  disabled
                  v-model="layer.subLayerSelected"
                  :value="layer.sublayerAll.name"
                  class="md-primary"
                  >all
                </md-checkbox>
              </div>
              <!-- checkboxes for single selected layers -->
              <!-- disabled single checkboxes -->
              <div v-if="layer.subLayerSelected == layer.sublayerAll.name">
                <div
                  v-for="sublayer in layer.subLayersSingle"
                  :key="sublayer.id"
                >
                  <md-checkbox
                    disabled
                    v-model="layer.subLayerSelected"
                    :value="sublayer.name"
                    class="md-primary"
                    >{{ sublayer.title }}
                    <span class="sublayer-zoom"
                      >(zoom: {{ sublayer.minZoom }}-{{
                        sublayer.maxZoom
                      }})</span
                    >
                  </md-checkbox>
                </div>
              </div>
              <!-- enabled single checkboxes -->
              <div v-else>
                <div
                  v-for="sublayer in layer.subLayersSingle"
                  :key="sublayer.id"
                >
                  <md-checkbox
                    v-model="layer.subLayerSelected"
                    :value="sublayer.name"
                    class="md-primary"
                    >{{ sublayer.title }}
                    <span class="sublayer-zoom"
                      >(zoom: {{ sublayer.minZoom }}-{{
                        sublayer.maxZoom
                      }})</span
                    >
                  </md-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- raster tile layers -->
        <div class="layers-group">
          <div class="md-layout md-alignment-center-right">
            <span class="md-caption">raster tiles services</span>
          </div>
          <div>
            <md-radio v-model="rasterTileLayerSelected" :value="false"
              >none</md-radio
            >
          </div>
          <div v-for="layer in layersList.rasterTileLayers" :key="layer.id">
            <md-radio
              v-model="rasterTileLayerSelected"
              :value="layer"
              class="md-primary"
              >{{ layer.name }}</md-radio
            >
          </div>
        </div>
      </div>
    </md-drawer>
    <div class="container">
      <!-- Map -->
      <Map
        :rasterTileLayerProp="rasterTileLayerSelected"
        :wmsLayerProp="wmsLayerSelected"
        :wmtsLayerProp="wmtsLayerSelected"
        :geoJsonUrlProp="geoJsonUrlSelected"
        :geoJsonServicesProp="geoJsonServicesSelected"
        :vectorTileLayerProp="vectorTileLayerSelected"
        :mapZoomProp="mapZoomDefault"
        :mapCenterProp="mapCenterDefault"
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
    layersList: Layers, // loading layers list from json
    // selected layers
    rasterTileLayerSelected: false,
    wmtsLayerSelected: false,
    wmsLayerSelected: false,
    geoJsonUrlSelected: false,
    geoJsonServicesSelected: false,
    vectorLayerUrlSelected: false,
    vectorTileLayerSelected: false,
    // map options
    mapZoomDefault: 6,
    mapCenterDefault: [24.728699075440534, 58.699046154309144],
    menuVisible: false,
  }),

  methods: {
    loadLayer() {
      this.rasterTileLayerSelected = this.layersList.rasterTileLayers[0];
    },
    cleanMap() {
      this.rasterTileLayerSelected = this.layersList.rasterTileLayers[0];
      this.wmsLayerSelected = false;
      this.wmtsLayerSelected = false;
      this.geoJsonUrlSelected = false;
      this.geoJsonServicesSelected = false;
      this.vectorTileLayerSelected = false;
      this.clickOnMapDetection = false;
      this.mapCenterDefault = [24.728699075440534, 58.699046154309144];
      this.mapZoomDefault = 6;
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

div.wms-sublayers {
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

/* mobile styles */
@media only screen and (max-width: 768px) {
  div.container {
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>
