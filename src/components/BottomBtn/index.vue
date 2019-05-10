<template>
    <div class="globalBtn bgWhite boxShadow">
        <span class="gloResetBtn" @click="reset">取消</span>
        <span class="gloYesBtn" @click="submit">确定</span>
    </div>
</template>
<script>
export default {
    methods: {
        reset(){
          //  console.log( this.$emit,' this.$emit')
            this.$emit('reset')
        },
        submit() {
            this.$emit('submit')
        }
    }
}
</script>
<style scoped>
.gloResetBtn{
    text-align: center;
}
</style>

