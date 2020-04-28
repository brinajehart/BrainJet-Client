<template>
  <div class="no-back-wrapper">
    <div class="no-back-container login-form">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="2"></v-col>
        <v-col cols="12" sm="8" md="9">
          <v-form ref="form" v-model="valid" style="width: 100%" align="center" justify="center">
            <v-card class="elevation-0 base-form-card" style="margin-bottom: 20px">
              <v-toolbar color="transparent" dark flat>
                <v-toolbar-title>Reset Password</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  name="password"
                  type="password"
                  :rules="[v => !!v || 'Item is required']"
                />
                <v-text-field
                  v-model="form.confirm_password"
                  label="Confirm Password"
                  name="conf_password"
                  type="password"
                  :rules="[v => !!v || 'Item is required']"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo white-text" @click="submit()">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          <v-img src="./../assets/logo-dark.png" aspect-ratio="2.26"></v-img>
        </v-col>
      </v-row>
    </div>
    <div class="no-back-credits white-text pa-3">
      <small>&copy; 2020 ( Brina Jehart & Janez Sedeljsak )</small>
    </div>
    <bj-loading v-if="loading" />
  </div>
</template>

<script>
import api from "./../api";

export default {
  data() {
    return {
      form: {
        password: "",
        confirm_password: ""
      },
      loading: false,
      valid: true
    };
  },
  methods: {
    async submit() {
      if (!this.valid) {
        this.$swal.fire("Fill out the form!", "...", "warning");
        return;
      }

      const { form } = this;
      if (form.password !== form.confirm_password) {
        this.$swal.fire("Error!", "The passwords do not match", "warning");
        return;
      }

      const response = await api.updatePassword({
        password: form.password,
        uuid: this.$route.params.uuid
      });

      if (response.status == 200) {
        this.$swal.fire("Success!", response.data.message, "success").then(() => {
            this.$router.push('/login');
        });
      }
    }
  }
};
</script>