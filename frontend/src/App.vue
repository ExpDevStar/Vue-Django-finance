<template>
  <div id="app">
    <AddTransaction/>
    <TransactionList/>
  </div>
</template>

<script>
import AddTransaction from '@/components/AddTransaction.vue';
import TransactionList from '@/components/TransactionList.vue';

export default {
  name: 'app',
  components: {
    AddTransaction,
    TransactionList,
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
