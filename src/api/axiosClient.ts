import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        'content-type': 'application/json',
    }
});

let isRefreshing = false;
let failedQueue = [];


axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    const originalRequest = error.config;
    if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject })
                }).then(() => {
                    return axiosClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                axios.defaults.withCredentials = true
                axios.post(`${process.env.REACT_APP_API_BASE_URL}users/refresh-token`).then((res) => {
                    resolve(axiosClient(originalRequest));
                }).catch((err) => {
                    //window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
                }).finally(() => { isRefreshing = false })
            })
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default axiosClient;