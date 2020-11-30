<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CenterCard'
}
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
