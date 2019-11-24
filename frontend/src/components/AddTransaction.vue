<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group label="Amount" label-for="amount">
                <b-form-input 
                    id="amount" 
                    v-model="form.amount"
                    type="number"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Currency" label-for="currency">
                <b-form-input 
                    id="currency" 
                    v-model="form.currency"
                    type="text"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Transaction Type" label-for="trans_type">
                <b-form-input 
                    id="trans_type" 
                    v-model="form.trans_type"
                    type="text"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Category" label-for="category">
                <b-form-input 
                    id="category" 
                    v-model="form.category"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Subcategory" label-for="subcategory">
                <b-form-input 
                    id="subcategory" 
                    v-model="form.subcategory"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="From account" label-for="from_account">
                <b-form-input 
                    id="from_account" 
                    v-model="form.from_account"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="On account" label-for="on_account">
                <b-form-input 
                    id="on_account" 
                    v-model="form.on_account"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Date and Time" label-for="create_datetime">
                <b-form-input 
                    id="create_datetime" 
                    v-model="form.create_datetime"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Place" label-for="place">
                <b-form-input 
                    id="place" 
                    v-model="form.place"
                    type="text"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Notes" label-for="notes">
                <b-form-textarea 
                    id="notes" 
                    v-model="form.notes"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'AddTransaction',
    data() {
        return {
            form: {
                amount: null,
                currency: '',
                trans_type: '',
                category: '',
                subcategory: '',
                from_account: '',
                on_accout: '',
                create_datetime: null,
                place: '',
                notes: '',
            },
        }
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
            this.$store.dispatch('createTransaction', { data });
        }
    }
}
</script>