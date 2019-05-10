<template>
  <div class="screenList">
    <div class="screeninput">
      <img :src="se" alt>
      <input type="text" placeholder="请输入需求号">
    </div>
    <div>
      <p class="title">按发送人筛选</p>
      <div class="userLists">
        <ul>
          <li
            v-for="(user,i) in selectedUseList"
            :key="i"
            @click="deleteSelectd(i)"
            class="userlist"
          >
            <div class="userbox">
              <img src="../../assets/close.png" alt>
              {{user}}
            </div>
          </li>
          <li class="userlist" @click="goSelect">
            <div class="userboxs">
              <img src="../../assets/add.png" alt>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p>选择时间段</p>
      <div class="time" @click="openstPicker">
        <span>开始时间</span>
        <span>请选择></span>
      </div>
      <div class="time" @click="openendPicker">
        <span>结束时间</span>
        <span>请选择></span>
      </div>
      <mt-datetime-picker ref="picker" type="datetime" v-model="pickerValue"></mt-datetime-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      se: require("../../assets/se.png"),
      number: "",
      result: [],
      pickerValue: "",
      user: true
    };
  },
  methods: {
    openstPicker() {
      this.$refs.picker.open();
    },
    openendPicker() {
      this.$refs.picker.open();
    },
    goSelect() {
      this.$router.push({
        path: "userList"
      });
    },
    deleteSelectd(i) {
      const next = this.selectedUseList;
      next.splice(i, 1);
      this.$store.commit("setSelectedUseList", next);
    }
  },
  computed: {
    selectedUseList() {
      return this.$store.state.selectedUseList;
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}

ul li {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

.screenList {
  .title {
    padding-top: 15px;
  }
  width: 92%;
  margin: 0 auto;
  .screeninput {
    position: relative;
    img {
      position: absolute;
      height: 21px;
      top: 21px;
      left: 17px;
    }
    input {
      width: 85%;
      height: 32px;
      line-height: 32px;
      margin-top: 15px;
      border-radius: 7px;
      border: none;
      border: 1px solid #cecece;
      padding-left: 15%;
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 10px 0px;
    border-bottom: 1px solid #b0b0b0;
  }
}

.userLists {
  width: 100%;
  float: left;
  padding: 15px 0;
  .userlist {
    float: left;
    width: 20%;
    .userboxs {
      img {
        height: 40px;
        width: 40px;
      }
    }
    .userbox {
      height: 40px;
      width: 40px;
      background: #2d97f8;
      border-radius: 100%;
      line-height: 40px;
      position: relative;
      color: white;
      text-align: center;
      font-size: 12px;
      img {
        position: absolute;
        top: 0px;
        right: 0px;
        height: 15px;
      }
    }
  }
}
</style>