<template>
  <div class="tab-container">
    <DemandCard/>
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
      selected: "recordDemand"
    };
  },
  methods: {
    handleChange(path) {
      this.$router.push({
        path
      });
    },
    
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
  padding-bottom: 48px;
}
.tab-container .mint-tabbar.is-fixed .mint-tab-item-label {
  color: inherit;
  font-size: 12px;
  height: 32px !important;
  line-height: 32px !important;
}
</style>
