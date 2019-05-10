<template>
  <div>
    <BoardSelection
      :socket="socket"
      :boards="rooms"
      @currentRoom="updateRoom"
    />
    <div class="flexboxing">
      <router-view :user="user" :socket="socket" />
      <HeadCount :socket="socket" :room="room" />
    </div>
    <MessageInput :user="user" :socket="socket" :room="room" />
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import BoardSelection from "@/components/BoardSelection";
import HeadCount from "@/components/HeadCount";

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
    },
    socket: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showCreateBoard: false,
      room: "global",
      rooms: ["global", "games", "anime", "manga", "code"]
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
      this.$emit("updateRoom", room);
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
