<template>
<div class="no-back-wrapper">
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Register form</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="form.first_name" label="First Name" name="login" type="text" />
            <v-text-field v-model="form.last_name" label="Last Name" name="login" type="text" />
            <v-text-field v-model="form.username" label="Username" name="login" type="text" />
            <v-text-field v-model="form.email" label="Email" name="login" type="email" />
            <v-text-field v-model="form.password" id="password" label="Password" name="password" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <router-link class="form-link" to="/login" >Already have an account?</router-link>
          <v-spacer />
          <v-btn @click="register()" color="primary">Login</v-btn>
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
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', { ...this.form })
        .then(() => console.log("user created"))
        .catch(err => console.log(err))
    }
  }
};
</script>