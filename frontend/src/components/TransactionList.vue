<template>
    <div>
        <h3>Transaction List</h3>
        <b-table-simple 
            v-for="transaction in transactions"
            v-bind:key="transaction.id">
            <b-thead>
                <b-tr>
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
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr>
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
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
    name: 'TransactionList',
    data() {
        return {};
    },
    computed: {
        transactions() {
            return this.$store.getters.transactions;
        }
    },

    beforeMount() {
        this.$store.dispatch('getTransactions');
    }
    
}
</script>