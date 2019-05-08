<template>
  <div>
    <BoardSelection :socket="socket" />
    <div class="flexboxing">
      <BoardDisplay :user="user" :socket="socket" />
      <HeadCount :socket="socket" />
    </div>
    <MessageInput :user="user" :socket="socket" />
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import BoardDisplay from "@/components/BoardDisplay";
import BoardSelection from "@/components/BoardSelection";
import HeadCount from "@/components/HeadCount";

export default {
  components: {
    BoardSelection,
    BoardDisplay,
    MessageInput,
    HeadCount
  },
  props: {
    user: {
      type: String,
      default: ""
    },
    socket: {
      type: Object,
      default: null
    }
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
<style scoped>
.flexboxing {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}
</style>
