<template>
  <v-container style="width: 100%">
    <v-row style="margin-bottom: 20px">
      <v-col cols="12" sm="2" style="margin-top: 10px">
        <v-row>
          <v-btn
            v-tooltip="'Add new task'"
            @click="addTask()"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="teal darken-2"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Export to pdf'"
            @click="printOut()"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="orange darken-3"
          >
            <v-icon dark>mdi-file</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Order tasks by'"
            @click="printOut()"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="orange darken-4"
          >
            <v-icon dark>mdi-sort</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="10" style="margin-top: 10px">
        <v-text-field
          @change="filterTasks()"
          v-model="taskFilter"
          label="Filter"
          append-icon="mdi-filter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-card v-bind:class="{ 'task-list-card': !loading }" style="width: 100%">
        <div class="text-center pa-10" v-if="loading">
          <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
        </div>
        <v-list two-line subheader v-else-if="filteredTasks.length">
          <v-list-item class="tasks-list-item" v-for="(item, index) in filteredTasks" :key="index">
            <v-list-item-avatar size="70">
              <img src="./../assets/task.jpg" alt="John" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle>
                <span>
                  Author:
                  <b>{{ item.author }}</b>
                </span>
                <br />
                <span>
                  Due:
                  <b>{{ item.due_date | moment("dddd, MMMM Do YYYY") }}</b>
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-row>
                <v-col>
                  <v-progress-circular
                    :rotate="90"
                    :size="80"
                    :width="15"
                    :value="80"
                    :color="gColor(80)"
                  >{{ 80 }}</v-progress-circular>
                </v-col>
                <v-col>
                  <v-row>
                    <v-btn icon @click="openEdit(item.id)">
                      <v-icon color="blue lighten-1">mdi-pen</v-icon>
                    </v-btn>
                    <v-btn icon @click="openView(item.id)">
                      <v-icon color="indigo lighten-1">mdi-tab</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteTask(item.id)">
                      <v-icon color="red lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-alert class="ma-5" type="warning" v-else>No tasks were found!</v-alert>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "./../api";
import { URI } from "./../uri";

export default {
  data: () => ({
    taskFilter: "",
    order: ["date-down", "date-up", "progress-down", "progress-up"],
    tasks: [],
    filteredTasks: [],
    loading: true
  }),
  created: function() {
    this.fetchMyTasks();
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
      this.filteredTasks = response.data;
      this.loading = false;
    },
    addTask() {
      this.$router.push("/tasks/create");
    },
    openEdit(id) {
      this.$router.push(`/tasks/edit/${id}`);
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
        .then(result => {
          if (result.value) {
            this.$swal.fire(
              "Deleted!",
              "The task has been deleted.",
              "success"
            );
          }
        });
    },
    openView(id) {
      this.$router.push(`/tasks/edit/${id}`);
    },
    printOut() {
      window.open(`${URI}/render/pdf`, "_blank");
    },
    filterTasks() {
      const { tasks, taskFilter } = this;
      this.filteredTasks = tasks.filter(item =>
        item.title.toLowerCase().includes(taskFilter.toLowerCase())
      );
    }
  }
};
</script>