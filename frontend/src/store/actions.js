 
import axios from 'axios'

import {
    SET_TRANSACTIONS, ADD_TRANSACTION, REMOVE_TRANSACTION,
    SET_ACCOUNTS,
    SET_CURRENCIES,
    SET_CATEGORIES,
    SET_SUBCATEGORIES,
    SET_PLACES,

} from './mutation-types.js'

const HTTP = axios.create({
    baseURL:'http://127.0.0.1:8000/'
})

const actions = {
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

    //Accounts actions
    getAccounts ({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('accounts/')
            .then((response) => {
                commit(SET_ACCOUNTS, response.data.results);
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    //Currencies actions
    getCurrencies ({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('currencies/')
            .then((response) => {
                commit(SET_CURRENCIES, response.data.results);
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    //Categories actions
    getCategories ({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('categories/')
            .then((response) => {
                commit(SET_CATEGORIES, response.data.results);
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    //Subcategories actions
    getSubcategories ({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('subcategories/')
            .then((response) => {
                commit(SET_SUBCATEGORIES, response.data.results);
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    //Places actions
    getPlaces ({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('places/')
            .then((response) => {
                commit(SET_PLACES, response.data.results);
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
}

export default actions;