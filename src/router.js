import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Calendar from './components/Calendar.vue';

export const routes = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: '/calendar', component: Calendar },
    { path: '*', redirect: '/login' }
];