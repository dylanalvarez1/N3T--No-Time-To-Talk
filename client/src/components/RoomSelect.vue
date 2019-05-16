<template>
  <md-content class="card-title">
    <span style="display: inline-block;">
      <h3>rooms</h3>
    </span>
    <md-tabs md-sync-route :md-active-tab="$route.params.room">
      <md-tab
        v-for="(room, index) in rooms"
        :id="room"
        :key="index"
        :md-label="room"
        :to="room"
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
    rooms: {
      type: Array,
      default: () => []
    }
  }
};
</script>
