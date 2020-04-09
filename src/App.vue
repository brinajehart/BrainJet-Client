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
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Plan</v-list-item-title>
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
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>BJ_TEAMZ</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid id="app">
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020 ( Brina Jehart / Janez Sedeljsak )</span>
    </v-footer>
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
    console.log('updated');
  },
  methods: {
    setCurrentUser: function() {
        this.user = JSON.stringify(this.$store.getters.user);
        console.log(this.$store.getters);
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>
