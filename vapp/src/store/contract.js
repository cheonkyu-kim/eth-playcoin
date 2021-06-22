import TutorialToken from './contracts/TutorialToken.json'

const state = {
    web3: null,
    contract: null,
    totalSupply: 0,
    balance: 0,
    // TutorialToken.abi
}

const getters = {
    contract(state) {
        return state.contract;
    },
    totalSupply(state) {
        return state.totalSupply;
    },
    balance(state) {
        return state.balance;
    }
}

const mutations = {
    web3(state, web3) {
        state.web3 = web3
    },
    contract(state, contract) {
        state.contract = contract
    },
    totalSupply(state, totalSupply) {
        state.totalSupply = totalSupply;
    },
    balance(state, balance) {
        state.balance = balance;
    }
}

const actions = {
    async web3({ commit, rootGetters }, { web3 }) { 
        commit('web3', web3)
        const networkId = await web3.eth.net.getId()
        const address = rootGetters.currentAccount
        // const contract = new web3.eth.Contract(TutorialToken.abi, address)
        const contract = new web3.eth.Contract(TutorialToken.abi, '0x6CdDA6BB31e47b224386e8Cc5bEE506B8C0b65A4')
        contract.defaultAccount = address
        commit('contract', contract)
        const total = await contract.methods.totalSupply().call()
        console.log(total)
        const balance = await contract.methods.balanceOf((await ethereum.request({ method: 'eth_requestAccounts'}))[0]).call()
        console.log(balance)
    },
    async fetchTotalSupply({ state, commit }) {
        const contract = state.contract
        const total = await contract.methods.totalSupply().call()
        commit('totalSupply', total)
    },
    async fetchBalance({ state, commit }) {
        const contract = state.contract
        const balance = await contract.methods.balanceOf((await ethereum.request({ method: 'eth_requestAccounts'}))[0]).call()
        commit('balance', balance)
    },
    async submitTransfer({ state, commit, rootGetters }, { address, amount }) {
        const contract = state.contract
        contract.defaultAccount = rootGetters.currentAccount
        const web3 = state.web3
        try {
            await contract.methods.transfer(web3.utils.toChecksumAddress(address), amount).send({ from: (await ethereum.request({ method: 'eth_requestAccounts'}))[0] })
        } catch(e) {
            console.error(e)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}