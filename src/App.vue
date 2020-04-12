<template>
  <v-app id="inspire">
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item>
          <v-avatar color="red">
            <span class="white--text headline">{{ user | genavatar }}</span>
          </v-avatar>
          <v-list-item-title style="margin-left: 10px">{{ user | fullname }}</v-list-item-title>
        </v-list-item>
        <v-divider style="margin-top: 10px"></v-divider>
        <v-list-item link @click="changeNav('/tasks/calendar')">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Plan - CalendarView</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/list')">
          <v-list-item-action>
            <v-icon>mdi-dns</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Plan - ListView</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="changeNav('/tasks/create')">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Plan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider style="margin-top: 10px"></v-divider>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 credits">
          <small>&copy; 2020 <br> ( Brina Jehart & Janez Sedeljsak )</small>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>BJ_TEAMZ</v-toolbar-title>
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
