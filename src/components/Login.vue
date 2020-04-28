<template>
  <div class="no-back-wrapper">
    <div class="no-back-container login-form">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="2"></v-col>
        <v-col cols="12" sm="8" md="9">
          <v-form ref="form" v-model="valid" style="width: 100%" align="center" justify="center">
            <v-card class="elevation-0 base-form-card" style="margin-bottom: 20px">
              <v-toolbar color="transparent" dark flat>
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="form.username"
                  label="Username"
                  name="username"
                  type="text"
                />
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  name="password"
                  type="password"
                  :rules="[v => !!v || 'Item is required']"
                />
              </v-card-text>
              <v-card-actions>
                <a
                  class="form-link"
                  style="text-decoration: underline"
                  @click="forgotPassword"
                >Forgot Password?</a>
                <v-spacer />
                <v-avatar
                  @click="googleLogin()"
                  class="google-login-btn mx-3"
                  v-tooltip="'Sign in with google'"
                >
                  <img src="./../assets/google-logo.png" alt="Google" />
                </v-avatar>
                <v-btn color="indigo white-text" @click="login()">Sign In</v-btn>
              </v-card-actions>
              <v-card-actions>
                <router-link
                  style="margin-left: 15px"
                  class="form-link"
                  to="/register"
                >Create a new account</router-link>
              </v-card-actions>
            </v-card>
          </v-form>
          <v-img src="./../assets/logo-dark.png" class="ma-4" aspect-ratio="2.26"></v-img>
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
        username: "",
        password: ""
      },
      loading: false,
      valid: true
    };
  },
  created: async function() {
    if (this.getUrlParam("uuid")) {
      const actiaveAccountUUID = this.getUrlParam("uuid");
      const response = await api.actiaveAccount({ uuid: actiaveAccountUUID });
      if (response.status == 200) {
          if (response.data.ok) {
            this.$swal.fire("Success!", response.data.message, "success");
          } else {
            this.$swal.fire(response.data.error, "", "error");
          }
        
      }
    }

    if (this.getUrlParam('error')) {
        this.$swal.fire("A runtime error occured in the app!", "", "error");
    }
  },
  methods: {
    async login() {
      if (!this.valid) {
        this.$swal.fire("Fill out the form!", "...", "warning");
        return;
      }
      this.loading = true;
      await this.$store
        .dispatch("login", { ...this.form })
        .then(() => this.$router.push("/tasks/list"))
        .catch(() => {
          this.loading = false;
          this.$swal.fire("Failed to authenticate!", "", "error");
        });
    },
    googleLogin() {
      this.$gAuth.signIn().then(async GoogleUser => {
        this.loading = true;
        await this.$store
          .dispatch("googleAuth", { ...GoogleUser.getBasicProfile() })
          .then(() => this.$router.push("/tasks/list"))
          .catch(() => {
            this.loading = false;
            this.$swal.fire("Failed to authenticate!", "", "error");
          });
      });
    },
    forgotPassword() {
      if (!this.valid) {
        this.$swal.fire(
          "Insert username!",
          "A password reset link will be sent to your email account!",
          "warning"
        );
        return;
      }
    },
    getUrlParam(name) {
      if (
        (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
          location.search
        ))
      )
        return decodeURIComponent(name[1]);
    }
  }
};
</script>