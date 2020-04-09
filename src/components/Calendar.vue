<template>
  <v-container style="width: 100%">
    <v-row>
      <v-col>
        <v-text-field label="Solo" placeholder="Search" solo></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
  }
};
</script>