<template>
    <div class="search">
        <div class="searchTit">
            <mt-search v-model="number" placeholder="需求单编号">
                <ListWrapper :requestData="getDataByCurrent.bind(this)" :onDataChange="updateList" :allowRefresh="true" :allowLoadmore="true"
                    ref="listWrapper" class="list">
                    <ul class="searchconList" slot="list">
                        <li class="searchconTit" v-for="item in list" @click="go(item)">
                            <!-- <span>{{item.serialNumber}}</span> -->
                            <span>{{item.serialNumber.substr(0,item.serialNumber.indexOf(number))}}</span><span style="color:red">{{number}}</span><span>{{item.serialNumber.substr(item.serialNumber.indexOf(number)+number.length)}}
                            </span>

                        </li>
                    </ul>
                </ListWrapper>
            </mt-search>
        </div>

    </div>
</template>
<script>
    import { Search, InfiniteScroll } from 'mint-ui';
    import { serialNumber } from "@/service/getData.js"
    import { Loadmore } from "mint-ui";
    import { delHtmlTag, delBrTag } from "@/utils";
    import ListWrapper from "@/components/listWrapper.vue";
    export default {
        data() {
            return {
                number: '',
                //   result:[],
                serialNumber: "",
                list: [],
            }
        },
        created() {
            //this.getserialNumber()
        },
        watch: {
            number() {
                //  console.log(this.list, 'this.list')
                this.$refs.listWrapper.getData(1, true);
            },

        },
        computed: {
            // result() {
            //     return this.list
            // }


        },
        methods: {
            go(item) {
                this.$router.push({ path: "/DemandDetails?id=" + item.id });
            },
            getDataByCurrent({ current }) {

                return serialNumber({ serialNumber: this.number, pageNo: current, pageSise: "10" }).then(res => {
                    const { success, data, errorMsg } = res;
                    if (success) {
                        //   console.log(res)
                        //  this.result = res.data || []
                        return Promise.resolve(data || []);
                    } else {
                        return Promise.reject(errorMsg);
                    }
                });
            },
            updateList(list) {
                this.list = list;
            },


        },
        components: {
            ListWrapper
        }
    }
</script>
<style lang="less">
    * {
        margin: 0px;
        padding: 0px;
    }

    ul li {
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    .searchconList {
        margin-top: 16px;
        line-height: 40px;
        padding-left: 18px;
        color: #474747;
    }

    .mint-searchbar-core {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: 0;
        background: #ededee;
        padding-left: 15px;
    }

    .mint-searchbar-inner {
        background-color: #ededee;
    }

    .mint-searchbar {
        position: relative;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #ffffff;
    }

    .searchcon {
        width: 92%;
        margin: 0 auto;
        margin-top: 15px;
        .searchconTit {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #d8d8d8;
            text-align: left;
        }

    }
</style>