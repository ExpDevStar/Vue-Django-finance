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
                    :options="getTargets(currencies)"
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
                    :options="getTargets(places)"
                ></b-form-select>
            </b-form-group>
            <b-form-group label="Notes" label-for="notes">
                <b-form-textarea 
                    id="notes" 
                    v-model="form.notes"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="$bvModal.hide('transactionForm')">Cancel</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'transactionForm',
    props: ['transaction', 'action'],
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
        ...mapGetters([
            'accounts', 'currencies', 'categories',
            'subcategories', 'places',
        ]),
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            if (this.action === 'create') {
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
                this.$bvModal.hide('transactionForm');
            } else if (this.action === 'update') {
                const transactionData = {
                    id: this.form.id,
                    data: {
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
                    },
                };
                this.$store.dispatch('updateTransaction', transactionData);
                this.$bvModal.hide('transactionForm');
            }
            
        },
        updateFormData() {
            if (this.action === 'update') {
                const transaction = this.transaction;
                this.form.id = transaction.id,
                this.form.amount = transaction.amount;
                this.form.currency = transaction.currency;
                this.form.trans_type = transaction.trans_type;
                this.form.category = transaction.category;
                this.form.subcategory = transaction.subcategory;
                this.form.from_account = transaction.from_account;
                this.form.on_account = transaction.on_account;
                this.form.create_datetime = transaction.create_datetime;
                this.form.place = transaction.place;
                this.form.notes = transaction.notes;
            } else {
                return null
            }
            
        },
        //Method to generate array of options for b-form-select
        getTargets(rawTargets) {
            const targets = []
            if (rawTargets) {
                if (rawTargets.every(object => {
                    return 'name' in object
                })) {
                        rawTargets.forEach((rawTarget) => {
                            const target = {
                                value: rawTarget.id,
                                text: rawTarget.name,
                            }
                        targets.push(target);
                        })
                } else {
                    rawTargets.forEach((rawTarget) => {
                    const target = {
                        value: rawTarget.id,
                        text: `${rawTarget.title}, ${rawTarget.amount} ${rawTarget.currency}`,
                    }
                    targets.push(target);
                })
                }
            }
            return targets
        },
    },
    beforeMount() {
        this.updateFormData()
        //Get data for selects from api
        this.$store.dispatch('getAccounts');
        this.$store.dispatch('getCurrencies');
        this.$store.dispatch('getCategories');
        this.$store.dispatch('getSubcategories');
        this.$store.dispatch('getPlaces');
    }
}
</script>