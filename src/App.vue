<template>
  <div id="app">
    <!-- navbar -->
    <div class="nav">
      <md-toolbar class="md-primary" md-elevation="1">
        <h3 class="md-title" style="flex: 1">Web GIS SPA</h3>
        <md-button v-on:click="cleanMap()" class="md-primary">CLEAN</md-button>
      </md-toolbar>
    </div>
    <!-- page responsive layout -->
    <div class="md-layout">
      <!-- left side bar -->
      <div
        class="md-layout-item md-large-size-25 md-medium-size-25 md-small-size-100 md-xsmall-size-100"
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
                <!-- default wms layer value -->
                <div>
                  <md-radio v-model="wmsLayerSelected" :value="false"
                    >none</md-radio
                  >
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
                  <div
                    v-if="layer.id == wmsLayerSelected.id"
                    class="wms-sublayers"
                  >
                    <!-- checkbox for all layers -->
                    <!-- enabled all checkbox -->
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
                    <!-- disabled all checkbox -->
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
                    <div
                      v-if="layer.subLayerSelected == layer.sublayerAll.name"
                    >
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
                        </md-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </md-card-content>
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
        class="md-layout-item md-large-size-75 md-medium-size-75 md-small-size-100 md-xsmall-size-100"
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
          v-on:update-minzoom="mapMinZoomDefault = $event"
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

  data: () => ({
    layersList: Layers, // loading layers list from json
    // selected layers
    rasterTileLayerSelected: false,
    wmtsLayerSelected: false,
    wmsLayerSelected: false,
    vectorLayerSelected: false,
    vectorTileLayerSelected: false,
    // map options
    mapZoomDefault: 7,
    mapCenterDefault: [2826843.9010652136, 8110910.249112634],
  }),

  methods: {
    loadLayer() {
      this.wmsLayerSelected = this.layersList.wmsLayers[1];
    },
    cleanMap() {
      this.rasterTileLayerSelected = false;
      this.wmtsLayerSelected = false;
      this.vectorLayerSelected = false;
      this.vectorTileLayerSelected = false;
      this.mapCenterDefault = [2826843.9010652136, 8110910.249112634];
      this.mapZoomDefault = 7;
      this.wmsLayerSelected = this.layersList.wmsLayers[1];
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
</style>
