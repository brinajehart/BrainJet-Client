import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueMoment from 'vue-moment';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VTooltip from 'v-tooltip';
import LoadingComponent from './helpers/Loading.vue';
import TinyMCE from '@tinymce/tinymce-vue';
import Datepicker from 'vuejs-datepicker';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) Vue.prototype.$http.defaults.headers.common['Authorization'] = `Token ${token}`;

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VTooltip);
Vue.use(VueSweetalert2);

Vue.filter('fullname', user => {
    if (!user) return "";
    return user.first_name + " " + user.last_name
});

Vue.filter('genavatar', user => {
    if (!user) return "";
    return user.first_name[0] + user.last_name[0]
})

Vue.component('bj-loading', LoadingComponent);
Vue.component('tiny-mce', TinyMCE);
Vue.component('datepicker', Datepicker);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');