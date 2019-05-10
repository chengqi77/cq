<template>
  <div class="container">
    <div class="header">
      <div class="search-box">
        <img :src="searchIcon" alt>
        <input type="text" v-model="searchValue" placeholder="搜索">
      </div>
      <p class="label">联系人</p>
    </div>
    <div class="check-all" @click="toggleAllChecked">
      <Checked :checked="isAllChecked"/>
      <p class="label">全选</p>
    </div>
    <ListWrapper
      :requestData="getDataByCurrent"
      :onDataChange="updateList"
      ref="listWrapper"
      class="list"
    >
      <ul slot="list">
        <li
          v-for="item in filterSelectedList"
          :key="item.id"
          class="item"
          @click="select(item.userName)"
        >
          <Checked :checked="selectList.includes(item.userName)"/>
          <p class="label">{{item.userName}}</p>
        </li>
        <li v-show="searchValue && filterSelectedList.length === 0" class="no-data">暂无符合条件的用户</li>
      </ul>
    </ListWrapper>
    <div class="fixed-tool">
      <p class="label">已选中:{{selectList.length}}人。</p>
      <button @click="submit">确定</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ListWrapper from "@/components/listWrapper.vue";
import Checked from "@/components/checked/index.vue";
import { getUserList } from "@/service/getData";

import searchIcon from "./img/search.png";
export default {
  data() {
    return {
      searchIcon,
      searchValue: "",
      selectList: [],
      list: [],
      isAllChecked: false
    };
  },
  created() {
    this.selectList = [].concat(this.selectedUseList);
  },
  methods: {
    getDataByCurrent({ current }) {
      return getUserList().then(res => {
        const { success, data, errorMsg } = res;
        if (success) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(errorMsg);
        }
      });
    },
    updateList(list) {
      this.list = list;
    },
    select(userName) {
      const { selectList } = this;
      const i = selectList.indexOf(userName);
      let nextSelectedUseList = selectList;
      if (i === -1) {
        nextSelectedUseList.push(userName);
      } else {
        nextSelectedUseList.splice(i, 1);
      }
    },
    submit() {
      this.$store.commit("setSelectedUseList", this.selectList);
      this.$router.back();
    },
    toggleAllChecked() {
      if (this.isAllChecked) {
        this.selectList = [];
      } else {
        this.selectList = this.list.map(item => item.userName);
      }
      this.isAllChecked = !this.isAllChecked;
    }
  },
  computed: {
    selectedUseList() {
      return this.$store.state.selectedUseList;
    },
    filterSelectedList() {
      return this.list.filter(item => {
        const { userName = "" } = item;
        return !userName || userName.includes(this.searchValue);
      });
    }
  },

  components: {
    ListWrapper,
    Checked
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #f6f6f6;
  overflow: hidden;
}
.header {
  overflow: hidden;
  background: #fff;
  .search-box {
    margin: 15px;
    height: 36px;
    background: #ededed;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      margin: 0 10px;
      width: 20px;
    }
    input {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      outline: none;
    }
  }
  .label {
    padding-left: 8px;
    line-height: 60px;
    font-size: 16px;
    color: #ccc;
  }
}
.check-all {
  margin: 20px 0;
  background: #fff;
}
.list {
  padding-bottom: 50px;
  background: #fff;
}
.item,
.check-all {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  height: 50px;

  .label {
    line-height: 50px;
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #f4f4f4;
  }
}
.no-data {
  padding: 15px;
  text-align: center;
}
.fixed-tool {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 46px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-top: 1px solid #f4f4f4;
  background: #fff;
  .label {
    color: #32acff;
    font-size: 16px;
  }
  button {
    background: #32acff;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    color: #fff;
    font-size: 14px;
    border: none;
  }
}
</style>
