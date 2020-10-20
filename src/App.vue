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
        <div class="md-layout md-alignment-center-center" v-if="loading">
          <h3>Loading ...</h3>
        </div>
        <div class="md-layout md-alignment-center-center" v-else>
          <h3>Completed!</h3>
        </div>
        <!-- Layers management component -->
        <LayerControl v-on:rasterTileLayer-export="rasterTileLayer = $event" />
      </div>
      <!-- main content -->
      <div
        class="md-layout-item md-large-size-80 md-medium-size-80 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Map -->
        <Map
          :rasterTileLayerProp="rasterTileLayer"
          :geojsonUrl="vectorLayer.source"
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
const axios = require("axios");
import Navbar from "./components/Navbar.vue";
import LayerControl from "./components/LayerControl.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Navbar,
    LayerControl,
    Map,
  },
  data: () => ({
    info: [], // test info block
    loading: false, // loading status
    rasterTileLayer: {
      id: 1,
      name: "Open Street Map",
      source: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    vectorLayer: {
      id: 1,
      name: "GeoJSON features",
      source:
        "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
    },
  }),
  mounted() {
    this.loading = true;
    axios
      .get(
        "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson"
      )
      .then((response) => (this.info = response.data.features))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.md-layout-item {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
