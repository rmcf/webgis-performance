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
            <!-- wms layers -->
            <md-card-content>
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
          :vectorLayerProp="vectorLayerSelected"
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

  data: () => ({
    info: [], // test info block
    // selected layers
    rasterTileLayerSelected: false,
    wmsLayerSelected: false,
    vectorLayerSelected: false,
    // raster tile layers array
    rasterTileLayers: [
      {
        id: 1,
        name: "Open Street Map",
        source: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      {
        id: 2,
        name: "ESRI World Topo Map",
        source:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution:
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
      },
      {
        id: 3,
        name: "ESRI World Imagery",
        source:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    ],
    // wms layers array
    wmsLayers: [
      {
        id: 1,
        name: "USA Population Density",
        url:
          "https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/",
        layerName: "0",
        matrixSet: "EPSG:3857",
        format: "image/png",
        styleName: "default",
        attribution:
          'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
          'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
      },
    ],
    // vector layers array
    vectorLayers: [
      {
        id: 1,
        name: "GeoJSON features",
        source:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
      },
      {
        id: 2,
        name: "GeoJSON features",
        source:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
      },
      {
        id: 3,
        name: "GeoJSON features",
        source:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
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
</style>
