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
          <md-field>
            <label for="topic">Topic</label>
            <md-input
              v-model="topic"
              type="text"
              name="topic"
              aria-placeholder="Topic"
            ></md-input>
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
    }
  },
  data() {
    return {
      number: 2,
      topic: ""
    };
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
