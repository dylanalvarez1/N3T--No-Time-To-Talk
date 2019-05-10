<template>
  <div class="Landing">
    <h1>Breakroom</h1>
    <Chat :user="user" :socket="socket" @updateRoom="changeRoom" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import io from "socket.io-client";

export default {
  name: "Landing",
  components: {
    Chat
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      socket: io("localhost:3001"),
      type: ""
    };
  },
  mounted() {
    if (this.user === "") {
      this.$router.push("/login");
    }
  },
  methods: {
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
