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
        :md-title="geoJSONserviceLayerComputed.name"
        md-content="click on map and wait until vector objects are loaded"
      />
    </div>

    <!-- map and notification regions -->
    <transition name="fade">
      <div v-if="!dataLoadingStatus">
        <!-- block for map info -->
        <div class="map-info">
          <transition-group name="fade">
            <!-- table with attributes of selected vector tile feature -->
            <div v-if="selectedVectorTileFeature" key="tableVectorTiles">
              <div
                class="map-info_layer-name"
                v-if="
                  this.selectedVectorTileFeature &&
                  this.selectedVectorTileFeature.properties_.layer ==
                    'msr_kaitsepuhver'
                "
              >
                <span>Layer: </span>MSR Kaitsepuhver (Vector Tiles)
              </div>
              <div
                class="map-info_layer-name"
                v-if="
                  this.selectedVectorTileFeature &&
                  this.selectedVectorTileFeature.properties_.layer ==
                    'kpo_kaitsepuhver'
                "
              >
                <span>Layer: </span>KPO Kaitsepuhver (Vector Tiles)
              </div>
              <div
                class="map-info_layer-name"
                v-if="
                  this.selectedVectorTileFeature &&
                  this.selectedVectorTileFeature.properties_.layer ==
                    'soil_12c_all'
                "
              >
                <span>Layer: </span>EstSoil-EH 1.2c (Vector Tiles)
              </div>
              <div></div>
              <div></div>
              <md-table>
                <md-table-row>
                  <md-table-head
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ key }}</md-table-head
                  >
                </md-table-row>
                <md-table-row>
                  <md-table-cell
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ value }}
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <!-- remove table data of selected vector tile feature -->
              <div class="object-align-right">
                <div class="object-item">
                  <md-button
                    v-on:click="selectedVectorTileFeature = false"
                    class="md-dense md-raised md-accent"
                    ><md-icon>cancel</md-icon> REMOVE
                    <md-tooltip md-direction="bottom"
                      >Remove selected feature</md-tooltip
                    >
                  </md-button>
                </div>
              </div>
            </div>
            <!-- table with attributes of selected vector tile feature KPOKaitsepuhver -->
            <!-- <div
              v-if="KPOKaitsepuhverSingleComputed && selectedVectorTileFeature"
              key="tableVectorTiles"
            >
              <md-table>
                <md-table-row>
                  <md-table-head
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ key }}</md-table-head
                  >
                </md-table-row>
                <md-table-row>
                  <md-table-cell
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ value }}
                  </md-table-cell>
                </md-table-row>
              </md-table> -->
            <!-- remove table data of selected vector tile feature -->
            <!-- <div class="object-align-right">
                <div class="object-item">
                  <md-button
                    v-on:click="selectedVectorTileFeature = false"
                    class="md-dense md-raised md-accent"
                    ><md-icon>cancel</md-icon> REMOVE
                    <md-tooltip md-direction="bottom"
                      >Remove selected feature</md-tooltip
                    >
                  </md-button>
                </div>
              </div>
            </div> -->
            <!-- table with attributes of selected vector tile feature 12cdropdenser816 -->
            <!-- <div
              v-if="
                EstSoilMapVectorTileSingleComputed && selectedVectorTileFeature
              "
              key="tableVectorTiles"
            >
              <md-table>
                <md-table-row>
                  <md-table-head
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ key }}</md-table-head
                  >
                </md-table-row>
                <md-table-row>
                  <md-table-cell
                    v-for="(value, key) in this.selectedVectorTileFeature
                      .properties_"
                    :key="key"
                    >{{ value }}
                  </md-table-cell>
                </md-table-row>
              </md-table> -->
            <!-- remove table data of selected vector tile feature -->
            <!-- <div class="object-align-right">
                <div class="object-item">
                  <md-button
                    v-on:click="selectedVectorTileFeature = false"
                    class="md-dense md-raised md-accent"
                    ><md-icon>cancel</md-icon> REMOVE
                    <md-tooltip md-direction="bottom"
                      >Remove selected feature</md-tooltip
                    >
                  </md-button>
                </div>
              </div>
            </div> -->
            <!-- table with attributes of selected Soil PygeoAPI Docker features -->
            <div
              v-if="
                this.geoJSONdata.length > 0 && this.geoJSONserviceLayerComputed
              "
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
                this.geoJSONserviceLayerComputed &&
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
        <!-- remove all layers button -->
        <md-button
          v-on:click="removeLayersInMap"
          class="md-icon-button md-raised button-margin"
          ><md-icon>layers_clear</md-icon
          ><md-tooltip
            class="md-xsmall-hide md-small-hide"
            md-direction="bottom"
            >Remove all layers</md-tooltip
          ></md-button
        >
        <!-- current zoom badge -->
        <md-badge class="button-margin md-primary" :md-content="zoomComputed">
          <md-button
            @click="setDefaultMapZoom()"
            class="md-raised md-icon-button"
          >
            <md-icon>crop_free</md-icon>
            <md-tooltip
              class="md-xsmall-hide md-small-hide"
              md-direction="bottom"
              >Default map zoom</md-tooltip
            >
          </md-button>
        </md-badge>
      </div>
      <vl-map
        ref="map"
        :data-projection="projComputed"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        @click="spatialQueryOnClick($event)"
      >
        <vl-view
          :zoom.sync="zoomComputed"
          :center.sync="centerComputed"
          :min-zoom="2"
          :max-zoom="18"
          v-on:update:zoom="$emit('update-zoom', dataZoom)"
          v-on:update:center="$emit('update-center', dataCenter)"
          ref="view"
        ></vl-view>

        <!-- vector layers geoJSON URL -->
        <template v-for="layer in selectedLayersComputed">
          <vl-layer-vector
            :z-index="parseInt(layer.zIndex)"
            :key="layer.id"
            render-mode="image"
            v-if="layer.type === 'geojsonurl'"
          >
            <vl-source-vector :url="layer.source"></vl-source-vector>
            <vl-style-func
              v-if="layer.id === 'ProcessingZones'"
              :factory="ProcessingZonesStyles"
            /><vl-style-func
              v-if="layer.id === 'LandboardDEMGrids'"
              :factory="LandboardDEMGridsStyles"
            />
          </vl-layer-vector>
        </template>

        <!-- vector layers geoJSON services -->
        <vl-layer-vector
          v-if="geoJSONserviceLayerComputed"
          :z-index="parseInt(geoJSONserviceLayerComputed.zIndex)"
          render-mode="image"
        >
          <vl-source-vector
            :features.sync="geoJSONdata"
            ref="geoJsonServicesSource"
          ></vl-source-vector>
          <vl-style-box>
            <vl-style-stroke
              :color="geoJSONserviceLayerComputed.style.strokeColor"
              :width="geoJSONserviceLayerComputed.style.strokeWidth"
            ></vl-style-stroke>
            <vl-style-fill
              :color="geoJSONserviceLayerComputed.style.fillColor"
            ></vl-style-fill>
          </vl-style-box>
        </vl-layer-vector>

        <!-- vector tile layer -->
        <template v-for="layer in selectedLayersComputed">
          <vl-layer-vector-tile
            :z-index="parseInt(layer.zIndex)"
            :key="layer.id"
            v-if="layer.type === 'vectortile'"
          >
            <vl-source-vector-tile :url="layer.source"></vl-source-vector-tile>
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer without labels -->
            <vl-style-func
              v-if="layer.id === '12cdropdenser816' && layer.labels === false"
              :factory="EstSoilMapVectorTilesStyle"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer with labels -->
            <vl-style-func
              v-if="layer.id === '12cdropdenser816' && layer.labels === true"
              :factory="EstSoilMapVectorTilesStyleExperimental"
            />
            <!-- styles for KPO Kaitsepuhver (Vector Tiles) layer -->
            <vl-style-func
              v-if="layer.id === 'KPOKaitsepuhver'"
              :factory="KPOKaitsepuhverVectorTilesStyle"
            />
            <!-- styles for MSR Kaitsepuhver (Vector Tiles) layer -->
            <vl-style-func
              v-if="layer.id === 'MSRKaitsepuhver'"
              :factory="MSRKaitsepuhverVectorTilesStyle"
            /> </vl-layer-vector-tile
        ></template>

        <!-- wmts layer -->
        <template v-for="layer in selectedLayersComputed">
          <vl-layer-tile
            :z-index="parseInt(layer.zIndex)"
            :key="layer.id"
            v-if="layer.type === 'wmts'"
          >
            <vl-source-wmts
              :attributions="layer.attribution"
              :url="layer.url"
              :layer-name="layer.layerName"
              :matrix-set="layer.matrixSet"
              :format="layer.format"
              :style-name="layer.styleName"
            ></vl-source-wmts>
          </vl-layer-tile>
        </template>

        <!-- wms layer -->
        <template v-for="layer in selectedLayersComputed">
          <vl-layer-tile
            :z-index="parseInt(layer.zIndex)"
            :key="layer.id"
            v-if="layer.type === 'wms'"
          >
            <vl-source-wms
              :attributions="layer.attribution"
              :url="layer.url"
              :layers="layer.layer"
              :projection="layer.projection"
              :format="layer.format"
              :version="layer.version"
            ></vl-source-wms>
          </vl-layer-tile>
        </template>

        <!-- raster tile layer -->
        <template v-for="layer in selectedLayersComputed">
          <vl-layer-tile
            :z-index="parseInt(layer.zIndex)"
            :key="layer.id"
            v-if="layer.type === 'raster'"
          >
            <vl-source-xyz
              :url="layer.source"
              :attributions="layer.attribution"
            ></vl-source-xyz>
          </vl-layer-tile>
        </template>
      </vl-map>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import Text from "ol/style/Text";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import { createStyle } from "vuelayers/lib/ol-ext";

