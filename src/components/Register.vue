<template>
  <div class="no-back-wrapper">
    <div class="no-back-container register-form">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="2"></v-col>
        <v-col cols="12" sm="8" md="9">
          <v-card class="elevation-0 base-form-card" style="margin-bottom: 20px; box-shadow: none">
            <v-toolbar color="transparent" dark flat>
              <v-toolbar-title>Sign Up</v-toolbar-title>
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
                <v-text-field v-model="form.first_name" label="Name" name="login" type="text" />
                <v-text-field v-model="form.last_name" label="Surname" name="login" type="text" />
                <v-text-field v-model="form.username" label="Username" name="login" type="text" />
                <v-text-field v-model="form.email" label="Email" name="login" type="email" />
                <v-text-field
                  v-model="form.password"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <router-link class="form-link" to="/login">Already have an account?</router-link>
              <v-spacer />
              <v-btn @click="register()" color="indigo white-text">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
          <v-img src="./../assets/form-logo.png" aspect-ratio="2.26"></v-img>
        </v-col>
      </v-row>
    </div>
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
      },
      isLoggedIn: false
    };
  },
  created: function() {
    this.isLoggedIn = this.$store.getters.isLoggedIn;
  },
  methods: {
    register: function() {
      this.$store
        .dispatch("register", { ...this.form })
        .then(() => console.log("user created"))
        .catch(err => console.log(err));
    },
    returnHome() {
      this.$router.push("/tasks/list");
    }
  }
};
</script>