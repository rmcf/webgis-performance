<template>
  <div class="manage">
    <md-card>
      <md-card-header>
        <div class="md-layout md-alignment-center-center">
          <span class="card-header-title">LAYERS:</span>
        </div>
      </md-card-header>
      <md-divider></md-divider>
      <md-card-content>
        <div v-for="layer in layers" :key="layer.id">
          <md-radio
            @change="$emit('layer-input', layer)"
            v-model="layerSelected"
            :value="layer.name"
            class="md-primary"
            >{{ layer.name }}</md-radio
          >
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "LayerControl",
  data: () => ({
    layerSelected: "Open Street Map",
    layers: [
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
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card-content {
  padding: 0.5em 1.5em 0.5em 1.5em;
}
.card-header-title {
  font-size: 1.3em;
}
</style>
