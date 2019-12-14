<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'home' }">Home Finance</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Accounting">
            <b-dropdown-item :to="{ name: 'transactions' }">Transactions</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'accounts' }">Accounts</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'journal' }">Journal</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'categories' }">Categories</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'subcategories' }">Subcategories</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'places' }">Places</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item :to="{ name: 'planning' }">Planning</b-nav-item>
          
          <b-nav-item-dropdown text="Statistics">
            <b-dropdown-item :to="{ name: 'month' }">Per month</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'quarter' }">Quarterly</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'annual' }">Annual</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'semiannual' }">Semiannual</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item :to="{ name: 'profile' }">Profile</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'logout' }">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'navigationBar',
}
</script>
