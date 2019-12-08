<template>
    <div>
        <h3>Filtration Sidebar</h3>
        <b-form @submit="onSearch">
            <b-form-group label="Search in notes" label-for="search">
                <b-form-input id="search" type="search" v-model="form.search"></b-form-input>&nbsp;
                <b-button type="submit" variant="primary">Search</b-button>
            </b-form-group>
        </b-form>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group label="From Amount" label-for="fromAmount">
                <b-form-input
                    type="number"
                    id="fromAmount"
                    v-model="form.from_amount"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="To Amount" label-for="toAmount">
                <b-form-input
                    type="number"
                    id="toAmount"
                    v-model="form.to_amount"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Currency" label-for="currency">
                <b-form-select 
                    id="currency"
                    v-model="form.currency"
                    :options="getTargets(currencies)"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Type" label-for="trans_type">
                <b-form-select 
                    id="trans_type"
                    v-model="form.trans_type"
                    :options="transactionTypes"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Category" label-for="category">
                <b-form-select 
                    id="category" 
                    v-model="form.category"
                    :options="getTargets(categories)"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Subcategory" label-for="subcategory">
                <b-form-select 
                    id="subcategory" 
                    v-model="form.subcategory"
                    :options="getTargets(subcategories)"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="From account" label-for="from_account">
                <b-form-select 
                    id="from_account" 
                    v-model="form.from_account"
                    :options="getTargets(accounts)"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="On account" label-for="on_account">
                <b-form-select 
                    id="on_account" 
                    v-model="form.on_account"
                    :options="getTargets(accounts)"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Place" label-for="place">
                <b-form-select 
                    id="place" 
                    v-model="form.place"
                    :options="getTargets(places)"
                ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
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
            this.$emit('filter', params)
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
            this.$emit('filter', params)
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