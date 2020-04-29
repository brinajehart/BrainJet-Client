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
import Profile from './components/Profile.vue';
import TaskView from './components/TaskView.vue';
import PassReset from './components/PassReset.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        { path: "/login", name: 'Sign In', component: Login },
        { path: "/register", name: 'Sign Up', component: Register },
        { path: "/forgot-pass/:uuid", name: "Forgot Password", component: PassReset },
        {
            path: '/tasks/calendar', name: 'Assignment - Calendar', component: Calendar, meta: {
                requiresAuth: true
            }
        }, {
            path: '/tasks/list', name: 'Assignment - List', component: TasksListView, meta: {
                requiresAuth: true
            }
        }, {
            path: '/tasks/edit/:id',
            name: 'Edit - Assignment',
            component: TaskEdit,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/tasks/create',
            name: 'Create - Assignment',
            component: TaskEdit,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/tasks/view/:id',
            name: 'View - Assignment',
            component: TaskView,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/chats/:id', name: 'Chat', component: Chat, meta: {
                requiresAuth: true
            }
        }, {
            path: '/profile', name: 'Profile', component: Profile, meta: {
                requiresAuth: true
            }
        }, { path: '*', redirect: '/tasks/list' }
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