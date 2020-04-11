<template>
  <div class="no-back-wrapper">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="form.username" label="Username" name="username" type="text" />
              <v-text-field
                v-model="form.password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <router-link class="form-link" to="/register">Don't have an account yet?</router-link>
            <v-spacer />
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      this.$store.dispatch("login", { ...this.form })
        .then(() => this.$router.push('/tasks/calendar'))
        .catch(err => console.log(err))
    }
  }
};
</script>