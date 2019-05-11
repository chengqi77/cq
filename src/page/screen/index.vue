<template>
    <div class="cons">
        <div class="screenList">
            <div class="screeninput">
                <img :src="se" alt>
                <input type="text" placeholder="请输入需求号">
            </div>
            <div>
                <p class="title">按发送人筛选</p>
                <div class="userLists">
                    <ul>
                        <li v-for="(user,i) in selectedUseList" :key="i" @click="deleteSelectd(i)" class="userlist">
                            <div class="userbox">
                                <img src="../../assets/close.png" alt> {{user}}
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
                    <span>{{starttime}}</span>
                </div>
                <div class="time" @click="openendPicker">
                    <span>结束时间</span>
                    <span>{{endtime}}</span>
                </div>
                <mt-datetime-picker @confirm="handleConfirm" ref="pickers" type="datetime" v-model="pickerValue"></mt-datetime-picker>
                <mt-datetime-picker :startDate="startDate" @confirm="handleendConfirm" ref="picker" type="datetime" v-model="pickerendValue"></mt-datetime-picker>
            </div>

        </div>
        <div class="footer">
            <div class="btn cancel">取消</div>
            <div class="btn">确定</div>
        </div>
    </div>

</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                endtime: "请选择>",
                starttime: "请选择>",
                startDate: new Date(),
                se: require("../../assets/se.png"),
                number: "",
                result: [],
                pickerValue: "",
                pickerendValue: '',
                user: true
            };
        },
        methods: {
            handleendConfirm(data) {
                this.endtime = moment(data).format("YYYY年MM月DD日 HH:mm:ss")

            },
            handleConfirm(data) {
                this.starttime = moment(data).format("YYYY年MM月DD日 HH:mm:ss")
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
            background: #2196F3;
            margin: 0px 2%;
            height: 38px;
            text-align: center;
            line-height: 35px;
            color: white;
        }
        .cancel {
            background: white;
            border: 1px solid #8b8a8a;
            color: #222222
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