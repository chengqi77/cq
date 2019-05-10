<template>
    <div class="demandCardList">
        <div>
            <input type="text" class="ser" placeholder="搜索需求单" @click="onchange">
        </div>
        <div>
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
                <ul>
                    <li v-for="item in list" @click="details(item)">
                        <div class="Cardbox">
                            <p class="title">需求编号：232323</p>
                            <div class="creatorDeptName">
                                <div class="logo">李山</div>
                                <div class="userpre">
                                    <p>**de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单de需求单</p>
                                    <p>**项目组</p>
                                    <p class="time">**时间</p>
                                </div>
                            </div>
                            <div v-for="item in card" class="carddea">
                                <span>业务单位/部门:</span>
                                <span class="content">你好你好你好你好你好你好你好你好你好你好你好你好你好你好</span>
                            </div>
                        </div>

                    </li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">Loading...</span>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import { Loadmore } from 'mint-ui';
    export default {
        data() {
            return {
                topStatus: '',
                list: [
                    {
                        P: '11'
                    }
                ],
                card: [{
                    P: '11'
                }],
            }
        },
        methods: {
            details(id) {
                console.log(id, 'id')
                this.$router.push({ path: '/DemandDetails?id=' + id.P })
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
                //  this.$router.push({ path:'/DemandDetails?id='+id.P})
            }
        },
        components: {

        }
    }
</script>

<style lang="less">
    .demandCardList {
        width: 94%;
        margin: 0px auto;
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
                        color: #a7a7a8
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