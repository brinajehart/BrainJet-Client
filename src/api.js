import axios from 'axios';
import { URI } from './uri';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        window.location = '/login?status=401';
    } else if (error.response.status === 406) {
        window.location = '/login?status=406';
    } else if (error.response.status === 400) {
        window.location = '/login?status=400';
    }
    return error;
});

export default class api {
    static async getMyTasks() {
        return new Promise((resolve, reject) => {
            axios.get(`${URI}/tasks`).then(resolve).catch(reject);
        });
    }
}