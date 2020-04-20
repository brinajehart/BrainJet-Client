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
import InternalLoadingComponent from './helpers/InternalLoading.vue';
import TinyMCE from '@tinymce/tinymce-vue';
import Datepicker from 'vuejs-datepicker';
import GAuth from 'vue-google-oauth2'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) Vue.prototype.$http.defaults.headers.common['Authorization'] = `Token ${token}`;

Vue.config.productionTip = false;


const gauthOption = {
    clientId: '563233502342-gbc17b6hsrd9vm2vgsfo037geg83v79c.apps.googleusercontent.com'
};


Vue.use(GAuth, gauthOption)
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
Vue.component('bj-i-loading', InternalLoadingComponent);

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');