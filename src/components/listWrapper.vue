<template>
  <div
    class="list-wrapper"
    v-infinite-scroll="loadmore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <slot name="list"></slot>
    <p v-show="status === 'success' && list.length ===0" class="no-data">暂无数据</p>
    <p v-show="status === 'loaded'" class="no-more">没有更多了</p>
    <span v-show="showLoading">加载中...</span>
  </div>
</template>
<script>
/*
  1.没法控制loadmore的内部topStatus状态，只能通过下拉来触发
  2.下拉来派发更新数据的行为
  3.下拉的loading 通过 数据加载状态和topstatus共同控制，但是slot="top" 只有在触发下拉的动作才会显示
  4.所以第一次获取数据时 显示自定义loading
  */
import { delHtmlTag, delBrTag } from "@/utils";
export default {
  props: [
    "requestData",
    "onDataChange",
    "className",
    "allowRefresh",
    "allowLoadmore",
    "pageSize"
  ],
  data() {
    return {
      list: [],
      status: "init", //loading success error loaded
      topStatus: "pull",
      current: 0
    };
  },
  created() {
    this.getData(1);
  },
  watch: {
    status(nextStatus, prevStatus) {
      //如果数据状态由加载改变 则关闭下拉动画
      if (
        ["loading", "loaded"].includes(prevStatus) &&
        ["success", "error", "loaded"].includes(nextStatus)
      ) {
        this.closeAnmation();
      }
    }
  },
  computed: {
    showCustomLoading() {
      const { status, topStatus } = this;
      return status === "loading" && topStatus === "pull";
    },
    showLoading() {
      const { status, topStatus } = this;
      return status === "loading" || topStatus === "loading";
    }
  },
  methods: {
    closeAnmation() {
      // this.$refs.loadmore.onTopLoaded();
      // this.$refs.loadmore.onBottomLoaded();
    },
    getData(current, force = false) {
      if (["loading"].includes(this.status) && !force) {
        this.closeAnmation();
        return;
      }
      if (this.status === "loaded" && current !== 1) {
        return;
      }

      this.status = "loading";
      this.requestData({ current, pageSize: this.pageSize || 10 })
        .then(res => {
          if (res.length === 0) {
            this.status = "loaded";
            if (current === 1 && this.list.length) {
              this.list = [];
              this.onDataChange(this.list);
            }
            return;
          }
          if (current === 1) {
            this.list = res;
          } else {
            this.list = this.list.concat(res);
          }
          this.onDataChange(this.list);
          if (res.length < this.pageSize) {
            this.status = "loaded";
          } else {
            this.status = "success";
          }
          this.current += 1;
        })
        .catch(e => {
          this.status = "error";
        });
    },
    refresh() {
      if (this.allowRefresh) {
        this.getData(1);
      } else {
        this.$refs.loadmore.onTopLoaded();
      }
    },
    loadmore(...v) {
      this.allowLoadmore && this.getData(this.current + 1);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    onchange() {
      //  this.$router.push({ path:'/DemandDetails?id='+id.P})
    }
  },
  components: {}
};
</script>

<style lang="less">
.list-wrapper {
  min-height: 200px;
  overflow: auto;
  .custom-loading {
    text-align: center;
  }
  .no-data,
  .no-more {
    text-align: center;
    padding: 15px;
    font-size: 14px;
    color: #000;
  }
}
</style>