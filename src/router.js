import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

export const routes = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: '*', redirect: '/login' }
];