import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import RichTextEditor from 'rich-text-editor-vuetify';
import Axios from 'axios';
import VueMoment from 'vue-moment';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VTooltip from 'v-tooltip';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) Vue.prototype.$http.defaults.headers.common['Authorization'] = `Token ${token}`;

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(RichTextEditor);
Vue.use(VueMoment);
Vue.use(VTooltip);
Vue.use(VueSweetalert2);

Vue.filter('fullname', user => {
    if (user.length < 10) return '';
    while (typeof user != typeof {}) {
        user = JSON.parse(user);
    }
    return user.first_name + " " + user.last_name
});

Vue.filter('genavatar', user => {
    if (user.length < 10) return '';
    while (typeof user != typeof {}) {
        user = JSON.parse(user);
    }
    return user.first_name[0] + user.last_name[0]
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');