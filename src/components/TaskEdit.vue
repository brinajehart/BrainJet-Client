<template>
  <v-card style="width: 100%">
    <v-form v-model="valid">
      <v-container>
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
          <v-col cols="12" md="12">
            <v-row>
              <h2 style="margin: 0 10px 0 15px;" class="display-1 font-weight-light">Subtasks</h2>
              <v-btn v-tooltip="'Add Subtask'" color="primary" @click="addSubtask">Add</v-btn>
            </v-row>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Done By</th>
                    <th class="text-left">Date Completed</th>
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
                        style="margin-top:15px"
                        :items="statuses"
                        item-value="id"
                        item-text="display_as"
                        v-model="item.status"
                      ></v-select>
                    </td>
                    <td>
                      <v-text-field
                        style="margin-top:15px"
                        v-model="item.done_by"
                        label="Title"
                        required
                      ></v-text-field>
                    </td>
                    <td>
                      <datepicker
                        v-model="item.date_completed"
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
        <v-row>
          <v-col cols="12" md="12">
            <v-row>
              <h2 style="margin: 0 10px 0 15px;" class="display-1 font-weight-light">Collaborators</h2>
              <v-btn v-tooltip="'Add Collaborator'" color="primary" @click="addCollaborator()">Add</v-btn>
            </v-row>
            <v-simple-table dense>
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
                      <v-text-field v-model="item.fullname" label="Title" required></v-text-field>
                    </td>
                    <td>
                      <v-select
                        :items="permissions"
                        item-value="id"
                        item-text="display_as"
                        v-model="item.permission"
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
        <v-row>
          <v-btn class="ma-4" color="primary">Update</v-btn>
          <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
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
      permissions: []
    };
  },
  created: function() {
    this.fetchPermissions();
    this.fetchStatuses();
  },
  methods: {
    async fetchStatuses() {
      const response = await api.retriveStatuses();
      if (response.status == 200) {
        this.statuses = response.data;
      }
    },
    async fetchPermissions() {
      const response = await api.retrivePermissions();
      console.log(response);
      if (response.status == 200) {
        this.permissions = response.data;
      }
    },
    addSubtask() {
      this.form.subtasks.push({ status: this.statuses[0] });
    },
    deleteSubtask(index) {
      this.form.subtasks.splice(index, 1);
    },
    addCollaborator() {
      this.form.collaborators.push({ permission: this.permissions[0] });
    },
    deleteCollaborator(index) {
      this.form.collaborators.splice(index, 1);
    }
  }
};
</script>