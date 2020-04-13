<template>
  <v-card style="width: 100%">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field label="Title" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
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
          <v-col cols="12" md="6">
            <v-text-field style="margin-top: 15px" label="Time Complexity" required></v-text-field>
            <v-text-field style="margin-top: 15px" label="Time Complexity" required></v-text-field>
            <div>
              <label style="color: #555">Due Date</label>
              <datepicker :value="new Date()" name="due_date" style="width: 100%"></datepicker>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      v-tooltip="'Open Chat'"
      class="fixed-bottom-right-button mx-2"
      @click="openChat(5)"
      fab
      dark
      large
      color="purple"
    >
      <v-icon dark>mdi-chat</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: true,
        title: "Jason Oner",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      {
        title: "Travis Howard",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
      },
      {
        title: "Ali Connors",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
      },
      {
        title: "Cindy Baker",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
      }
    ],
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    openChat(id) {
      this.$router.push(`/chats/${id}`);
    }
  }
};
</script>