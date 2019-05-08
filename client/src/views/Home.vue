<template>
  <div class="home">
    <Chat v-if="login" :user="user" />
    <Login v-else @loginUser="loginUser" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Home",
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
    }
  }
};
</script>
