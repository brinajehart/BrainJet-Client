import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

// import views
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Calendar from './components/Calendar.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        { path: "/login", name: 'login', component: Login },
        { path: "/register", 'name': 'register', component: Register },
        {
            path: '/calendar', 'name': 'calendar', component: Calendar, meta: {
                requiresAuth: true
            }
        },
        { path: '*', redirect: '/login' }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router;