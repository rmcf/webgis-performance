<template>
  <div>
    <!-- layer title -->
    <div class="map-info_layer-name">
      <span class="map-info_layer-title">Layer: </span>
      <span
        v-if="
          this.selectedVectorTileFeatureProp.properties_.layer ==
          'msr_kaitsepuhver'
        "
        >MSR Kaitsepuhver (Vector Tiles)</span
      >
      <span
        v-if="
          this.selectedVectorTileFeatureProp.properties_.layer ==
          'kpo_kaitsepuhver'
        "
        >KPO Kaitsepuhver (Vector Tiles)</span
      >
      <span
        v-if="
          this.selectedVectorTileFeatureProp.properties_.layer == 'soil_12c_all'
        "
        >EstSoil-EH 1.2c (Vector Tiles)</span
      >
      <span
        v-if="
          this.selectedVectorTileFeatureProp.properties_.layer ==
          'MSR_veekaitsevoondi_reostustundlikkus'
        "
        >Peakraavide ja maaparandussüsteemide avatud eesvoolude
        veekaitsevööndite reostustundlikkus (Vector Tiles)</span
      >
      <span
        v-if="
          this.selectedVectorTileFeatureProp.properties_.layer ==
          'LVK_veekaitsevoondi_reostustundlikkus'
        "
        >Looduslike veekogude veekaitsevööndi reostustundlikkus (Vector
        Tiles)</span
      >
    </div>
    <!-- table of attributes -->
    <md-table>
      <md-table-row>
        <md-table-head
          v-for="(value, key) in this.selectedVectorTileFeatureProp.properties_"
          :key="key"
          >{{ key }}</md-table-head
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell
          v-for="(value, key) in this.selectedVectorTileFeatureProp.properties_"
          :key="key"
          >{{ value }}
        </md-table-cell>
      </md-table-row>
    </md-table>
    <!-- button to remove table data of selected vector tile feature -->
    <div class="object-align-right">
      <div class="object-item">
        <md-button v-on:click="removeTable" class="md-dense md-raised md-accent"
          ><md-icon>cancel</md-icon> REMOVE
          <md-tooltip md-direction="bottom">Remove selected feature</md-tooltip>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableAttributes",
  props: {
    selectedVectorTileFeatureProp: Object,
  },
  methods: {
    removeTable() {
      this.$emit("close-table");
    },
  },
};
</script>

<style lang="css">
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

div.map-info_layer-name {
  background-color: #fff;
  padding: 1.3rem 0rem 1.3rem 0rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

div.map-info_layer-name span.map-info_layer-title {
  color: grey;
}
</style>