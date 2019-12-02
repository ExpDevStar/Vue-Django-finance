<template>
    <div>
        <h3>Transaction List</h3>
        <b-button @click="showCreateModal()" variant="info">Create</b-button>
        <b-table :items="transactions" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(actions)="data">
                <b-button @click="showEditModal(data.item)" variant="warning" size="sm">Edit</b-button>&nbsp;
                <b-button @click="showDeleteModal(data.item)" variant="danger" size="sm">Delete</b-button>
            </template>
        </b-table>
        <b-modal 
            id="transactionForm" 
            :title="modalTitle" 
            hide-footer no-close-on-backdrop>
            <transactionForm :action="action" :transaction="transaction"/>
        </b-modal>
        <b-modal 
            id="deleteTransaction" 
            title="Delete Transaction" 
            ok-title="Delete" 
            @ok="onDelete(transaction)">
            <p>Are you sure to delete the transaction?</p>
        </b-modal>
    </div>
</template>

<script>

import transactionForm from '@/components/transaction/transactionForm.vue';

export default {
    name: 'transactionList',
    components: {
        transactionForm,
    },
    data() {
        return {
            transaction: null,
            action: '',
            modalTitle: '',
            fields: [
                'amount',
                'currency',
                {key: 'trans_type', label: 'Type'},
                'category',
                'subcategory',
                'from_account',
                'on_account',
                'from_account',
                'create_datetime',
                'place',
                'notes',
                'actions',
            ],
        };
    },
    computed: {
        transactions() {
            return this.$store.getters.transactions;
        },
    },
    methods: {
        onDelete(transaction) {
            this.$store.dispatch('deleteTransaction', transaction)
        },
        showCreateModal() {
            this.action = 'create';
            this.modalTitle = 'Create Transaction'
            this.$bvModal.show('transactionForm');
        },
        showEditModal(transaction) {
            this.action = 'update';
            this.transaction = transaction;
            this.modalTitle = 'Edit Transaction'
            this.$bvModal.show('transactionForm');
        },
        showDeleteModal(transaction) {
            this.transaction = transaction;
            this.$bvModal.show('deleteTransaction');
        },
    },

    beforeMount() {
        this.$store.dispatch('getTransactions');
    }
    
}
</script>