<template>
  <a-col :span="span" class="item">
    <span class="value">{{ value }}</span>
    <span class="name">
        <a-icon type="edit"></a-icon>
        <span>{{ name }}</span>
    </span>
  </a-col>
</template>

<script>
export default {
    name: 'StatisticItem',
    props: {
        name: String,
        value: String
    },
    computed: {
        span () {
            return (24 / this.$parent.$parent.$parent.length)
        }
    }
}
</script>

<style lang="less" scoped>
    .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .value{
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 4px;
        }

        .name{
            font-size: 12px;

            i{
                margin-right: 4px;
            }
        }
    }
</style>
