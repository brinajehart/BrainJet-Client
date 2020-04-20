<template>
  <v-container style="width: 100%">
    <v-row>
      <v-col cols="12" sm="4" style="margin-top: 10px">
        <v-row class="pa-2">
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
          <v-divider class="mx-3" vertical></v-divider>
          <v-btn
            v-tooltip="'Generate Weekly PDF Report'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="orange darken-3"
          >
            <v-icon dark>mdi-file-pdf</v-icon>
          </v-btn>
          <v-divider class="mx-3" vertical></v-divider>
          <v-btn
            v-tooltip="'Go 1 Week Backward'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="weekGo(-1)"
            dark
            color="orange darken-4"
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
            color="orange darken-4"
          >
            <v-icon dark>mdi-arrow-right</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="8">
        <small class="caption font-italic font-weight-medium">Change the date to see other tasks</small>
        <datepicker
          format="D, MMMM dth yyyy"
          class="border-all-sides"
          name="due_date"
          style="width: 100%"
          v-model="today"
        ></datepicker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            :now="today | moment('YYYY-MM-DD')"
            :value="today | moment('YYYY-MM-DD')"
            :events="events"
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
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
          ? moment(this.today).add(7, "days")
          : moment(this.today).subtract(7, "days");
    }
  }
};
</script>