<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head
          v-for="(value, key) in this.geoJSONdataSingleFeatureProps.properties"
          :key="key"
          >{{ key }}</md-table-head
        >
      </md-table-row>
      <md-table-row v-for="item in this.geoJSONdataProps" :key="item.id">
        <md-table-cell v-for="(value, key) in item.properties" :key="key"
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
</template>

<script>
export default {
  name: "TableAttributesGeoJSON",
  props: {
    geoJSONdataSingleFeatureProps: Object,
    geoJSONdataProps: Array,
  },
  methods: {
    fitSelectedJSONfeatures() {
      this.$emit("fit-features", "");
    },
    resetGeoJSONdata() {
      this.$emit("reset-geojson", "");
    },
  },
};
</script>


<style lang="css">
</style>