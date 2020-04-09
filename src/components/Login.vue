<template>
<div class="no-back-wrapper">
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Username" name="login" type="text" />
            <v-text-field id="password" label="Password" name="password" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <router-link class="form-link" to="/register">Don't have an account yet?</router-link>
          <v-spacer />
          <v-btn color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>