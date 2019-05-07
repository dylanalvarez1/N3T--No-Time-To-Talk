<template>
  <div class="card-container">
    <div class="card-header">
      <div class="card-title">
        <span style="display: inline-block;">
          <h3>Chat Group</h3>
          <button v-if="users != null" style="float: right;" @click="showUsers">
            {{ Object.keys(users).length }}
          </button>
        </span>
        <hr />
      </div>
      <div class="message-area">
        <div class="past-messages">
          <div v-for="(msg, index) in messages" :key="index" class="messages">
            <span v-if="!msg.server">
              <div style="display: inline-block; width: 100%;">
                <p style="float: left;">
                  <b>{{ `${msg.user}: ` }}</b>
                </p>
                <p style="float: right;">
                  <i>{{
                    new Date().getHours() + ":" + new Date().getMinutes()
                  }}</i>
                </p>
              </div>
              <p>{{ `${msg.message}` }}</p>
              <hr />
            </span>
            <div v-else>
              <p>{{ `${msg.message}` }}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
    <i>{{ typemsg }}</i>
    <br v-if="typemsg != ''" /><br />
    <div class="input-area">
      <form @submit.prevent="sendMessage">
        <div class="message-input">
          <!--hr v-if="messages[0] != null" -->
          <label for="message">Message: </label>
          <input
            v-model="message"
            type="text"
            class="input"
            @input="typingHandler"
          />
          <input type="submit" class="submit-button" value="Send" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentUser: "",
      message: "",
      messages: [],
      socket: io("localhost:3001"),
      typemsg: "",
      timer: null,
      users: null
    };
  },
  mounted() {
    this.currentUser = this.user;

    //Format the data so it can display correctly
    this.socket.emit("ENTER_CHAT", {
      user: this.currentUser,
      message: `${this.currentUser} has joined the chat!`,
      server: true
    });

    //event for messaging
    this.socket.on("MESSAGE", data => {
      this.messages.push(data);
    });

    //event when someone enters chat
    this.socket.on("ENTER_CHAT", data => {
      this.messages.push(data);
    });

    //event where user is typing
    this.socket.on("TYPING", data => {
      this.typemsg = data.user + " is typing a message...\n";
    });

    //event to remove typing text
    this.socket.on("TYPINGDONE", () => {
      this.typemsg = "";
    });

    //event to update users list
    this.socket.on("USERS", data => {
      this.users = data;
    });

    //event when someone leaves the chat
    this.socket.on("LEAVE_CHAT", data => {
      this.messages.push({
        user: this.currentUser,
        message: `${data} has left the chat`,
        server: true
      });
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.currentUser,
        message: this.message,
        server: false
      });

      this.socket.emit("TYPINGDONE", {});

      this.message = "";
    },
    typingHandler() {
      this.socket.emit("TYPING", {
        user: this.currentUser
      });

      //Send a not typing message after 3 seconds of no keyboard activity
      //if no timer, create one
      if (this.timer == null) {
        this.timer = setTimeout(() => {
          this.socket.emit("TYPINGDONE", {});
          this.timer = null;
        }, 3000);
      }
      //if timer already, replace and reset it
      else {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.socket.emit("TYPINGDONE", {});
        }, 3000);
      }
    },
    showUsers() {
      if (this.users != {}) {
        //let users = Object.keys(this.users);
      }
    }
  }
};
</script>
<style>
.card-container {
  background-color: #eee;
  width: 50%;
  padding: 10px;
  border-style: line;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
}
.card-header {
  text-align: left;
}
.card-title {
  color: black;
}
.past-messages {
  text-align: left !important;
}
.input-area {
  text-align: center;
}

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
