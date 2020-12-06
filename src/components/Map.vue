<template>
  <div class="map-component">
    <!-- fonts and material icons -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons"
    />
    <!-- block for map info -->
    <div class="map-info">
      <!-- geoJSON services loading progress -->
      <div v-if="dataLoadingStatus !== false" class="object-align-center">
        <div class="object-item">
          <md-progress-spinner
            class="md-accent"
            md-mode="indeterminate"
          ></md-progress-spinner>
        </div>
        <div class="object-item"><h2 class="accent-color">Loading...</h2></div>
      </div>
      <!-- alert about Soil PygeoAPI Docker -->
      <div>
        <md-dialog-alert
          :md-active.sync="geoJsonUrlAlert"
          :md-title="alertTitleComputed"
          md-content="click on map and wait until vector objects are loaded"
        />
      </div>
      <!-- table with attributes -->
      <transition name="fade">
        <div v-if="this.geoJSONdata.length > 0 && this.geoJsonServicesProp">
          <md-table>
            <md-table-row>
              <md-table-head>ID</md-table-head>
              <md-table-head>orig_fid</md-table-head>
              <md-table-head>upd_siffer</md-table-head>
              <md-table-head>wrb_code</md-table-head>
              <md-table-head>wrb_main</md-table-head>
              <md-table-head>boniteet</md-table-head>
              <md-table-head>varv</md-table-head>
              <md-table-head>sol_zmx</md-table-head>
              <md-table-head>hydgrp</md-table-head>
              <md-table-head>area_drain</md-table-head>
              <md-table-head>drain_pct</md-table-head>
              <md-table-head>huumus</md-table-head>
            </md-table-row>
            <md-table-row v-for="item in this.geoJSONdata" :key="item.id">
              <md-table-cell>{{ item.id }}</md-table-cell>
              <md-table-cell>{{ item.properties.orig_fid }}</md-table-cell>
              <md-table-cell>{{ item.properties.upd_siffer }}</md-table-cell>
              <md-table-cell>{{ item.properties.wrb_code }}</md-table-cell>
              <md-table-cell>{{ item.properties.wrb_main }}</md-table-cell>
              <md-table-cell>{{ item.properties.boniteet }}</md-table-cell>
              <md-table-cell>{{ item.properties.varv }}</md-table-cell>
              <md-table-cell>{{ item.properties.sol_zmx }}</md-table-cell>
              <md-table-cell>{{ item.properties.hydgrp }}</md-table-cell>
              <md-table-cell>{{ item.properties.area_drain }}</md-table-cell>
              <md-table-cell>{{ item.properties.drain_pct }}</md-table-cell>
              <md-table-cell>{{ item.properties.huumus }}</md-table-cell>
            </md-table-row>
          </md-table>
          <!-- remove map and table data of Soil PygeoAPI Docker layer -->
          <div class="object-align-right">
            <div class="object-item">
              <md-button
                v-on:click="resetGeoJSONdata()"
                class="md-dense md-raised md-accent"
                ><md-icon>cancel</md-icon> REMOVE
                <md-tooltip md-direction="bottom"
                  >Remove selected features</md-tooltip
                >
              </md-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- map object -->
    <div class="map">
      <vl-map
        :data-projection="projComputed"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        @click="spatialQueryOnClick($event.coordinate)"
      >
        <vl-view
          :zoom.sync="zoomComputed"
          :center.sync="centerComputed"
          :min-zoom="zoomMinComputed"
          :max-zoom="18"
          v-on:update:zoom="$emit('update-zoom', dataZoom)"
          v-on:update:center="$emit('update-center', dataCenter)"
        ></vl-view>

        <!-- vector layers geoJSON URL -->
        <vl-layer-vector
          :z-index="3"
          render-mode="image"
          v-if="geoJsonUrlProp != false"
        >
          <vl-source-vector :url="geoJsonUrlProp.source"></vl-source-vector>
        </vl-layer-vector>

        <!-- vector layers geoJSON services -->
        <vl-layer-vector
          :z-index="2"
          render-mode="image"
          v-if="geoJsonServicesProp != false"
        >
          <vl-source-vector :features.sync="geoJSONdata"></vl-source-vector>
          <vl-style-box>
            <vl-style-stroke color="red" :width="1"></vl-style-stroke>
            <vl-style-fill color="rgb(255, 255, 255, 0.3)"></vl-style-fill>
          </vl-style-box>
        </vl-layer-vector>

        <!-- vector tile layer -->
        <vl-layer-vector-tile :z-index="1" v-if="vectorTileLayerProp != false">
          <vl-source-vector-tile
            :url="vectorTileLayerProp.source"
          ></vl-source-vector-tile>
          <vl-style-box>
            <vl-style-stroke color="red" :width="1"></vl-style-stroke>
            <vl-style-fill color="rgb(255, 255, 255, 0.3)"></vl-style-fill>
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
            :layers="wmsSublayersSelected"
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
  </div>
