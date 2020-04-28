<template>
  <div style="width: 100%">
    <v-form ref="form" v-model="valid" v-show="!loading">
      <v-row>
        <h2 style="margin: 0 0 0 15px;" class="display-1 font-weight-light">General</h2>
      </v-row>
      <v-card style="width: 100%; margin-bottom: 15px">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" style="margin-top:15px">
              <v-select
                label="Author"
                :items="users"
                item-value="id"
                item-text="display_as"
                v-model="form.user"
                :readonly="true"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" style="margin-top:15px">
              <v-text-field
                :value="form.timestamp || new Date() | moment('ddd, MMMM Do YYYY')"
                label="Date Created"
                required
                :readonly="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" style="margin-top:15px">
              <v-text-field v-model="form.title" label="Title*" :rules="rules" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4" style="margin-top:15px">
              <v-text-field
                v-model="form.time_complexity"
                :label="`${form.is_event ? 'Event Duration (hours)' : 'Time Complexity (days)'}`"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" style="margin-top:15px">
              <v-datetime-picker
                :rules="[v => !!v || 'Item is required']"
                :label="`${form.is_event ? 'Event Date' : 'Due Date'}`"
                v-model="form.due_date"
                requred
              ></v-datetime-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <label>Description</label>
              <tiny-mce
                api-key="cfdw8uwtdyjxz965k0wctju2xsnoyj3nnncgef9gghebc16m"
                v-model="form.description"
                :init="{
                    menubar: false,
                    plugins: [
                    'autolink lists link image charmap print anchor',
                    'searchreplace code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | bold italic | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            }"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-switch
                v-model="form.is_event"
                :label="`Type: ${form.is_event ? 'Event' : 'Task'}`"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="!form.is_event">
            <v-col cols="12" md="12">
              <h3 class="pa-2 body-1 font-weight-light">
                <v-icon color="grey darken-3" style="margin-right: 10px">mdi-wrench</v-icon>Progress:
                <b>{{ progress }}%</b>
                <v-progress-linear
                  v-model="progress"
                  style="margin-top: 15px"
                  :color="gColor(progress)"
                ></v-progress-linear>
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              class="ma-4"
              color="primary"
              :disabled="!valid"
              @click="primarySubmit()"
            >{{ $route.name === 'Edit - Assignment' ? 'Update' : 'Create' }}</v-btn>
            <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
            <v-btn
              v-tooltip="'Import data from json file...'"
              @click="readJsonFile()"
              class="ma-4"
              color="yellow darken-1"
            >
              <v-icon left>mdi-upload</v-icon>Import
            </v-btn>
            <v-btn
              :disabled="!valid"
              v-tooltip="'Export form to json file...'"
              class="ma-4"
              color="yellow darken-1"
              @click="exportJsonFile()"
            >
              <v-icon left>mdi-download</v-icon>Export
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
      <v-row>
        <h2
          style="margin: 0 5px 0 15px;"
          class="display-1 font-weight-light"
        >{{ form.is_event ? "Schedule Slots": "Subtasks" }}</h2>
        <v-btn large v-tooltip="'Add Subtask'" color="primary" icon @click="addSubtask()">
          <v-icon color="teal">mdi-plus-circle</v-icon>
        </v-btn>
      </v-row>
      <v-card style="margin-bottom: 15px">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-simple-table dense style="table-layout: fixed;">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title</th>
                      <th v-if="!form.is_event" class="text-left">Status</th>
                      <th v-if="form.is_event" class="text-left">Description</th>
                      <th class="text-left">Done By</th>
                      <th v-if="!form.is_event" class="text-left">Done Date</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.subtasks.length">
                    <tr v-for="(item,key) in form.subtasks" :key="key">
                      <td>
                        <v-text-field
                          style="margin-top:15px"
                          v-model="item.title"
                          label="Title*"
                          :rules="rules"
                          required
                        ></v-text-field>
                      </td>
                      <td v-if="form.is_event">
                        <v-text-field
                          style="margin-top:15px"
                          v-model="item.description"
                          label="Description"
                        ></v-text-field>
                      </td>
                      <td v-if="!form.is_event">
                        <v-select
                          label="Status"
                          style="margin-top:15px"
                          :items="statuses"
                          item-value="id"
                          item-text="display_as"
                          :change="statusChanged(key)"
                          :rules="[v => !!v || 'Item is required']"
                          v-model="item.status"
                        ></v-select>
                      </td>
                      <td>
                        <v-autocomplete
                          v-model="item.done_by"
                          item-value="id"
                          item-text="display_as"
                          :items="doneByUserOptions"
                          style="margin-top: 15px"
                          label="User Picker"
                          :clearable="true"
                        ></v-autocomplete>
                      </td>
                      <td v-if="!form.is_event">
                        <datepicker
                          format="D, MMMM dth yyyy"
                          v-model="item.done_date"
                          name="due_date"
                          :disabled="item.status !== 3"
                          style="width: 100%"
                        ></datepicker>
                      </td>
                      <td class="text-right">
                        <v-btn v-tooltip="'Delete Subtask'" icon @click="deleteSubtask(key)">
                          <v-icon color="red lighten-1">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5" class="pa-3">
                        <v-alert
                          type="warning"
                        >Currently the there are no subtasks! You can add them with the button above!</v-alert>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-row>
        <h2 style="margin: 0 5px 0 15px;" class="display-1 font-weight-light">Collaborators</h2>
        <v-btn large v-tooltip="'Add Collaborator'" color="primary" icon @click="addCollaborator()">
          <v-icon color="teal">mdi-plus-circle</v-icon>
        </v-btn>
      </v-row>
      <v-card style="margin-bottom: 20vw">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-simple-table dense style="table-layout: fixed;">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Permissions</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.taskcollaborators.length">
                    <tr
                      v-for="(item,key) in form.taskcollaborators"
                      :key="key"
                      style="height: 50px"
                    >
                      <td>
                        <v-autocomplete
                          v-model="item.user"
                          :items="newCollaboratorOptions"
                          item-value="id"
                          item-text="display_as"
                          style="margin-top: 15px"
                          :rules="[v => !!v || 'Item is required']"
                          label="User Picker"
                          v-on:change="collaboratorChanged(key)"
                          :clearable="true"
                        ></v-autocomplete>
                      </td>
                      <td>
                        <v-select
                          label="Permissions"
                          :items="permissions"
                          item-value="id"
                          item-text="display_as"
                          v-model="item.permission"
                          :rules="[v => !!v || 'Item is required']"
                        ></v-select>
                      </td>
                      <td class="text-right">
                        <v-btn v-tooltip="'Delete Subtask'" icon @click="deleteCollaborator(key)">
                          <v-icon color="red lighten-1">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5" class="pa-3">
                        <v-alert
                          type="warning"
                        >Currently the there are no collaborators! You can add them with the button above!</v-alert>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-form>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      v-tooltip="'Open Assignment View'"
      v-if="$route.name != 'Create - Assignment' && !loading"
      @click="$router.push(`/tasks/view/${$route.params.id}`)"
    >
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <bj-i-loading v-if="loading" :loading_text="loadingText" />
  </div>
</template>

<script>
import api from "./../api";
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      form: {
        title: "",
        time_complexity: "",
        description: "",
        due_date: new Date(),
        is_event: false,
        subtasks: [],
        taskcollaborators: [],
        user: null
      },
      statuses: [],
      permissions: [],
      users: [],
      currentUser: null,
      loading: true,
      valid: true,
      rules: [
        value => !!value || "Required.",
        value => (value && value.length >= 3) || "Min 3 characters"
      ],
      loadingText: "The form is loading..."
    };
  },
  created: async function() {
    await this.setCurrentUser();
    if (this.$router.currentRoute.name == "Create - Assignment") {
      this.form.user = await this.currentUser.id;
    } else {
      const response = await api.getTaskData(this.$route.params.id);
      if (response.status == 200) {
        this.form = response.data;
      }
    }
    await this.fetchPermissions();
    await this.fetchStatuses();
    await this.fetchUsers();
    this.loading = false;
  },
  computed: {
    progress() {
      if (this.form) {
        if (this.form.subtasks.length) {
          const completedCount = this.form.subtasks.filter(
            item => item.status == 3
          ).length;
          return (completedCount / this.form.subtasks.length) * 100;
        }
      }
      return 0;
    },
    doneByUserOptions() {
      const { users, form } = this;
      const collaboratorIds = form.taskcollaborators.map(colab => colab.user);

      const options = users.filter(
        user =>
          collaboratorIds.includes(user.id) || user.id == this.currentUser.id
      );
      return options;
    },
    newCollaboratorOptions() {
      const { users } = this;

      const options = users.filter(user => user.id !== this.currentUser.id);
      return options;
    }
  },
  methods: {
    setCurrentUser: function() {
      const currentUser = this.$store.getters.user;
      if (currentUser)
        this.currentUser =
          typeof currentUser != typeof {}
            ? JSON.parse(currentUser)
            : currentUser;
    },
    async fetchStatuses() {
      const response = await api.pickerRetriver("status");
      if (response.status == 200) {
        this.statuses = response.data;
      }
    },
    async fetchPermissions() {
      const response = await api.pickerRetriver("permission");
      if (response.status == 200) {
        this.permissions = response.data;
      }
    },
    async fetchUsers() {
      const response = await api.pickerRetriver("user");
      if (response.status == 200) {
        this.users = response.data;
      }
    },
    statusChanged(subtask_index) {
      if (this.form.subtasks[subtask_index].status !== 3) {
        delete this.form.subtasks[subtask_index].done_date;
      }
    },
    collaboratorChanged(key) {
      const { taskcollaborators } = this.form;
      taskcollaborators.forEach(({ user }, index) => {
        if (user == taskcollaborators[key].user && key != index && user) {
          this.$swal
            .fire(
              "Error!",
              "The user is already registered as a collaborator!",
              "error"
            )
            .then(() => {
              this.$set(this.form.taskcollaborators[key], "user", undefined);
              delete this.form.taskcollaborators[key].user;
            });
          return;
        }
      });
    },
    gColor(progress) {
      if (progress < 40) return "red";
      else if (progress < 70) return "primary";
      else if (progress < 90) return "teal";
      else return "green";
    },
    addSubtask() {
      this.form.subtasks.push({ status: this.statuses[0].id });
    },
    deleteSubtask(index) {
      this.form.subtasks.splice(index, 1);
    },
    addCollaborator() {
      this.form.taskcollaborators.push({
        permission: this.permissions[0].id,
        user: null
      });
    },
    deleteCollaborator(index) {
      this.form.subtasks.forEach((item, key) => {
        if (item.done_by == this.form.taskcollaborators[index].user) {
          delete this.form.subtasks[key].done_by;
        }
      });
      this.form.taskcollaborators.splice(index, 1);
    },
    readJsonFile() {
      const reader = new FileReader();
      const input = document.createElement("input");
      input.type = "file";
      input.style.visibility = "hidden";
      setTimeout(() => input.click(), 200);

      input.onchange = () => {
        const file = input.files[0];
        reader.addEventListener(
          "load",
          async () => (this.form = JSON.parse(reader.result)),
          false
        );

        if (file) reader.readAsText(file);
      };
    },
    exportJsonFile() {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.form))
      );
      element.setAttribute("download", `brainjet-data-${uuidv4()}.json`);
      element.style.display = "none";
      element.click();
    },
    async primarySubmit() {
      this.loadingText = "Proccessing Data...";
      this.loading = true;
      if (this.$router.currentRoute.name == "Create - Assignment") {
        const response = await api.generateTask(this.form);
        if (response.status == 201) {
          this.loading = false;
          this.$swal
            .fire("Success!", "The task was successfuly created.", "success")
            .then(() => {
              this.$router.push(`/tasks/view/${response.data.id}`);
            });
        }
      } else {
        const response = await api.updateTask(this.form, this.$route.params.id);
        if (response.status == 200) {
          this.loading = false;
          this.$swal.fire(
            "Success!",
            "The task was successfuly updated.",
            "success"
          );
          this.form = response.data.task_data;
        }
      }
    }
  }
};
</script>