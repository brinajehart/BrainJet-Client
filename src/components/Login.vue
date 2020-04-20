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
                <router-link class="form-link" to="/register">Don't have an account yet?</router-link>
                <v-spacer />
                <v-avatar
                  @click="googleLogin()"
                  class="google-login-btn mx-3"
                  v-tooltip="'Sign in with google'"
                >
                  <img src="./../assets/google-logo.png" alt="Google" />
                </v-avatar>
                <v-btn color="indigo white-text" :disabled="!valid" @click="login()">Sign In</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          <v-img src="./../assets/logo-dark.png" aspect-ratio="2.26"></v-img>
        </v-col>
      </v-row>
    </div>
    <bj-loading v-if="loading" />
  </div>
</template>

<script>
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
  methods: {
    async login() {
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
    }
  }
};
</script>