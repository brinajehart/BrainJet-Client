<template>
  <v-container style="width: 100%">
    <v-row style="margin-bottom: 20px">
      <v-col cols="12" sm="2" style="margin-top: 10px">
        <v-row>
          <v-btn class="mx-4" fab dark color="indigo">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="printOut()" class="mx-4" fab dark color="indigo">
            <v-icon dark>mdi-file</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" style="margin-top: 10px">
        <v-text-field @change="filterTasks()" v-model="taskFilter" label="Filter" append-icon="mdi-filter"></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-overflow-btn class="my-2" :items="order" label="Select order"></v-overflow-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card style="width: 100%">
        <v-list two-line subheader>
          <v-list-item class="tasks-list-item" v-for="(item, index) in filteredTasks" :key="index">
            <v-list-item-avatar>
              <v-icon v-text="item.icon">mdi-note</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="'keks'"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
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
    filteredTasks: []
  }),
  created: function() {
    this.fetchMyTasks();
  },
  methods: {
    async fetchMyTasks() {
      const response = await api.getMyTasks();
      this.tasks = response.data;
      this.filteredTasks = response.data;
    },
    printOut() {
      window.open(`${URI}/render/pdf`, "_blank");
    },
    filterTasks() {
      const { tasks, taskFilter } = this;
      this.filteredTasks = tasks.filter(item => item.title.toLowerCase().includes(taskFilter.toLowerCase()));
    }
  }
};
</script>