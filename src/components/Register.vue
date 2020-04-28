<template>
  <div class="no-back-wrapper">
    <div class="no-back-container register-form">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="2"></v-col>
        <v-col cols="12" sm="8" md="9">
          <v-form ref="form" v-model="valid" style="width: 100%">
            <v-card
              class="elevation-0 base-form-card"
              style="margin-bottom: 20px; box-shadow: none"
            >
              <v-toolbar color="transparent" dark flat>
                <v-toolbar-title>Sign Up</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="form.first_name"
                  label="Name"
                  name="login"
                  type="text"
                  required
                />
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="form.last_name"
                  label="Surname"
                  name="login"
                  type="text"
                  required
                />
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="form.username"
                  label="Username"
                  name="login"
                  type="text"
                  required
                />
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="form.email"
                  label="Email"
                  name="login"
                  type="email"
                  required
                />
                <v-text-field
                  v-model="form.password"
                  id="password"
                  :rules="[v => !!v || 'Item is required']"
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <router-link class="form-link" to="/login">Already have an account?</router-link>
                <v-spacer />
                <v-btn @click="register()" color="indigo white-text">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          <v-img src="./../assets/logo-dark.png" aspect-ratio="2.26"></v-img>
        </v-col>
      </v-row>
    </div>
    <div class="no-back-credits white-text pa-3">
      <small>&copy; 2020 ( Brina Jehart & Janez Sedeljsak )</small>
    </div>
    <bj-loading v-if="loading" />
  </div>
</template>

<script>
import api from "./../api";

export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: ""
      },
      valid: true,
      loading: false
    };
  },
  methods: {
    register: async function() {
      if (!this.valid) {
        this.$swal.fire("Fill out the form!", "...", "warning");
        return;
      }
      this.loading = true;
      const response = await api.registerUser({...this.form, uri: window.location.origin });
      if (response) {
        this.$swal
          .fire("Success!", response.data.message, "success")
          .then(() => {
            this.$router.push("/login");
          });
      }
      this.loading = false;
    }
  }
};
</script>