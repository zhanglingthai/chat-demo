const state = {
    loading: false
}

const mutations = {
    change_loading(state, status) {
        state.loading = status
    }
}

const actions = {
    changeLoading({ commit }, status) {
        commit("change_loading", status)
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}