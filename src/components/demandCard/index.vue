<template>
  <div class="demandCardList">
    <div>
      <input type="text" class="ser" placeholder="搜索需求单" @click="onchange">
    </div>
    <div>
        <div v-show="showCustomLoading" class="mint-loadmore-top custom-loading">
          <span>加载中...</span>
        </div>
      <mt-loadmore
        ref="loadmore"
        :top-method="onRequestUpdateData"
        @top-status-change="handleTopChange"
        class="loadmore-box"
      >
        <ul>
          <li v-for="item in data.list" @click="details(item)" :key="item.id">
            <div class="Cardbox">
              <p class="title">需求编号：{{item.serialNumber}}</p>
              <div class="creatorDeptName">
                <div class="logo">{{item.creatorName || 'Unkonw'}}</div>
                <div class="userpre">
                  <p>{{item.creatorName|| 'Unkonw'}}的需求单</p>
                  <p>{{item.creatorDeptName|| 'Unkonw'}}</p>
                  <p class="time">{{item.createTimeStr}}</p>
                </div>
              </div>
              <div class="carddea">
                <span>业务单位/部门:</span>
                <span class="content" v-html="item.deptName"></span>
              </div>
              <div class="carddea">
                <span>沟通内推:</span>
                <span class="content">{{item.linkUpContent}}</span>
              </div>
              <div class="carddea">
                <span>是否分派:</span>
                <span class="content">{{item.isDispatch ? '是':'否'}}</span>
              </div>
            </div>
          </li>
          <li v-show="data.status === 'success' && data.list.length ===0">暂无数据</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="showLoading">加载中...</span>
        </div>
        
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
/*
1.没法控制loadmore的内部topStatus状态，只能通过下拉来触发
2.下拉来派发更新数据的行为
3.下拉的loading 通过 数据加载状态和topstatus共同控制，但是slot="top" 只有在触发下拉的动作才会显示
4.所以第一次获取数据时 显示自定义loading
*/
import { Loadmore } from "mint-ui";
export default {
  props: ["data", "onRequestUpdateData"],
  data() {
    return {
      topStatus: "pull"
    };
  },
  watch: {
    data(next, prev) {
      const { status: prevStatus } = prev;
      const { status: nextStatus } = next;
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
      const {
        data: { status },
        topStatus
      } = this;
      return status === "loading" && topStatus === "pull";
    },
    showLoading() {
      const {
        data: { status },
        topStatus
      } = this;
      return status === "loading" || topStatus === "loading";
    }
  },
  methods: {
    details(id) {
      this.$router.push({ path: "/DemandDetails?id=" + id.P });
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
.demandCardList {
  width: 94%;
  height: 100%;
  margin: 0px auto;
  .custom-loading{
      margin-top: 20px;
  }
  .loadmore-box {
    min-height: 200px;
  }
  ul {
    margin: 0px;
    list-style: none;
    padding: 0px;
  }

  .ser {
    width: 98%;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
    padding-left: 2%;
  }
  .Cardbox {
    text-align: left;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 15px;
    .title {
      margin: 0px;
      padding: 10px 0;
    }
    .creatorDeptName {
      display: flex;
      align-items: center;
      .logo {
        background: #3296fa;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        text-align: center;
        line-height: 40px;
        color: white;
        font-size: 12px;
      }
      .userpre {
        padding-left: 8px;
        flex: 1px;
        p {
          font-size: 13px;
          margin: 0px;
          padding: 2px 0px !important;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 245px;
        }
        .time {
          color: #a7a7a8;
        }
      }
    }
  }
}

.carddea {
  margin-top: 2px;
  display: flex;
  align-items: center;
}

.content {
  padding-left: 5px;
  margin-top: 2px;
  flex: 1px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>