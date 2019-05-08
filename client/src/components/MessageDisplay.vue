<template>
  <div>
    <div class="card-title">
      <span style="display: inline-block;">
        <h3>Chat Group</h3>
        <button v-if="users != null" style="float: right;">
          {{ users.length }} connected currently.
        </button>
      </span>
      <hr />
    </div>
    <div id="message-area" class="card-container">
      <div v-for="(msg, index) in messages" :key="index" class="messages">
        <span v-if="!msg.server">
          <div style="display: inline-block; width: 100%; ">
            <span style="margin-left: 0px; ">
              <i>
                [{{
                  new Date().getHours() +
                    ":" +
                    (new Date().getMinutes() > 9
                      ? new Date().getMinutes()
                      : "0" + new Date().getMinutes())
                }}]
              </i>
              <b>{{ ` ${msg.user}: ` }}</b>
              <span style="word-wrap: break-word;">{{ `${msg.message}` }}</span>
            </span>
          </div>
        </span>
        <div v-else>
          <i>{{ `${msg.message}` }}</i>
        </div>
      </div>
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

    //event for messaging
    this.socket.on("MESSAGE", data => {
      this.messages.push(data);
    });

    //event when someone enters chat
    this.socket.on("ENTER_CHAT", data => {
      this.messages.push(data);
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
  updated() {
    let chatArea = document.getElementById("message-area");
    chatArea.scrollTop = chatArea.scrollHeight;
  }
};
</script>
<style scoped>
.card-container {
  background-color: #eee;
  width: 50%;
  padding: 10px;
  border-style: line;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
  overflow-y: scroll;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-left: 20%;
  height: 80vh;
}

.card-title {
  background-color: #eee;
  width: 50%;
  padding: 10px;
  border-style: line;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0;
  margin-left: 20%;
  margin-bottom: 10px;
}
#message-area {
  text-align: left !important;
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
