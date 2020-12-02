<template>
  <div id="app">
    <!-- fonts and material icons -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons"
    />

    <!-- app container -->
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Web GIS SPA</span>
      <div class="md-toolbar-section-end">
        <md-button @click="cleanMap()"
          ><md-icon>layers_clear</md-icon> CLEAR</md-button
        >
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="menuVisible">
      <div class="manage">
        <div class="layers-group">
          <div class="md-layout md-alignment-center-center">
            <div class="layers-title"><md-icon>layers</md-icon> Navigation</div>
          </div>
        </div>

        <!-- vector layers -->
        <div class="layers-group">
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
      this.vectorLayerSelected = false;
      this.vectorTileLayerSelected = false;
      this.mapCenterDefault = [2826843.9010652136, 8110910.249112634];
      this.mapZoomDefault = 7;
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
</style>
