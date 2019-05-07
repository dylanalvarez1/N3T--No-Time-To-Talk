<template>
  <div id="app">
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <Chat v-if="login" :user="user" />
        <Login v-else @loginUser="loginUser" />
      </transition>
    </div>
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Chat,
    Login
  },
  data() {
    return {
      user: "",
      login: false
    };
  },
  methods: {
    loginUser(name) {
      this.user = name;
      this.login = true;
      console.log("2nd log event method");
      console.log(name);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
