<template>
  <div class="container">
    <div @click="goSearchList" class="search-box">
      <input :value="searchValue" type="text" placeholder="搜索需求单">
    </div>
    <ListWrapper
      :requestData="getDataByCurrent.bind(this)"
      :onDataChange="updateList"
      :allowRefresh="true"
      :allowLoadmore="true"
      :pageSise="20"
      ref="listWrapper"
      class="list"
    >
      <ul slot="list">
        <li v-for="item in list" @click="goDetail(item)" :key="item.id">
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
import moment from "moment";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    delBrTag,
    delHtmlTag,
    goDetail(item) {
      this.$router.push({ path: "/DemandDetails?id=" + item.id });
    },
    getDataByCurrent({ current,pageSise }) {
      const { startTimeStr, endTimeStr, selectedUseList } = this;
      const creatorIds = selectedUseList.map(user => user.id).join(",");
      return getDemandList({
        pageNo: current,
        pageSise,
        creatorIds,
        startTimeStr,
        endTimeStr
      }).then(res => {
        const { success, data, errorMsg } = res;
        if (success) {
          return Promise.resolve(data || []);
        } else {
          return Promise.reject(errorMsg);
        }
      });
    },
    updateList(list) {
      console.log(list, "list");
      this.list = list;
    },
    goSearchList() {
      this.$router.push({ path: "/searchList" });
    }
  },
  computed: {
    filterSelectedList() {
      return this.list.filter(item => {
        const { serialNumber = "" } = item;
        return !serialNumber || serialNumber.includes(this.searchValue);
      });
    },
    searchValue() {
      let s = [];
      const { selectedUseList, startTimeStr, endTimeStr } = this;
      if (selectedUseList.length) {
        s.push(selectedUseList.length + "个发送人");
      }
      if (this.startTimeStr || this.endTimeStr) {
        s.push(`${this.startTimeStr || "~"}-${this.endTimeStr || "~"}`);
      }
      return s.join(",");
    },
    selectedUseList() {
      return this.$store.state.selectedUseList;
    },
    startTimeStamp() {
      return this.$store.state.startTimeStamp;
    },
    startTimeStr() {
      return this.startTimeStamp
        ? moment(this.startTimeStamp).format("YYYY年MM月DD日 HH:mm:ss")
        : "";
    },
    endTimeStamp() {
      return this.$store.state.endTimeStamp;
    },
    endTimeStr() {
      return this.endTimeStamp
        ? moment(this.endTimeStamp).format("YYYY年MM月DD日 HH:mm:ss")
        : "";
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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-box {
    margin: 15px 5px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
    input {
      border: none !important;
    }
  }
  .list {
    flex: 1;
    flex-shrink: 1;
    padding: 0 5px;
  }
  ul {
    margin: 0px;
    list-style: none;
    padding: 0px;
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