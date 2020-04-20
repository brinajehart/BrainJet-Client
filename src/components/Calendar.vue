<template>
  <v-container style="width: 100%">
    <v-row style="margin-bottom: 20px">
      <v-col cols="12" sm="2" style="margin-top: 10px">
        <v-row>
          <v-btn
            v-tooltip="'Add new task'"
            @click="$router.push('/tasks/create')"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="teal darken-2"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-row justify="center">
            <v-btn
              v-tooltip="'Weekly Report Pdf'"
              v-on="on"
              class="mx-4 ma-0 pa-0"
              fab
              dark
              color="orange darken-3"
            >
              <v-icon dark>mdi-file-pdf</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn
              v-tooltip="'Open list view'"
              v-on="on"
              class="mx-4 ma-0 pa-0"
              fab
              @click="$router.push('/tasks/list')"
              dark
              color="info"
            >
              <v-icon dark>mdi-view-list</v-icon>
            </v-btn>
          </v-row>
        </v-row>
      </v-col>
      <v-col cols="12" sm="10">
        <small class="caption font-italic font-weight-medium">(start of the week date)</small>
        <datepicker
          format="D, MMMM dth yyyy"
          class="border-all-sides"
          name="due_date"
          style="width: 100%"
          v-model="startOfTheWeek"
        ></datepicker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar color="primary" type="week"></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
export default {
  data: () => ({
    startOfTheWeek: null
  }),
  created: function() {
    this.startOfTheWeek = moment().startOf("week");
  },
  methods: {}
};
</script>