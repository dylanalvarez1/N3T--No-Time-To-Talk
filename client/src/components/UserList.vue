<template>
  <div class="list">
    <md-content md-permanent="full">
      <md-toolbar class="md-transparent toolbar" md-elevation="0">
        <p>
          {{ filteredUsers.length }}
          in {{ $route.params.room }}.
        </p>
        <md-button class="md-raised leavebtn" @click="leaveRoom"
          >Leave</md-button
        >
      </md-toolbar>

      <span v-if="users != null">
        <md-list v-for="(user, index) in filteredUsers" :key="index">
          <md-list-item>
            <span class="md-list-item-text">{{ `${user.name}` }}</span>
          </md-list-item>
        </md-list>
      </span>
    </md-content>
  </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      default: null
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.room === this.$route.params.room);
    }
  },
  methods: {
    leaveRoom() {
      this.$emit("leaveRoom");
    }
  }
};
</script>
<style scoped>
.list {
  height: 40vh;
  width: 20%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
  background-color: white;
}
.leavebtn {
  margin-right: 0%;
}
.toolbar {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
}
</style>
