<template>
  <div class="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center"></vl-view>

      <vl-layer-tile>
        <vl-source-xyz :url="layer.source"></vl-source-xyz>
      </vl-layer-tile>
    </vl-map>

    <div class="inform">
      Zoom: {{ zoom }}<br />
      Center: {{ center }}<br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    layer: Object,
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