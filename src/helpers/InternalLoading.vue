<template>
  <v-container fill-height fluid style="height: 100vh">
    <v-row align="center" justify="center" class="text-center" style="margin-bottom: 10vw">
      <v-col style="width: 100%" class="text-center">
        <v-row align="center" justify="center" class="text-center" style="margin-bottom: 20px">
          <div class="custom-loading-scoped">
            <span class="loading-block"></span>
            <span class="loading-block"></span>
            <span class="loading-block"></span>
            <span class="loading-block"></span>
          </div>
        </v-row>
        <v-row align="center" justify="center" class="text-center">
          <h2 class="display-1 font-weight-light">{{ loading_text }}</h2>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["loading_text"]
};
</script>

<style lang="css" scoped>
@import "../assets/loading.css";
</style>