// new CRS registration
proj4.defs(
  "EPSG:3301",
  "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

export default {
  name: "Map",
  props: {
    selectedLayersProp: Array,
    mapZoomProp: Number,
    mapCenterProp: Array,
  },
  // watching for geoJsonServicesProp changes
  watch: {
    geoJSONserviceLayerComputed: function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== false) {
        this.geoJSONdata = [];
        this.geoJsonUrlAlert = true;
        this.clickOnMapDetection = false;
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
      // selected Vector Tile Feature
      selectedVectorTileFeature: false,
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
    selectedLayersComputed: function () {
      return this.selectedLayersProp;
    },
    geoJSONserviceLayerComputed: function () {
      if (this.selectedLayersProp.length > 0) {
        let list = this.selectedLayersProp;
        let geoJsonServiseLayer = list.filter(function (el) {
          return el.type === "geojsonservice";
        });
        if (geoJsonServiseLayer.length > 0) {
          return geoJsonServiseLayer[0];
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // returning EstSoilMapVectorTile layer if it is selected
    EstSoilMapVectorTileComputed: function () {
      let list = this.selectedLayersProp;
      let vectorTileLayer = list.filter(function (el) {
        return el.id === "12cdropdenser816";
      });
      if (vectorTileLayer.length > 0) {
        return vectorTileLayer[0];
      } else {
        return false;
      }
    },
    // returning Landboard DEM grids layer if it is selected
    LandboardDEMGridsComputed: function () {
      let list = this.selectedLayersProp;
      let vectorTileLayer = list.filter(function (el) {
        return el.id === "LandboardDEMGrids";
      });
      if (vectorTileLayer.length > 0) {
        return vectorTileLayer[0];
      } else {
        return false;
      }
    },
    // returning Processing zones layer if it is selected
    ProcessingZonesComputed: function () {
      let list = this.selectedLayersProp;
      let vectorTileLayer = list.filter(function (el) {
        return el.id === "ProcessingZones";
      });
      if (vectorTileLayer.length > 0) {
        return vectorTileLayer[0];
      } else {
        return false;
      }
    },
    // returning true if only 12cdropdenser816 data layer is selected
    EstSoilMapVectorTileSingleComputed: function () {
      let layers = this.selectedLayersComputed;
      let dataLayers = layers.filter(function (el) {
        return el.layerType === "data";
      });
      if (dataLayers.length == 1 && dataLayers[0].id == "12cdropdenser816") {
        return true;
      } else {
        return false;
      }
    },
    // returning true if only KPOKaitsepuhver data layer is selected
    KPOKaitsepuhverSingleComputed: function () {
      let layers = this.selectedLayersComputed;
      let dataLayers = layers.filter(function (el) {
        return el.layerType === "data";
      });
      if (dataLayers.length == 1 && dataLayers[0].id == "KPOKaitsepuhver") {
        return true;
      } else {
        return false;
      }
    },
    // returning true if only MSRKaitsepuhver data layer is selected
    MSRKaitsepuhverSingleComputed: function () {
      let layers = this.selectedLayersComputed;
      let dataLayers = layers.filter(function (el) {
        return el.layerType === "data";
      });
      if (dataLayers.length == 1 && dataLayers[0].id == "MSRKaitsepuhver") {
        return true;
      } else {
        return false;
      }
    },
    EstSoilMapVectorTilesStyleComputed: function () {
      if (this.EstSoilMapVectorTileComputed.labels === true) {
        return this.EstSoilMapVectorTilesStyle;
      } else if (this.EstSoilMapVectorTileComputed.labels === false) {
        return this.EstSoilMapVectorTilesStyle;
      } else {
        return this.EstSoilMapVectorTilesStyle;
      }
    },
  },
  methods: {
    // emit remove layers action
    removeLayersInMap() {
      this.$emit("remove-maplayers", "");
      this.selectedVectorTileFeature = false;
    },
    // emit default map zoom
    setDefaultMapZoom() {
      this.$emit("default-mapzoom", "");
    },
    // bbox query to EST soil map
    spatialQueryOnClick(event) {
      // select from Soil PygeoAPI Docker
      if (this.geoJSONserviceLayerComputed) {
        this.geoJSONdata = [];
        this.dataLoadingStatus = true;
        this.dataCursorCoordinates = event.coordinate;
        let x = event.coordinate[0];
        let y = event.coordinate[1];
        let bbox = x + "," + y + "," + x + "," + y;
        setTimeout(() => {
          axios
            .get(
              this.geoJSONserviceLayerComputed.source +
                "?bbox=" +
                bbox +
                "&f=json"
            )
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
        }, 1000);
      }
      // vector tiles: 12cdropdenser816 select single feature
      if (!this.LandboardDEMGridsComputed && !this.ProcessingZonesComputed) {
        this.selectedVectorTileFeature = false;
        let features = this.$refs.map.getFeaturesAtPixel(event.pixel);
        if (features && features.length > 0) {
          let feature = features[0];
          this.selectedVectorTileFeature = feature;
        }
      }
      // // vector tiles: KPOKaitsepuhver select single feature
      // if (this.KPOKaitsepuhverSingleComputed) {
      //   this.selectedVectorTileFeature = false;
      //   let features = this.$refs.map.getFeaturesAtPixel(event.pixel);
      //   if (features && features.length > 0) {
      //     let feature = features[0];
      //     this.selectedVectorTileFeature = feature;
      //   }
      // }
      // // vector tiles: MSRKaitsepuhver select single feature
      // if (this.MSRKaitsepuhverSingleComputed) {
      //   this.selectedVectorTileFeature = false;
      //   let features = this.$refs.map.getFeaturesAtPixel(event.pixel);
      //   if (features && features.length > 0) {
      //     let feature = features[0];
      //     this.selectedVectorTileFeature = feature;
      //   }
      // }
    },
    // vector tiles: Estonia soil map styling
    EstSoilMapVectorTilesStyle() {
      let transparency = 0.7;
      // soil types colors
      let colorS = "rgba(196,4,17," + transparency + ")";
      let colorLS = "rgba(244,134,0," + transparency + ")";
      let colorSL = "rgba(243,187,64," + transparency + ")";
      let colorL = "rgba(255,247,78," + transparency + ")";
      let colorSiL = "rgba(81,214,177," + transparency + ")";
      let colorSiCL = "rgba(48,175,210," + transparency + ")";
      let colorCL = "rgba(43,155,162," + transparency + ")";
      let colorC = "rgba(59,123,233," + transparency + ")";
      let colorHC = "rgba(43,87,186," + transparency + ")";
      let colorPEAT = "rgba(112,71,1," + transparency + ")";
      let colorGRAVELS = "rgba(140,164,173," + transparency + ")";
      let colorUnknown = "rgba(0,0,0," + transparency + ")";
      // unknown soil type
      const styleUnknown = createStyle({
        fillColor: colorUnknown,
        strokeColor: colorUnknown,
      });
      // S
      const styleS = createStyle({
        fillColor: colorS,
        strokeColor: colorS,
      });
      // LS
      const styleLS = createStyle({
        fillColor: colorLS,
        strokeColor: colorLS,
      });
      // SL
      const styleSL = createStyle({
        fillColor: colorSL,
        strokeColor: colorSL,
      });
      // L
      const styleL = createStyle({
        fillColor: colorL,
        strokeColor: colorL,
      });
      // SiL
      const styleSiL = createStyle({
        fillColor: colorSiL,
        strokeColor: colorSiL,
      });
      // SiCL
      const styleSiCL = createStyle({
        fillColor: colorSiCL,
        strokeColor: colorSiCL,
      });
      // CL
      const styleCL = createStyle({
        fillColor: colorCL,
        strokeColor: colorCL,
      });
      // C
      const styleC = createStyle({
        fillColor: colorC,
        strokeColor: colorC,
      });
      // HC
      const styleHC = createStyle({
        fillColor: colorHC,
        strokeColor: colorHC,
      });
      // PEAT
      const stylePEAT = createStyle({
        fillColor: colorPEAT,
        strokeColor: colorPEAT,
      });
      // GRAVELS
      const styleGRAVELS = createStyle({
        fillColor: colorGRAVELS,
        strokeColor: colorGRAVELS,
      });
      return (feature) => {
        // S
        if (feature.get("lxtype1") == "S") {
          return styleS;
        }
        // LS
        if (feature.get("lxtype1") == "LS") {
          return styleLS;
        }
        // SL
        if (feature.get("lxtype1") == "SL") {
          return styleSL;
        }
        // L
        if (feature.get("lxtype1") == "L") {
          return styleL;
        }
        // SiL
        if (feature.get("lxtype1") == "SiL") {
          return styleSiL;
        }
        // SiCL
        if (feature.get("lxtype1") == "SiCL") {
          return styleSiCL;
        }
        // CL
        if (feature.get("lxtype1") == "CL") {
          return styleCL;
        }
        // C
        if (feature.get("lxtype1") == "C") {
          return styleC;
        }
        // HC
        if (feature.get("lxtype1") == "HC") {
          return styleHC;
        }
        // PEAT
        if (feature.get("lxtype1") == "PEAT") {
          return stylePEAT;
        }
        // GRAVELS
        if (feature.get("lxtype1") == "GRAVELS") {
          return styleGRAVELS;
        }
        return styleUnknown;
      };
    },

    // vector tiles: Estonia soil map styling
    EstSoilMapVectorTilesStyleExperimental() {
      // transparency
      const transparency = 0.7;
      // soil types colors
      const colorS = "rgba(196,4,17," + transparency + ")";
      const colorLS = "rgba(244,134,0," + transparency + ")";
      const colorSL = "rgba(243,187,64," + transparency + ")";
      const colorL = "rgba(255,247,78," + transparency + ")";
      const colorSiL = "rgba(81,214,177," + transparency + ")";
      const colorSiCL = "rgba(48,175,210," + transparency + ")";
      const colorCL = "rgba(43,155,162," + transparency + ")";
      const colorC = "rgba(59,123,233," + transparency + ")";
      const colorHC = "rgba(43,87,186," + transparency + ")";
      const colorPEAT = "rgba(112,71,1," + transparency + ")";
      const colorGRAVELS = "rgba(140,164,173," + transparency + ")";
      const colorUnknown = "rgba(0,0,0," + transparency + ")";
      // text color
      const colorText = "rgb(33,33,33)";
      // text font
      const fontText = "11px Roboto,Calibri,sans-serif";
      // style
      var style = new Style({
        fill: new Fill({}),
        text: new Text({
          font: fontText,
          fill: new Fill({
            color: colorText,
          }),
          overflow: false,
        }),
      });
      // each feature styling
      return (feature) => {
        switch (feature.get("lxtype1")) {
          case "S":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorS);
            return style;
          case "LS":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorLS);
            return style;
          case "SL":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorSL);
            return style;
          case "L":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorL);
            return style;
          case "SiL":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorSiL);
            return style;
          case "SiCL":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorSiCL);
            return style;
          case "CL":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorCL);
            return style;
          case "C":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorC);
            return style;
          case "HC":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorHC);
            return style;
          case "PEAT":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorPEAT);
            return style;
          case "GRAVELS":
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorGRAVELS);
            return style;
          default:
            style.getText().setText(feature.get("lxtype1"));
            style.getFill().setColor(colorUnknown);
            return style;
        }
      };
    },

    KPOKaitsepuhverVectorTilesStyle() {
      let transparency = 0.4;
      let KPOKaitsepuhverColor = "93, 102, 7";
      const KPOKaitsepuhverStrokeColor = "rgb(" + KPOKaitsepuhverColor + ")";
      const KPOKaitsepuhverFillColor =
        "rgba(" + KPOKaitsepuhverColor + "," + transparency + ")";
      const KPOKaitsepuhverStyle = createStyle({
        fillColor: KPOKaitsepuhverFillColor,
        strokeColor: KPOKaitsepuhverStrokeColor,
      });
      return (feature) => {
        if (feature) {
          return KPOKaitsepuhverStyle;
        }
      };
    },

    MSRKaitsepuhverVectorTilesStyle() {
      let transparency = 0.4;
      let MSRKaitsepuhverColor = "128, 69, 6";
      const MSRKaitsepuhverStrokeColor = "rgb(" + MSRKaitsepuhverColor + ")";
      const MSRKaitsepuhverFillColor =
        "rgba(" + MSRKaitsepuhverColor + "," + transparency + ")";
      const MSRKaitsepuhverStyle = createStyle({
        fillColor: MSRKaitsepuhverFillColor,
        strokeColor: MSRKaitsepuhverStrokeColor,
      });
      return (feature) => {
        if (feature) {
          return MSRKaitsepuhverStyle;
        }
      };
    },

    ProcessingZonesStyles() {
      return (feature) => {
        let number = feature.get("id") + "";
        let processingZonesStyle = createStyle({
          strokeColor: "rgba(102, 187, 106, 0.9)",
          text: new Text({
            text: number,
            font: "16px roboto",
            overflow: false,
            fill: new Fill({
              color: "rgb(66,66,66)",
            }),
          }),
        });
        return processingZonesStyle;
      };
    },

    LandboardDEMGridsStyles() {
      return (feature) => {
        let number = feature.get("grid_id") + "";
        let processingZonesStyle = createStyle({
          strokeColor: "rgba(255, 235, 59, 0.9)",
          text: new Text({
            text: number,
            font: "12px roboto",
            overflow: false,
            fill: new Fill({
              color: "rgb(66,66,66)",
            }),
          }),
        });
        return processingZonesStyle;
      };
    },

    resetGeoJSONdata() {
      this.geoJSONdata = [];
      this.clickOnMapDetection = false;
    },

    fitSelectedJSONfeatures() {
      let geoJsonServicesSourceExtent = this.$refs.geoJsonServicesSource.$source.getExtent();
      this.$refs.view.fit(geoJsonServicesSourceExtent);
    },

    // fitViewDefault() {
    //   this.$refs.view.fit([
    //     2335304.088168705,
    //     7825928.703949485,
    //     3161129.7417617496,
    //     8401958.149106573,
    //   ]);
    // },
  },
};
</script>

<style scoped>
div.map-image {
  height: 80vh;
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

div.overlay-content {
  z-index: 100;
}

div.map-info_layer-name {
  background-color: #fff;
  padding: 1.3rem 0rem 1.3rem 0rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

div.map-info_layer-name span {
  color: grey;
}

@media only screen and (max-width: 768px) {
  div.map-image {
    height: 75vh;
  }

  div.informer {
    margin-bottom: 1rem;
  }
}
</style>