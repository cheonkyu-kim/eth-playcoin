<template>
  <div class="row">
    <div class="col-md-12">
      <submit-form :model="model">
      </submit-form>
    </div>
  </div>
</template>
<script>
  import SubmitForm from './Transfer/SubmitForm';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    components: {
      SubmitForm,
    },
    data() {
      return {
        user: {
          fullName: 'Mike Andrew',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        },
        model : {
          amount: 0,
          address: null,
          accounts: this.accounts,
          totalSupply: this.totalSupply,
          balance: this.balance,
        }
      }
    },
    computed: {
      ...mapGetters('web3', ['accounts']),
      ...mapGetters('contract', ['totalSupply', 'balance']),
      // model() {
      //   return {
      //     amount: this.amount,
      //     accounts: this.accounts,
      //     totalSupply: this.totalSupply,
      //     balance: this.balance,
      //   }
      // }
    },
    mounted() {
      this.fetchTotalSupply()
      this.fetchBalance()
      this.model = {
        amount: 0,
        address: null,
        accounts: this.accounts,
        totalSupply: this.totalSupply,
        balance: this.balance,
      }
    },
    methods: {
      ...mapActions('contract', [
        'fetchTotalSupply',
        'fetchBalance',
        'submitTransfer'
        ])
    }
  }
</script>
<style>
</style>
