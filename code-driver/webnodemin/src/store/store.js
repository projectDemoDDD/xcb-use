import Vue from 'vue'
import Vuex from "vuex";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      isShow: 'loadingHidden',    //加载时的loading
    },
    mutations: {
      // 展示loading
      showLoading(state) {
        state.isShow = '';
      },
      // 关闭loading
      hideLoading(state) {
        state.isShow = 'loadingHidden';
      },
    },
  });