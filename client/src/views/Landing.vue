<template>
  <div class="Landing">
    <div v-if="login" class="menu">
      <h1>Realchan</h1>
      <md-field class="text-area">
        <label>Search here!</label>
        <md-input v-model="type"></md-input>
        <span class="md-helper-text">Search for a chat!</span>
      </md-field>
      <md-button class="md-raised md-primary" @click="openForm"
        >Create a room</md-button
      >

      <div v-if="create" class="form">
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
      </div>
      <Chat :user="user" />
    </div>
    <Login v-else @loginUser="loginUser" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import Login from "@/components/Login.vue";
import io from "socket.io-client";

export default {
  name: "Landing",
  components: {
    Chat,
    Login
  },
  data() {
    return {
      /* user: {
          type: String,
          default: ""
      },
      login: {
          type: Boolean,
          default: false
      },
      create: {
          type: Boolean,
          default: false
      },
      number:  {
          type: Number,
          default: 2
      },
      topic: {
          type: String,
          default: ""
      }, */
      user: "",
      login: false,
      create: false,
      number: 2,
      topic: "",
      socket: io("localhost:3001")
    };
  },
  methods: {
    loginUser(name) {
      this.user = name;
      this.login = true;
    },
    openForm() {
      this.create = true;
    },
    formClose() {
      this.create = false;
    },
    createRoom() {
      this.socket.emit("CREATE A ROOM", {
        topic: this.topic,
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
.form {
  margin: 25%;
}
</style>
