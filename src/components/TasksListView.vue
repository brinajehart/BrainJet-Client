<template>
  <v-container style="width: 100%" class="pa-5">
    <v-row class="action-panel" style="margin-bottom: 10px">
      <v-col cols="12" sm="5">
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
            v-tooltip="'Open Calendar View'"
            v-on="on"
            class="mx-4 ma-0 pa-0"
            fab
            @click="$router.push('/tasks/calendar')"
            dark
            color="teal darken-2"
          >
            <v-icon dark>mdi-calendar</v-icon>
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <v-dialog v-model="pdfDialog" width="30vw">
            <template v-slot:activator="{ on }">
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
            </template>
            <v-card>
              <v-card-title style="background: #303f9f; color: #eee">
                <span class="headline">Weekly Report</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-alert type="warning">Pick the start of the week you wan't to export</v-alert>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <div>
                        <label style="color: #555">Start Date</label>
                        <datepicker
                          format="D, MMMM dth yyyy"
                          v-model="today"
                          name="due_date"
                          style="width: 100%"
                        ></datepicker>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" text @click="pdfDialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="generateWeeklyReport()">Print</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-divider class="mx-4" vertical></v-divider>
          <v-dialog v-model="orderDialog" scrollable width="30vw">
            <template v-slot:activator="{ on }">
              <v-btn
                v-tooltip="'Order Assignments by'"
                v-on="on"
                class="mx-4 ma-0 pa-0"
                fab
                dark
                color="orange darken-4"
              >
                <v-icon dark>mdi-sort</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title style="background: #303f9f; color: #eee">Change Order</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-radio-group v-model="sortProperty" column>
                  <v-radio
                    v-for="(option, index) in orderOptions"
                    :key="index"
                    :label="option.label"
                    :value="index"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
      <v-col cols="12" sm="4" style="margin-top: 10px">
        <v-text-field v-model="taskFilter" label="Search" append-icon="mdi-filter"></v-text-field>
      </v-col>
      <v-col cols="12" sm="1" style="margin-top: 10px">
        <v-switch v-model="displayFilters.tasks" label="Tasks" v-tooltip="'Toggle tasks'"></v-switch>
      </v-col>
      <v-col cols="12" sm="1" style="margin-top: 10px">
        <v-switch v-model="displayFilters.events" label="Events" v-tooltip="'Toggle events'"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-card v-bind:class="{ 'task-list-card': !loading }" style="width: 100%">
        <div class="text-center pa-10" v-if="loading">
          <v-progress-circular :size="70" :width="5" color="indigo" indeterminate></v-progress-circular>
        </div>
        <v-list two-line subheader v-else-if="filteredTasks.length">
          <v-list-item
            v-on:mousedown.middle="openView(item.id, true)"
            :class="{ 'events-list-item': item.is_event, 'tasks-list-item': !item.is_event }"
            v-for="(item, index) in filteredTasks"
            :key="index"
          >
            <v-list-item-avatar size="70" class="mx-4">
              <img src="./../assets/task.jpg" alt="Task" />
            </v-list-item-avatar>
            <v-divider class="mx-4 ma-3" vertical></v-divider>
            <v-list-item-content class="mx-4">
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle>
                <span>
                  Author:
                  <b>{{ item.author }}</b>
                </span>
                <br />
                <span>
                  Due:
                  <b>{{ item.due_date | moment("ddd, MMMM Do YYYY") }}</b>
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-progress-circular
                    v-if="!item.is_event"
                    v-tooltip="'Progress'"
                    :rotate="90"
                    :size="60"
                    :width="8"
                    :value="item.progress"
                    :color="gColor(item.progress)"
                  >{{ item.progress ? item.progress.toFixed(2) : 0 }}</v-progress-circular>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-divider vertical></v-divider>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-row>
                    <v-btn v-tooltip="'Edit Assignment'" icon @click="openEdit(item.id)">
                      <v-icon color="info darken-2">mdi-pen</v-icon>
                    </v-btn>
                    <v-btn v-tooltip="'View Assignment'" icon @click="openView(item.id)">
                      <v-icon color="info darken-2">mdi-tab</v-icon>
                    </v-btn>
                    <v-btn
                      v-tooltip="'Generate Assignment Report'"
                      icon
                      @click="generateTaskPdf(item.id)"
                    >
                      <v-icon color="info darken-2">mdi-file-pdf</v-icon>
                    </v-btn>
                    <v-btn v-tooltip="'Delete Assignment'" icon @click="deleteTask(item.id)">
                      <v-icon color="red lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-alert
          style="margin-top: 10px"
          type="warning"
          v-else-if="taskFilter"
        >None of your assignments match the filter!</v-alert>
        <v-alert
          style="margin-top: 10px"
          type="warning"
          v-else
        >It seems you don't have any Assignments yet... You can add your first here!</v-alert>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "./../api";
import { URI } from "./../uri";
import moment from "moment";

export default {
  data: () => ({
    taskFilter: "",
    tasks: [],
    today: new Date(),
    sortProperty: null,
    loading: true,
    orderDialog: false,
    pdfDialog: false,
    displayFilters: {
      tasks: true,
      events: true
    },
    orderOptions: [
      {
        label: "Date - Up",
        value: "due_date",
        asc: true
      },
      {
        label: "Date - Down",
        value: "due_date",
        asc: false
      },
      {
        label: "Alphabeticly - Up",
        value: "title",
        asc: true
      },
      {
        label: "Alphabeticly - Down",
        value: "title",
        asc: false
      }
    ]
  }),
  created: function() {
    this.fetchMyTasks();
  },
  computed: {
    filteredTasks() {
      const {
        tasks,
        taskFilter,
        sortProperty,
        orderOptions,
        displayFilters
      } = this;
      const filtered = tasks.filter(item => {
        const searchFilterCondition = item.title
          .toLowerCase()
          .includes(taskFilter.toLowerCase());

        let display = false;
        if (item.is_event) {
          if (displayFilters.events) display = true;
        } else {
          if (displayFilters.tasks) display = true;
        }

        return searchFilterCondition && display;
      });

      if (sortProperty || sortProperty == 0) {
        const order = orderOptions[sortProperty];
        const { value } = order;
        const asc_desc = order.asc === true ? [-1, 1] : [1, -1];
        return filtered.sort((a, b) => {
          if (value == "due_date") {
            return moment(a[value]).diff(b[value], "minutes") < 0
              ? asc_desc[0]
              : asc_desc[1];
          }
          return a[value] < b[value] ? asc_desc[0] : asc_desc[1];
        });
      }

      return filtered;
    }
  },
  methods: {
    gColor(progress) {
      if (progress < 40) return "red";
      else if (progress < 70) return "primary";
      else if (progress < 90) return "teal";
      else return "green";
    },
    async fetchMyTasks() {
      const response = await api.getMyTasks();
      this.tasks = response.data;
      this.loading = false;
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
      this.pdfDialog = false;

      await api.generateWeeklyReport(data);
    },
    async generateTaskPdf(id) {
      await api.generateTaskReport({ id });
    },
    openEdit(id) {
      this.$router.push(`/tasks/edit/${id}`);
    },
    openView(id, newWindow = false) {
      window.event.preventDefault();
      if (newWindow) {
        window.open(`/tasks/view/${id}`, "_blank");
        return;
      }
      this.$router.push(`/tasks/view/${id}`);
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
            this.fetchMyTasks();
            this.$swal.fire(
              "Deleted!",
              "The task has been deleted.",
              "success"
            );
          }
        });
    },
    printOut() {
      window.open(`${URI}/render/pdf`, "_blank");
    }
  }
};
</script>