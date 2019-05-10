<template>
  <div class="demandCardList">
    <div>
      <input v-model="searchValue" type="text" class="ser" placeholder="搜索需求单">
    </div>
    <ListWrapper
      :requestData="getDataByCurrent"
      :onDataChange="updateList"
      :allowRefresh="true"
      :allowLoadmore="true"
      ref="listWrapper"
      class="list"
    >
      <ul slot="list">
        <li v-for="item in filterSelectedList" @click="goDetail(item)" :key="item.id">
          <div class="Cardbox">
            <p class="title">需求编号：{{item.serialNumber}}</p>
            <div class="creatorDeptName">
              <div class="logo">{{item.userName || 'Unkonw'}}</div>
              <div class="userpre">
                <p>{{item.creatorName|| 'Unkonw'}}的需求单</p>
                <p>{{item.creatorDeptName|| 'Unkonw'}}</p>
                <p class="time">{{item.createTimeStr}}</p>
              </div>
            </div>
            <div class="carddea">
              <span>业务单位/部门:</span>
              <span class="content">{{delBrTag(item.deptName)}}</span>
            </div>
            <div class="carddea">
              <span>沟通内容:</span>
              <span class="content">{{delHtmlTag(item.linkUpContent)}}</span>
            </div>
            <div class="carddea">
              <span>是否分派:</span>
              <span class="content">{{item.isDispatch ? '是':'否'}}</span>
            </div>
          </div>
        </li>
        <li v-show="searchValue && filterSelectedList.length === 0" class="no-data">暂无符合条件的需求</li>
      </ul>
    </ListWrapper>
    <div></div>
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
import { delHtmlTag, delBrTag } from "@/utils";
import ListWrapper from "@/components/listWrapper.vue";
import { getDemandList } from "@/service/getData.js";
export default {
  data() {
    return {
      searchValue: "",
      list: []
    };
  },
  methods: {
    delBrTag,
    delHtmlTag,
    goDetail(item) {
      this.$router.push({ path: "/DemandDetails?id=" + item.id });
    },
    getDataByCurrent({ current }) {
      return getDemandList({ pageNo: current, pageSise: "10" }).then(res => {
        const { success, data, errorMsg } = res;
        if (success) {
          return Promise.resolve(data || []);
        } else {
          return Promise.reject(errorMsg);
        }
      });
    },
    updateList(list) {
      this.list = list;
    }
  },
  computed: {
    filterSelectedList() {
      return this.list.filter(item => {
        const { serialNumber = "" } = item;
        return !serialNumber || serialNumber.includes(this.searchValue);
      });
    }
  },
  components: {
    ListWrapper
  }
};
</script>

<style lang="less">
.no-data {
  padding: 15px;
  text-align: center;
}
.demandCardList {
  width: 94%;
  height: 100%;
  margin: 0px auto;
  .custom-loading {
    margin-top: 20px;
  }
  .loadmore-box {
    min-height: 200px;
  }
  .list{
    padding-bottom: 50px;
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