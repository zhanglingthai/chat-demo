const state = {
    info: {},
    token: '',
    userid: ''
}

const mutations = {
    set_user_info(state, info) {
        state.info = info
    },
    set_user_userid(state, userid) {
        state.userid = userid
    },
    set_user_token(state, token) {
        state.token = token
    }
}

const actions = {
    setUserInfo({ commit }, info) {
        commit("set_user_info", info)
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