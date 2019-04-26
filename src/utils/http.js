import {Spin, Message} from 'iview'
import axios from 'axios'
import router from '../router'
import store from '../vuex/index'
import qs from 'qs'

function readData() {
    Spin.show();
}

function endReadData() {
    Spin.hide();
}

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    readData();//请求拦截的时候显示加载readData()
    let getToken = store.state.token ? true : false;
    if (getToken) {
        // config.headers.Authorization = window.localStorage.getItem('token');
        config.headers.Authorization = store.state.token;
    }
    return config;
}, function (error) {
    //请求错误时做些事
    endReadData();
    Message.error('加载超时');
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    //对响应数据做些事
    endReadData() //响应拦截的时候关闭加载endLoading()
    return response;
}, function (error) {
    //请求错误时做些事
    endReadData();
    Message.error('加载失败');
    if (error.status === 401) {
        Message.error('token时效了,请重新登录 ');
        window.localStorage.removeItem('token')//token失效之后清除token
        router.push('/login')//跳到login页面
    }
    return Promise.reject(error);
});


function get(url, param = {}) {//get请求
    return new Promise((resolve, reject) => {
        axios.get(url, {params:param}).then(res => {
            resolve(res)
        })
    })
}

function post(url, params = {}) {//post请求
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(res => {
            resolve(res)
        })
    })
}

export default {
    get,
    post
}