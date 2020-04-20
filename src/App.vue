<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-bind:dark="!isLightTheme"
      v-bind:class="{ 'dark-navigation': !isLightTheme, 'light-navigation': isLightTheme }"
      app
    >
      <v-list dense>
        <v-list-item class="pa-0 ma-0">
          <v-list-item-content class="pa-0 ma-0">
            <v-img v-if="!isLightTheme" src="./assets/logo-light.png" aspect-ratio="2.26"></v-img>
            <v-img v-else src="./assets/logo-dark.png" aspect-ratio="2.26"></v-img>
          </v-list-item-content>
        </v-list-item>

        <v-divider style="margin-top: 10px"></v-divider>
        <v-list-item
          link
          @click="changeNav('/tasks/list')"
          v-on:mousedown.middle="changeNav('/profile', true)"
        >
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="changeNav('/tasks/calendar')"
          v-on:mousedown.middle="changeNav('/tasks/calendar', true)"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-today</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - Calendar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="changeNav('/tasks/create')"
          v-on:mousedown.middle="changeNav('/profile', true)"
        >
          <v-list-item-action>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="changeNav('/chats')"
          v-on:mousedown.middle="changeNav('/profile', true)"
        >
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Your Chats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="changeNav('/profile')"
          v-on:mousedown.middle="changeNav('/profile', true)"
        >
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="registerNewUser()">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register New User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider style="margin-top: 10px"></v-divider>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 credits">
          <small>
            &copy; 2020
            <br />( Brina Jehart & Janez Sedeljsak )
          </small>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-2" dark>
      <v-toolbar-title class="ma-2">{{ $route.name }}</v-toolbar-title>
      <v-divider class="mx-3" vertical></v-divider>
      <v-avatar v-tooltip="'Go back'">
        <v-icon @click="$router.go(-1)">mdi-history</v-icon>
      </v-avatar>
      <v-divider class="mx-3" vertical></v-divider>
      <v-avatar v-tooltip="'Toggle theme'">
        <v-icon @click="toggleTheme()">{{ !isLightTheme ? 'mdi-brightness-3' : 'mdi-brightness-7'}}</v-icon>
      </v-avatar>
      <v-divider class="mx-3" vertical></v-divider>
      <v-spacer></v-spacer>
      <div>
        <v-avatar
          v-tooltip="'View profile'"
          :color="profileImage ? 'transparent' : 'red'"
          class="user-avatar"
          @click="changeNav('/profile')"
          v-on:mousedown.middle="changeNav('/profile', true)"
        >
          <img v-if="profileImage" :src="profileImage" @error="profileImage = null" alt="Google" />
          <span v-else class="white--text headline">{{ user | genavatar }}</span>
        </v-avatar>
        <span style="margin-left: 10px">{{ user | fullname }}</span>
      </div>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid id="app">
        <router-view />
      </v-container>
    </v-content>

    <bj-loading v-if="loading" />
  </v-app>
</template>

<script>
import md5 from "md5";
export default {
  name: "App",

  data: () => ({
    user: null,
    isLightTheme: true,
    loading: false,
    isGoogleAuth: false,
    profileImage: null
  }),
  created: function() {
    this.setCurrentUser();
    const theme = JSON.parse(this.$store.getters.theme);
    if (theme) this.isLightTheme = theme.light;
    this.getAvatarUrl();
  },
  watch: {
    $route() {
      this.setCurrentUser();
      this.getAvatarUrl();
    }
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("theme", { light: !this.isLightTheme }).then(res => {
        this.isLightTheme = res.light;
      });
    },
    getAvatarUrl() {
      if (this.user) {
        const { email } = this.user;
        const url = `http://www.gravatar.com/avatar/${md5(
          email
        )}.jpg?s=80&d=undefined`;
        this.profileImage = url;
      }
    },
    setCurrentUser: function() {
      const currentUser = this.$store.getters.user;
      if (currentUser)
        this.user =
          typeof currentUser != typeof {}
            ? JSON.parse(currentUser)
            : currentUser;

      this.isGoogleAuth = !!this.user.isGoogleAuth;
    },
    logout: async function() {
      this.loading = true;
      await this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.$swal.fire("Unknown error occured!", "", "error");
        });
    },
    changeNav: function(uri, newWindow = false) {
      debugger;
      window.event.preventDefault();
      if (newWindow) {
        window.open(uri, "_blank");
        return;
      }
      if (this.$router.currentRoute.path == uri) return;
      this.$router.push(uri);
    },
    registerNewUser() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You will be logged out of your current account!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm"
        })
        .then(result => {
          if (result.value) {
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/register");
            });
          }
        });
    }
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
@import "./assets/tooltip.css";
</style>
