import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { URI } from './uri';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || null,
        theme: localStorage.getItem('theme') || JSON.stringify({ light: true })
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, data) {
            state.status = 'success';
            state.token = data.token;
            state.user = data.user;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.user = ''
        },
        set_theme(state, data) {
            state.theme = data;
        }
    },
    actions: {
        theme({ commit }, data) {
            return new Promise((resolve, reject) => {
                try {
                    localStorage.setItem('theme', JSON.stringify(data))
                    commit('set_theme', data);
                    resolve(data);
                } catch (err) { reject(err) }
            });
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${URI}/auth/login`, data: user, method: 'POST' })
                    .then(resp => {
                        const { data } = resp;
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', JSON.stringify(data.user))
                        axios.defaults.headers.common['Authorization'] = `Token ${data.token}`
                        commit('auth_success', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${URI}/auth/create_auth`, data: user, method: 'POST' })
                    .then(resp => {
                        const { data } = resp;
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = `Token ${data.token}`
                        commit('auth_success', token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit(`${URI}/auth/logout`)
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
        theme: state => state.theme
    }
})