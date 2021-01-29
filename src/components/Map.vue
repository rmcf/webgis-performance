<template>
  <div class="map-component">
    <!-- fonts and material icons -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
    />

    <!-- alert about JSON services layer -->
    <md-dialog-alert
      :md-active.sync="geoJsonUrlAlert"
      :md-title="geoJSONserviceLayerComputed.name"
      md-content="click on map and wait until vector objects are loaded"
    />

    <!-- spinner geoJSON services loading -->
    <Spinner v-show="dataLoadingStatus" />

    <!-- map and notification regions -->
    <transition name="fade">
      <div v-if="!dataLoadingStatus">
        <!-- block for map info -->
        <div class="map-info">
          <transition-group name="fade">
            <!-- table with attributes of selected vector tile feature -->
            <TableAttributes
              v-if="selectedVectorTileFeature"
              :selectedVectorTileFeatureProp="selectedVectorTileFeature"
              key="tableAttributes"
              v-on:close-table="selectedVectorTileFeature = false"
            />

            <!-- table with attributes of selected Soil PygeoAPI Docker features -->
            <TableAttributesGeoJSON
              v-if="
                this.geoJSONdata.length > 0 && this.geoJSONserviceLayerComputed
              "
              key="TableAttributesGeoJSON"
              v-on:fit-features="fitSelectedJSONfeatures()"
              v-on:reset-geojson="resetGeoJSONdata()"
              :geoJSONdataSingleFeatureProps="geoJSONdataSingleFeature"
              :geoJSONdataProps="geoJSONdata"
            />

            <!-- informer when no objects -->
            <AlertNoObjects
              v-if="
                this.geoJSONdata.length === 0 &&
                this.geoJSONserviceLayerComputed &&
                this.clickOnMapDetection == true &&
                this.geoJSONdataSourceError !== true
              "
              v-on:close-alert="clickOnMapDetection = false"
              key="AlertNoObjects"
            />

            <!-- error source -->
            <AlertErrorSource
              v-if="this.geoJSONdataSourceError"
              v-on:close-alert="geoJSONdataSourceError = false"
              :errorTextProps="geoJSONdataSourceErrorText"
              key="AlertErrorSource"
            />
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
            <vl-source-vector-tile
              :url="layer.source"
              :attributions="layer.attribution"
            ></vl-source-vector-tile>
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: USDA -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme == 'legendUSDA' &&
                layer.labels === false
              "
              :factory="EstSoilMapVectorTilesStyleUSDA"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: USDA labels -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme === 'legendUSDA' &&
                layer.labels === true
              "
              :factory="EstSoilMapVectorTilesStyleUSDAlabels"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: VARV -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme == 'legendVARV' &&
                layer.labels === false
              "
              :factory="EstSoilMapVectorTilesStyleVARV"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: VARV labels -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme == 'legendVARV' &&
                layer.labels === true
              "
              :factory="EstSoilMapVectorTilesStyleVARVlabels"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: WRB -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme == 'legendWRB' &&
                layer.labels === false
              "
              :factory="EstSoilMapVectorTilesStyleWRB"
            />
            <!-- styles for EstSoil-EH 1.2c (Vector Tiles) layer: WRB labels -->
            <vl-style-func
              v-if="
                layer.id === '12cdropdenser816' &&
                layer.layerColorScheme == 'legendWRB' &&
                layer.labels === true
              "
              :factory="EstSoilMapVectorTilesStyleWRBlabels"
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
            />
            <!-- styles for MSRVeekaitse (Vector Tiles) layer -->
            <vl-style-func
              v-if="layer.id === 'MSRVeekaitse'"
              :factory="MSRVeekaitseVectorTilesStyle"
            />
            <!-- styles for LVKVeekaitse (Vector Tiles) layer -->
            <vl-style-func
              v-if="layer.id === 'LVKVeekaitse'"
              :factory="LVKVeekaitseVectorTilesStyle"
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
import Stroke from "ol/style/Stroke";
import { createStyle } from "vuelayers/lib/ol-ext";
import TableAttributes from "./TableAttributes.vue";
import Spinner from "./Spinner.vue";
import AlertNoObjects from "./AlertNoObjects.vue";
import AlertErrorSource from "./AlertErrorSource.vue";
import TableAttributesGeoJSON from "./TableAttributesGeoJSON.vue";

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
  components: {
    TableAttributes,
    Spinner,
    AlertNoObjects,
    AlertErrorSource,
    TableAttributesGeoJSON,
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
    EstSoilMapVectorTilesStyleUSDA() {
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

    // vector tiles: Estonia soil map styling: USDA labels
    EstSoilMapVectorTilesStyleUSDAlabels() {
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

    // vector tiles: Estonia soil map styling: VARV
    EstSoilMapVectorTilesStyleVARV() {
      // transparency
      const transparency = 0.7;
      // soil types colors
      const color1 = "rgba(255, 232, 82," + transparency + ")";
      const color2 = "rgba(237, 238, 238," + transparency + ")";
      const color3 = "rgba(202, 215, 215," + transparency + ")";
      const color4 = "rgba(255, 249, 130," + transparency + ")";
      const color5 = "rgba(255, 255, 223," + transparency + ")";
      const color6 = "rgba(255, 136, 147," + transparency + ")";
      const color7 = "rgba(255, 178, 250," + transparency + ")";
      const color8 = "rgba(255, 230, 250," + transparency + ")";
      const color9 = "rgba(237, 230, 250," + transparency + ")";
      const color10 = "rgba(227, 187, 255," + transparency + ")";
      const color11 = "rgba(207, 200, 255," + transparency + ")";
      const color12 = "rgba(237, 244, 209," + transparency + ")";
      const color13 = "rgba(213, 224, 168," + transparency + ")";
      const color14 = "rgba(187, 255, 187," + transparency + ")";
      const color15 = "rgba(224, 225, 141," + transparency + ")";
      const color16 = "rgba(150, 254, 220," + transparency + ")";
      const color17 = "rgba(178, 255, 255," + transparency + ")";
      const color18 = "rgba(247, 232, 191," + transparency + ")";
      const color19 = "rgba(255, 206, 163," + transparency + ")";
      const color20 = "rgba(163, 58, 23," + transparency + ")";
      const color21 = "rgba(84, 70, 70," + transparency + ")";
      // style
      var style = new Style({
        fill: new Fill({}),
      });
      // each feature styling
      return (feature) => {
        switch (feature.get("varv")) {
          case 1:
            style.getFill().setColor(color1);
            return style;
          case 2:
            style.getFill().setColor(color2);
            return style;
          case 3:
            style.getFill().setColor(color3);
            return style;
          case 4:
            style.getFill().setColor(color4);
            return style;
          case 5:
            style.getFill().setColor(color5);
            return style;
          case 6:
            style.getFill().setColor(color6);
            return style;
          case 7:
            style.getFill().setColor(color7);
            return style;
          case 8:
            style.getFill().setColor(color8);
            return style;
          case 9:
            style.getFill().setColor(color9);
            return style;
          case 10:
            style.getFill().setColor(color10);
            return style;
          case 11:
            style.getFill().setColor(color11);
            return style;
          case 12:
            style.getFill().setColor(color12);
            return style;
          case 13:
            style.getFill().setColor(color13);
            return style;
          case 14:
            style.getFill().setColor(color14);
            return style;
          case 15:
            style.getFill().setColor(color15);
            return style;
          case 16:
            style.getFill().setColor(color16);
            return style;
          case 17:
            style.getFill().setColor(color17);
            return style;
          case 18:
            style.getFill().setColor(color18);
            return style;
          case 19:
            style.getFill().setColor(color19);
            return style;
          case 20:
            style.getFill().setColor(color20);
            return style;
          default:
            style.getFill().setColor(color21);
            return style;
        }
      };
    },

    // vector tiles: Estonia soil map styling: VARV labels
    EstSoilMapVectorTilesStyleVARVlabels() {
      // transparency
      const transparency = 0.7;
      // soil types colors
      const color1 = "rgba(255, 232, 82," + transparency + ")";
      const color2 = "rgba(237, 238, 238," + transparency + ")";
      const color3 = "rgba(202, 215, 215," + transparency + ")";
      const color4 = "rgba(255, 249, 130," + transparency + ")";
      const color5 = "rgba(255, 255, 223," + transparency + ")";
      const color6 = "rgba(255, 136, 147," + transparency + ")";
      const color7 = "rgba(255, 178, 250," + transparency + ")";
      const color8 = "rgba(255, 230, 250," + transparency + ")";
      const color9 = "rgba(237, 230, 250," + transparency + ")";
      const color10 = "rgba(227, 187, 255," + transparency + ")";
      const color11 = "rgba(207, 200, 255," + transparency + ")";
      const color12 = "rgba(237, 244, 209," + transparency + ")";
      const color13 = "rgba(213, 224, 168," + transparency + ")";
      const color14 = "rgba(187, 255, 187," + transparency + ")";
      const color15 = "rgba(224, 225, 141," + transparency + ")";
      const color16 = "rgba(150, 254, 220," + transparency + ")";
      const color17 = "rgba(178, 255, 255," + transparency + ")";
      const color18 = "rgba(247, 232, 191," + transparency + ")";
      const color19 = "rgba(255, 206, 163," + transparency + ")";
      const color20 = "rgba(163, 58, 23," + transparency + ")";
      const color21 = "rgba(84, 70, 70," + transparency + ")";
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
        switch (feature.get("varv")) {
          case 1:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color1);
            return style;
          case 2:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color2);
            return style;
          case 3:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color3);
            return style;
          case 4:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color4);
            return style;
          case 5:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color5);
            return style;
          case 6:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color6);
            return style;
          case 7:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color7);
            return style;
          case 8:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color8);
            return style;
          case 9:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color9);
            return style;
          case 10:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color10);
            return style;
          case 11:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color11);
            return style;
          case 12:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color12);
            return style;
          case 13:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color13);
            return style;
          case 14:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color14);
            return style;
          case 15:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color15);
            return style;
          case 16:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color16);
            return style;
          case 17:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color17);
            return style;
          case 18:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color18);
            return style;
          case 19:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color19);
            return style;
          case 20:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color20);
            return style;
          default:
            style.getText().setText(feature.get("est_soiltype") + "");
            style.getFill().setColor(color21);
            return style;
        }
      };
    },

    // vector tiles: Estonia soil map styling: WRB
    EstSoilMapVectorTilesStyleWRB() {
      // transparency
      const transparency = 0.7;
      // soil types colors
      const colorCM = "rgba(241, 116, 13," + transparency + ")";
      const colorLV = "rgba(223, 130, 186," + transparency + ")";
      const colorRG = "rgba(236, 185, 118," + transparency + ")";
      const colorGL = "rgba(120, 57, 179," + transparency + ")";
      const colorHS = "rgba(67, 89, 210," + transparency + ")";
      const colorUM = "rgba(112, 60, 41," + transparency + ")";
      const colorRT = "rgba(45, 208, 53," + transparency + ")";
      const colorLP = "rgba(133, 133, 133," + transparency + ")";
      const colorFL = "rgba(43, 243, 249," + transparency + ")";
      const colorPZ = "rgba(136, 183, 82," + transparency + ")";
      const colorTC = "rgba(211, 211, 211," + transparency + ")";
      const colorAR = "rgba(213, 180, 60," + transparency + ")";
      const colorVR = "rgba(164, 113, 88," + transparency + ")";
      const colorPL = "rgba(133, 182, 111," + transparency + ")";
      const colorNoValue = "rgba(255, 255, 255," + transparency + ")";
      // style
      var style = new Style({
        fill: new Fill({}),
      });
      // each feature styling
      return (feature) => {
        switch (feature.get("wrb_main")) {
          case "CM":
            style.getFill().setColor(colorCM);
            return style;
          case "LV":
            style.getFill().setColor(colorLV);
            return style;
          case "RG":
            style.getFill().setColor(colorRG);
            return style;
          case "GL":
            style.getFill().setColor(colorGL);
            return style;
          case "HS":
            style.getFill().setColor(colorHS);
            return style;
          case "UM":
            style.getFill().setColor(colorUM);
            return style;
          case "RT":
            style.getFill().setColor(colorRT);
            return style;
          case "LP":
            style.getFill().setColor(colorLP);
            return style;
          case "FL":
            style.getFill().setColor(colorFL);
            return style;
          case "PZ":
            style.getFill().setColor(colorPZ);
            return style;
          case "TC":
            style.getFill().setColor(colorTC);
            return style;
          case "AR":
            style.getFill().setColor(colorAR);
            return style;
          case "VR":
            style.getFill().setColor(colorVR);
            return style;
          case "PL":
            style.getFill().setColor(colorPL);
            return style;
          default:
            style.getFill().setColor(colorNoValue);
            return style;
        }
      };
    },

    // vector tiles: Estonia soil map styling: WRB labels
    EstSoilMapVectorTilesStyleWRBlabels() {
      // transparency
      const transparency = 0.7;
      // soil types colors
      const colorCM = "rgba(241, 116, 13," + transparency + ")";
      const colorLV = "rgba(223, 130, 186," + transparency + ")";
      const colorRG = "rgba(236, 185, 118," + transparency + ")";
      const colorGL = "rgba(120, 57, 179," + transparency + ")";
      const colorHS = "rgba(67, 89, 210," + transparency + ")";
      const colorUM = "rgba(112, 60, 41," + transparency + ")";
      const colorRT = "rgba(45, 208, 53," + transparency + ")";
      const colorLP = "rgba(133, 133, 133," + transparency + ")";
      const colorFL = "rgba(43, 243, 249," + transparency + ")";
      const colorPZ = "rgba(136, 183, 82," + transparency + ")";
      const colorTC = "rgba(211, 211, 211," + transparency + ")";
      const colorAR = "rgba(213, 180, 60," + transparency + ")";
      const colorVR = "rgba(164, 113, 88," + transparency + ")";
      const colorPL = "rgba(133, 182, 111," + transparency + ")";
      const colorNoValue = "rgba(255, 255, 255," + transparency + ")";
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
        switch (feature.get("wrb_main")) {
          case "CM":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorCM);
            return style;
          case "LV":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorLV);
            return style;
          case "RG":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorRG);
            return style;
          case "GL":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorGL);
            return style;
          case "HS":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorHS);
            return style;
          case "UM":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorUM);
            return style;
          case "RT":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorRT);
            return style;
          case "LP":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorLP);
            return style;
          case "FL":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorFL);
            return style;
          case "PZ":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorPZ);
            return style;
          case "TC":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorTC);
            return style;
          case "AR":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorAR);
            return style;
          case "VR":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorVR);
            return style;
          case "PL":
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorPL);
            return style;
          default:
            style.getText().setText(feature.get("wrb_main") + "");
            style.getFill().setColor(colorNoValue);
            return style;
        }
      };
    },

    // vector tiles: MSRVeekaitse
    MSRVeekaitseVectorTilesStyle() {
      // transparency
      const transparency = 1;
      // colors
      const color1 = "26,150,65";
      const color2 = "166,217,106";
      const color3 = "255,255,192";
      const color4 = "253,174,97";
      const color5 = "215,25,28";
      const colorNoValue = "rgba(255, 255, 255," + transparency + ")";
      // stroke colors
      const strokeColor1 = "rgb(" + color1 + ")";
      const strokeColor2 = "rgb(" + color2 + ")";
      const strokeColor3 = "rgb(" + color3 + ")";
      const strokeColor4 = "rgb(" + color4 + ")";
      const strokeColor5 = "rgb(" + color5 + ")";
      const strokeColorNoValue = "rgb(" + colorNoValue + ")";
      // fill colors
      const fillColor1 = "rgba(" + color1 + "," + transparency + ")";
      const fillColor2 = "rgba(" + color2 + "," + transparency + ")";
      const fillColor3 = "rgba(" + color3 + "," + transparency + ")";
      const fillColor4 = "rgba(" + color4 + "," + transparency + ")";
      const fillColor5 = "rgba(" + color5 + "," + transparency + ")";
      const fillColorNoValue =
        "rgba(" + colorNoValue + "," + transparency + ")";
      // style
      var style = new Style({
        fill: new Fill({}),
        stroke: new Stroke({}),
      });
      // each feature styling
      return (feature) => {
        switch (feature.get("RT_klass")) {
          case 1:
            style.getFill().setColor(fillColor1);
            style.getStroke().setColor(strokeColor1);
            return style;
          case 2:
            style.getFill().setColor(fillColor2);
            style.getStroke().setColor(strokeColor2);
            return style;
          case 3:
            style.getFill().setColor(fillColor3);
            style.getStroke().setColor(strokeColor3);
            return style;
          case 4:
            style.getFill().setColor(fillColor4);
            style.getStroke().setColor(strokeColor4);
            return style;
          case 5:
            style.getFill().setColor(fillColor5);
            style.getStroke().setColor(strokeColor5);
            return style;
          default:
            style.getFill().setColor(fillColorNoValue);
            style.getStroke().setColor(strokeColorNoValue);
            return style;
        }
      };
    },

    // vector tiles: LVKVeekaitse
    LVKVeekaitseVectorTilesStyle() {
      // transparency
      const transparency = 1;
      // colors
      const color1 = "26,150,65";
      const color2 = "166,217,106";
      const color3 = "255,255,192";
      const color4 = "253,174,97";
      const color5 = "215,25,28";
      const colorNoValue = "rgba(255, 255, 255," + transparency + ")";
      // stroke colors
      const strokeColor1 = "rgb(" + color1 + ")";
      const strokeColor2 = "rgb(" + color2 + ")";
      const strokeColor3 = "rgb(" + color3 + ")";
      const strokeColor4 = "rgb(" + color4 + ")";
      const strokeColor5 = "rgb(" + color5 + ")";
      const strokeColorNoValue = "rgb(" + colorNoValue + ")";
      // fill colors
      const fillColor1 = "rgba(" + color1 + "," + transparency + ")";
      const fillColor2 = "rgba(" + color2 + "," + transparency + ")";
      const fillColor3 = "rgba(" + color3 + "," + transparency + ")";
      const fillColor4 = "rgba(" + color4 + "," + transparency + ")";
      const fillColor5 = "rgba(" + color5 + "," + transparency + ")";
      const fillColorNoValue =
        "rgba(" + colorNoValue + "," + transparency + ")";
      // style
      var style = new Style({
        fill: new Fill({}),
        stroke: new Stroke({}),
      });
      // each feature styling
      return (feature) => {
        switch (feature.get("RT_klass")) {
          case 1:
            style.getFill().setColor(fillColor1);
            style.getStroke().setColor(strokeColor1);
            return style;
          case 2:
            style.getFill().setColor(fillColor2);
            style.getStroke().setColor(strokeColor2);
            return style;
          case 3:
            style.getFill().setColor(fillColor3);
            style.getStroke().setColor(strokeColor3);
            return style;
          case 4:
            style.getFill().setColor(fillColor4);
            style.getStroke().setColor(strokeColor4);
            return style;
          case 5:
            style.getFill().setColor(fillColor5);
            style.getStroke().setColor(strokeColor5);
            return style;
          default:
            style.getFill().setColor(fillColorNoValue);
            style.getStroke().setColor(strokeColorNoValue);
            return style;
        }
      };
    },

    KPOKaitsepuhverVectorTilesStyle() {
      let transparency = 0.4;
      let KPOKaitsepuhverColor = "190, 47, 246";
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
      let MSRKaitsepuhverColor = "190, 47, 246";
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

div.overlay-content {
  z-index: 100;
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