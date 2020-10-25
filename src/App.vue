<template>
  <div id="app">
    <!-- navbar -->
    <Navbar />
    <!-- page responsive layout -->
    <div class="md-layout">
      <!-- left side bar -->
      <div
        class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Layers management component -->
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
              <div v-for="layer in vectorLayers" :key="layer.id">
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
              <div v-for="layer in vectorTileLayers" :key="layer.id">
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
              <div v-for="layer in wmtsLayers" :key="layer.id">
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
              <div v-for="layer in wmsLayers" :key="layer.id">
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
              <div v-for="layer in rasterTileLayers" :key="layer.id">
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
          :features="info"
        />
        <div>
          <!-- data test info -->
          <span v-for="country in info" :key="country.properties.id"
            >{{ country.properties.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Map,
  },

  methods: {
    loadLayer() {
      this.rasterTileLayerSelected = this.rasterTileLayers[0];
    },
  },
  mounted() {
    this.loadLayer();
  },
  data: () => ({
    info: [], // test info block
    // selected layers
    rasterTileLayerSelected: false,
    wmtsLayerSelected: false,
    wmsLayerSelected: false,
    vectorLayerSelected: false,
    vectorTileLayerSelected: false,
    // raster tile layers array
    rasterTileLayers: [
      {
        id: 1,
        name: "Open Street Map",
        source: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      },
      {
        id: 2,
        name: "ESRI World Topo Map",
        source:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png",
        maxZoom: 19,
        attribution:
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
      },
      {
        id: 3,
        name: "ESRI World Imagery",
        source:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
        maxZoom: 20,
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    ],
    // wmts layers array
    wmtsLayers: [
      {
        id: 0,
        name: "USA Demographics",
        url:
          "https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/",
        layerName: "0",
        matrixSet: "EPSG:4326",
        format: "image/png",
        styleName: "default",
        attribution: "USA Demographics",
      },
    ],
    // wms layers array
    wmsLayers: [
      {
        id: 1,
        name: "EST Admin Divisions (I)",
        url: "https://geowebservices.stanford.edu/geoserver/ows",
        layer: "druid:cv588yj7627",
        format: "image/png",
        styleName: "default",
        attribution:
          "WMS: <a href='https://www.geoseer.net/rl.php?ql=f6cfce8d4da37c83&p=1&q=estonia%20administrative'>Stanford Spatial Data Infrastructure WFS and WMS</a>",
        crossOrigin: "null",
      },
      {
        id: 2,
        name: "EST Admin Divisions (II)",
        url: "https://geowebservices.stanford.edu/geoserver/ows",
        layer: "druid:kd823cr5884",
        format: "image/png",
        styleName: "default",
        attribution:
          "WMS: <a href='https://www.geoseer.net/rl.php?ql=f6cfce8d4da37c83&p=1&q=estonia%20administrative'>Stanford Spatial Data Infrastructure WFS and WMS</a>",
        crossOrigin: "null",
      },
      {
        id: 3,
        name: "EST Admin Divisions (III)",
        url: "https://geowebservices.stanford.edu/geoserver/ows",
        layer: "druid:zq283vs1736",
        format: "image/png",
        styleName: "default",
        attribution:
          "WMS: <a href='https://www.geoseer.net/rl.php?ql=f6cfce8d4da37c83&p=1&q=estonia%20administrative'>Stanford Spatial Data Infrastructure WFS and WMS</a>",
        crossOrigin: "null",
      },
    ],
    // vector layers array
    vectorLayers: [
      {
        id: 1,
        name: "Soil Pygeoapi Docker",
        source:
          "https://rmcf.github.io/webgis-performance/soilpygeoapi/collections/estsoil/items?f=json",
      },
      {
        id: 2,
        name: "OSM countries",
        source:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
      },
    ],
    // vector tile layers
    vectorTileLayers: [
      {
        id: 1,
        name: "ESRI World Basemap",
        source:
          "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",
      },
      {
        id: 2,
        name: "Estonia soil map",
        source:
          "https://rmcf.github.io/webgis-performance/maerchenland/vector-tiles/tiles/soil_map/{z}/{x}/{y}.pbf",
      },
    ],
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
  padding-left: 1em;
  padding-right: 1em;
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
</style>
