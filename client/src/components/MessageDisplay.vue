<template>
  <div>
    <div class="card-title">
      <span style="display: inline-block;">
        <h3>Chat Group</h3>
        <button v-if="users != null">
          {{ users.length }} connected currently.
        </button>
        <span v-if="users != null">
          <p v-for="(user, index) in users" :key="index">
            {{ `${user.name} has ${user.id}` }}
          </p>
        </span>
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
                  new Date(msg.timestamp).getHours() +
                    ":" +
                    (new Date(msg.timestamp).getMinutes() > 9
                      ? new Date(msg.timestamp).getMinutes()
                      : "0" + new Date(msg.timestamp).getMinutes())
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
export default {
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
      currentUser: "",
      message: "",
      messages: [],
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
    this.socket.on("ADD_USER", user => {
      this.users.push(user);
    });

    this.socket.on("USERS", users => {
      this.users = users;
    });

    this.socket.on("REMOVE_USER", leavingUser => {
      this.users = this.users.filter(user => user.name != leavingUser);
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
  overflow-y: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-left: 20%;
  height: 60vh;
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
