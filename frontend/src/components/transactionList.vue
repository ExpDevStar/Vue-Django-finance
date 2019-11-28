<template>
    <div>
        <h3>Transaction List</h3>
        <b-button v-b-modal.createTransactionForm variant="info">Create</b-button>
        <b-table-simple 
            v-for="transaction in transactions"
            v-bind:key="transaction.id">
            <b-thead>
                <b-tr>
                    <b-th>id</b-th>
                    <b-th>Amount</b-th>
                    <b-th>Currency</b-th>
                    <b-th>Transaction Type</b-th>
                    <b-th>Category</b-th>
                    <b-th>Subcategory</b-th>
                    <b-th>From Account</b-th>
                    <b-th>On Account</b-th>
                    <b-th>Create DateTime</b-th>
                    <b-th>Place</b-th>
                    <b-th>Notes</b-th>
                    <b-th><b-button v-b-modal.updateTransactionForm variant="warning">Edit</b-button></b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr>
                    <b-td>{{ transaction.id }}</b-td>
                    <b-td>{{ transaction.amount }}</b-td>
                    <b-td>{{ transaction.currency }}</b-td>
                    <b-td>{{ transaction.trans_type }}</b-td>
                    <b-td>{{ transaction.category }}</b-td>
                    <b-td>{{ transaction.subcategory }}</b-td>
                    <b-td>{{ transaction.from_account }}</b-td>
                    <b-td>{{ transaction.on_account }}</b-td>
                    <b-td>{{ transaction.create_datetime }}</b-td>
                    <b-td>{{ transaction.place }}</b-td>
                    <b-td>{{ transaction.notes }}</b-td>
                    <b-th><b-button v-b-modal.deleteTransaction variant="danger">Delete</b-button></b-th>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-modal id="createTransactionForm" title="Create Transaction" hide-footer="true" no-close-on-backdrop="true">
            <createTransactionForm/>
        </b-modal>
        <b-modal id="updateTransactionForm" title="Edit Transaction" hide-footer="true" no-close-on-backdrop="true">
            <updateTransactionForm/>
        </b-modal>
        <b-modal id="deleteTransaction" title="Delete Transaction" ok-title="Delete" @ok="onDelete">
            <p>Are you sure to delete the transaction?</p>
        </b-modal>
    </div>
</template>

<script>

import createTransactionForm from '@/components/createTransactionForm.vue';
import updateTransactionForm from '@/components/updateTransactionForm.vue';

export default {
    name: 'transactionList',
    components: {
        createTransactionForm,
        updateTransactionForm,
    },
    data() {
        return {};
    },
    computed: {
        transactions() {
            return this.$store.getters.transactions;
        }
    },
    methods: {
        onDelete(transaction) {
            this.$store.dispatch('deleteTransaction', transaction)
        }
    },

    beforeMount() {
        this.$store.dispatch('getTransactions');
    }
    
}
</script>