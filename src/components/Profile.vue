<template>
  <div style="width: 100%">
    <v-card style="margin-bottom: 20px">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="user.first_name" label="Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="user.last_name" label="Surname" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="user.username" label="Username" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="user.email" label="Email" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field type="password" label="New Password"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-card>
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field type="password" v-model="oldPassword" label="Confrim Old Password" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn class="ma-4" color="primary" :disabled="!oldPassword">Update</v-btn>
            <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {},
    oldPassword: ''
  }),
  created: function() {
    this.getUserFromStore();
  },
  methods: {
    getUserFromStore() {
      let currentUser = JSON.stringify(this.$store.getters.user);
      while (typeof currentUser != typeof {}) {
        currentUser = JSON.parse(currentUser);
      }
      this.user = currentUser;
    }
  }
};
</script>