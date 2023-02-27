import axios from 'axios';
import App from "@/App.vue";
import {createApp} from "vue";
import Cookie from "@/service/cookie";

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(function (config) {

    const token = Cookie.getToken(config);

    if(token){
        config.headers.Authorization = token;
    }

    return config;
});


const app = createApp(App);
app.config.globalProperties.$axios = axios;




