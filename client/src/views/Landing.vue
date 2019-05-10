<template>
  <div class="Landing">
    <h1>Breakroom</h1>
    <Chat :user="user" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";

export default {
  name: "Landing",
  components: {
    Chat
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.menu {
  text-align: center;
  width: 50%;
  margin-left: 20%;
}
h1 {
  font-size: 60px;
}
.text-area {
  border-style: solid;
  border-color: black;
  border-radius: 1px;
}
</style>
