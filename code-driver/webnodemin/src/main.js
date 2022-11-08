import Vue from 'vue'
import App from './App.vue'


import VueRouter from "vue-router";
import router from "./router";
import PubSub from "pubsub-js";
import { Loading, Picker, Popup, Field,Button,Col, Row  } from 'vant';
import 'vant/lib/index.css';
import store from './store/store';

Vue.use(Loading)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Button)
Vue.use(Col);
Vue.use(Row);


//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
//配置请求信息
//Axios.defaults.baseURL='127.0.0.1:5000'
var $http = Axios
Vue.prototype.$http = $http

Vue.prototype.$StaticUrl="http://39.108.73.140:5001"


Vue.prototype.$handleRequest = function (data) {
  return new Promise((resolve, reject) => {
    let error = ''
    switch (data) {

      //查询返回值
      case "where-undefined":
        //where条件为undefined
        error = "where-undefined  where条件为undefined"
        reject(error);
        break;
      case "data-null":
        //根据where条件没有查找到用户数据
        error = "data-null 根据where条件没有查找到用户数据"
        reject(error);
        break;


      //插入数据返回值
      case "body-is-null":
        //根据where条件没有查找到用户数据
        error = "body-is-null"
        reject(error);
        break;
      case "body-where-is-null":
        //根据where条件没有查找到用户数据
        error = "body-where-is-null"
        reject(error);
        break;
      case "body-body-is-null":
        //根据where条件没有查找到用户数据
        error = "body-body-is-null"
        reject(error);
        break;



      case "dataBase-error":
        //服务器数据库操作报错
        error = "dataBase-error 服务器数据库操作报错"
        reject(error);
        break;
      case "server-undefinedError":
        //服务器未知错误
        error = "server-undefinedError 服务器未知错误"
        reject(error);
        break;


      case "handleSucess":
        //插入的成功返回值
        error = "handleSucess"
        resolve(error)
        break;

      default:
        //插入请求会返回 
        resolve(data)
        break;
    }
    reject(error)
  })
}


Vue.prototype.$location=function(onComplete) {

  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true,
      buttonPosition: 'RB'
    })

    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)

    // function onComplete(data) {
    //   console.log(data.formattedAddress)
    //   return data.formattedAddress;
    // }

    function onError(data) {
      return '为获取到位置信息'
    }
  })

}


Vue.prototype.$getCurrentTime = function () {
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let hh = new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  let time = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
  return {
    yy,
    mm,
    dd,
    hh,
    mf,
    ss,
    time
  }
}

Vue.prototype.$UserInfoKey = 'UserInfo'

Vue.use(PubSub)
//Vue.use(ElementUI);
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
