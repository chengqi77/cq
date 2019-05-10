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
                <span>*</span>
                是否需要分派
            </label>
            <mt-switch v-model="assignswitch"></mt-switch>
        </div>
        <div class="save">
            <mt-button type="primary">提交</mt-button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Header, Switch, Button } from 'mint-ui';
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
                selected: '外卖'
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