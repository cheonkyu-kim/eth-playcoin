<template>
  <base-table :data="acccountsData.data"
              :columns="acccountsData.columns"
              thead-classes="text-primary">
  </base-table>
</template>
<script>
  import { BaseTable } from "@/components";
  import { mapGetters } from "vuex";

  export default {
    components: {
      BaseTable
    },
    computed: {
      ...mapGetters('web3', [
        'accounts'
      ]),
      table(){
        return this.$t('dashboard.usersTable');
      },
      acccountsData() {
        if(!this.accounts) {
          return {}
        }
        const columns = ['address', 'balance']
        // const columns = Object.keys({})

        return {
          'title': '계정',
          columns,
          data: this.accounts
          // data: this.accounts.map(el=>({ id : el })),
        }
      }
    }
  }
</script>
<style>
</style>
