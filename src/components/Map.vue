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

      <!-- vector tile layer -->
      <vl-layer-vector-tile v-if="vectorTileLayerProp != false">
        <vl-source-vector-tile
          :url="vectorTileLayerProp.source"
        ></vl-source-vector-tile>
        <vl-style-box>
          <vl-style-stroke :width="1" color="#ff5252"></vl-style-stroke>
        </vl-style-box>
      </vl-layer-vector-tile>

      <!-- wmts tile layer -->
      <vl-layer-tile :z-index="-1" v-if="wmtsLayerProp != false">
        <vl-source-wmts
          :attributions="wmtsLayerProp.attribution"
          :url="wmtsLayerProp.url"
          :layer-name="wmtsLayerProp.layerName"
          :matrix-set="wmtsLayerProp.matrixSet"
          :format="wmtsLayerProp.format"
          :style-name="wmtsLayerProp.styleName"
        ></vl-source-wmts>
      </vl-layer-tile>

      <!-- wms tile layer -->
      <vl-layer-tile :z-index="-2" v-if="wmsLayerProp != false">
        <vl-source-wms
          :attributions="wmsLayerProp.attribution"
          :url="wmsLayerProp.url"
          :layers="wmsLayerProp.layer"
          :format="wmsLayerProp.format"
          :crossOrigin="wmsLayerProp.crossOrigin"
        ></vl-source-wms>
      </vl-layer-tile>

      <!-- raster tile layer -->
      <vl-layer-tile :z-index="-3" v-if="rasterTileLayerProp != false">
        <vl-source-xyz
          :url="rasterTileLayerProp.source"
          :attributions="rasterTileLayerProp.attribution"
          :max-zoom="rasterTileLayerProp.maxZoom"
        ></vl-source-xyz>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    rasterTileLayerProp: [Boolean, Object],
    wmtsLayerProp: [Boolean, Object],
    wmsLayerProp: [Boolean, Object],
    vectorLayerProp: [Boolean, Object],
    vectorTileLayerProp: [Boolean, Object],
  },
  data() {
    return {
      zoom: 7,
      center: [25.415567859563236, 58.62068472075629],
    };
  },
};
</script>

<style scoped>
div.map {
  height: 80vh;
}

div.inform {
  margin-top: 1em;
  padding: 1em;
  border: 2px solid #448aff;
}
</style>