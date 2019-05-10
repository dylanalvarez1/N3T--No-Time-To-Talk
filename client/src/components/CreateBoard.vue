<template>
  <div class="form">
    <md-dialog
      :md-active="true"
      @md-clicked-outside="formClose"
      @md-closed="formClose"
    >
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">Create a room:</div>
          <div class="md-subhead">choose the values below</div>
        </md-card-header>
        <md-card-content>
          <md-field md-inline>
            <label>Topic</label>
            <md-input v-model="topic"></md-input>
          </md-field>
          <md-field>
            <label>Size</label>
            <md-input v-model="number" type="number" min="2"></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button @click="createRoom">Create</md-button>
          <md-button @click="formClose">Close</md-button>
        </md-card-actions>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      default: null
    },
    room: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      number: {
        type: Number,
        default: 2
      },
      topic: {
        type: String,
        default: ""
      }
    };
  },
  methods: {
    formClose() {
      this.$router.go(-1);
    },
    createRoom() {
      this.socket.emit("SUBSCRIBE", {
        topic: this.topic,
        amount: this.number,
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
