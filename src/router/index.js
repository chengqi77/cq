import Vue from 'vue'
import Router from 'vue-router'
import RecordDemand from '../page/recordDemand.vue'
import DemandList from '../page/demandList.vue'
import UserList from '../page/userList/index.vue'



//filterJournal
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '录入需求单',
      component: RecordDemand,
    },
    {
      path: '/RecordDemand',
      name: '录入需求单',
      component: RecordDemand,
    },
    {
      path: '/demandList',
      name: '需求单列表',
      component: DemandList,
    },
    {
      path: '/userList',
      name: '需求单列表',
      component: UserList
    },
   
    {
      path: '/DemandDetails',
      name: '需求单详情',
      component: resolve => {
        require(['@/page/DemandDetails/index'], resolve);
      }
    },
    {
      path: '/selectUser',
      name: '选择人员',
      component: resolve => {
        require(['@/page/selectUser/index'], resolve);
      }
    },
    {
      path: '/filterJournal',
      name: 'filterJournal',
      component: resolve => {
        require(['@/page/filterJournal/index'], resolve);
      }
    },
    {
      path: '/search',
      name: '搜索',
      component: resolve => {
        require(['@/page/search/index.vue'], resolve);
      }
    },
    {
      path: '/searchList',
      name: '搜索',
      component: resolve => {
        require(['@/page/searchList/index.vue'], resolve);
      }
    },
    {
      path: '/search',
      name: '搜索',
      component: resolve => {
        require(['@/page/search/index.vue'], resolve);
      }
    },
  ]
})
