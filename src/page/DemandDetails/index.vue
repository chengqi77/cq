<template>
    <div class="details">
        <mt-header title="需求单详情">
            <router-link to="/?1" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="detailsBox">
            <p class="title">需求编号：232323</p>
            <div class="creatorDeptName">
                <div class="logo">李山</div>
                <div class="userpre">
                    <p>**de需求单de需</p>
                    <p>**项目组</p>
                    <p class="time">**时间</p>
                </div>
            </div>
            <div v-for="item in card" class="carddeaList">
                <p class="title">业务单位/部门</p>
                <p class="content" v-html="contents"></p>
            </div>
            <div class="fp">
                <p>是否需要分派</p>
                <mt-switch v-model="value"></mt-switch>
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
            .title {}
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
                        color: #a7a7a8
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
                .content{
                    font-size: 13px;
                    padding: 10px 0;
                }
            }
        }
    }
</style>
<script>
    import { Header } from 'mint-ui';
    export default {
        data() {
            return {
                contents: " 12312<br/>121<br/>",
                topStatus: '',
                list: [
                    {
                        P: '11'
                    }
                ],
                card: [{
                    P: '11'
                }],
                value:true,
            }
        },
        methods: {
            exi(){
                this.$router.push({ path:'/?id=1'})
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
        components: {

        }
    }
</script>