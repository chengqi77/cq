<template>
  <div class="tab-container">
    <Field></Field>
    <mt-tabbar :value="selected" @input="handleChange" fixed>
      <mt-tab-item id="recordDemand">录单</mt-tab-item>
      <mt-tab-item id="demandList">查看</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import Vue from "vue";
  import { Toast, TabItem, Tabbar } from "mint-ui";
  import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载

  // import { getLoginUser } from "@/service/getData.js"
  import Field from "@/components/Field/index";
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {
    data() {
      return {
        selected: "demandList"
      };
    },
    created() {
      // this.getterscode();
    },
    methods: {
      // getterscode() {
      //   dd.ready(function () {
      //     dd.runtime.permission.requestAuthCode({
      //       corpId: _config.corpId, // 企业id
      //       onSuccess: function (info) {
      //         let code = info.code // 通过该免登授权码可以获取用户身份
      //         getLoginUser(code).then(res => {
      //           //console.log(res, '')
      //         })
      //       }
      //     });
      //   });
      // },
      handleChange(path) {
        this.$router.push({
          path
        });
      }
    },
    components: {
      Field
    }
  };
</script>
<style>
  .tab-container .mint-tabbar.is-fixed .mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    height: 32px !important;
    line-height: 32px !important;
  }
</style>