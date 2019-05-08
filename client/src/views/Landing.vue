<template>
  <div class="Landing">
    <div v-if="login" class="menu">
      <h1>Realchan</h1>
      <md-field class="text-area">
        <label>Search here!</label>
        <md-input v-model="type"></md-input>
        <span class="md-helper-text">Search for a chat!</span>
      </md-field>
      <Chat :user="user" :socket="socket" />
    </div>
    <Login v-else @loginUser="loginUser" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import Login from "@/components/Login.vue";
import io from "socket.io-client";

export default {
  name: "Landing",
  components: {
    Chat,
    Login
  },
  data() {
    return {
      user: "",
      type: "",
      login: false,
      create: false,
      number: 2,
      topic: "",
      socket: io("localhost:3001")
    };
  },
  methods: {
    loginUser(name) {
      this.user = name;
      this.login = true;
    },
    openForm() {
      this.create = true;
    },
    formClose() {
      this.create = false;
    },
    createRoom() {
      this.socket.emit("CREATE A ROOM", {
        topic: this.topic,
        amount: this.number
      });
    }
  }
};
</script>
<style scoped>
.menu {
  text-align: center;
  width: 50%;
  margin-left: 20%;
}
h1 {
  font-size: 60px;
}
.text-area {
  border-style: solid;
  border-color: black;
  border-radius: 1px;
}
.form {
  margin: 25%;
}
</style>
