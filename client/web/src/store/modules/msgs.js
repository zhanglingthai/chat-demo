const state = {
    friendmsgs: [],
    sysmsgs: []
}

const mutations = {
    set_friend_msgs(state, list) {
        state.friendmsgs = list
    },
    set_sys_msgs(state, list) {
        state.sysmsgs = list
    }
}

const actions = {
    setFriendMsgs({ commit }, msgList) {
        commit("set_friend_msgs", msgList)
    },
    addNewMsg({ state, commit }, msg) {
        let newMsgList = state.friendmsgs.push(msg)
    },
    setSysMsgs({ commit }, sysMsgList) {
        commit("set_sys_msgs", sysMsgList)
    },
    addNewSysMsg({ state, commit }, sysmsg) {
        let newMsgList = state.sysmsgs.push(sysmsg)
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