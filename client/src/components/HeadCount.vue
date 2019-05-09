<template>
  <div>
    <md-content md-permanent="full" class="display-container">
      <md-toolbar class="md-transparent" md-elevation="0">
        {{ users.length }} connected currently.
      </md-toolbar>

      <span v-if="users != null">
        <md-list v-for="(user, index) in users" :key="index">
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
    room: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.socket.on("USERS", users => {
      this.users = users;
    });
    this.socket.on("REMOVE_USER", leavingUser => {
      this.users = this.users.filter(user => user.name != leavingUser);
    });
    //event when someone leaves the chat
  }
};
</script>
<style scoped>
.display-container {
  padding: 10px;
  border-style: line;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
  overflow-y: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-left: 0%;
  height: 40vh;
}
</style>
