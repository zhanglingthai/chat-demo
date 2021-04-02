const state = {
    msgs: [],
    sysmsgs: []
}

const mutations = {
    set_msgs(state, list) {
        state.msgs = list
    },
    set_sysmsgs(state, list) {
        state.sysmsgs = list
    }
}

const actions = {
    setFriendMsgs({ commit, dispatch }, msgList) {
        commit("set_msgs", msgList)
        dispatch("addMsgToFriend", msgList)
    },
    addNewMsg({ state, commit, dispatch }, msg) {
        let newMsgList = state.msgs.push(msg)
        commit("set_msgs", newMsgList)
        dispatch('addMsgToFriend', msg)
    },
    setSysMsgs({ commit }, sysMsgList) {
        commit("set_sysmsgs", sysMsgList)
    },
    addNewSysMsg({ state, commit, dispatch }, sysmsg) {
        let newMsgList = state.sysmsgs.push(sysmsg)
        commit("set_sysmsgs", newMsgList)
    },
}

const getters = {
    msgs: state => {

    },
}

export default {
    state,
    mutations,
    actions,
    getters
}