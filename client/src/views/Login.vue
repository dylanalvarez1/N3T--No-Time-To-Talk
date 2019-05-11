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
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    loginUser(e) {
      e.preventDefault();
      this.$emit("loginUser", this.name);
    }
  }
};
</script>
<style>
.card-container {
  margin-left: 35%;
  margin-top: 10%;
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
