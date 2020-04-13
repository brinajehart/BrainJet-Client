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
        <v-list-item link @click="changeNav('/tasks/list')">
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/calendar')">
          <v-list-item-action>
            <v-icon>mdi-calendar-today</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - Calendar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/create')">
          <v-list-item-action>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/chats')">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Your Chats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/profile')">
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
      <v-avatar v-tooltip="'Toggle theme'">
        <v-icon @click="toggleTheme()">{{ !isLightTheme ? 'mdi-brightness-3' : 'mdi-brightness-7'}}</v-icon>
      </v-avatar>
      <v-toolbar-title style="margin-left: 5px">{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-avatar color="red">
          <span class="white--text headline">{{ user | genavatar }}</span>
        </v-avatar>
        <span style="margin-left: 10px">{{ user | fullname }}</span>
      </div>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid id="app">
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    user: null,
    isLightTheme: false
  }),
  created: function() {
    this.setCurrentUser();
    const theme = JSON.parse(this.$store.getters.theme);
    if (theme) {
        this.isLightTheme = theme.light;
    }
  },
  updated() {
    this.setCurrentUser();
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("theme", { light: !this.isLightTheme }).then(() => {
        this.isLightTheme = !this.isLightTheme;
      });
    },
    setCurrentUser: function() {
      this.user = JSON.stringify(this.$store.getters.user);
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    changeNav: function(uri) {
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
