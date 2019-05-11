// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import Vuex from 'vuex'


import 'mint-ui/lib/style.css' // mint-ui css


Vue.use(Mint);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.name) {
    document.title = to.name;
  }
  next();
});

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    startTimeStamp: '',
    endTimeStamp: '',
    selectedUseList: []
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setSelectedUseList(state, v) {
      state.selectedUseList = v;
    },
    setStartTimeStamp(state, v) {
      state.startTimeStamp = v;
    },
    setEndTimeStamp(state, v) {
      state.endTimeStamp = v;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
