import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

// import views
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Calendar from './components/Calendar.vue';
import TasksListView from './components/TasksListView.vue';
import TaskEdit from './components/TaskEdit.vue';
import Chat from './components/Chat.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        { path: "/login", name: 'login', component: Login },
        { path: "/register", 'name': 'register', component: Register },
        {
            path: '/tasks/calendar', 'name': 'calendar', component: Calendar, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/list/', 'name': 'your-tasks', component: TasksListView, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/edit/:id', 'name': 'edit-task', component: TaskEdit, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/create', 'name': 'create-task', component: TaskEdit, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/chat/:id', 'name': 'chat', component: Chat, meta: {
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