<template>
  <div class="page-tabbar">
    <DemandCard></DemandCard>
     <mt-tabbar value="selected" @input="handleChange" fixed>
      <mt-tab-item id="recordDemand">录单</mt-tab-item>
      <mt-tab-item id="demandList">查看</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast, TabItem, Tabbar } from "mint-ui";
import DemandCard from "@/components/demandCard/index.vue";
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
export default {
  name: "查看需求单",
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
    }
  },
  components: {
    DemandCard
  }
};
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