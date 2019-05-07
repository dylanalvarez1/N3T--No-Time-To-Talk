<template>
  <div class="card-container">
    <div class="card-header">
      <div class="card-title">
        <h3>Sign in</h3>
        <hr />
      </div>
    </div>
    <div class="user-input">
      <form @submit.prevent="loginUser">
        <div class="user-name">
          <label for="name">Username:</label>
          <input
            v-model="user"
            type="text"
            placeholder="username"
            class="input"
          />
          <input type="submit" class="submit-button" value="Set" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.currentUser = this.user;
  },
  methods: {
    loginUser(e) {
      e.preventDefault();
      console.log("in login");
      this.$emit("loginUser", this.user);
    }
  }
};
</script>
<style>
.card-container {
  background-color: #eee;
  width: 50%;
  padding: 10px;
  border-style: line;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
}
.card-header {
  text-align: center;
}
.card-title {
  color: black;
}
</style>
