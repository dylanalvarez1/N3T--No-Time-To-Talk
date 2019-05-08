<template>
  <div>
    <MessageDisplay :user="user" :socket="socket" />
    <MessageInput :user="user" :socket="socket" />
  </div>
</template>

<script>
import io from "socket.io-client";
import MessageInput from "@/components/MessageInput";
import MessageDisplay from "@/components/MessageDisplay";

export default {
  components: {
    MessageInput,
    MessageDisplay
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      socket: io("localhost:3001")
    };
  },
  mounted() {
    //Format the data so it can display correctly
    this.socket.emit("ENTER_CHAT", {
      user: this.user,
      message: `${this.user} has joined the chat!`,
      server: true
    });
  }
};
</script>
<style scoped></style>
