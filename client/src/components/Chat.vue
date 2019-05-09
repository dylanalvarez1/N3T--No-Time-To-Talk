<template>
  <div>
    <CreateBoard
      :socket="socket"
      :show-dialog="showCreateBoard"
      :room="room"
      @hideBoard="hideBoard"
    />
    <BoardSelection
      :socket="socket"
      @showCreateBoard="showBoard"
      @currentRoom="updateRoom"
    />
    <div class="flexboxing">
      <BoardDisplay
        v-show="room == 'Global'"
        :user="user"
        :socket="socket"
        :room="'Global'"
      />
      <BoardDisplay
        v-show="room == 'Games'"
        :user="user"
        :socket="socket"
        :room="'Games'"
      />
      <BoardDisplay
        v-show="room == 'Anime'"
        :user="user"
        :socket="socket"
        :room="'Anime'"
      />
      <HeadCount :socket="socket" :room="room" />
    </div>
    <MessageInput :user="user" :socket="socket" :room="room" />
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import BoardDisplay from "@/components/BoardDisplay";
import BoardSelection from "@/components/BoardSelection";
import HeadCount from "@/components/HeadCount";
import CreateBoard from "@/components/CreateBoard";

export default {
  components: {
    BoardSelection,
    BoardDisplay,
    MessageInput,
    HeadCount,
    CreateBoard
  },
  props: {
    user: {
      type: String,
      default: ""
    },
    socket: {
      type: Object,
      default: null
    },
    room: {
      type: String,
      default: "Global"
    }
  },
  data() {
    return {
      showCreateBoard: false
    };
  },
  mounted() {
    //Format the data so it can display correctly
    this.socket.emit("ENTER_CHAT", {
      user: this.user,
      message: `${this.user} has joined the chat!`,
      server: true,
      room: this.room
    });
  },
  methods: {
    showBoard(bool) {
      this.showCreateBoard = bool;
    },
    hideBoard(bool) {
      this.showCreateBoard = bool;
    },
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
