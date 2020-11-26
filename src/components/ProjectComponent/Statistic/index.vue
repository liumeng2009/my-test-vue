<template>
    <a-card title="平台抓取数据量" size="small">
        <div slot="extra">单位:万</div>
        <a-row>
            <slot></slot>
        </a-row>
    </a-card>
</template>

<script>
export default {
    name: 'Statistic',
    computed: {
        length () {
            return this.$slots.default.length
        }
    }
}
</script>

<style lang="less" scoped>
    .wrapper {
        padding: 16px;
        border: #ccc 1px solid;

        .title {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;

            .title-name {
                font-size: 16px;
                font-weight: bold;
            }

            .unit {
                font-size: 12px;
            }
        }
    }
</style>
