<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group label="Amount" label-for="amount">
                <b-form-input 
                    id="amount" 
                    v-model="form.amount"
                    type="number"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Currency" label-for="currency">
                <b-form-select 
                    id="currency" 
                    v-model="form.currency"
                    :options="getCurrencies"
                    required
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Transaction Type" label-for="trans_type">
                <b-form-select 
                    id="trans_type" 
                    v-model="form.trans_type"
                    :options="transactionTypes"
                    required
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Category" label-for="category">
                <b-form-select 
                    id="category" 
                    v-model="form.category"
                    :options="getCategories"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Subcategory" label-for="subcategory">
                <b-form-select 
                    id="subcategory" 
                    v-model="form.subcategory"
                    :options="getSubcategories"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="From account" label-for="from_account">
                <b-form-select 
                    id="from_account" 
                    v-model="form.from_account"
                    :options="getAccounts"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="On account" label-for="on_account">
                <b-form-select 
                    id="on_account" 
                    v-model="form.on_account"
                    :options="getAccounts"
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Date and Time" label-for="create_datetime">
                <b-form-input 
                    id="create_datetime" 
                    v-model="form.create_datetime"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Place" label-for="place">
                <b-form-select 
                    id="place" 
                    v-model="form.place"
                    :options="getPlaces"
                ></b-form-select>
            </b-form-group>
            <b-form-group label="Notes" label-for="notes">
                <b-form-textarea 
                    id="notes" 
                    v-model="form.notes"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Create</b-button>
            <b-button @click="$bvModal.hide('createTransactionForm')">Cancel</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'createTransactionForm',
    data() {
        return {
            form: {
                amount: null,
                currency: '',
                trans_type: '',
                category: '',
                subcategory: '',
                from_account: '',
                on_account: '',
                create_datetime: new Date(),
                place: '',
                notes: '',
            },
            transactionTypes: [
                { value: 'INC', text: 'Income'},
                { value: 'EXP', text: 'Expences'},
                { value: 'TEC', text: 'Technical'},
            ],
        }
    },
    computed: {
        getAccounts() {
            const rawAccounts = this.$store.getters.accounts;
            const accounts = [];
            if (rawAccounts) {
                rawAccounts.forEach((rawAccount) => {
                    const account = {
                        value: rawAccount.id,
                        text: `${rawAccount.title}, ${rawAccount.amount}` 
                    };
                    accounts.push(account);
                })
            }
            return accounts
        },
        getCurrencies() {
            const rawCurrencies = this.$store.getters.currencies;
            const currencies = [];
            if (rawCurrencies) {
                rawCurrencies.forEach((rawCurrency) => {
                    const currency = {
                        value: rawCurrency.id,
                        text: rawCurrency.name,
                    };
                    currencies.push(currency);
                })
            }
            return currencies
        },
        getCategories() {
            const rawCategories = this.$store.getters.categories;
            const categories = [];
            if (rawCategories) {
                rawCategories.forEach((rawCategory) => {
                    const category = {
                        value: rawCategory.id,
                        text: rawCategory.name,
                    };
                    categories.push(category);
                })
            }
            return categories
        },
        getSubcategories() {
            const rawSubcategories= this.$store.getters.subcategories;
            const subcategories = [];
            if (rawSubcategories) {
                rawSubcategories.forEach((rawSubcategory) => {
                    const subcategory = {
                        value: rawSubcategory.id,
                        text: rawSubcategory.name,
                    };
                    subcategories.push(subcategory);
                })
            }
            return subcategories
        },
        getPlaces() {
            const rawPlaces= this.$store.getters.places;
            const places = [];
            if (rawPlaces) {
                rawPlaces.forEach((rawPlace) => {
                    const place = {
                        value: rawPlace.id,
                        text: rawPlace.name,
                    };
                    places.push(place);
                })
            }
            return places
        },
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            const data = {
                amount: this.form.amount,
                currency: this.form.currency,
                trans_type: this.form.trans_type,
                category: this.form.category,
                subcategory: this.form.subcategory,
                from_account: this.form.from_account,
                on_account: this.form.on_account,
                create_datetime: this.form.create_datetime,
                place: this.form.place,
                notes: this.form.notes,
            };
            this.$store.dispatch('createTransaction', data);
            this.$bvModal.hide('createTransactionForm');
        }
    },
    beforeMount() {
        this.$store.dispatch('getAccounts');
        this.$store.dispatch('getCurrencies');
        this.$store.dispatch('getCategories');
        this.$store.dispatch('getSubcategories');
        this.$store.dispatch('getPlaces');
    }
}
</script>