import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
    SET_TRANSACTIONS, ADD_TRANSACTION, REMOVE_TRANSACTION,
    SET_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT,
    SET_CURRENCIES, ADD_CURRENCY, REMOVE_CURRENCY,
    SET_CATEGORIES, ADD_CATEGORY, REMOVE_CATEGORY,
    SET_SUBCATEGORIES, ADD_SUBCATEGORY, REMOVE_SUBCATEGORY,
    SET_PLACES, ADD_PLACE, REMOVE_PLACE,

} from './mutation-types.js'

const HTTP = axios.create({
    baseURL:'http://127.0.0.1:8000/'
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        transactions: [],
        accounts: [],
        currencies: [],
        categories: [],
        subcategories: [],
        places: [],
    },
    getters: {
        transactions: state => state.transactions,
        accounts: state => state.accounts,
        currencies: state => state.currencies,
        categories: state => state.categories,
        subcategories: state => state.subcategories,
        places: state => state.places,
    },
    mutations: {
        //Transactions mutations
        [SET_TRANSACTIONS] (state, transactions) {
            state.transactions = transactions;
        },
        [ADD_TRANSACTION] (state, transaction) {
            state.transactions.push(transaction);
        },
        [REMOVE_TRANSACTION] (state, transaction) {
            state.transactions.splice(state.transactions.indexOf(transaction), 1);
        },

        //Accounts mutations
        [SET_ACCOUNTS] (state, accounts) {
            state.accounts = accounts;
        },
        [ADD_ACCOUNT] (state, account) {
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
        [ADD_CATEGORY] (state, category) {
            state.categories.push(category);
        },
        [REMOVE_CATEGORY] (state, category) {
            state.categories.splice(state.categories.indexOf(category), 1);
        },

        //Subcategories mutations
        [SET_SUBCATEGORIES] (state, subcategories) {
            state.subcategories = subcategories;
        },
        [ADD_SUBCATEGORY] (state, subcategory) {
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
        
    },
    
    actions: {
        //Transactions actions
        async getTransactions ({ commit }) {
            const response = await HTTP.get('transactions/');
            if (response.status === 200) {
                commit(SET_TRANSACTIONS, response.data.results)
            }
        },
        async createTransaction ({ commit }, transactionData) {
            const response = await HTTP.post('transactions/', transactionData);
            if (response.status === 201) {
                commit(ADD_TRANSACTION, response.data)
            }
        },
        async updateTransaction ({ dispatch }, transactionData) {
            const response = await HTTP.put(`transactions/${transactionData.id}/`, transactionData.data);
            if (response.status === 200) {
                dispatch('getTransactions')
            }
        },
        async deleteTransaction ({ commit }, transaction) {
            const response = await HTTP.delete(`transactions/${transaction.id}/`);
            if (response.status === 204) {
                commit(REMOVE_TRANSACTION, transaction)
            }
        },

        //Accouts actions
        //Currencies actions
        //Categories actions
        //Subcategories actions
        //Places actions
    }
})