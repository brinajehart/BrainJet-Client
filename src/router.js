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
        { path: "/login", name: 'Sign In', component: Login },
        { path: "/register", 'name': 'Sign Up', component: Register },
        {
            path: '/tasks/calendar', 'name': 'Tasks - Calendar', component: Calendar, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/list/', 'name': 'Tasks - List', component: TasksListView, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/edit/:id', 'name': 'Edit - Task', component: TaskEdit, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tasks/create', 'name': 'Create - Task', component: TaskEdit, meta: {
                requiresAuth: true
            }
        },
        {
            path: '/chat/:id', 'name': 'Chat', component: Chat, meta: {
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