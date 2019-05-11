<template>
    <div class="search">
        <div class="searchTit">
            <mt-search v-model="number" placeholder="需求单编号">
                <div class="searchcon">
                    <ul class="searchconList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li class="searchconTit" v-for="item in result">
                            <span>{{item.serialNumber}}</span>
                        </li>
                    </ul>
                </div>
            </mt-search>
        
        </div>

    </div>
</template>
<script>
    import { Search, InfiniteScroll } from 'mint-ui';
    import { serialNumber } from "@/service/getData.js"
    export default {
        data() {
            return {
                number: '',
                result: [

                ],
            }
        },
        created() {
            //this.getserialNumber()
        },
        watch: {
            number() {
                this.search(1)
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
               // console.log('---', this.loading)
                setTimeout(() => {
                    this.search(2);
                    this.loading = false;
                }, 2500);
            },
            search(index) {
                let serialNumbers = {
                    serialNumber: this.number,
                    pageNo: index,
                    pageSise: 30,
                }
                serialNumber(serialNumbers).then(res => {
                    if (res) {
                        if(index)
                        this.result = res.data
                    }

                })
            }
        },
        components: {

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
        height: 500px;
        overflow-x: scroll
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