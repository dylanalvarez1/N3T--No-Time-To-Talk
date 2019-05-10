<template>
  <div>
    <BoardSelection
      :key="updater"
      :socket="socket"
      :boards="rooms"
      @currentRoom="updateRoom"
    />
    <div class="flexboxing">
      <router-view :user="user" :socket="socket" />
      <HeadCount :socket="socket" :room="room" @leaveRoom="leaveRoom" />
    </div>
    <MessageInput :user="user" :socket="socket" :room="room" />
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import BoardSelection from "@/components/BoardSelection";
import HeadCount from "@/components/HeadCount";
import io from "socket.io-client";

export default {
  components: {
    BoardSelection,
    MessageInput,
    HeadCount
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showCreateBoard: false,
      room: "global",
      rooms: ["global", "games", "anime", "manga", "code"],
      socket: io("localhost:3001"),
      updater: 0
    };
  },
  watch: {
    $route: function(to) {
      this.room = to.params.room;
    }
  },
  mounted() {
    //Format the data so it can display correctly
    this.rooms.forEach(room => {
      this.socket.emit("ENTER_CHAT", {
        user: this.user,
        message: `${this.user} has joined the chat!`,
        server: true,
        room
      });
    });
  },
  methods: {
    updateRoom(room) {
      this.room = room;
    },
    leaveRoom() {
      this.socket.emit("UNSUBSCRIBE", {
        room: this.room
      });
      this.rooms = this.rooms.filter(room => room != this.room);
      this.updater += 1;
      this.$router.push("global");
    }
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
