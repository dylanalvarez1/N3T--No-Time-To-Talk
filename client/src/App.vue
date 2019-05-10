<template>
  <div id="app">
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view :user="user" @loginUser="loginUser" />
      </transition>
    </div>
  </div>
</template>

<script>
import isAuth from "./isAuth";

export default {
  name: "App",
  data() {
    return {
      user: ""
    };
  },
  methods: {
    loginUser(name) {
      this.user = name;
      isAuth.authenticate(() => null);

      this.$router.push("/room/global");
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
.wrapper {
  height: 100%;
}
</style>
