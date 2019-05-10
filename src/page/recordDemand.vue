<template>
  <div>
    <Field></Field>
    <mt-tabbar value="selected" @input="handleChange" fixed>
      <mt-tab-item id="recordDemand">录单</mt-tab-item>
      <mt-tab-item id="demandList">查看</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast, TabItem, Tabbar } from "mint-ui";

import Field from "@/components/Field/index";
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
    }
  },
  components: {
    Field
  }
};
</script>
