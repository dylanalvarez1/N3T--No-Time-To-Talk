<template>
  <div class="form">
    <md-dialog
      :md-active="true"
      @md-clicked-outside="formClose"
      @md-closed="formClose"
    >
      <md-dialog-content>
        <md-tabs :key="updater" class="dialog" md-dynamic-height>
          <md-tab md-label="Search" class="md-scollbar">
            <span v-if="rooms.length != 0">
              <md-list
                v-for="(room, index) in rooms"
                :key="index"
                class="make-scrollable"
              >
                <md-list-item @click="openRoom(room)">
                  <span class="md-list-item-text">{{ `${rooms[index]}` }}</span>
                </md-list-item>
              </md-list>
            </span>
            <span v-else>
              <md-list>
                <md-list-item>
                  <span class="md-list-item-text"
                    >There aren't any available rooms to join.</span
                  >
                </md-list-item>
              </md-list>
            </span>

            <md-dialog-actions>
              <md-button @click="formClose">Close</md-button>
            </md-dialog-actions>
          </md-tab>

          <md-tab md-label="Create">
            <div class="md-title">Create a room:</div>
            <div class="md-subhead">choose the values below</div>
            <md-field>
              <label for="topic">Topic</label>
              <md-input
                v-model="topic"
                type="text"
                name="topic"
                aria-placeholder="Topic"
                @keyup.enter="createRoom"
              ></md-input>
            </md-field>
            <md-field>
              <label>Size</label>
              <md-input v-model="number" type="number" min="2"></md-input>
            </md-field>
            <md-dialog-actions>
              <md-button @click="createRoom">Create</md-button>
              <md-button @click="formClose">Close</md-button>
            </md-dialog-actions>
          </md-tab>
        </md-tabs>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      number: 2,
      topic: "",
      rooms: [],
      invalid_rooms: [],
      updater: 0
    };
  },
  mounted() {
    this.socket.emit("LIST_ROOMS");

    this.socket.on("MY_ROOMS", data => {
      //invalid rooms contains rooms you have already joined
      this.invalid_rooms = data;
    });
    this.socket.on("SENT_ROOM_LIST", data => {
      //this.rooms contains only available rooms to join by filtering all rooms against ones you already are in
      this.rooms = data.filter(room => {
        return !this.invalid_rooms.includes(room);
      });
      this.updater += 1;
    });
  },
  methods: {
    formClose() {
      this.$router.go(-1);
    },
    createRoom() {
      this.socket.emit("CREATE_CHAT", {
        room: this.topic,
        amount: this.number
      });
    },
    openRoom(room) {
      this.socket.emit("JOIN_SPECIFIC_ROOM", room);
      this.formClose();
    }
  }
};
</script>
<style scoped>
.dialog {
  text-align: center;
  height: 70%;
}
h1 {
  font-size: 60px;
}
.text-area {
  border-style: solid;
  border-color: black;
  border-radius: 1px;
}
.md-scroll-mask {
  z-index: 0 !important;
}

md-list.make-scrollable {
  height: 300px;
  overflow-y: scroll;
}
</style>
