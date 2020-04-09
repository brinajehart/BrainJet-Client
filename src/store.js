import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const apiRoute = 'http://localhost:8000';

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: ''
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
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${apiRoute}/auth/login`, data: user, method: 'POST' })
                    .then(resp => {
                        const data = resp.data
                        localStorage.setItem('token', data.token)
                        axios.defaults.headers.common['Authorization'] = data.token
                        commit('auth_success', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${apiRoute}/auth/create_auth`, data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        console.log(resp.data.user);
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit(`${apiRoute}/auth/logout`)
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user
    }
})