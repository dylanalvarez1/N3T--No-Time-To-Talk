<template>
  <md-content class="card-title">
    <span style="display: inline-block;">
      <h3>Boards</h3>
    </span>
    <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="Games" to></md-tab>
      <md-tab id="tab-pages" md-label="Anime" to></md-tab>
      <md-tab id="tab-posts" md-label="Manga" to></md-tab>
      <md-tab id="tab-settings" md-label="Code" to></md-tab>
      <md-tab id="tab-disabled" md-icon="add"></md-tab>
    </md-tabs>
  </md-content>
</template>

<script>
export default {
  props: {
    boards: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.currentUser = this.user;
  }
};
</script>
