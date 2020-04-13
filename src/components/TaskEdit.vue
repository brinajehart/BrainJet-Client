<template>
  <v-card style="width: 100%">
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4" style="margin-top:15px">
                  <v-text-field label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4" style="margin-top:15px">
                  <v-text-field label="Time Complexity (days)" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <small style="color: #555">Due Date</small>
                  <datepicker :value="new Date()" name="due_date" style="width: 100%"></datepicker>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <label>Description</label>
                  <tiny-mce
                    api-key="cfdw8uwtdyjxz965k0wctju2xsnoyj3nnncgef9gghebc16m"
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
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      tabs: ["Task", "Sub Tasks", "Collaborators"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>