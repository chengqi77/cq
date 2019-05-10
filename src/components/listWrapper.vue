<template>
  <div :class="'list-wrapper '+className">
    <div v-show="showCustomLoading" class="custom-loading">
      <span>加载中...</span>
    </div>
    <mt-loadmore
      ref="loadmore"
      :top-method="refresh"
      v-infinite-scroll="loadmore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      @top-status-change="handleTopChange"
      class="loadmore-box"
    >
      <ul>
        <slot name="list"></slot>
        <li v-show="status === 'success' && list.length ===0">暂无数据</li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="showLoading">加载中...</span>
      </div>
    </mt-loadmore>
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
  props: ["requestData", "onDataChange",'className'],
  data() {
    return {
      list: [],
      status: "init", //loading success error
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
        prevStatus === "loading" &&
        ["success", "error"].includes(nextStatus)
      ) {
        this.$refs.loadmore.onTopLoaded();
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
    getData(current) {
      if (this.status === "loading") return;
      this.status = "loading";
      this.requestData({ current })
        .then(res => {
          if (current === 1) {
            this.list = res;
          } else {
            this.list = this.list.concat(res);
          }
          this.onDataChange(this.list);
          this.status = "success";
          this.current += 1;
        })
        .catch(e => {
          this.status = "error";
        });
    },
    refresh() {
      this.getData(1);
    },
    loadmore(...v) {
      console.log(v, "loadmore");
      this.getData(this.current + 1);
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
  .custom-loading {
    text-align: center;
  }
}
</style>