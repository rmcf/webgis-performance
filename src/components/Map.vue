<template>
  <div class="map-component">
    <!-- fonts and material icons -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
    />
    <!-- spinner geoJSON services loading -->
    <div
      v-show="dataLoadingStatus"
      class="md-layout md-alignment-center-center"
    >
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-alignment-center-center loading-block">
          <md-progress-spinner
            :md-diameter="100"
            :md-stroke="3"
            md-mode="indeterminate"
            class="md-accent"
          ></md-progress-spinner>
        </div>
      </div>
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-alignment-center-center loading-block">
          <span class="md-display-1">Loading...</span>
        </div>
      </div>
    </div>

    <!-- alert about JSON services layer -->
    <div>
      <md-dialog-alert
        :md-active.sync="geoJsonUrlAlert"
        :md-title="alertTitleComputed"
        md-content="click on map and wait until vector objects are loaded"
      />
    </div>

    <!-- map and notification regions -->
    <transition name="fade">
      <div v-if="!dataLoadingStatus">
        <!-- block for map info -->
        <div class="map-info">
          <!-- table with attributes -->
          <transition-group name="fade">
            <div
              v-if="this.geoJSONdata.length > 0 && this.geoJsonServicesProp"
              key="table"
            >
              <md-table>
                <md-table-row>
                  <md-table-head
                    v-for="(value, key) in this.geoJSONdataSingleFeature
                      .properties"
                    :key="key"
                    >{{ key }}</md-table-head
                  >
                </md-table-row>
                <md-table-row v-for="item in this.geoJSONdata" :key="item.id">
                  <md-table-cell
                    v-for="(value, key) in item.properties"
                    :key="key"
                    >{{ value }}
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <!-- remove map and table data of Soil PygeoAPI Docker layer -->
              <div class="object-align-right">
                <div class="object-item">
                  <md-button
                    v-on:click="fitSelectedJSONfeatures()"
                    class="md-dense md-raised md-primary"
                    ><md-icon>filter_center_focus</md-icon> ZOOM
                    <md-tooltip md-direction="bottom"
                      >Zoom to selected features</md-tooltip
                    >
                  </md-button>

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

            <!-- informer when no objects -->
            <div
              v-if="
                this.geoJSONdata.length === 0 &&
                this.geoJsonServicesProp &&
                this.clickOnMapDetection == true &&
                this.geoJSONdataSourceError !== true
              "
              class="md-layout md-alignment-top-center informer"
              key="noobjects"
            >
              <div
                class="md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"
              >
                <md-card>
                  <md-card-header>
                    <div class="md-title">Nothing found</div>
                  </md-card-header>
                  <md-card-content>
                    Unfortunately, no objects were found in that location,
                    please try another one...
                  </md-card-content>
                  <md-card-actions>
                    <md-button
                      v-on:click="clickOnMapDetection = false"
                      class="md-accent"
                      ><md-icon>cancel</md-icon> CLOSE</md-button
                    >
                  </md-card-actions>
                </md-card>
              </div>
            </div>

            <!-- error source -->
            <div
              v-if="this.geoJSONdataSourceError"
              class="md-layout md-alignment-top-center informer"
              key="error"
            >
              <div
                class="md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"
              >
                <md-card>
                  <md-card-header>
                    <div class="md-title">Source error</div>
                  </md-card-header>
                  <md-card-content>
                    {{ geoJSONdataSourceErrorText }}
                  </md-card-content>
                  <md-card-actions>
                    <md-button
                      v-on:click="geoJSONdataSourceError = false"
                      class="md-accent"
                      ><md-icon>cancel</md-icon> CLOSE</md-button
                    >
                  </md-card-actions>
                </md-card>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>

    <!-- map object -->
    <div class="map-image">
      <div class="map-informer">
        <!-- current zoom badge -->
        <md-badge class="button-margin md-primary" :md-content="zoomComputed">
          <md-button @click="fitViewDefault()" class="md-raised md-icon-button">
            <md-icon>crop_free</md-icon>
            <md-tooltip
              class="md-xsmall-hide md-small-hide"
              md-direction="bottom"
              >Current map zoom</md-tooltip
            >
          </md-button>
        </md-badge>
      </div>
      <vl-map
        :data-projection="projComputed"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        @click="spatialQueryOnClick($event.coordinate)"
      >
        <vl-view
          :zoom.sync="zoomComputed"
          :center.sync="centerComputed"
          :min-zoom="minZoomComputed"
          :max-zoom="maxZoomComputed"
          v-on:update:zoom="$emit('update-zoom', dataZoom)"
          v-on:update:center="$emit('update-center', dataCenter)"
          ref="view"
        ></vl-view>

        <!-- vector layers geoJSON URL -->
        <vl-layer-vector
          :z-index="3"
          render-mode="image"
          v-if="geoJsonUrlProp != false && geoJsonUrlProp.type === 'geojsonurl'"
        >
          <vl-source-vector :url="geoJsonUrlProp.source"></vl-source-vector>
          <vl-style-box>
            <vl-style-stroke
              :color="geoJsonUrlProp.style.strokeColor"
              :width="geoJsonUrlProp.style.strokeWidth"
            ></vl-style-stroke>
            <vl-style-fill
              :color="geoJsonUrlProp.style.fillColor"
            ></vl-style-fill>
          </vl-style-box>
        </vl-layer-vector>

        <!-- vector layers geoJSON services -->
        <vl-layer-vector
          :z-index="2"
          render-mode="image"
          v-if="
            geoJsonServicesProp != false &&
            geoJsonServicesProp.type === 'geojsonservice'
          "
        >
          <vl-source-vector
            :features.sync="geoJSONdata"
            ref="geoJsonServicesSource"
          ></vl-source-vector>
          <vl-style-box>
            <vl-style-stroke
              :color="geoJsonServicesProp.style.strokeColor"
              :width="geoJsonServicesProp.style.strokeWidth"
            ></vl-style-stroke>
            <vl-style-fill
              :color="geoJsonServicesProp.style.fillColor"
            ></vl-style-fill>
          </vl-style-box>
        </vl-layer-vector>

        <!-- vector tile layer -->
        <vl-layer-vector-tile
          :z-index="1"
          v-if="
            vectorTileLayerProp != false &&
            vectorTileLayerProp.type === 'vectortile'
          "
        >
          <vl-source-vector-tile
            :url="vectorTileLayerProp.source"
          ></vl-source-vector-tile>
          <vl-style-box>
            <vl-style-stroke
              :color="vectorTileLayerProp.style.strokeColor"
              :width="vectorTileLayerProp.style.strokeWidth"
            ></vl-style-stroke>
            <vl-style-fill
              :color="vectorTileLayerProp.style.fillColor"
            ></vl-style-fill>
          </vl-style-box>
        </vl-layer-vector-tile>

        <!-- wmts layer -->
        <vl-layer-tile
          :z-index="-1"
          v-if="rasterLayerProp != false && rasterLayerProp.type === 'wmts'"
        >
          <vl-source-wmts
            :attributions="rasterLayerProp.attribution"
            :url="rasterLayerProp.url"
            :layer-name="rasterLayerProp.layerName"
            :matrix-set="rasterLayerProp.matrixSet"
            :format="rasterLayerProp.format"
            :style-name="rasterLayerProp.styleName"
          ></vl-source-wmts>
        </vl-layer-tile>

        <!-- wms layer -->
        <vl-layer-tile
          :z-index="-1"
          v-if="rasterLayerProp != false && rasterLayerProp.type === 'wms'"
        >
          <vl-source-wms
            :attributions="rasterLayerProp.attribution"
            :url="rasterLayerProp.url"
            :layers="rasterLayerProp.layer"
            :projection="rasterLayerProp.projection"
            :format="rasterLayerProp.format"
            :version="rasterLayerProp.version"
            :crossOrigin="rasterLayerProp.crossOrigin"
          ></vl-source-wms>
        </vl-layer-tile>

        <!-- raster tile layer -->
        <vl-layer-tile
          :z-index="-1"
          v-if="rasterLayerProp != false && rasterLayerProp.type === 'raster'"
        >
          <vl-source-xyz
            :url="rasterLayerProp.source"
            :attributions="rasterLayerProp.attribution"
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
    rasterLayerProp: [Boolean, Object],
    geoJsonUrlProp: [Boolean, Object],
    geoJsonServicesProp: [Boolean, Object],
    vectorTileLayerProp: [Boolean, Object],
    mapZoomProp: Number,
    mapCenterProp: Array,
    zoomMinMaxProp: Array,
  },
  // watching for geoJsonServicesProp changes
  watch: {
    geoJsonServicesProp: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.geoJSONdata = [];
        this.clickOnMapDetection = false;
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
      // onclick event
      dataCursorCoordinates: 0,
      geoJSONdata: [],
      geoJSONdataSingleFeature: [],
      // loading status
      dataLoadingStatus: false,
      clickOnMapDetection: false,
      // geo JSON url alert
      geoJsonUrlAlert: false,
      // geoJSON service source error
      geoJSONdataSourceError: false,
      geoJSONdataSourceErrorText: "",
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
    alertTitleComputed: function () {
      let text = "" + this.geoJsonServicesProp.name;
      return text;
    },
    minZoomComputed: function () {
      return this.zoomMinMaxProp[0];
    },
    maxZoomComputed: function () {
      return this.zoomMinMaxProp[1];
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
            .then(
              (response) => (
                (this.geoJSONdata = response.data.features),
                (this.geoJSONdataSingleFeature = response.data.features[0]),
                (this.clickOnMapDetection = true)
              )
            )
            .catch(
              (error) => (
                (this.geoJSONdataSourceError = true),
                (this.clickOnMapDetection = false),
                (this.geoJSONdataSourceErrorText = error)
              )
            )
            .finally(() => (this.dataLoadingStatus = false));
        }, 2000);
      }
    },
    resetGeoJSONdata() {
      this.geoJSONdata = [];
      this.clickOnMapDetection = false;
    },
    fitSelectedJSONfeatures() {
      let geoJsonServicesSourceExtent = this.$refs.geoJsonServicesSource.$source.getExtent();
      this.$refs.view.fit(geoJsonServicesSourceExtent);
    },
    fitViewDefault() {
      this.$refs.view.fit([
        2335304.088168705,
        7825928.703949485,
        3161129.7417617496,
        8401958.149106573,
      ]);
    },
  },
};
</script>

<style scoped>
div.map-image {
  height: 35rem;
  position: relative;
}

div.map-informer {
  position: absolute;
  top: 10px;
  right: 10px;
}

div.informer {
  margin-bottom: 2rem;
  padding: 1rem;
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
  margin: 5px 0px 5px 5px;
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

div.loading-block {
  padding: 1rem;
}

@media only screen and (max-width: 768px) {
  div.map-image {
    height: 70vh;
  }

  div.informer {
    margin-bottom: 1rem;
  }
}
</style>