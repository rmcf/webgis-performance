<template>
  <div id="app">
    <!-- navbar -->
    <div class="nav">
      <md-toolbar class="md-primary" md-elevation="1">
        <h3 class="md-title" style="flex: 1">Web GIS App</h3>
        <md-button v-on:click="cleanMap()" class="md-primary">CLEAN</md-button>
      </md-toolbar>
    </div>
    <!-- page responsive layout -->
    <div class="md-layout">
      <!-- left side bar -->
      <div
        class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Layers management component -->
        <div class="scrollbar">
          <div class="manage">
            <md-card>
              <md-card-header>
                <div class="md-layout md-alignment-center-center">
                  <span class="card-header-title">LAYERS:</span>
                </div>
              </md-card-header>
              <md-divider></md-divider>
              <!-- vector layers -->
              <md-card-content>
                <div class="md-layout md-alignment-center-right">
                  <span class="md-caption">remote geoJSON</span>
                </div>
                <div>
                  <md-radio v-model="vectorLayerSelected" :value="false"
                    >none</md-radio
                  >
                </div>
                <div v-for="layer in layersList.vectorLayers" :key="layer.id">
                  <md-radio
                    v-model="vectorLayerSelected"
                    :value="layer"
                    class="md-primary"
                    >{{ layer.name }}</md-radio
                  >
                </div></md-card-content
              >
              <md-divider></md-divider>
              <!-- vector tile layers -->
              <md-card-content>
                <div class="md-layout md-alignment-center-right">
                  <span class="md-caption">vector tiles services</span>
                </div>
                <div>
                  <md-radio v-model="vectorTileLayerSelected" :value="false"
                    >none</md-radio
                  >
                </div>
                <div
                  v-for="layer in layersList.vectorTileLayers"
                  :key="layer.id"
                >
                  <md-radio
                    v-model="vectorTileLayerSelected"
                    :value="layer"
                    class="md-primary"
                    >{{ layer.name }}</md-radio
                  >
                </div></md-card-content
              >
              <md-divider></md-divider>
              <!-- wmts layers -->
              <md-card-content>
                <div class="md-layout md-alignment-center-right">
                  <span class="md-caption">web map tile services</span>
                </div>
                <div>
                  <md-radio v-model="wmtsLayerSelected" :value="false"
                    >none</md-radio
                  >
                </div>
                <div v-for="layer in layersList.wmtsLayers" :key="layer.id">
                  <md-radio
                    v-model="wmtsLayerSelected"
                    :value="layer"
                    class="md-primary"
                    >{{ layer.name }}</md-radio
                  >
                </div></md-card-content
              >
              <md-divider></md-divider>
              <!-- wms layers -->
              <md-card-content>
                <div class="md-layout md-alignment-center-right">
                  <span class="md-caption">web map services</span>
                </div>

                <div>
                  <md-radio v-model="wmsLayerSelected" :value="false"
                    >none</md-radio
                  >
                </div>
                <div v-for="layer in layersList.wmsLayers" :key="layer.id">
                  <md-radio
                    v-model="wmsLayerSelected"
                    :value="layer"
                    class="md-primary"
                    >{{ layer.name }}</md-radio
                  >
                </div></md-card-content
              >
              <md-divider></md-divider>
              <!-- tile layers -->
              <md-card-content>
                <div class="md-layout md-alignment-center-right">
                  <span class="md-caption">raster tiles services</span>
                </div>
                <div>
                  <md-radio v-model="rasterTileLayerSelected" :value="false"
                    >none</md-radio
                  >
                </div>
                <div
                  v-for="layer in layersList.rasterTileLayers"
                  :key="layer.id"
                >
                  <md-radio
                    v-model="rasterTileLayerSelected"
                    :value="layer"
                    class="md-primary"
                    >{{ layer.name }}</md-radio
                  >
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
      <!-- main content -->
      <div
        class="md-layout-item md-large-size-80 md-medium-size-80 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Map -->
        <Map
          :rasterTileLayerProp="rasterTileLayerSelected"
          :wmsLayerProp="wmsLayerSelected"
          :wmtsLayerProp="wmtsLayerSelected"
          :vectorLayerProp="vectorLayerSelected"
          :vectorTileLayerProp="vectorTileLayerSelected"
          :mapZoomProp="mapZoomDefault"
          :mapCenterProp="mapCenterDefault"
          v-on:update-zoom="mapZoomDefault = $event"
          v-on:update-center="mapCenterDefault = $event"
        />
      </div>
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

  methods: {
    loadLayer() {
      this.wmsLayerSelected = this.layersList.wmsLayers[1];
    },
    cleanMap() {
      this.rasterTileLayerSelected = false;
      this.wmtsLayerSelected = false;
      this.wmsLayerSelected = this.layersList.wmsLayers[1];
      this.vectorLayerSelected = false;
      this.vectorTileLayerSelected = false;
      this.mapZoomDefault = 8;
      this.mapCenterDefault = [550000, 6520000];
    },
  },
  mounted() {
    this.loadLayer();
  },
  data: () => ({
    layersList: Layers, // loading layers list from json
    // selected layers
    rasterTileLayerSelected: false,
    wmtsLayerSelected: false,
    wmsLayerSelected: false,
    vectorLayerSelected: false,
    vectorTileLayerSelected: false,
    // map options
    mapZoomDefault: 8,
    mapCenterDefault: [550000, 6520000],
  }),
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.md-layout-item {
  padding-left: 0.5em;
  padding-right: 0.5em;
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

div.nav {
  margin-bottom: 2em;
}

.scrollbar {
  padding-left: 0.3em;
  padding-right: 0.7em;
  max-height: 82vh;
  overflow: auto;
}
</style>
