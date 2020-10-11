<template>
  <div class="manage">
    <md-card>
      <md-card-header>
        <div class="md-layout md-alignment-center-center">
          <h3>Layer Management</h3>
        </div>
      </md-card-header>
      <md-divider></md-divider>
      <md-card-content>
        <div v-for="layer in layers" :key="layer.id">
          <md-radio
            v-model="selectedLayer"
            :value="layer.name"
            class="md-primary"
            >{{ layer.name }}</md-radio
          >
        </div>
      </md-card-content>
      <md-divider></md-divider>
      <md-card-content>
        <div class="md-layout md-alignment-center-center">
          <md-button class="md-accent">{{ selectedLayer }}</md-button>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "LayerControl",
  data: () => ({
    selectedLayer: "",
    layers: [
      {
        id: 0,
        name: "none",
      },
      {
        id: 1,
        name: "Raster Tiles",
      },
      {
        id: 2,
        name: "Vector Tiles",
      },
      {
        id: 3,
        name: "GeoJSON",
      },
    ],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card-content {
  padding: 0.5em 1.5em 0.5em 1.5em;
}
</style>
