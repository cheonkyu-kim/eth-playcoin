<template>
  <card>
    <h5 slot="header" class="title">송금하기</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="발행량"
                  placeholder="토큰양"
                  v-model="model.totalSupply"
                  disabled>
        </base-input>
      </div>

      <div class="col-md-3 px-md-1">
        <base-input label="현재 보유양"
                  placeholder="송금액"
                  v-model="model.balance"
                  disabled>
        </base-input>
      </div>

      <div class="col-md-5 pr-md-1">
        <base-select label="계정"
                  placeholder="계정 주소"
                  v-model="model.address"
                  :options="model.accounts"
                  >
        </base-select>
      </div>
      <div class="col-md-3 px-md-1">
        <base-input label="송금"
                  placeholder="송금액"
                  v-model="model.amount">
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill @click="submit">Submit</base-button>
    <!-- <base-button slot="footer" type="primary" fill click.stop="submit">Submit</base-button> -->
  </card>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      ...mapActions('contract', [
        'submitTransfer'
      ]),
      async submit() {
        const { address, amount } = this.model
        await this.submitTransfer({ address, amount })
        alert(`${address}, 송금이 완료되었습니다.`)
      }
    }
  }
</script>
<style>
</style>
