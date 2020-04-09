<template>
  <div style="width: 100%">
    <v-row>
      <v-col>
        <v-text-field label="Solo" placeholder="Search" solo></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>