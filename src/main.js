import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import { routes } from './router';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;

const router = new VueRouter({
    mode: "history",
    routes
})

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
