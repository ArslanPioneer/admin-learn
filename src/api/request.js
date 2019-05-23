import axios from "axios";
import router from "../router/router";
import {
    Loading
} from "element-ui";
import {messsages} from '../assets/js/common.js';
import store from '../store/store'
import { config } from "_rxjs@6.5.2@rxjs";

axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.VUE_APP_LOGOUT_URL;
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
let Loading =null;

// 添加请求拦截器
axios.interceptors.request.use(
    config=> {
        loading = Loading.service({
            text:"正在加载中......",
            fullscreen:true
        });
        if (store.state.token) {
            config.headers["Authorization"] = "Bearer " + store.state.token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }

);

// 添加响应拦截器
axios.interceptors.response.use(
    response=>{
        return new Promise((resolve,reject)=>{
            if(loading){
                loading.close();
            }

            const res =response.data;

            if(res.err_code ===0){
                resolve(res)
            }
            else {
                reject(res)
            }
        })
    },
    error =>{
        console.log(error)
        //请求成功后关闭加载框
        if(loading){
            loading.close()
        }

        //断网处理或者请求超时
        // if(!error.response) {

        // }
    }
);

export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params
        }).then(
            res=> {
                resolve(res);
            }
        ).catch(err=>{
            reject(err);
        })
    })
}

export function post(url,params) {
    return new Promise((resolve,reject)=>{
        axios.post(url,params).then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        })
    })
}