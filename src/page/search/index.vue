<template>
    <div class="search">
        <div class="searchTit">
            <mt-search v-model="number" placeholder="需求单编号" >
                <div class="searchcon">
                    <ul>
                        <li class="searchconTit">
                            <span>465</span>
                            <span>465</span>
                        </li>
                    </ul>
                </div>
            </mt-search>

        </div>

    </div>
</template>
<script>
    import { Search } from 'mint-ui';
    import {serialNumber} from "@/service/getData.js"
    export default {
        data() {
            return {
                number: '',
                result: [
                    {
                        title: "66",
                        value: "66"
                    }
                ],
            }
        },
        created() {
            this.getserialNumber()
        },
        methods: {
            getserialNumber(){
                let serialNumbers = this.number
                serialNumber(serialNumbers).then(res=>{
                console.log(res)
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
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #d8d8d8;
            text-align: left;
        }

    }
</style>