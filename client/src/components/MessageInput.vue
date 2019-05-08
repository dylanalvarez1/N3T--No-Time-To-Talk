<template>
  <div>
    <div class="input-area">
      <md-field @submit.prevent="sendMessage">
        <md-textarea
          v-model="message"
          type="text"
          class="input"
          placeholder="Type here!"
          @keydown="typingHandler"
        />
      </md-field>
      <i id="typemessage">{{ typemsg }}</i>
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
      typemsg: ""
    };
  },
  mounted() {
    this.currentUser = this.user;
    //event where user is typing
    this.socket.on("TYPING", data => {
      this.typemsg = data.user + " is typing a message...\n";
    });

    //event to remove typing text
    this.socket.on("TYPINGDONE", () => {
      this.typemsg = "";
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.currentUser,
        message: this.message,
        timestamp: new Date().toISOString(),
        server: false
      });

      this.socket.emit("TYPINGDONE", {});
      this.message = "";
    },
    typingHandler(e) {
      if (e.keyCode === 13) {
        this.sendMessage(e);
      }
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
    }
  }
};
</script>

<style scoped>
.input-area {
  text-align: center;
  padding: 0 0 0 20%;
  width: 70%;
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
