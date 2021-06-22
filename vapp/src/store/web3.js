import Web3 from 'web3';

const state = {
    web3: new Web3('http://localhost:7545'),
    currentAccount: null,
    isMining: false,
    node: null,
    lastBlock: 0,
    currentBlock: 0,
    coinbase: null,
    blocks: [],
    accounts: [],
    txCount: 0,
}

const getters = {
    web3(state) {
        return state.web3;
    },
    currentAccount(state) {
        return state.currentAccount
    },
    isMining(state) {
        return state.isMining;
    },
    node(state) {
        return state.node;
    },
    lastBlock(state) {
        return state.lastBlock;
    },
    coinbase(state) {
        return state.coinbase;
    },
    accounts(state) {
        return state.accounts;
    },
    blocks(state) {
        return state.blocks;
    },
    txCount(state) {
        return state.txCount;
    }
}

const mutations = {
    currentAccount(state, account) {
        // 메타마스크 접속 계정
        state.currentAccount = account;
    },
    isMining(state, isMining) {
        state.isMining = isMining;
    },
    web3(state, web3) {
        state.web3 = web3;
    },
    node(state, node) {
        state.node = node;
    },
    lastBlock(state, lastBlock) {
        state.lastBlock = lastBlock;
        state.currentBlock = lastBlock;
    },
    coinbase(state, coinbase) {
        state.coinbase = coinbase;
    },
    blocks(state, blocks) {
        state.blocks = blocks;
    },
    accounts(state, accounts) {
        state.accounts = accounts;
    },
    txCount(state, txCount) {
        state.txCount = txCount;
    }
}

const actions = {
    async init({ state, commit, dispatch }) {
        if(!window.ethereum) {
            alert('메타마스크 설치 필요')
            return;
        }
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i);

        try {
            // await window.ethereum.enabled(); // 메타마스크
            // await ethereum.request({ method: 'eth_requestAccounts' })
            const currentAccount = (await ethereum.request({ method: 'eth_requestAccounts'}))[0]
            commit('currentAccount',  currentAccount)
        }
        catch(e){
            console.error(e)
        }
        commit('web3', new Web3('http://localhost:7545'))
        commit('lastBlock', await state.web3.eth.getBlockNumber())
        commit('node', await state.web3.eth.getNodeInfo())
        commit('coinbase', await state.web3.eth.getCoinbase())
        dispatch('fetchAccountsInfo')
        dispatch('fetchBlocks', {start : 5, end: 10})
        dispatch('contract/web3', { web3: state.web3 }, {root:true})

        setTimeout(()=>{
            setInterval(async ()=>{
                if(state.currentBlock != await state.web3.eth.getBlockNumber()) {
                    commit('isMining', await state.web3.eth.isMining())
                }
            }, 1000)
        }, 1000)
    },
    async fetchBlocks({ state, commit }, { start, end }) {
        const web3 = state.web3;
        
        if(end - start < 0) {
            return null
        }
        const getBlocks = await Promise.all(new Array(end - start).fill(0).map((el, idx)=>{
                return web3.eth.getBlock(start + idx)
            }
        ))
        const blocks = getBlocks
        commit('blocks', blocks)
        return blocks
    },
    async fetchAccountsInfo({ state, commit }) {
        const eth = state.web3.eth;
        const addresses = await eth.getAccounts()
        const balances = await Promise.all(addresses.map((address, idx)=>{
            return eth.getBalance(address)
        }))

        const txCounts = await Promise.all(addresses.map((address, idx)=>{
            return eth.getTransactionCount(address)
        }))
        commit('txCount', txCounts.reduce((acc, cur)=>{
            acc += cur
            return acc
        }, 0))

        const accountsinfo = addresses.reduce(
            (acc, val, idx)=>{
            acc.push({
                address: val,
                balance: balances[idx]
            })
            return acc
        }, [])
        commit('accounts', accountsinfo)
        return accountsinfo
    }
 }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}