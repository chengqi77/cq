<template>
  <div class="cons">
    <div class="screenList">
      <div class="screeninput" @click="goSearch">
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
                {{user.userName}}
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
          <span>{{startTimeStr}}</span>
        </div>
        <div class="time" @click="openendPicker">
          <span>结束时间</span>
          <span>{{endTimeStr}}</span>
        </div>
        <mt-datetime-picker @confirm="handleConfirm" ref="pickers" type="datetime"></mt-datetime-picker>
        <mt-datetime-picker
          :startDate="startTime"
          @confirm="handleEndConfirm"
          ref="picker"
          type="datetime"
          v-model="pickerendValue"
        ></mt-datetime-picker>
      </div>
    </div>
    <div class="footer">
      <div class="btn cancel" @click="cancel">取消</div>
      <div class="btn" @click="submit">确定</div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      se: require("../../assets/se.png"),
      startTimeStampState: "",
      endTimeStampState: "",
      number: "",
      result: [],
      pickerValue: "",
      pickerendValue: "",
      user: true
    };
  },
  created() {
    this.startTimeStampState = this.startTimeStamp;
    this.endTimeStampState = this.endTimeStamp;
    console.log(this,'this')
  },
  methods: {
    handleEndConfirm(data) {
      const n = moment(data).unix() * 1000;
      //this.$store.commit("setEndTimeStamp", n);
      this.endTimeStampState = n;
    },
    handleConfirm(data) {
      const n = moment(data).unix() * 1000;
      if (this.endTimeStamp && this.endTimeStamp < n) {
        //this.$store.commit("setEndTimeStamp", "");
        this.endTimeStampState = "";
      }
      // this.$store.commit("setStartTimeStamp", n);
      this.startTimeStampState = n;
      console.log(this.startTimeStampState, "this.startTimeStampState");
    },
    cancel() {
      this.startTimeStampState = this.startTimeStamp;
      this.endTimeStampState = this.endTimeStamp;
    },
    submit() {
      this.$store.commit("setEndTimeStamp", this.endTimeStampState);
      this.$store.commit("setStartTimeStamp", this.startTimeStampState);
      this.$router.replace({path:'demandList'});
    },
    openstPicker() {
      this.$refs.pickers.open();
    },
    openendPicker() {
      this.$refs.picker.open();
    },
    goSelect() {
      this.$router.push({
        path: "userList"
      });
    },
    goSearch() {
      this.$router.push({
        path: "search"
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
    },
    startTimeStamp() {
      return this.$store.state.startTimeStamp;
    },
    startTimeStr() {
      return this.startTimeStampState
        ? moment(this.startTimeStampState).format("YYYY年MM月DD日 HH:mm:ss")
        : "请选择>";
    },
    endTimeStamp() {
      return this.$store.state.endTimeStamp;
    },
    endTimeStr() {
      return this.endTimeStampState
        ? moment(this.endTimeStampState).format("YYYY年MM月DD日 HH:mm:ss")
        : "请选择>";
    },
    startTime() {
      return this.startTimeStampState
        ? new Date(this.startTimeStampState)
        : new Date();
    }
  }
};
</script>
<style lang="less">
.footer {
  position: fixed;
  align-items: center;
  display: flex;
  bottom: 0px;
  width: 100%;
  height: 54px;
  background: white;
  box-shadow: 10px 10px 5px 5px #fffefe;
  border-top: 1px solid #ececec;
  .btn {
    float: left;
    width: 46%;
    background: #2196f3;
    margin: 0px 2%;
    height: 38px;
    text-align: center;
    line-height: 35px;
    color: white;
  }
  .cancel {
    background: white;
    border: 1px solid #8b8a8a;
    color: #222222;
  }
}

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
    display: flex;
    justify-content: center;
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
      margin-bottom: 9px;
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