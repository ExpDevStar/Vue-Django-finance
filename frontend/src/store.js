import Vue from 'vue'
import Vuex from 'vuex'

import mutations from '@/store/mutations';
import actions from '@/store/actions';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
    transaction: null,
    accounts: [],
    currencies: [],
    categories: [],
    subcategories: [],
    places: [],
  },
  getters: {
    transactions: state => state.transactions,
    transaction: state => state.transaction,
    accounts: state => state.accounts,
    currencies: state => state.currencies,
    categories: state => state.categories,
    subcategories: state => state.subcategories,
    places: state => state.places,
  },
  mutations: Object.assign(mutations),
  actions: Object.assign(actions),
});