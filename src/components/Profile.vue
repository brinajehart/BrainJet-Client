<template>
  <div style="width: 100%">
    <v-form ref="form" v-model="valid">
      <h2 class="display-1 font-weight-light">{{ !loggedInThroughGoogle ? "New " : "Google " }}Credentials</h2>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-row v-if="loggedInThroughGoogle">
            <v-alert
              style="width: 100%"
              class="ma-5"
              type="info"
            >This account is registered through google... Due to this reason you can't edit anything!</v-alert>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[v => !!v || 'Item is required']"
                v-model="user.first_name"
                label="Name"
                :disabled="loggedInThroughGoogle"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :rules="[v => !!v || 'Item is required']"
                v-model="user.last_name"
                label="Surname"
                :disabled="loggedInThroughGoogle"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[v => !!v || 'Item is required']"
                v-model="user.username"
                :label="loggedInThroughGoogle ? 'User Id': 'Username'"
                :disabled="loggedInThroughGoogle"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[v => !!v || 'Item is required']"
                v-model="user.email"
                :disabled="loggedInThroughGoogle"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!loggedInThroughGoogle">
            <v-col>
              <v-text-field
                :disabled="loggedInThroughGoogle"
                v-model="user.password"
                type="password"
                label="New Password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <div v-if="!loggedInThroughGoogle">
        <h2 class="display-1 font-weight-light">Confirm Old Credentials</h2>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  v-model="user.old_username"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  :rules="[v => !!v || 'Item is required']"
                  type="password"
                  v-model="user.old_password"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                class="ma-4"
                color="primary"
                :disabled="!valid || loggedInThroughGoogle"
                @click="updateAuth()"
              >Update</v-btn>
              <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {},
    valid: true,
    loggedInThroughGoogle: false
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
      this.loggedInThroughGoogle = !!this.user.isGoogleAuth || false;
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