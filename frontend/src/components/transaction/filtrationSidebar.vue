<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in notes" label-for="search">
                <b-row>
                  <b-col cols=8>
                    <b-form-input id="search" type="search" v-model="form.search"></b-form-input>
                  </b-col>
                  <b-col cols=4>
                    <b-button type="submit" variant="primary">Search</b-button>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row>
            <b-col cols=6>
              <b-form-group label="From Amount" label-for="fromAmount">
                <b-form-input
                  type="number"
                  id="fromAmount"
                  v-model="form.from_amount"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="To Amount" label-for="toAmount">
                <b-form-input
                  type="number"
                  id="toAmount"
                  v-model="form.to_amount"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="Currency" label-for="currency">
                <b-form-select 
                  id="currency"
                  v-model="form.currency"
                  :options="getTargets(currencies)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="Type" label-for="trans_type">
                <b-form-select 
                  id="trans_type"
                  v-model="form.trans_type"
                  :options="transactionTypes"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="Category" label-for="category">
                <b-form-select 
                  id="category" 
                  v-model="form.category"
                  :options="getTargets(categories)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="Subcategory" label-for="subcategory">
                <b-form-select 
                  id="subcategory" 
                  v-model="form.subcategory"
                  :options="getTargets(subcategories)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="From" label-for="from_account">
                <b-form-select 
                  id="from_account" 
                  v-model="form.from_account"
                  :options="getTargets(accounts)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="On" label-for="on_account">
                <b-form-select 
                  id="on_account" 
                  v-model="form.on_account"
                  :options="getTargets(accounts)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=12>
              <b-form-group label="Place" label-for="place">
                <b-form-select 
                  id="place" 
                  v-model="form.place"
                  :options="getTargets(places)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-col>
            <b-col cols=6>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { getTargets } from '@/utils.js';

export default {
  name: 'filtrationSidebar',
  props: [],
  data() {
    return {
      form: {
        from_amount: 0,
        to_amount: null,
        currency: null,
        trans_type: null,
        category: null,
        subcategory: null,
        from_account: null,
        on_account: null,
        create_datetime: null,
        place: null,
        search: '',
      },
      transactionTypes: [
        {value: null, text: '--Select item--'},
        { value: 'INC', text: 'Income'},
        { value: 'EXP', text: 'Expences'},
        { value: 'TEC', text: 'Technical'},
      ],
    }
  },
  computed: {
    ...mapGetters([
        'accounts', 'currencies', 'categories',
        'subcategories', 'places',
    ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        from_amount: this.form.from_amount,
        to_amount: this.form.to_amount,
        currency: this.form.currency,
        trans_type: this.form.trans_type,
        category: this.form.category,
        subcategory: this.form.subcategory,
        from_account: this.form.from_account,
        on_account: this.form.on_account,
        place: this.form.place,
      }}
      this.$store.dispatch('getTransactions', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.from_amount = 0,
      this.form.to_amount = null,
      this.form.currency = null;
      this.form.trans_type = null;
      this.form.category = null;
      this.form.subcategory = null;
      this.form.from_account = null;
      this.form.on_account = null;
      this.form.place = null;
      this.$store.dispatch('getTransactions');
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
      }}
      this.$store.dispatch('getTransactions', params);
    },
    getTargets: getTargets,
  },
  beforeMount() {
    //Get data for selects from api
    this.$store.dispatch('getAccounts');
    this.$store.dispatch('getCurrencies');
    this.$store.dispatch('getCategories');
    this.$store.dispatch('getSubcategories');
    this.$store.dispatch('getPlaces');
  }
}
</script>