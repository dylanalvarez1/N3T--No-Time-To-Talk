<template>
  <div class="card-container">
    <form class="md-layout" @submit.prevent="loginUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Log in</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label for="name">Username:</label>
            <md-input v-model="name" type="text" class="input" />
          </md-field>
          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary"
              >Set</md-button
            >
          </md-card-actions>
        </md-card-content>
      </md-card>
      <md-snackbar md-position="center" :md-active.sync="error" md-persistent>
        <span>{{ errmsg }}</span>
        <md-button class="md-primary" @click="error = false">Close</md-button>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      error: false,
      errmsg: ""
    };
  },
  methods: {
    async loginUser(e) {
      e.preventDefault();
      if (this.name === "") {
        this.error = true;
        this.errmsg = "Name cannot be empty.";

        return;
      }
      let payload = { name: this.name };
      let response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.status !== 200) {
        let content = await response.json();
        this.errmsg = content.msg;
        this.error = true;
      } else {
        this.$emit("loginUser", this.name);
      }
    }
  }
};
</script>
<style>
.card-container {
  margin-left: 35%;
  margin-top: 15%;
  height: 40vh;
  padding: 10px;
}
.card-header {
  text-align: center;
}
.card-title {
  color: black;
}
</style>
