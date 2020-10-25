<template>
  <div class="nav">
    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Web GIS App</h3>
      <md-button>Zoom</md-button>
      <md-button class="md-primary">Clean</md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.nav {
  margin-bottom: 2em;
}
</style>
