import axios from 'axios';
axios.defaults.withCredentials=true;//携带cookie,默认不携带

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 8000
});

service.interceptors.request.use(
    config => {
		console.log('config: ', config);
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;