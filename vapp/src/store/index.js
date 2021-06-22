import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3'
import contract from './contract'

Vue.use(Vuex)


const store = new Vuex.Store({
    // namespaced: true,
    modules: {
      web3,
      contract
    }
})

export default store