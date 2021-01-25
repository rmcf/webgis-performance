<template>
  <div class="md-layout md-alignment-center-center">
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
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style lang="css">
div.loading-block {
  padding: 1rem;
}
</style>