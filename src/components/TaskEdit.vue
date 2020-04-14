<template>
  <v-card style="width: 100%">
    <v-form>
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
          <v-btn class="ma-4" color="primary">Update</v-btn>
          <v-btn class="ma-4" color="error" @click="$router.go(-1)">Cancel</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        time_complexity: "",
        description: "",
        due_date: new Date(),
        subtasks: [
          {
            title: "Photos",
            subtitle: "Jan 9, 2014"
          },
          {
            title: "Recipes",
            subtitle: "Jan 17, 2014"
          },
          {
            title: "Work",
            subtitle: "Jan 28, 2014"
          }
        ],
        collaborators: [
          { fullname: "Brina Jehart" },
          { fullname: "Random Tone" }
        ]
      },
      tab: null,
      tabs: ["Task", "Sub Tasks", "Collaborators"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    addSubtask() {
      this.form.subtasks.push({
        title: "neki",
        items: [{ title: "kekec" }]
      });
    }
  }
};
</script>