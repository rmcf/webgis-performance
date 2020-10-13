<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="md-layout">
      <div
        class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Layers management component -->
        <LayerControl v-on:layer-input="rasterLayer = $event"></LayerControl>
      </div>
      <div
        class="md-layout-item md-large-size-80 md-medium-size-80 md-small-size-100 md-xsmall-size-100"
      >
        <!-- Map component -->
        <Map :layer="rasterLayer"></Map>
      </div>
    </div>
  </div>
</template>

<script>
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
    rasterLayer: {
      id: 1,
      name: "Open Street Map",
      source: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  }),
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
