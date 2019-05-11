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
      name: '查看需求单',
      component: DemandList,
    },
    {
      path: '/userList',
      name: '查看需求单',
      component: UserList
    },
   
    {
      path: '/DemandDetails',
      name: 'DemandDetails',
      component: resolve => {
        require(['@/page/DemandDetails/index'], resolve);
      }
    },
    {
      path: '/selectUser',
      name: 'selectUser',
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
      name: 'search',
      component: resolve => {
        require(['@/page/search/index.vue'], resolve);
      }
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: resolve => {
        require(['@/page/searchList/index.vue'], resolve);
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => {
        require(['@/page/search/index.vue'], resolve);
      }
    },
  ]
})
