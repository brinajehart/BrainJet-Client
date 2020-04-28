<template>
  <div style="width: 100%">
    <v-container v-show="!loading" style="margin-bottom: 20vw" class="pa-5 task-view-container">
      <v-row class="action-panel" style="margin-bottom: 10px">
        <v-col cols="12" sm="7">
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
              v-tooltip="'Edit Assignment'"
              @click="$router.push(`/tasks/edit/${$route.params.id}`)"
              class="mx-4 ma-0 pa-0"
              fab
              dark
              color="teal darken-1"
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              v-tooltip="'Open Assignment Chat'"
              v-on="on"
              class="mx-4 ma-0 pa-0"
              fab
              @click="$router.push(`/chats/${$route.params.id}`)"
              dark
              color="teal darken-2"
            >
              <v-icon dark>mdi-chat</v-icon>
            </v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn
              v-tooltip="'Generate PDF Assignment Report'"
              v-on="on"
              class="mx-4 ma-0 pa-0"
              fab
              dark
              color="orange darken-4"
              @click="generateTaskPdf($route.params.id)"
            >
              <v-icon dark>mdi-file-pdf</v-icon>
            </v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn
              v-tooltip="'Delete Assignment'"
              v-on="on"
              class="mx-4 ma-0 pa-0"
              fab
              dark
              color="red"
              @click="deleteTask($route.params.id)"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-card class="pa-5" style="width:100%">
          <h3 class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-label</v-icon>Title:
            <b>{{ task.title }}</b>
          </h3>
          <v-divider class="mx-4"></v-divider>
          <h3 class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-account</v-icon>Author:
            <b>{{ task.author }}</b>
          </h3>
          <v-divider class="mx-4"></v-divider>
          <h3 class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-calendar-today</v-icon>Date Created:
            <b>{{ task.timestamp | moment('ddd, MMMM Do YYYY') }}</b>
          </h3>
          <v-divider class="mx-4"></v-divider>
          <h3 class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-calendar</v-icon>
            {{ task.is_event ? "Event Date" : "Due Date" }}
            <b>{{ task.due_date | moment('ddd, MMMM Do YYYY') }}</b>
          </h3>
          <h3 class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-calendar-range</v-icon>
            {{ task.is_event ? "Duration:" : "Time Complexity:" }}
            <b>{{ task.time_complexity }} {{ task.is_event ? "hours:" : "days:" }}</b>
          </h3>
          <h3 class="pa-2 body-1 font-weight-light" v-if="!task.is_event">
            <v-icon color="grey darken-3" style="margin-right: 10px">mdi-wrench</v-icon>Progress:
            <b>{{ progress }}%</b>
            <v-progress-linear
              v-model="progress"
              style="margin-top: 15px"
              :color="gColor(progress)"
            ></v-progress-linear>
          </h3>
          <div v-if="task.description">
            <v-divider class="mx-4"></v-divider>
            <h3 class="pa-2 body-1 font-weight-light">
              <v-dialog v-model="descDialog" width="50vw">
                <template v-slot:activator="{ on }">
                  <v-btn color="info darken-2" small dark v-on="on">View Description</v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="headline indigo white-text"
                    primary-title
                  >{{ task.title }} - Description</v-card-title>
                  <v-card-text class="pa-5" style="min-height: 150px" v-html="task.description"></v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="descDialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </h3>
          </div>
        </v-card>
        <v-card v-if="task.collaborators.length" class="pa-5" style="width:100%; margin-top: 15px">
          <h2 style="margin: 10px 10px 0 0;" class="pa-2 body-1 font-weight-light">
            <v-icon color="grey darken-3">mdi-contacts</v-icon>
            <span>{{ " Collaborators: "}}</span>
          </h2>
          <v-simple-table fixed-header max-height="300px" class="no-hover">
            <template v-slot:default>
              <thead>
                <tr>
                  <th style="background-color: #eee" class="text-left">Fullname</th>
                  <th style="background-color: #eee" class="text-left">Permissions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(colab, key) in task.collaborators" :key="key">
                  <td>{{ colab.user }}</td>
                  <td>{{ colab.permissions }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-card v-if="task.subtasks.length" class="pa-5" style="width:100%; margin-top: 15px">
          <h2 style="margin: 10px 10px 0 0;" class="pa-2 headline font-weight-light">
            <v-icon color="grey darken-3">mdi-tab</v-icon>
            <span>{{ task.is_event ? " Schedule Slots: ": " Subtasks: "}}</span>
          </h2>
          <v-expansion-panels class="pa-2">
            <v-expansion-panel v-for="(subtask,i) in task.subtasks" :key="i">
              <v-expansion-panel-header>
                <h3 class="body-1 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-label</v-icon>
                  <b>{{ subtask.title }}</b>
                </h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider class="mx-4"></v-divider>
                <h3 v-if="!task.is_event" class="mx-4 pa-2 body-2 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-wrench</v-icon>Status:
                  <b>{{ subtask.status }}</b>
                </h3>
                <v-divider class="mx-4"></v-divider>
                <h3 class="mx-4 pa-2 body-2 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-account</v-icon>Worker:
                  <b>{{ subtask.worker }}</b>
                </h3>
                <h3 class="mx-4 pa-2 body-2 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-account</v-icon>Description:
                  <b>{{ subtask.description }}</b>
                </h3>
                <v-divider class="mx-4"></v-divider>
                <h3 v-if="!task.is_event" class="mx-4 pa-2 body-2 font-weight-light">
                  <v-icon color="grey darken-3" style="margin-right: 10px">mdi-calendar</v-icon>Done Date:
                  <b
                    v-if="subtask.done_date"
                  >{{ subtask.done_date | moment('ddd, MMMM Do YYYY') }}</b>
                </h3>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-row>
    </v-container>
    <bj-i-loading v-if="loading" loading_text="We are retriving assignment data..." />
  </div>
</template>

<script>
import api from "./../api";
export default {
  data: () => ({
    task: {},
    loading: true,
    descDialog: false
  }),
  created: function() {
    this.fetchTaskDetails();
  },
  computed: {
    progress() {
      if (this.task) {
        if (this.task.subtasks.length) {
          const completedCount = this.task.subtasks.filter(
            item => item.status_id == 3
          ).length;
          return ((completedCount / this.task.subtasks.length) * 100).toFixed(
            2
          );
        }
      }
      return 0;
    }
  },
  methods: {
    async fetchTaskDetails() {
      const response = await api.getTaskDetails(this.$route.params.id);
      if (response.status == 200) {
        this.task = response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    gColor(progress) {
      if (progress < 40) return "red";
      else if (progress < 70) return "primary";
      else if (progress < 90) return "teal";
      else return "green";
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
            this.$swal
              .fire("Deleted!", "The task has been deleted.", "success")
              .then(() => {
                this.$router.push("/tasks/list");
              });
          }
        });
    },
    async generateTaskPdf(id) {
      await api.generateTaskReport({ id });
    }
  }
};
</script>