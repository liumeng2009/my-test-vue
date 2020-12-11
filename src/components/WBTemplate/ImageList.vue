<template>
  <div class="images-wrapper">
    <img :style="{ width: ( 100 / columnCount ) + '%' }" v-for="(item, index) in dataSource" :key="index" :src="item" alt="">
  </div>
</template>

<script>
export default {
    name: 'WBImageList',
    data () {
        return {
            columnCount: 0
        }
    },
    props: {
        dataSource: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        dataSource: {
            immediate: true,
            handler (newVal) {
                const _len = newVal.length
                switch (_len) {
                    case 1:
                        this.columnCount = 1
                        break
                    case 2:
                        this.columnCount = 2
                        break
                    default:
                        this.columnCount = 3
                        break
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .images-wrapper{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // padding-left: 58px;
        padding-bottom: 4px;

        img{
            box-sizing: border-box;
            padding: 4px;
        }
    }
</style>
