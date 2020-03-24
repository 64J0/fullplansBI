import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    baseURL: 'https://fullplans.appspot.com/'
});

export default api;