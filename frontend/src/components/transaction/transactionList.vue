<template>
    <div class="container">
        <b-row>
            <h3>Transaction List</h3>&nbsp;
            <b-button @click="showCreateModal()" variant="info">Create</b-button>
        </b-row>
        <b-row>
            <b-col cols="10">
                <b-table :items="transactions" :fields="fields" responsive primary-key="id">
                    <template v-slot:cell(actions)="data">
                        <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
                        <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="2">
                <filtrationSidebar @filter="filter"/>
            </b-col>
        </b-row>
        <b-modal 
            id="transactionForm" 
            :title="modalTitle" 
            hide-footer no-close-on-backdrop>
            <transactionForm :action="action" :transactionId="transactionId"/>
        </b-modal>
        <b-modal 
            id="deleteTransaction" 
            title="Delete Transaction" 
            ok-title="Delete" 
            @ok="onDelete(transactionId)">
            <p>Are you sure to delete the transaction?</p>
        </b-modal>
    </div>
</template>

<script>

import transactionForm from '@/components/transaction/transactionForm.vue';
import filtrationSidebar from '@/components/transaction/filtrationSidebar.vue';

export default {
    name: 'transactionList',
    components: {
        transactionForm,
        filtrationSidebar,
    },
    data() {
        return {
            transactionId: null,
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
            const rawTransactions = this.$store.getters.transactions;
            const transactions = []
            rawTransactions.forEach(rawTransaction => {
                const transaction = {
                    id: rawTransaction.id, 
                    amount: rawTransaction.amount,
                    currency: rawTransaction.currency,
                    trans_type: rawTransaction.trans_type,
                    category: rawTransaction.category, 
                    subcategory: rawTransaction.subcategory,
                    from_account: rawTransaction.from_account,
                    on_account: rawTransaction.on_account,
                    place: rawTransaction.place,
                    create_datetime: rawTransaction.create_datetime,
                    notes: rawTransaction.notes,
                };
                const foreignkeyAttributesObject = {
                    currency: rawTransaction.currency,
                    category: rawTransaction.category, 
                    subcategory: rawTransaction.subcategory,
                    from_account: rawTransaction.from_account,
                    on_account: rawTransaction.on_account,
                    place: rawTransaction.place
                }
                for (const key in foreignkeyAttributesObject) {
                    if (foreignkeyAttributesObject[key] === null) {
                        transaction[key] === null;
                    } else {
                        transaction[key] = foreignkeyAttributesObject[key].string_repr;
                    }
                }
                transactions.push(transaction);
            })
            return transactions;
        },
    },
    methods: {
        onDelete(transactionId) {
            this.$store.dispatch('deleteTransaction', transactionId)
        },
        showCreateModal() {
            this.action = 'create';
            this.modalTitle = 'Create Transaction'
            this.$bvModal.show('transactionForm');
        },
        showEditModal(transactionId) {
            this.action = 'update';
            this.transactionId = transactionId;
            this.modalTitle = 'Edit Transaction'
            this.$bvModal.show('transactionForm');
        },
        showDeleteModal(transactionId) {
            this.transactionId = transactionId;
            this.$bvModal.show('deleteTransaction');
        },
        filter(params) {
            this.$store.dispatch('getTransactions', params);
        }
    },

    beforeMount() {
        this.$store.dispatch('getTransactions');
    }
    
}
</script>
