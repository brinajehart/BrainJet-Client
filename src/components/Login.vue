<template>
  <div class="no-back-wrapper">
    <div class="no-back-container login-form">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="2"></v-col>
        <v-col cols="12" sm="8" md="9">
          <v-card class="elevation-0 base-form-card" style="margin-bottom: 20px">
            <v-toolbar color="transparent" dark flat>
              <v-toolbar-title>Sign In</v-toolbar-title>
              <v-spacer />
              <v-btn
                v-if="isLoggedIn"
                style="margin-right: 10px"
                v-tooltip="'Return Home'"
                icon
                @click="returnHome()"
              >
                <v-icon color="white">mdi-home</v-icon>
              </v-btn>
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
              <v-btn color="indigo white-text" @click="login()">Sign In</v-btn>
            </v-card-actions>
          </v-card>
          <v-img src="./../assets/form-logo.png" aspect-ratio="2.26"></v-img>
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
      isLoggedIn: false
    };
  },
  created: function() {
    this.isLoggedIn = this.$store.getters.isLoggedIn;
  },
  methods: {
    async login() {
      this.loading = true;
      await this.$store
        .dispatch("login", { ...this.form })
        .then(() => this.$router.push("/tasks/list"))
        .catch(err => {
          this.loading = false;
          this.$swal.fire("Failed to authenticate!", "", "error");
          console.log(err);
        });
    },
    returnHome() {
      this.$router.push("/tasks/list");
    }
  }
};
</script>