import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/page/home/index'
import RecordDemand from '../page/recordDemand.vue'
import DemandList from '../page/demandList.vue'
import search from '@/page/search/index'
import DemandDetails from '@/page/DemandDetails/index'
import selectUser from '@/page/selectUser/index'
import filterJournal from '@/page/filterJournal/index'

//filterJournal
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/recordDemand',
      name: '录入需求单',
      component: RecordDemand
    },
    {
      path: '/demandList',
      name: '查看需求单',
      component: DemandList
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/DemandDetails',
      name: 'DemandDetails',
      component: DemandDetails
    },
    {
      path: '/selectUser',
      name: 'selectUser',
      component: selectUser
    },
    {
      path: '/filterJournal',
      name: 'filterJournal',
      component: filterJournal
    },
  ]
})
