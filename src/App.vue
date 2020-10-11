<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="md-layout">
      <div class="md-layout-item md-size-20"><LayerControl></LayerControl></div>
      <div class="md-layout-item md-size-80"><Map></Map></div>
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
