<template>
  <div class="card-container">
      <div class="card-header">
          <div class="card-title">
              <span style="display: inline-block;">
                <h3>Chat Group</h3>
                <button v-if="users != null" style="float: right;" @click="showUsers">{{Object.keys(this.users).length}} </button>
              </span>
              <hr>
          </div>
          <div class="message-area">
              <div class="past-messages">
                <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <span v-if="!msg.server">
                    <div style="display: inline-block; width: 100%;">
                    <p style="float: left;"><b>{{`${msg.user}: `}}</b></p>
                    <p style="float: right;"><i>{{new Date().getHours() + ":" + new Date().getMinutes()}}</i></p>
                    </div>
                    <p>{{`${msg.message}`}}</p>
                    <hr>
                  </span>
                  <div v-else>
                    <p>{{`${msg.message}`}}</p>
                    <hr>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <i>{{this.typemsg}}</i>
      <br v-if="this.typemsg != ''"><br>
      <div class="input-area">
          <form @submit.prevent="sendMessage">
              <div class="message-input">
                  <!--hr v-if="messages[0] != null" -->
                  <label for="message">Message: </label>
                  <input type="text" v-model="message" class="input" @input="typingHandler">
                  <input type="submit" class="submit-button" value="Send"/>
              </div>

          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  props: ['user'],
  data() {
      return {
          currentUser: '',
          message: '',
          messages: [],
          socket : io('localhost:3001'),
          typemsg: "",
          timer: null,
          users: null
      }
  },
  methods: {
      sendMessage(e) {
          e.preventDefault();

          this.socket.emit('SEND_MESSAGE', {
              user: this.currentUser,
              message: this.message,
              server: false
          });

          this.socket.emit('TYPINGDONE', {
          });

          this.message = ''
      },
      typingHandler() {
        this.socket.emit('TYPING', {
          user: this.currentUser
        });

        console.log("Typing event");

        //Send a not typing message after 3 seconds of no keyboard activity
        //if no timer, create one
        if(this.timer == null) {
            this.timer = setTimeout(() => {
              this.socket.emit('TYPINGDONE', {
            });
            console.log("TIMER DONE");
            console.log(this.timer);
            this.timer = null;
            console.log(this.timer);
          }, 3000);
        }
        //if timer already, replace and reset it
        else {
          console.log("do nothing");
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
              this.socket.emit('TYPINGDONE', {
            });
          }, 3000);
        }
      },
      showUsers() {
        if(this.users != {}) {
          let users = Object.keys(this.users);
          console.log(users);
        }
        else {
          console.log("no users");
        }
      }
  },
  mounted() {

        this.currentUser = this.user;

        //Format the data so it can display correctly
        this.socket.emit('ENTER_CHAT', {
          user: this.currentUser,
          message: `${this.currentUser} has joined the chat!`,
          server: true
        });

        //event for messaging
        this.socket.on('MESSAGE', (data) => {
          this.messages.push(data);
          console.log(JSON.stringify(data));
        });

        //event when someone enters chat
        this.socket.on('ENTER_CHAT', (data) => {
          console.log("ENTER CHAT EVENT CLIENT, data: ", data.user);
          this.messages.push(data);
        });

        //event where user is typing
        this.socket.on('TYPING', (data) => {
          console.log("Typing event");
          this.typemsg = data.user + " is typing a message...\n";
        });

        //event to remove typing text
        this.socket.on('TYPINGDONE', (data) => {
          console.log("Done typing event");
          this.typemsg = "";
        });

        //event to update users list
        this.socket.on('USERS', (data) => {
          console.log("USERS event data: ", data);
            this.users = data;
            console.log("this.users:", Object.keys(this.users));
        });

        //event when someone leaves the chat
        this.socket.on('LEAVE_CHAT', (data) => {
          console.log("LEAVE CHAT EVENT CLIENT, data: ", data);
          this.messages.push({
            user: this.currentUser,
            message: `${data} has left the chat`,
            server: true
          });
        });
  }
}
</script>
<style>
  .card-container {
    background-color : #eee;
    width: 50%;
    padding: 10px;
    border-style: line;
    border-radius: 2px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0
  }
  .card-header {
    text-align: left;
  }
  .card-title {
    text-color: black;
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
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
