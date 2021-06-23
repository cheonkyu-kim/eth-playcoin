import TutorialToken from './contracts/TutorialToken.json'

const state = {
    web3: null,
    contract: null,
    totalSupply: 0,
    balance: 0,
    balances: []
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
    },
    balances(state) {
        return state.balances;
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
    },
    balances(state, balances) {
        state.balances = balances;
    }
}

const actions = {
    async web3({ commit, rootGetters }, { web3 }) { 
        commit('web3', web3)
        const networkId = await web3.eth.net.getId()
        const address = rootGetters.currentAccount
        // const contract = new web3.eth.Contract(TutorialToken.abi, address)
        const contract = new web3.eth.Contract(TutorialToken.abi, '0xfDf1634ebDdef7607b6251474bd49028004a238a')
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
    },
    async fetchAllBalances({ state, commit, rootGetters }) {
        const contract = state.contract
        const accounts = rootGetters['web3/accounts']
        
        const balances = await Promise.all(accounts.map((account, idx)=>{
            const { address } = account
            return contract.methods.balanceOf(address).call()
        }))
        commit('balances', balances)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}