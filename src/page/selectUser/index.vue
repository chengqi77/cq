<template>
  <div class="select-user-list">
    <loading :status="globalLoading"></loading>
    <!--  根据人员姓名展示人员搜索列表开始  -->
    <div class="condFilter bgWhite">
      <div class="condInp">
        <input type="text" v-model="username" placeholder="搜索员工" @input="searchUserByName">
      </div>
    </div>

    <div class="filterList">
      <div class="resultList">
        <ul class="select-all-btn-wrap">
          <li :class="{ active : isAllSelector }">
            <div>
              <label @touchstart="allSelChangeFn">
                <em></em>全选
              </label>
            </div>
          </li>
        </ul>
      </div>
      <ul
        v-if="userList && userList.length > 0"
        class="user-list bg-white">
        <li
          v-for="user in userList"
          :key="user.userId"
          class="user-list-item"
          :class="{ active : user.isSelector }"
        >
          <div class="username-icon-wrap">
            <label @touchstart.prevent='filterFn( user )'>
              <!-- v-model='storeSelcteUsers' -->
              <input type='checkbox' :value='user' />
              <em></em>
            </label>
            <div class="username-icon">{{user.userName | usernameIcon}}</div>
          </div>

          <div>
            <span class="user-name">{{user.userName}}</span>
            <small>({{user.userTypeName}})</small>
            <p class="person-search-info">
              <span v-for="(dept, index) in user.deptNames" :key="index">{{dept}}<br></span>
            </p>
          </div>
        </li>
      </ul>
      <div class="noInfo" v-else>
        <p>暂无信息...</p>
      </div>
    </div>

    <bottom-btn @reset="unSelectUser" @submit="selectUser"/>
  </div>
</template>

<script>
import Loading from "@/components/LoadingWrap";
import userListApi from "@/api/userList";
import _ from "lodash";
import { Indicator } from "mint-ui";
import * as dd from "dingtalk-jsapi";
import BottomBtn from '@/components/BottomBtn'
export default {
  name: "SelectUser",
  components: {
    Loading,
    BottomBtn
  },
  data() {
    return {
      value: [],
      username: "",
      userList: [],
      globalLoading: false,
      isAllSelector: true,
      currentDept: {},
      filterList: {},
      userList: [],
      currentSelectUsers: [],
      storeSelcteUsers: [],
    };
  },
  computed: {
    allSelectUsers() {
      return [...this.storeSelcteUsers, ...this.currentSelectUsers]
    }
  },
  created() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "员工列表", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function(result) {},
        onFail: function(err) {}
      });
    });

    this.storeSelcteUsers = JSON.parse(sessionStorage.getItem('journalUser'))

    // Indicator.open({
    //   text: "加载中...",
    //   spinnerType: "fading-circle"
    // });
    this.getUserList()
  },
  methods: {
    getUserList() {
      userListApi
        .getUserList({
          userName: this.username
        })
        .then(result => {
          let data = result.data
          const allSelectUsersLength = this.allSelectUsers.length
          data = data.map(user => {
            user.deptNames = user.deptNames.split(",");
            if ( allSelectUsersLength !==0 && this.allSelectUsers.findIndex(current => {
              return user.id === current.id
            })!== -1){
              user.isSelector = true
            }else {
              user.isSelector = false
            }

            if (allSelectUsersLength === 0 || !user.isSelector){
              this.isAllSelector = false
            }

            return user;
          });

          this.userList = data 
        })
        .catch(err => {
          console.error("搜索用户失败", err);
    });
    },
    searchUserByName: _.debounce(function() {
      userListApi
        .getUserList({
          userName: this.username
        })
        .then(result => {
          let data = result.data
          const allSelectUsersLength = this.allSelectUsers.length
          data = data.map(user => {
            user.deptNames = user.deptNames.split(",");
            if (allSelectUsersLength !==0 && this.allSelectUsers.findIndex(current => {
              return user.id === current.id
            })!== -1){
              user.isSelector = true
            }else {
              user.isSelector = false
            }
            if (allSelectUsersLength === 0 || !user.isSelector){
              this.isAllSelector = false
            }
            return user;
          });
          this.userList = data 
        })
        .catch(err => {
          console.error("搜索用户失败", err);
        });
    }, 500),
    allSelChangeFn() {
      if (!this.isAllSelector) {
        this.storeSelcteUsers = [];
        this.isAllSelector = true;
        this.userList && this.userList.forEach((v, i) => {
          v.isSelector = true;
          this.storeSelcteUsers.push(v);
        });
      } else {
        this.isAllSelector = false
        this.userList && this.userList.forEach((v, i) => {
          v.isSelector = false;
        })
        this.storeSelcteUsers = []
      }
    },
    filterFn(user) {
      user.isSelector = !user.isSelector;
      if (user.isSelector) {
        if (this.allSelectUsers.findIndex(item => {
          return item.id === user.id
        }) !== -1) {
          return
        }
        this.currentSelectUsers.push(user)
      }
    },
    selectUser() {
      sessionStorage.setItem('journalUser', JSON.stringify([...this.storeSelcteUsers, ...this.currentSelectUsers]))
      this.$router.push('/journal')
    },
    unSelectUser() {
      this.$router.push('/journal')
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/global.css';
@import '../../styles/main.css';
.user-list {
  min-width: 100vw;
  min-height: 100vh;
  background: #fff;
  margin-top: 1rem;
}

.condInp {
  padding-top: 1rem;
}

.condFilter .condInp input {
  padding: 0.5rem;
}

.resultList {
  overflow-y: auto;
}

.username-icon-wrap{
  white-space: nowrap;
}

.user-manage .filterInfo {
  margin-bottom: 1rem;
}

.username-icon {
  display: inline-block;
  vertical-align: middle;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  text-align: center;
  background: #3296fa;
  color: #fff;
  font-size: 0.8rem;
}

.user-name {
  font-weight: bold;
  font-size: 1rem;
}

.person-search-info {
  margin-top: 0.3rem;
}

.person-search-info span {
  white-space: normal;
  font-size: 0.8rem;
}

.level-up-btn-wrap {
  padding-bottom: 1rem;
  padding: 0 1rem;
  text-align: right;
}

.level-up-btn.disable {
  // color: #191f25 56%;
  color: #7a7d81;
}

.level-up-btn {
  display: inline-block;
  padding: 0.3rem;
  // background: #3296fa;
  color: #3296fa;
}

.filterList ul {
  padding: 0 1rem;
}

.filter-dept-item {
  padding: 1rem 0 1rem 0;
  display: flex;
  justify-content: space-between;
}

.filterList .has-level-up {
  padding-left: 2rem;
}

.user-list {
  margin-top: 1rem;
}

.dept-child-btn {
  min-width: 4rem;
  padding-left: 0.5rem;
  border-left: 1px solid #d9d9d9;
  color: #3296fa;
}

.user-list-item {
  padding: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
}

.level-img {
  width: 1rem;
}

.current-dept {
  padding: 1rem;
  font-weight: bold;
}

.select-all-btn-wrap{
  background: #fff;
}

.user-num-count{
    display: flex;
    padding: 1rem;
    position:fixed; 
    bottom:0; 
    width:100%; 
    box-shadow:0 0 .5em rgba(0,0,0, .2);
  }

.filterList ul .active em{ position:relative; background:#3296fa; color:white; border-color:#3296fa; line-height:1; }
.filterList ul .active em:before{ content:''; position:absolute; width:8px; left:50%; top:50%; margin:-3px -4px; height:3px; border:solid 1px white; border-style:none none solid solid;}
</style>