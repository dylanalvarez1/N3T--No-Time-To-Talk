<template>
  <div>
    <i id="typemessage">{{ typemsg }}</i>
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
      socket: io("localhost:3001"),
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
    }
  }
};
</script>
<style scoped>
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

#typemessage {
  margin: 20%;
}
</style>
