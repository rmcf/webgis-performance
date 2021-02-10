<template>
  <div class="layer-info-region_zindex">
    <md-button
      v-on:click="increaseZindex()"
      class="md-icon-button md-dense md-primary"
    >
      <md-icon>keyboard_arrow_up</md-icon>
    </md-button>
    <md-button
      v-on:click="decreaseZindex()"
      class="md-icon-button md-dense md-primary"
    >
      <md-icon>keyboard_arrow_down</md-icon>
    </md-button>
    <md-button class="md-dense md-primary">z-index: {{ zIndex }}</md-button>
  </div>
</template>

<script>
export default {
  name: "LayerZindex",
  props: {
    layerZindexProp: String,
  },
  data() {
    return {
      zIndex: this.layerZindexProp,
    };
  },
  methods: {
    increaseZindex() {
      let zIndex = parseInt(this.layerZindexProp);
      this.zIndex = zIndex + 1;
      this.$emit("change-z", this.zIndex + "");
    },
    decreaseZindex() {
      let zIndex = parseInt(this.layerZindexProp);
      this.zIndex = zIndex - 1;
      this.$emit("change-z", this.zIndex + "");
    },
  },
};
</script>

<style scoped>
div.layer-info-region_zindex .md-button {
  margin: 0px !important;
}
</style>