<template>
  <div style="width: 100%;">
    <v-card v-show="!loading" class="mx-auto">
      <v-list three-line max-height="80vh" min-height="10vh">
        <template v-for="(item, index) in items">
          <v-divider v-if="index != 0" :key="index" inset="true"></v-divider>

          <v-list-item :key="index">
            <v-list-item-avatar
              v-tooltip="item.timestamp"
              :color="item.senderEmail ? 'transparent' : 'red'"
              :style="!item.senderEmail ? 'padding: 5px' : ''"
            >
              <img
                :src="item.senderEmail | gravatar"
                @error="item.senderEmail = null"
                v-if="item.senderEmail"
                alt="Google"
              />
              <span v-else class="white--text headline">{{ item.avatarAlt }}</span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.sender }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.message }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-alert v-if="!items.length" class="ma-3" type="info">No messeges yet...</v-alert>
      <v-text-field
        @keydown.enter="sendMessage()"
        @click:append="sendMessage()"
        v-model="chat_field"
        style="padding: 10px"
        label="Send Chat"
        append-icon="mdi-send"
        outlined
      ></v-text-field>
    </v-card>
    <bj-i-loading v-if="loading" loading_text="Retriving chat data..." />
  </div>
</template>

<script>
import api from "./../api";
import moment from "moment";

export default {
  data: () => ({
    items: [],
    chat_field: "",
    loading: true
  }),
  created: function() {
    this.getMessages();
  },
  methods: {
    async getMessages() {
      const response = await api.getOrCreateChat(this.$route.params.id);
      if (response.status == 200) {
        this.items = response.data
          .map(item => ({
            ...item,
            timestamp: "sent " + moment(new Date(item.timestamp)).fromNow()
          }))
          .reverse();
        this.loading = false;
      }
      setTimeout(() => {
        this.getNewMessages();
      }, 1000);
    },
    async sendMessage() {
      this.chat_field = "";
      if (!this.chat_field) return;
      await api.sendMessage(
        { message: this.chat_field },
        this.$route.params.id
      );
    },
    async getNewMessages() {
      if (!this.$route.params.id) return;
      const count = this.items.length || 0;
      const response = await api.retriveNewMessages(
        { count, isZero: count == 0 },
        this.$route.params.id
      );

      if (response.status == 200) {
        const newMesages = response.data
          .map(item => ({
            ...item,
            timestamp: "sent " + moment(new Date(item.timestamp)).fromNow()
          }))
          .reverse();

        this.items.push(...newMesages);
        setTimeout(() => {
          this.getNewMessages();
        }, 500);
      }
    }
  }
};
</script>