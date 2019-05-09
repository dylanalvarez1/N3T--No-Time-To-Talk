<template>
  <md-content class="card-title">
    <span style="display: inline-block;">
      <h3>Boards</h3>
    </span>
    <md-tabs md-sync-route @md-changed="updateRoom">
      <md-tab id="Global" md-label="Global" to></md-tab>
      <md-tab id="Games" md-label="Games" to></md-tab>
      <md-tab id="Anime" md-label="Anime" to></md-tab>
      <md-tab id="Manga" md-label="Manga" to></md-tab>
      <md-tab id="Code" md-label="Code" to></md-tab>
      <md-tab id="add" md-icon="add" @click="showCreateBoard"></md-tab>
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
  },
  methods: {
    showCreateBoard() {
      this.$emit("showCreateBoard", true);
    },
    updateRoom(tab) {
      this.$emit("currentRoom", tab);
    }
  }
};
</script>
