<template>
  <div style="width: 100%">
    <v-row>
      <h2 style="margin: 0 0 0 15px;" class="display-1 font-weight-light">General</h2>
    </v-row>
    <v-card style="width: 100%; margin-bottom: 15px">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" style="margin-top:15px">
              <v-select
                label="Owner"
                :items="users"
                item-value="id"
                item-text="display_as"
                v-model="form.user_id"
                :readonly="true"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" style="margin-top:15px">
              <v-text-field
                :value="form.timestamp || new Date() | moment('dddd, MMMM Do YYYY')"
                label="Date Created"
                required
                :readonly="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" style="margin-top:15px">
              <v-text-field v-model="form.title" label="Title" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4" style="margin-top:15px">
              <v-text-field v-model="form.time_complexity" label="Time Complexity (days)" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <small style="color: #555">Due Date</small>
              <datepicker v-model="form.due_date" name="due_date" style="width: 100%"></datepicker>
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
            <v-btn
              class="ma-4"
              color="primary"
              @click="primarySubmit()"
            >{{ $route.name === 'Edit - Task' ? 'Update' : 'Create' }}</v-btn>
            <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-row>
      <h2 style="margin: 0 5px 0 15px;" class="display-1 font-weight-light">Subtasks</h2>
      <v-btn large v-tooltip="'Add Subtask'" color="primary" icon @click="addSubtask()">
        <v-icon color="teal">mdi-plus-circle</v-icon>
      </v-btn>
    </v-row>
    <v-card style="margin-bottom: 15px">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-simple-table dense style="table-layout: fixed;">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Done By</th>
                      <th class="text-left">Done Date</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody v-if="form.subtasks.length">
                    <tr v-for="(item,key) in form.subtasks" :key="key">
                      <td>
                        <v-text-field
                          style="margin-top:15px"
                          v-model="item.title"
                          label="Title"
                          required
                        ></v-text-field>
                      </td>
                      <td>
                        <v-select
                          label="Status"
                          style="margin-top:15px"
                          :items="statuses"
                          item-value="id"
                          item-text="display_as"
                          :change="statusChanged(key)"
                          v-model="item.status_id"
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
                      <td>
                        <datepicker
                          v-model="item.done_date"
                          name="due_date"
                          :disabled="item.status_id !== 3"
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
      </v-form>
    </v-card>
    <v-row>
      <h2 style="margin: 0 5px 0 15px;" class="display-1 font-weight-light">Collaborators</h2>
      <v-btn large v-tooltip="'Add Collaborator'" color="primary" icon @click="addCollaborator()">
        <v-icon color="teal">mdi-plus-circle</v-icon>
      </v-btn>
    </v-row>
    <v-card style="margin-bottom: 20vw">
      <v-form>
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
                  <tbody v-if="form.collaborators.length">
                    <tr v-for="(item,key) in form.collaborators" :key="key" style="height: 50px">
                      <td>
                        <v-autocomplete
                          v-model="item.user_id"
                          :items="newCollaboratorOptions"
                          item-value="id"
                          item-text="display_as"
                          style="margin-top: 15px"
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
                          v-model="item.permission_id"
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
      </v-form>
    </v-card>
    <bj-loading v-if="loading" />
  </div>
</template>

<script>
import api from "./../api";
export default {
  data() {
    return {
      form: {
        title: "",
        time_complexity: "",
        description: "",
        due_date: new Date(),
        subtasks: [],
        collaborators: []
      },
      statuses: [],
      permissions: [],
      users: [],
      currentUser: null,
      loading: true
    };
  },
  created: async function() {
    await this.setCurrentUser();
    await this.fetchPermissions();
    await this.fetchStatuses();
    await this.fetchUsers();
    if (this.$router.currentRoute.name == "Create - Task") {
      this.form.user_id = await this.currentUser.id;
    } else {
      const response = await api.getTaskData(this.$route.params.id);
      if (response.status == 200) {
        this.form = response.data;
      }
    }
    setTimeout(() => (this.loading = false), 500);
  },
  computed: {
    doneByUserOptions() {
      const { users, form } = this;
      const collaboratorIds = form.collaborators.map(colab => colab.user_id);

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
      if (this.form.subtasks[subtask_index].status_id !== 3) {
        delete this.form.subtasks[subtask_index].done_date;
      }
    },
    collaboratorChanged(key) {
      const { collaborators } = this.form;
      collaborators.forEach(({ user_id }, index) => {
        if (user_id == collaborators[key].user_id && key != index && user_id) {
          this.$swal
            .fire(
              "Error!",
              "The user is already registered as a collaborator!",
              "error"
            )
            .then(() => {
              this.$set(this.form.collaborators[key], "user_id", undefined);
              delete this.form.collaborators[key].user_id;
            });
          return;
        }
      });
    },
    addSubtask() {
      this.form.subtasks.push({ status_id: this.statuses[0].id });
    },
    deleteSubtask(index) {
      this.form.subtasks.splice(index, 1);
    },
    addCollaborator() {
      this.form.collaborators.push({
        permission_id: this.permissions[0].id,
        user_id: null
      });
    },
    deleteCollaborator(index) {
      this.form.subtasks.forEach((item, key) => {
        if (item.done_by == this.form.collaborators[index].user_id) {
          delete this.form.subtasks[key].done_by;
        }
      });
      this.form.collaborators.splice(index, 1);
    },
    primarySubmit() {
      switch (this.$router.currentRoute.name) {
        case "Create - Task":
          debugger;
          return;
        case "Edit - Task":
          console.log("update");
          return;
        default:
          return;
      }
    }
  }
};
</script>