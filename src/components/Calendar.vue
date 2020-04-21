<template>
  <v-container style="width: 100%" class="pa-5">
    <v-row class="action-panel" style="margin-bottom: 10px">
      <v-col cols="12" sm="6">
        <v-row class="pa-2">
          <h2 style="margin: 10px 10px 0 15px;" class="display-1 font-weight-light">
            <v-icon color="grey darken-3">mdi-wrench</v-icon>
            <span>{{ " Actions: "}}</span>
          </h2>
          <v-btn
            v-tooltip="'Add New Task'"
            @click="$router.push('/tasks/create')"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="teal darken-1"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Open List View'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="$router.push('/tasks/list')"
            dark
            color="teal darken-2"
          >
            <v-icon dark>mdi-view-list</v-icon>
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <v-btn
            v-tooltip="'Generate Weekly PDF Report'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="orange darken-1"
          >
            <v-icon dark>mdi-file-pdf</v-icon>
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <v-btn
            v-tooltip="'Go 1 Week Backward'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="weekGo(-1)"
            dark
            color="orange darken-3"
          >
            <v-icon dark>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Go 1 Week Forward'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="weekGo(1)"
            dark
            color="orange darken-3"
          >
            <v-icon dark>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Change Date To Today'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="changeToToday()"
            dark
            color="purple darken-3"
          >
            <v-icon dark>mdi-bookmark</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="4">
        <datepicker
          format="D, MMMM dth yyyy"
          class="action-list-datepicker"
          name="due_date"
          style="width: 100%;"
          v-model="today"
        ></datepicker>
      </v-col>
      <v-col cols="12" sm="3"></v-col>
    </v-row>
    <v-row>
      <v-sheet height="600" width="100%">
        <v-calendar
          ref="calendar"
          :now="today | moment('YYYY-MM-DD')"
          :value="today | moment('YYYY-MM-DD')"
          :events="events"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    today: new Date(),
    events: [
      {
        name: "Weekly Meeting",
        start: "2019-01-07 09:00",
        end: "2019-01-07 10:00"
      },
      {
        name: "Mash Potatoes",
        start: "2019-01-09 12:30",
        end: "2019-01-09 15:30"
      }
    ]
  }),
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    weekGo(direction) {
      this.today =
        direction === 1
          ? moment(this.today)
              .add(7, "days")
              .toDate()
          : moment(this.today)
              .subtract(7, "days")
              .toDate();
    },
    changeToToday() {
      this.today = moment().toDate();
    }
  }
};
</script>