<template>
  <div style="width: 100%">
    <v-container class="pa-5">
      <v-row class="action-panel" style="margin-bottom: 10px">
        <v-col cols="12" sm="6">
          <v-row class="pa-2">
            <h2 style="margin: 10px 10px 0 15px;" class="display-1 font-weight-light">
              <v-icon color="grey darken-3">mdi-wrench</v-icon>
              <span>{{ " Actions: "}}</span>
            </h2>
            <v-btn
              v-tooltip="'Add New Assignment'"
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
              class="mx-4 ma-0 pa-0"
              fab
              dark
              color="orange darken-1"
              @click="generateWeeklyReport()"
            >
              <v-icon dark>mdi-file-pdf</v-icon>
            </v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn
              v-tooltip="'Go 1 Week Backward'"
              v-on="on"
              class="mx-3 ma-0 pa-0"
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
              class="mx-3 ma-0 pa-0"
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
              class="mx-3 ma-0 pa-0"
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
        <v-sheet v-if="!loading" height="600" width="100%">
          <v-calendar
            :now="today | moment('YYYY-MM-DD')"
            :value="today | moment('YYYY-MM-DD')"
            :events="events"
            :event-color="getEventColor"
            @click:event="showEvent"
            color="primary"
            type="week"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card v-if="selectedEvent" color="grey lighten-4" min-width="400px" flat>
              <v-toolbar color="indigo" dark dense height="40px">
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn v-tooltip="'Edit Assignment'" icon @click="openEdit(selectedEvent.id)">
                  <v-icon color="info lighten-2">mdi-pen</v-icon>
                </v-btn>
                <v-btn
                  v-tooltip="'Generate Assignment Report'"
                  icon
                  @click="generateTaskPdf(selectedEvent.id)"
                >
                  <v-icon color="info lighten-2">mdi-file-pdf</v-icon>
                </v-btn>
                <v-btn v-tooltip="'View Assignment'" icon @click="openView(selectedEvent.id)">
                  <v-icon color="info lighten-2">mdi-tab</v-icon>
                </v-btn>
                <v-btn v-tooltip="'Delete Assignment'" icon @click="deleteTask(selectedEvent.id)">
                  <v-icon color="red lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <h3 class="pa-2 body-1 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-account</v-icon>Author:
                  <b>{{ selectedEvent.author }}</b>
                </h3>
                <h3 class="pa-2 body-1 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-calendar-range</v-icon>
                  {{ !selectedEvent.is_event ? "Time Complexity" : "Duration" }}
                  <b>{{ selectedEvent.time_complexity }} {{ !selectedEvent.is_event ? "days" : "hours"}}</b>
                </h3>
                <h3 v-if="!selectedEvent.is_event" class="pa-2 body-1 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-wrench</v-icon>Progress:
                  <b>{{ selectedEvent.progress }}%</b>
                  <v-progress-linear
                    v-model="selectedEvent.progress"
                    style="margin-top: 15px"
                    :color="gColor(selectedEvent.progress)"
                  ></v-progress-linear>
                </h3>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
        <div width="100%" class="text-center pa-10" v-if="loading">
          <v-progress-circular :size="70" :width="8" color="indigo" indeterminate></v-progress-circular>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import api from "./../api";

export default {
  data: () => ({
    loading: true,
    today: new Date(),
    events: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  mounted() {
    this.fetchTasks();
  },
  watch: {
    today() {
      this.loading = true;
      this.fetchTasks();
    }
  },
  methods: {
    async fetchTasks() {
      const data = {
        start: moment(this.today)
          .startOf("week")
          .format("DD/MM/YY"),
        end: moment(this.today)
          .endOf("week")
          .add(1, "days")
          .format("DD/MM/YY")
      };
      const response = await api.getMyTasksForDateRange(data);
      if (response.status == 200) {
        this.events = response.data.map(slot => {
          if (slot.is_event) {
            const eventEnd = moment(slot.start)
              .add(slot.time_complexity, "hours")
              .format("YYYY-MM-DD HH:mm");
            return { ...slot, end: eventEnd };
          } else {
            return slot;
          }
        });
      }
      this.loading = false;
    },
    getEventColor(event) {
        if (event.is_event) {
            return 'green darken-2';
        } else {
            return 'orange darken-3';
        }
    },
    gColor(progress) {
      if (progress < 40) return "red";
      else if (progress < 70) return "primary";
      else if (progress < 90) return "teal";
      else return "green";
    },
    openEdit(id) {
      this.$router.push(`/tasks/edit/${id}`);
    },
    async generateWeeklyReport() {
      const data = {
        start: moment(this.today)
          .startOf("week")
          .format("DD/MM/YY"),
        end: moment(this.today)
          .endOf("week")
          .add(1, "days")
          .format("DD/MM/YY")
      };

      await api.generateWeeklyReport(data);
    },
    openView(id, newWindow = false) {
      window.event.preventDefault();
      if (newWindow) {
        window.open(`/tasks/view/${id}`, "_blank");
        return;
      }
      this.$router.push(`/tasks/view/${id}`);
    },
    async generateTaskPdf(id) {
      await api.generateTaskReport({ id });
    },
    deleteTask(id) {
      console.log(id);
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(async result => {
          if (result.value) {
            await api.deleteTask(id);
            this.fetchTasks();
            this.$swal.fire(
              "Deleted!",
              "The task has been deleted.",
              "success"
            );
          }
        });
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
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