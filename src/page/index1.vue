<template>
    <div>
        1232
        <textareaFeed ref="textareaFeedRef" :text="texts"></textareaFeed>
        <Upload type="file" ref="uploadFileRef" />
        <div @click="ok">okokok</div>
    </div>
</template>
<script>
    import textareaFeed from '../components/textareaFeed/index'
    import Upload from '../components/upfile/index1'
    export default {

        data() {
            return {
                texts:'',
            }
        },
        components: {
            textareaFeed,
            Upload
        },
        methods: {
            Trim(str) {  //str表示要转换的字符串
                return str.replace(/\n|\r\n/g, "<br/>");
            },
            ok() {
                console.log(this.$refs.uploadFileRef,)
                console.log(this.Trim(this.$refs.textareaFeedRef.texts))
            }
        },
    }
</script>