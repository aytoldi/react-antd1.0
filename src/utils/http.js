import {message, Spin} from 'antd'
import axios from 'axios'
import qs from 'qs'
import store from '../store'

message.config({
    top: 300,
    duration: 2,
});

let newState = store.getState();

import {createHashHistory} from 'history'//引入历史
let history = createHashHistory();

function success() {
    let hide = message.loading('正在执行中...', 0);
    // 异步手动移除
    setTimeout(hide, 2000);
};



function destory() {
    message.destroy()
}


//添加请求拦截器
axios.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    success();//请求拦截的时候显示加载readData()
    let getToken = newState.token ? true : false;
    if (getToken) {
        // config.headers.Authorization = window.localStorage.getItem('token');
        config.headers.Authorization = newState.token;
    }
    return config;
}, function (error) {
    //请求错误时做些事
    destory();
    message.error('加载超时');
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    //对响应数据做些事
    destory(); //响应拦截的时候关闭加载endLoading()
    return response;
}, function (error) {
    //请求错误时做些事

    if (error.status === 401) {
        message.error('token时效了,请重新登录 ');
        window.localStorage.removeItem('token')//token失效之后清除token
        history.push('/login')//跳到login页面
    }

    message.error('加载失败');
    destory();

    return Promise.reject(error);
});


function handleStatus(res) {
    let errors;
    switch (res.status) {
        case 200:
            return res.json();
        case 500:
            message.error('服务器内部错误', 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 404:
            message.error("资源不存在", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 401:
            message.error("登录会话过期,请重新登录", 5)
            localStorage.removeItem("my-custom-token")
            window.location.href = '/login'
            break;
        case 403:
            message.error("无权限访问", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        default:
    }
}


function get(url, param = {}) {//get请求
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param}).then(res => {
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