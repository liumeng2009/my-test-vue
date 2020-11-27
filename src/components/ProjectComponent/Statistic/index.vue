<template>
  <a-row>
    <slot></slot>
  </a-row>
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

<style>

</style>
