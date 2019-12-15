import axios from 'axios'

import {
  SET_TRANSACTIONS, SET_TRANSACTION, CREATE_TRANSACTION, UPDATE_TRANSACTION, REMOVE_TRANSACTION,
  SET_ACCOUNTS, CREATE_ACCOUNT, REMOVE_ACCOUNT,
  SET_CURRENCIES, ADD_CURRENCY, REMOVE_CURRENCY,
  SET_CATEGORIES, CREATE_CATEGORY, REMOVE_CATEGORY,
  SET_SUBCATEGORIES, CREATE_SUBCATEGORY, REMOVE_SUBCATEGORY,
  SET_PLACES, ADD_PLACE, REMOVE_PLACE,
} from './mutation-types.js'

const HTTP = axios.create({
  baseURL:'http://127.0.0.1:8000/'
})

const actions = {
  //Transactions actions
  async getTransactions ({ commit }, params) {
    const response = await HTTP.get('transactions/', params);
    if (response.status === 200) {
      commit(SET_TRANSACTIONS, response.data.results)
    }
  },
  async getTransaction({ commit }, transactionId) {
    const response = await HTTP.get(`transactions/${transactionId}`)
    if (response.status === 200) {
      commit(SET_TRANSACTION, response.data)
    }
  },
  async createTransaction ({ commit }, transactionData) {
    const response = await HTTP.post('transactions/', transactionData);
    if (response.status === 201) {
      commit(CREATE_TRANSACTION, response.data)
    }
  },
  async updateTransaction ({ commit }, transactionData) {
    const response = await HTTP.put(`transactions/${transactionData.id}/`, transactionData.data);
    if (response.status === 200) {
      commit(UPDATE_TRANSACTION)
    }
  },
  async deleteTransaction ({ commit }, transactionId) {
    const response = await HTTP.delete(`transactions/${transactionId}/`);
    if (response.status === 204) {
      commit(REMOVE_TRANSACTION, transactionId)
    }
  },

  //Accounts actions
  async getAccounts ({ commit }) {
    const response = await HTTP.get('accounts/');
    if (response.status === 200) {
      commit(SET_ACCOUNTS, response.data.results)
    }
  },
  async createAccount ({ commit }, accountData) {
    const response = await HTTP.post('accounts/', accountData);
    if (response.status === 201) {
      commit(CREATE_ACCOUNT, response.data)
    }
  },
  async updateAccount ({ dispatch }, accountData) {
    const response = await HTTP.put(`accounts/${accountData.id}/`, accountData.data);
    if (response.status === 200) {
      dispatch('getAccounts')
    }
  },
  async deleteAccount ({ commit }, account) {
    const response = await HTTP.delete(`accounts/${account.id}/`);
    if (response.status === 204) {
      commit(REMOVE_ACCOUNT, account)
    }
  },
  //Currencies actions
  async getCurrencies ({ commit }) {
    const response = await HTTP.get('currencies/');
    if (response.status === 200) {
      commit(SET_CURRENCIES, response.data.results)
    }
  },
  async addCurrency ({ commit }, currencyData) {
    const response = await HTTP.post('currencies/', currencyData);
    if (response.status === 201) {
      commit(ADD_CURRENCY, response.data)
    }
  },
  async updateCurrency ({ dispatch }, currencyData) {
    const response = await HTTP.put(`currencies/${currencyData.id}/`, currencyData.data);
    if (response.status === 200) {
      dispatch('getCurrencies')
    }
  },
  async deleteCurrency ({ commit }, currency) {
    const response = await HTTP.delete(`currencies/${currency.id}/`);
    if (response.status === 204) {
      commit(REMOVE_CURRENCY, currency)
    }
  },
  //Categories actions
  async getCategories ({ commit }) {
    const response = await HTTP.get('categories/');
    if (response.status === 200) {
      commit(SET_CATEGORIES, response.data.results)
    }
  },
  async createCategory ({ commit }, categoryData) {
    const response = await HTTP.post('categories/', categoryData);
    if (response.status === 201) {
      commit(CREATE_CATEGORY, response.data)
    }
  },
  async updateCategory ({ dispatch }, categoryData) {
    const response = await HTTP.put(`categories/${categoryData.id}/`, categoryData.data);
    if (response.status === 200) {
      dispatch('getCategories')
    }
  },
  async deleteCategory ({ commit }, category) {
    const response = await HTTP.delete(`categories/${category.id}/`);
    if (response.status === 204) {
      commit(REMOVE_CATEGORY, category)
    }
  },
  //Subcategories actions
  async getSubcategories ({ commit }) {
    const response = await HTTP.get('subcategories/');
    if (response.status === 200) {
      commit(SET_SUBCATEGORIES, response.data.results)
    }
  },
  async createSubcategory ({ commit }, subcategoryData) {
    const response = await HTTP.post('subcategories/', subcategoryData);
    if (response.status === 201) {
      commit(CREATE_SUBCATEGORY, response.data)
    }
  },
  async updateSubcategory ({ dispatch }, subcategoryData) {
    const response = await HTTP.put(`subcategories/${subcategoryData.id}/`, subcategoryData.data);
    if (response.status === 200) {
      dispatch('getSubcategories')
    }
  },
  async deleteSubcategory({ commit }, subcategory) {
    const response = await HTTP.delete(`subcategories/${subcategory.id}/`);
    if (response.status === 204) {
      commit(REMOVE_SUBCATEGORY, subcategory)
    }
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
  addPlace ({ commit }, placeData) {
    return new Promise((resolve, reject) => {
      HTTP.post('places/', placeData)
        .then((response) => {
          commit(ADD_PLACE, response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updatePlace ({ dispatch }, placeData) {
    return new Promise((resolve, reject) => {
      HTTP.put(`places/${placeData.id}`, placeData.data)
        .then((response) => {
          dispatch('getPlaces');
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deletePlace ({ commit }, place) {
    return new Promise((resolve, reject) => {
      HTTP.delete(`places/${place.id}`)
        .then((response) => {
          commit(REMOVE_PLACE, place);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
}

export default actions;
