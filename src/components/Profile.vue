<template>
  <div style="width: 100%">
    <v-card style="margin-bottom: 20px">
      <v-form>
        <v-container>
          <h2 class="display-1 font-weight-light">New Credentials</h2>
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
              <v-text-field v-model="user.password" type="password" label="New Password"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-card>
      <v-form>
        <v-container>
          <h2 class="display-1 font-weight-light">Confirm Old Credentials</h2>
          <v-row>
            <v-col>
              <v-text-field v-model="user.old_username" label="Username" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field type="password" v-model="user.old_password" label="Password" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              class="ma-4"
              color="primary"
              :disabled="!user.old_password || !user.old_username"
              @click="updateAuth()"
            >Update</v-btn>
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
    user: {}
  }),
  created: function() {
    this.getUserFromStore();
    this.user.old_username = this.user.username;
    this.user.password = "";
  },
  methods: {
    getUserFromStore() {
      let currentUser = JSON.stringify(this.$store.getters.user);
      while (typeof currentUser != typeof {}) {
        currentUser = JSON.parse(currentUser);
      }
      this.user = currentUser;
    },
    updateAuth() {
      this.$store.dispatch("updateUser", this.user).then(res => {
        this.$swal.fire("Success!", res.data.message, "success").then(() => {
            this.$router.go(0);
        });
      });
    }
  }
};
</script>