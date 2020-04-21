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
            v-tooltip="'Edit Task'"
            @click="$router.push(`/tasks/edit/${$route.params.id}`)"
            class="mx-4 ma-0 pa-0"
            fab
            dark
            color="teal darken-1"
          >
            <v-icon dark>mdi-pen</v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Open Task Chat'"
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
          <v-dialog v-model="pdfDialog" width="30vw">
            <template v-slot:activator="{ on }">
              <v-btn
                v-tooltip="'Generate PDF Task Report'"
                v-on="on"
                class="mx-4 ma-0 pa-0"
                fab
                dark
                color="orange darken-4"
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
                          :value="new Date()"
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
                <v-btn color="blue darken-1" text @click="pdfDialog = false">Print</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>