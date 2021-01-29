<template>
  <div class="md-layout md-alignment-top-center informer">
    <div
      class="md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"
    >
      <md-card>
        <md-card-header>
          <div class="md-title">Nothing found</div>
        </md-card-header>
        <md-card-content>
          Unfortunately, no objects were found in that location, please try
          another one...
        </md-card-content>
        <md-card-actions>
          <md-button v-on:click="closeAlert()" class="md-accent"
            ><md-icon>cancel</md-icon> CLOSE</md-button
          >
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertNoObjects",
  methods: {
    // emit close about action
    closeAlert() {
      this.$emit("close-alert", "");
    },
  },
};
</script>

<style lang="css">
</style>