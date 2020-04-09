import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import Axios from 'axios';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.filter('fullname', user => {
    if (user.length < 10) return '';
    const user_obj = JSON.parse(user);
    return user_obj.first_name + " " + user_obj.last_name
});

Vue.filter('genavatar', user => {
    if (user.length < 10) return '';
    const user_obj = JSON.parse(user);
    return user_obj.first_name.toUpperCase()[0] + user_obj.last_name.toUpperCase()[0]
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');