<template>
  <div class="details">
    <!-- <mt-header title="需求单详情">
            <router-link to="/?1" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
    </mt-header>-->
    <div class="detailsBox">
      <p class="title">需求编号：{{demand.serialNumber}}</p>
      <div class="creatorDeptName">
        <div class="logo">{{split(delBrTag(demand.userName),1)}}</div>
        <div class="userpre">
          <p>{{delBrTag(demand.userName)}}的需求单</p>
          <p class="time">{{demand.createTimeStr}}</p>
        </div>
      </div>
      <div class="carddeaList">
        <p class="title">业务单位/部门</p>
        <p class="content" v-html="demand.deptName"></p>
      </div>
      <div class="carddeaList">
        <p class="title">人员名称</p>
        <p class="content" v-html="demand.userName"></p>
      </div>
      <div class="carddeaList">
        <p class="title">联系电话</p>
        <p class="content" v-html="demand.tel"></p>
      </div>
      <div class="carddeaList">
        <p class="title">沟通方式</p>
        <p class="content" v-html="demand.linkUpMethod"></p>
      </div>
      <div class="carddeaList">
        <p class="title">沟通内容</p>
        <p class="content" v-html="demand.linkUpContent"></p>
      </div>
      <div class="fp">
        <p>是否需要分派</p>
        <mt-switch v-model="demand.isDispatch ? true : false"></mt-switch>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.details {
  .mint-header {
    background-color: #ffffff !important;
    color: #3e3e3e !important;
  }
  .fp {
    display: flex;
    justify-content: space-between;
  }
  .detailsBox {
    width: 92%;
    margin: 0 auto;
    text-align: left;
    .title {
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
    .carddeaList {
      margin-top: 10px;
      .title {
        font-size: 16px;
        margin: 0px;
        padding: 0px;
      }
      .content {
        font-size: 13px;
        padding: 2px 0;
      }
    }
  }
}
</style>
<script>
import { delBrTag, split } from "@/utils";
import { Header } from "mint-ui";
import { getById } from "@/service/getData.js";
export default {
  data() {
    return {
      topStatus: "",
      demand: {
        serialNumber: "",
        creatorName: "",
        deptName: "",
        userName: "",
        tel: "",
        linkUpMethod: "",
        isDispatch: false
      },
      card: [
        {
          P: "11"
        }
      ],
      isDispatch: true
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    delBrTag,
    split,
    getdata() {
      let id = this.$route.query.id;
      console.log(id, "+");
      getById(id).then(res => {
        this.demand = res.data;
      });
    },
    exi() {
      this.$router.push({ path: "/?id=1" });
    },
    loadTop() {
      // 加载更多数据
      //  this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange(status) {
      // console.log('---')
      this.topStatus = status;
    },
    onchange() {
      // console.log('---111')
    }
  },
  components: {}
};
</script>