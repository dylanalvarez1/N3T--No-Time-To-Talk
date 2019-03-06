<template>
  <div class="card-container">
      <div class="card-header">
          <div class="card-title">
              <h3>Chat Group</h3>
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
      <div class="input-area">
          <form @submit.prevent="sendMessage">
              <div class="message-input">
                  <!--hr v-if="messages[0] != null" -->
                  <label for="message">Message: </label>
                  <input type="text" v-model="message" class="input">
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
          socket : io('localhost:3001')
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
          this.message = ''
      }
  },
  mounted() {
        this.socket.on('MESSAGE', (data) => {
          this.messages.push(data);
          console.log(JSON.stringify(data));
        });



        this.currentUser = this.user;
        console.log("Just mounted");
        //Format the data so it can display correctly
        this.socket.emit('ENTER_CHAT', {
          user: this.currentUser,
          message: `${this.currentUser} has joined the chat!`,
          server: true
        });

        this.socket.on('ENTER_CHAT', (data) => {
          console.log("ENTER CHAT EVENT CLIENT, data: ", data.user);
          this.messages.push(data);
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
