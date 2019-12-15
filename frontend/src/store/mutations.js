import {
  SET_TRANSACTIONS, SET_TRANSACTION, CREATE_TRANSACTION, UPDATE_TRANSACTION, REMOVE_TRANSACTION,
  SET_ACCOUNTS, CREATE_ACCOUNT, REMOVE_ACCOUNT,
  SET_CURRENCIES, ADD_CURRENCY, REMOVE_CURRENCY,
  SET_CATEGORIES, CREATE_CATEGORY, REMOVE_CATEGORY,
  SET_SUBCATEGORIES, CREATE_SUBCATEGORY, REMOVE_SUBCATEGORY,
  SET_PLACES, ADD_PLACE, REMOVE_PLACE,
} from './mutation-types.js'

export default {
  //Transactions mutations
  [SET_TRANSACTIONS] (state, transactions) {
    state.transactions = transactions;
  },
  [SET_TRANSACTION] (state, transaction) {
    state.transaction = transaction;
  },
  [UPDATE_TRANSACTION] (state) {// eslint-disable-line no-unused-vars
        
  },
  [CREATE_TRANSACTION] (state, transaction) {
    state.transactions = [transaction, ...state.transactions];
  },
  [REMOVE_TRANSACTION] (state,  transactionId ) {
    state.transactions = state.transactions.filter(transaction => {
      return transaction.id !== transactionId;
    })
  },

  //Accounts mutations
  [SET_ACCOUNTS] (state, accounts) {
    state.accounts = accounts;
  },
  [CREATE_ACCOUNT] (state, account) {
    state.accounts.push(account);
  },
  [REMOVE_ACCOUNT] (state, account) {
    state.accounts.splice(state.accounts.indexOf(account), 1);
  },

  //Currencies mutations
  [SET_CURRENCIES] (state, currencies) {
    state.currencies = currencies;
  },
  [ADD_CURRENCY] (state, currency) {
    state.currencies.push(currency);
  },
  [REMOVE_CURRENCY] (state, currency) {
    state.currencies.splice(state.currencies.indexOf(currency), 1);
  },

  //Categories mutations
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories;
  },
  [CREATE_CATEGORY] (state, category) {
    state.categories.push(category);
  },
  [REMOVE_CATEGORY] (state, category) {
    state.categories.splice(state.categories.indexOf(category), 1);
  },

  //Subcategories mutations
  [SET_SUBCATEGORIES] (state, subcategories) {
    state.subcategories = subcategories;
  },
  [CREATE_SUBCATEGORY] (state, subcategory) {
    state.subcategories.push(subcategory);
  },
  [REMOVE_SUBCATEGORY] (state, subcategory) {
    state.subcategories.splice(state.subcategories.indexOf(subcategory), 1);
  },

  //Places mutations
  [SET_PLACES] (state, places) {
    state.places = places;
  },
  [ADD_PLACE] (state, place) {
    state.places.push(place);
  },
  [REMOVE_PLACE] (state, place) {
    state.places.splice(state.places.indexOf(place), 1);
  },
};