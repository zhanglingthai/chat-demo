const state = {
    nowToUser: {}
}

const mutations = {
    set_to_user(state, user) {
        state.nowToUser = user
        console.log(state.nowToUser)
    },
    clean_to_user(state) {
        state.nowToUser = {}
    }
}

const actions = {
    // setTouser({ commit }, user) {
    //     commit("set_to_user", user)
    // }
}

const getters = {
    nowToUserid: state => {
        return state.nowToUser.userid
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}