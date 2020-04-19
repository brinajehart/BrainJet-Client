import axios from 'axios';
import { URI } from './uri';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    window.location = '/login';
    return error;
});

export default class api {
    static async getMyTasks() {
        return new Promise((resolve, reject) => {
            axios.get(`${URI}/tasks`).then(resolve).catch(reject);
        });
    }

    static async registerUser(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${URI}/auth/create`, data).then(resolve).catch(reject);
        });
    }

    static async pickerRetriver(item_type) {
        return new Promise((resolve, reject) => {
            axios.get(`${URI}/picker/${item_type}`).then(resolve).catch(reject);
        }); 
    }
}