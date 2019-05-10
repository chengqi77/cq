<template>
    <div>
        <textarea style="resize:none" class="input-item textarea-item coolscrollbar"  rows="1" ref="address"
            v-model="texts" @focus="showClearBtn()" @blur="hideCleanBtn()" v-on:input="onchange()">
    </textarea>
    </div>

</template>
<style>
    .coolscrollbar {
        overflow: hidden;
        width: 100%;
        height: 30px;
        line-height: 20px;
        border: none;
        border-bottom: 1px solid #a9a9a9;
    }
</style>
<script>
    export default {
        name: "",
        data() {
            return {
                texts:this.text 
            }
        },
        props: {
            text: String,
        },
        watch: {
            globalLoading(val) {
                if (!val) {
                    Indicator.close()
                }
            },
            texts () {
                console.log(this.$refs,'this.$refs')
                this.getHeight(this.$refs.address)
            },
        },
        methods: {


            getHeight(el) {
                this.timer = setTimeout(() => {
                    el.style.height = 'auto' // 必须设置为auto
                    el.style.height = (el.scrollHeight) + 'px'
                }, 20)

            },
            Trim(str) {  //str表示要转换的字符串
                return str.replace(/\n|\r\n/g, "<br/>");
            },
            showClearBtn() {
            
            },
            hideCleanBtn() {
                
            },
            onchange() {
               
            }
        }
    }
</script>