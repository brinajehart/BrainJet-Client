import axios from 'axios';
import { URI } from './uri';
import { v4 as uuidv4 } from 'uuid';

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

    static async getTaskData(task_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${URI}/task/${task_id}`).then(resolve).catch(reject);
        });
    }

    static async getTaskDetails(task_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${URI}/task/detail/${task_id}`).then(resolve).catch(reject);
        });
    }

    static async deleteTask(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${URI}/task/${id}`).then(resolve).catch(reject);
        });
    }

    static async getMyTasksForDateRange(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${URI}/tasks/range`, data).then(resolve).catch(reject);
        });
    }

    static async generateTask(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${URI}/task/create`, data).then(resolve).catch(reject);
        });
    }

    static async updateTask(data, id) {
        return new Promise((resolve, reject) => {
            axios.put(`${URI}/task/${id}`, data).then(resolve).catch(reject);
        });
    }

    static async generateWeeklyReport(data) {
        axios({
            url: `${URI}/render/pdf/weekly?start=${data.start}&end=${data.end}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const randomUUID = uuidv4();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `brainjet-weekly-${randomUUID}.pdf`);
            document.body.appendChild(link);
            link.click();
        });
    }

    static async generateTaskReport(data) {
        axios({
            url: `${URI}/render/pdf/task?task_id=${data.id}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const randomUUID = uuidv4();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `brainjet-task-${randomUUID}.pdf`);
            document.body.appendChild(link);
            link.click();
        });
    }
}