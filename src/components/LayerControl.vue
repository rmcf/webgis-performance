<template>
  <div class="manage">
    <md-card>
      <md-card-header>
        <div class="md-layout md-alignment-center-center">
          <div class="md-center">
            <span class="md-title">Layer Management</span>
          </div>
        </div>
      </md-card-header>
      <md-divider></md-divider>
      <md-card-content>
        <md-list>
          <md-list-item>
            <md-radio class="md-primary" v-model="layer" :value="0" />
            <span class="md-list-item-text">No layers</span>
          </md-list-item>
          <md-list-item>
            <md-radio class="md-primary" v-model="layer" :value="1" />
            <span class="md-list-item-text">Raster Tiles</span>
          </md-list-item>
          <md-list-item>
            <md-radio class="md-primary" v-model="layer" :value="2" />
            <span class="md-list-item-text">Vector Tiles</span>
          </md-list-item>
          <md-list-item>
            <md-radio class="md-primary" v-model="layer" :value="3" />
            <span class="md-list-item-text">geoJSON</span>
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-divider></md-divider>
      <md-card-content class="md-layout md-alignment-center-center">
        <h2>Layer: {{ layer }}</h2>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "LayerControl",
  data: () => ({
    layer: 0,
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
