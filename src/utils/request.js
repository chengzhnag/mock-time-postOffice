import axios from 'axios';
var baseURL = '';
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://devinfant.dledc.com';
} else {
    baseURL = 'http://tsso.dledc.com';
}
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: baseURL,
    timeout: 5000
})

service.interceptors.request.use(config => {
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data['client_id']) {
            localStorage.uim_client_id = response.data['client_id'];
        }
        if (response.data['session']) {
            localStorage.uim_session_id = response.data['session'].id;
        }
        return response.data;
    } else {
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;