<template>
  <div>
    <RoomSelect :key="updateTabs" :socket="socket" :rooms="rooms" />
    <div class="flexboxing">
      <router-view :user="user" :socket="socket" />
      <UserList
        :key="updateList"
        :socket="socket"
        :users="users"
        @leaveRoom="leaveRoom"
      />
    </div>
    <TypeMessage :user="user" :socket="socket" />
  </div>
</template>

<script>
import TypeMessage from "@/components/TypeMessage";
import RoomSelect from "@/components/RoomSelect";
import UserList from "@/components/UserList";
import io from "socket.io-client";

export default {
  components: {
    RoomSelect,
    TypeMessage,
    UserList
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showCreateRoom: false,
      rooms: ["global"],
      socket: io("localhost:3001"),
      updateTabs: 0,
      updateList: 0,
      users: []
    };
  },
  mounted() {
    this.joinRoom();

    this.socket.on("LEAVE_CHAT", data => {
      this.users = this.users.filter(
        user => user.room != data.room || user.id != data.id
      );
    });

    this.socket.on("REMOVE_USER", leavingUser => {
      this.users = this.users.filter(user => user.id != leavingUser.id);
    });

    this.socket.on("GET_USERS_IN_ROOM", data => {
      let { users, room } = data;
      let removeResidual = this.users.filter(user => user.room != room);
      this.users = [...removeResidual, ...users];
      this.updateList += 1;
    });

    this.socket.on("CREATE_CHAT", data => {
      this.rooms.push(data.room);
      this.$router.push(`/room/${data.room}`);
      this.joinRoom();
      this.updateTabs += 1;
      this.updateList += 1;
    });
  },
  methods: {
    leaveRoom() {
      let room = this.$route.params.room;
      this.socket.emit("LEAVE_CHAT", {
        room: room,
        id: this.socket.id,
        user: this.user
      });
      this.rooms = this.rooms.filter(otherrooms => otherrooms != room);
      this.updateTabs += 1;
      this.$router.push("global");
    },
    joinRoom() {
      this.socket.emit("ENTER_CHAT", {
        user: this.user,
        message: `${this.user} has joined the chat!`,
        server: true,
        room: this.$route.params.room
      });
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
