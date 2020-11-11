<template>
  <div class="map">
    <!-- map data for testing needs -->
    <div>Map zoom: {{ this.zoomComputed }}</div>
    <!-- <div>Map center: {{ this.centerComputed }}</div>
    <div>Min Zoom Computed: {{ this.minZoomComputed }}</div>
    <div>Min Zoom Computed: {{ this.maxZoomComputed }}</div> -->
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
    >
      <vl-view
        :zoom.sync="zoomComputed"
        :center.sync="centerComputed"
        :projection="projComputed"
        :max-zoom="maxZoomComputed"
        :min-zoom="minZoomComputed"
        v-on:update:zoom="$emit('update-zoom', dataZoom)"
        v-on:update:center="$emit('update-center', dataCenter)"
      ></vl-view>

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

      <!-- wmts layer -->
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

      <!-- wms layer -->
      <vl-layer-tile :z-index="-2" v-if="wmsLayerProp != false">
        <vl-source-wms
          :attributions="wmsLayerProp.attribution"
          :url="wmsLayerProp.url"
          :projection="wmsLayerProp.projection"
          :layers="wmsLayerProp.layer"
          :format="wmsLayerProp.format"
          :version="wmsLayerProp.version"
          :crossOrigin="wmsLayerProp.crossOrigin"
        ></vl-source-wms>
      </vl-layer-tile>

      <!-- raster tile layer -->
      <vl-layer-tile :z-index="-3" v-if="rasterTileLayerProp != false">
        <vl-source-xyz
          :url="rasterTileLayerProp.source"
          :attributions="rasterTileLayerProp.attribution"
        ></vl-source-xyz>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

// new CRS registration
proj4.defs(
  "EPSG:3301",
  "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

export default {
  name: "Map",
  props: {
    rasterTileLayerProp: [Boolean, Object],
    wmtsLayerProp: [Boolean, Object],
    wmsLayerProp: [Boolean, Object],
    vectorLayerProp: [Boolean, Object],
    vectorTileLayerProp: [Boolean, Object],
    mapZoomProp: Number,
    mapCenterProp: Array,
  },
  data() {
    return {
      dataZoom: this.zoomComputed,
      dataCenter: this.centerComputed,
    };
  },
  computed: {
    // computed zoom property
    zoomComputed: {
      get: function () {
        return this.mapZoomProp;
      },
      set: function (newzoom) {
        this.dataZoom = newzoom;
      },
    },
    // computed minZoom
    minZoomComputed: function () {
      if (this.wmsLayerProp) {
        return this.wmsLayerProp.minZoom;
      } else {
        return 7;
      }
    },
    // computed minZoom
    maxZoomComputed: function () {
      if (this.wmsLayerProp) {
        return this.wmsLayerProp.maxZoom;
      } else {
        return 19;
      }
    },
    // computed center property
    centerComputed: {
      get: function () {
        return this.mapCenterProp;
      },
      set: function (newcenter) {
        this.dataCenter = newcenter;
      },
    },
    // computed projection
    projComputed: function () {
      return "EPSG:3857";
    },
  },
};
</script>

<style scoped>
div.map {
  height: 82vh;
}

div.inform {
  margin-top: 1em;
  padding: 1em;
  border: 2px solid #448aff;
}
</style>