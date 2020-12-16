<template>
  <h1>搜索框{{ social }}</h1>
</template>

<script>
export default {
    name: 'VerifySearch',
    data () {
        return {
            social: ''
        }
    },
    mounted () {
        console.log(this.$route.params)
    }
}
</script>

<style lang="less" scoped>

</style>
