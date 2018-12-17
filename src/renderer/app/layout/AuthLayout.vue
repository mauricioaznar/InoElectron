<template>
  <div class="auth-layout">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'AuthLayout',
    created () {
    }
  }
</script>

<style lang="scss">
  @import '../../sass/variables';
  .auth-layout {
    background-color: white;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
