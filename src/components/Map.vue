<template>
  <div class="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center"></vl-view>

      <!-- attempt to pass geojson features to vector source -->
      <vl-layer-vector render-mode="image">
        <vl-source-vector :features="features"></vl-source-vector>
      </vl-layer-vector>

      <!-- tile layers -->
      <vl-layer-tile :z-index="-1">
        <vl-source-xyz :url="rasterTileLayerProp.source"></vl-source-xyz>
      </vl-layer-tile>

      <!-- vector layer just with URL props -->
      <!-- <vl-layer-vector render-mode="image">
        <vl-source-vector :url="geojsonUrl"></vl-source-vector>
      </vl-layer-vector> -->
    </vl-map>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    rasterTileLayerProp: Object,
    geojsonUrl: String,
    features: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      zoom: 7,
      center: [25.371622547063208, 58.602373945187594],
    };
  },
};
</script>

<style scoped>
div.map {
  height: 70vh;
}

div.inform {
  margin-top: 1em;
  padding: 1em;
  border: 2px solid #448aff;
}
</style>