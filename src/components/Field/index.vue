<template>

    <div class="field">

        <div class="formgroup">
            <label for="">
                <span>*</span>
                业务单位/部门
            </label>
            <textareaFeed :key="branch" ref="branch"></textareaFeed>
        </div>
        <div class="formgroup">
            <label for="">
                <span>*</span>
                人员名称
            </label>
            <textareaFeed :key="name" ref="name"></textareaFeed>
        </div>
        <div class="formgroup">
            <label for="">
                <span>*</span>
                联系电话
            </label>
            <textareaFeed :key="phone" ref="phone"></textareaFeed>
        </div>
        <div class="formgroup">
            <label for="">
                <span>*</span>
                沟通方式
            </label>
            <textareaFeed :key="Way" ref="Way"></textareaFeed>
        </div>
        <div class="formgroup">
            <label for="">
                <span>*</span>
                沟通内容
            </label>
            <textareaFeed :key="Waycon" ref="Waycon"></textareaFeed>
        </div>
        <div style="margin-top:10px;"></div>
        <div class="formgroups">
            <label for="">
                <span style="color:red;padding-right: 5px;">*</span>
                是否需要分派
            </label>
            <mt-switch v-model="assignswitch"></mt-switch>
        </div>
        <div class="save">
            <mt-button type="primary" @click="Save">提交</mt-button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { demandCardSave } from "@/service/getData.js"
    import { Header, Switch, Button, Toast } from 'mint-ui';
    import textareaFeed from '@/components/textareaFeed/index'
    Vue.component(Button.name, Button);
    Vue.component(Switch.name, Switch);
    Vue.component(Header.name, Header);
    export default {
        data() {
            return {
                branch: 'branch',
                Waycon: 'Waycon',
                Way: "Way",
                name: 'name',
                phone: "phone",
                assignswitch: false,
                selected: '外卖',
                sta: ''
            }
        },
        methods: {
            Trim(str) {  //str表示要转换的字符串
                console.log(str, 'str')
                if (str == undefined) {
                    this.sta = 0
                }
                else {
                    this.sta = 1
                    return String(str).replace(/\n|\r\n/g, "<br/>");
                }
            },

            Save() {

                let subObj = {
                    deptName: this.Trim(this.$refs.branch.texts),
                    userName: this.Trim(this.$refs.name.texts),
                    tel: this.Trim(this.$refs.phone.texts),
                    linkUpMethod: this.Trim(this.$refs.Way.texts),
                    linkUpContent: this.Trim(this.$refs.Waycon.texts),
                    isDispatch: this.assignswitch ? 1 : 0,
                }
              
                if (this.sta === 0 ) {
                    Toast("请完成必填(*)输入")
                }
                else {
                    demandCardSave(subObj).then(res => {
                        if (res.success === true) {
                            this.$router.push({ path: '/?1' })
                        }
                        console.log(res, '--')
                    })
                }
                // console.log(subObj,'--',this.$refs.name.texts)
            }
        },
        components: {
            textareaFeed
        }
    }
</script>
<style scoped>
    .field {
        margin-top: 10px;
        width: 92%;
        margin: 0 auto;
        margin-bottom: 40px;
    }

    .formgroup {
        text-align: left;
        line-height: 30px;
    }

    .formgroup span {
        color: red;
        padding-right: 5px;
    }

    .formgroup label {
        font-size: 14px;
    }

    .formgroups label {
        font-size: 14px;
    }

    .formgroups {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #a9a9a9;
        padding-bottom: 12px;
    }

    .save {
        margin-top: 15px;
    }

    .save .mint-button--primary {
        color: #fff;
        background-color: #3296fa;
        width: 100%;
        height: 35px;
        font-size: 15px;
    }
</style>