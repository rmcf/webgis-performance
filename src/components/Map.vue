<template>
  <div class="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center"></vl-view>

      <!-- vector layer -->
      <vl-layer-vector render-mode="image" v-if="vectorLayerProp != false">
        <vl-source-vector :url="vectorLayerProp.source"></vl-source-vector>
      </vl-layer-vector>

      <!-- raster tile layer -->
      <vl-layer-tile :z-index="-2" v-if="rasterTileLayerProp != false">
        <vl-source-xyz :url="rasterTileLayerProp.source"></vl-source-xyz>
      </vl-layer-tile>

      <!-- wms tile layer -->
      <vl-layer-tile :z-index="-1" v-if="wmsLayerProp != false">
        <vl-source-wmts
          :attributions="wmsLayerProp.attribution"
          :url="wmsLayerProp.url"
          :layer-name="wmsLayerProp.layerName"
          :matrix-set="wmsLayerProp.matrixSet"
          :format="wmsLayerProp.format"
          :style-name="wmsLayerProp.styleName"
        ></vl-source-wmts>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    rasterTileLayerProp: [Boolean, Object],
    wmsLayerProp: [Boolean, Object],
    vectorLayerProp: [Boolean, Object],
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