</template>

<script>
const axios = require("axios");
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
    geoJsonUrlProp: [Boolean, Object],
    geoJsonServicesProp: [Boolean, Object],
    vectorTileLayerProp: [Boolean, Object],
    mapZoomProp: Number,
    mapCenterProp: Array,
  },
  // watching for geoJsonServicesProp changes
  watch: {
    geoJsonServicesProp: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.geoJSONdata = [];
      }
      if (newVal != false) {
        this.geoJsonUrlAlert = true;
      }
    },
  },
  data() {
    return {
      // computed map properties
      dataZoom: this.zoomComputed,
      dataCenter: this.centerComputed,
      dataMinZoom: this.zoomMinComputed,
      // onclick event
      dataCursorCoordinates: 0,
      geoJSONdata: [],
      // loading status
      dataLoadingStatus: false,
      // geo JSON erl alert
      geoJsonUrlAlert: false,
    };
  },
  computed: {
    // computed zoom property
    zoomComputed: {
      get: function () {
        if (this.wmsLayerProp.minZoom) {
          if (this.wmsLayerProp.minZoom > this.mapZoomProp) {
            return this.wmsLayerProp.minZoom;
          } else {
            return this.mapZoomProp;
          }
        } else {
          return this.mapZoomProp;
        }
      },
      set: function (newzoom) {
        this.dataZoom = newzoom;
      },
    },
    // computed zoom property
    zoomMinComputed: {
      get: function () {
        if (this.wmsLayerProp.minZoom) {
          if (this.wmsLayerProp.minZoom > 7) {
            return this.wmsLayerProp.minZoom;
          } else {
            return 2;
          }
        } else {
          return 2;
        }
      },
      set: function (newzoom) {
        this.dataMinZoom = newzoom;
      },
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
      return "EPSG:4326";
    },
    // computed wms sublayers
    wmsSublayersSelected: function () {
      if (this.wmsLayerProp.subLayerSelected) {
        return this.wmsLayerProp.subLayerSelected.toString();
      } else {
        return "none";
      }
    },
    alertTitleComputed: function () {
      let text = "To show objects on " + this.geoJsonServicesProp.name;
      return text;
    },
  },
  methods: {
    // bbox query to EST soil map
    spatialQueryOnClick(cursorCoordinates) {
      if (this.geoJsonServicesProp) {
        this.geoJSONdata = [];
        this.dataLoadingStatus = true;
        this.dataCursorCoordinates = cursorCoordinates;
        let x = cursorCoordinates[0];
        let y = cursorCoordinates[1];
        let bbox = x + "," + y + "," + x + "," + y;
        setTimeout(() => {
          axios
            .get(this.geoJsonServicesProp.source + "?bbox=" + bbox + "&f=json")
            .then((response) => (this.geoJSONdata = response.data.features))
            .catch((error) => console.log(error))
            .finally(() => (this.dataLoadingStatus = false));
        }, 2000);
      }
    },
    resetGeoJSONdata() {
      this.geoJSONdata = [];
    },
  },
};
</script>

<style scoped>
div.map {
  height: 35rem;
}

div.inform {
  margin-top: 1em;
  padding: 1em;
  border: 2px solid #448aff;
}

.align-right {
  text-align: right;
}

div.object-align-right {
  display: flex;
  justify-content: flex-end;
}

div.object-align-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.object-item {
  margin: 5px;
}

.accent-color {
  color: #ff5252;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>