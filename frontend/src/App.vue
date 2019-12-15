<template>
  <div id="app">
    <navigationBar/>
    <router-view></router-view>
  </div>
</template>

<script>

import navigationBar from '@/components/navigationBar.vue';

export default {
  name: 'app',
  components: {
    navigationBar,
  },

}
</script>

<style>

</style>
