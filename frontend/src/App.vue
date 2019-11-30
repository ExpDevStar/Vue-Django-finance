<template>
  <div id="app">
    <transactionList/>
  </div>
</template>

<script>

import transactionList from '@/components/transaction/transactionList.vue';

export default {
  name: 'app',
  components: {
    transactionList,
  },

}
</script>

<style>

</style>
