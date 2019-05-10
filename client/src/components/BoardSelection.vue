<template>
  <md-content class="card-title">
    <span style="display: inline-block;">
      <h3>Boards</h3>
    </span>
    <md-tabs md-sync-route>
      <md-tab
        v-for="(board, index) in boards"
        :id="board"
        :key="index"
        :md-label="board"
        :to="board"
      ></md-tab>
      <md-tab
        id="add"
        md-icon="add"
        :to="$route.params.room + '/find_room'"
      ></md-tab>
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
