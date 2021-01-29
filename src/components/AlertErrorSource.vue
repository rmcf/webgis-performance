<template>
  <div class="md-layout md-alignment-top-center informer" key="error">
    <div
      class="md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"
    >
      <md-card>
        <md-card-header>
          <div class="md-title">Source error</div>
        </md-card-header>
        <md-card-content>
          {{ errorTextProps }}
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
  name: "AlertErrorSource",
  props: {
    errorTextProps: String,
  },
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