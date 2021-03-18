const state = {
    list: '',
    blackList: '',
    blockList: ''
}

const mutations = {
    set_list(state, list) {
        state.list = list
    },
    set_black_list(state, list) {
        state.blackList = list
    },
    set_block_list(state, list) {
        state.blockList = list
    }
}

const actions = {
    setList({ commit }, listStr) {
        commit("set_list", listStr)
    },
    setBlackList({ commit }, listStr) {
        commit("set_black_list", listStr)
    },
    setBlockList({ commit }, listStr) {
        commit("set_block_list", listStr)
    }
}

const getters = {
    friendList: state => {
        return state.list
    },
    friendBlackList: state => {
        return state.blackList
    },
    friendBlockList: state => {
        return state.blockList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}