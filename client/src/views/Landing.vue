<template>
  <div class="Landing">
    <div v-if="login" class="menu">
      <h1>Breakroom</h1>
      <Chat
        :user="user"
        :socket="socket"
        :room="room"
        @updateRoom="changeRoom"
      />
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
      login: false,
      socket: io("localhost:3001"),
      type: "",
      room: "Global"
    };
  },
  methods: {
    loginUser(name) {
      this.user = name;
      this.login = true;
    },
    changeRoom(room) {
      this.room = room;
      this.socket.emit("SUBSCRIBE", {
        topic: this.topic,
        amount: this.number,
        room: this.room
      });
      this.socket.emit("UNSUBSCRIBE", {
        room: this.room
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
</style>
