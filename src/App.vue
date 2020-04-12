<template>
  <v-app id="inspire">
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item class="pa-0 ma-0">
          <v-list-item-content class="pa-0 ma-0">
            <v-img src="./assets/form-logo.png" aspect-ratio="2.26"></v-img>
          </v-list-item-content>
        </v-list-item>

        <v-divider style="margin-top: 10px"></v-divider>
        <v-list-item link @click="changeNav('/tasks/calendar')">
          <v-list-item-action>
            <v-icon>mdi-calendar-today</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - Calendar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/list')">
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks - List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/create')">
          <v-list-item-action>
            <v-icon>mdi-plus-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Plan</v-list-item-title>
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

    <v-app-bar app color="indigo" dark>
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
    user: null
  }),
  created: function() {
    this.setCurrentUser();
  },
  updated() {
    this.setCurrentUser();
  },
  methods: {
    setCurrentUser: function() {
      this.user = JSON.stringify(this.$store.getters.user);
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    changeNav: function(uri) {
      this.$router.push(uri);
    }
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>
