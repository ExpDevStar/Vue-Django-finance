import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

const transactionList = () => import(/* */ '@/components/transaction/transactionList.vue')

Vue.use(VueRouter)

export default new VueRouter({
    
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // User routes
    {
      path: '/accounts/login',
      name: 'login',
      //component: ,
    },
    {
      path: '/accounts/logout',
      name: 'logout',
      //component: ,
    },
    {
      path: '/accounts/profile',
      name: 'profile',
      //component: ,
    },

    // Accounting routes
    {
      path: '/accounting/transactions',
      name: 'transactions',
      component: transactionList,
    },
    {
      path: '/accounting/accounts',
      name: 'accounts',
      //component: ,
    },
    {
      path: '/accounting/journal',
      name: 'journal',
      //component: ,
    },
    {
      path: '/accounting/categories',
      name: 'categories',
      //component: ,
    },
    {
      path: '/accounting/subcategories',
      name: 'subcategories',
      //component: ,
    },
    {
        path: '/accounting/places',
        name: 'places',
        //component: ,
    },
        
    // Planning routes
    {
        path: '/planning',
        name: 'planning',
        //component: ,
    },
    // Statistics routes
    {
      path: '/statistics/per-month',
      name: 'month',
      //component: ,
    },
    {
      path: '/statistics/quarterly',
      name: 'quarter',
      //component: ,
    },
    {
      path: '/statistics/annual',
      name: 'annual',
      //component: ,
    },
    {
        path: '/statistics/semiannual',
        name: 'semiannual',
        //component: ,
    },
  ],
});