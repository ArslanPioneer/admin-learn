import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import Home from "../views/Home.vue";
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
Vue.use(Router);

/**
 * @param {String} name 文件夹名称
 * @param {String} component 视图组件
 * 
 */

 const getComponent =(name,component)=>()=>import(`@/views/${name}/${component}.vue`);

const myRouter= new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect:'/home',
      component: getComponent('login','index')
    },
    {
      path: "/login",
      name: "login",
      component: getComponent('login','index')
    },
    {
      path:"/",
      component:getComponent('layout','Layout'),
      children:[{
        path:'/home',
        name:'home',
        component:getComponent('home','index'),
        // meta:{title:'首页'}
      },
      {
        path:'/table',
        component:getComponent('table','index'),
        name:'table',
        meta:[{title:'图标'},{title:'列表'}],
      }]
    },
   
    
  ]
});

//判断是否存在token
myRouter.beforeEach((to,from,next)=>{
  NProgress.start()
  if(to.path !== '/login' && !store.state.token) {
    next('/login')
    NProgress.done()
  }
  else {
    next()
  }
})

myRouter.afterEach(()=>{
  NProgress.done() //结束Progress
})
export default myRouter
