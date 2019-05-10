<template>
  <div class="tab-container">
    <ListWrapper :requestData="getDataByCurrent"/>
    <mt-tabbar :value="selected" @input="handleChange" fixed>
      <mt-tab-item id="recordDemand">录单</mt-tab-item>
      <mt-tab-item id="demandList">查看</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { getDemandList } from "../service/getData.js";
import { Toast, TabItem, Tabbar } from "mint-ui";
import DemandCard from "@/components/demandCard/index.vue";
import ListWrapper from "@/components/listWrapper.vue";
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
export default {
  data() {
    return {
      selected: "recordDemand",
      damandList: {
        status: "init",
        list: [],
        msg: ""
      }
    };
  },
  created() {
    this.getDemandList();
  },
  methods: {
    getDataByCurrent({ current }) {
      const n = 20;
      const data = [];
      for (let i = 0; i < n; i++) {
        data.push(current);
      }
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, data);
      });
    },
    handleChange(path) {
      this.$router.push({
        path
      });
    },
    getDemandList() {
      this.damandList.status = "loading";
      getDemandList()
        .then(res => {
          this.damandList = {
            status: "success",
            list: res.data
          };
        })
        .catch(e => {
          console.log(e, "e");
          this.damandList = {
            status: "error",
            data: [],
            msg: "error"
          };
        });
    }
  },
  components: {
    DemandCard,
    ListWrapper
  }
};
</script>
<style>
.tab-container {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 44px;
}
.tab-container .mint-tabbar.is-fixed .mint-tab-item-label {
  color: inherit;
  font-size: 12px;
  height: 32px !important;
  line-height: 32px !important;
}
</style>
