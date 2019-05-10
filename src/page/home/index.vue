<template>
  <div class="page-tabbar">
    <mt-header title="录入需求单">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="page-wrap">


      <!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="外卖">
          <Field></Field>
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
          <demandCard></demandCard>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="外卖">

        录单
      </mt-tab-item>
      <mt-tab-item id="订单">

        查看
      </mt-tab-item>

    </mt-tabbar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast, Button, Navbar, TabItem, Tabbar, Header } from 'mint-ui';
  import textareaFeed from '@/components/textareaFeed/index'
  import Field from '@/components/Field/index'
  import demandCard from '@/components/demandCard/index.vue'
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {

    data() {
      return {
        id: this.$route.params.id,
        selected: '外卖'
      }
    },
    updated() {
     // this.ons();
    },
    created() {
     this.ons();
    },
    methods: {
      ons() {
        let id = this.$route.fullPath
        console.log(id,'++')
        if (id = '/?1') {
          this.selected = '订单';
        }
      },
      on() {
        Toast(this.msg);
      }
    },
    components: {
      Field,
      demandCard
    },
  }
</script>
<style>
  .page-tabbar .mint-tabbar.is-fixed .mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    height: 32px !important;
    line-height: 32px !important;
  }
</style>
<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  .page-tabbar .mint-header {
    background-color: #ffffff !important;
    color: #3e3e3e !important;
  }

  .mint-tabbar.is-fixed {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    height: 32px !important;
    z-index: 1;
  }

  .mint-tabbar.is-fixed .mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    height: 32px !important;
    line-height: 32px !important;
  }
</style>