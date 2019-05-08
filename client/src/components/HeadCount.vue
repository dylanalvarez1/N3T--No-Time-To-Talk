<template>
  <div>
    <button v-if="users != null">
      {{ users.length }} connected currently.
    </button>
    <span v-if="users != null">
      <p v-for="(user, index) in users" :key="index">{{ `${user.name}` }}</p>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      default: null
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
