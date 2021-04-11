const state = {
    inited: false,
    list: [],
    blackList: [],
    blockList: []
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
    },
    set_friend_inited(state) {
        state.inited = true
    }
}

const actions = {
    addMsgToFriend({ state, rootState, commit }, msgs) {

        if (Array.isArray(msgs)) {
            for (let key in msgs) {
                let msg = msgs[key]
                pushMsg(msg)
            }
        } else {
            pushMsg(msgs)
        }

        function pushMsg(msg) {
            let pushUserid,
                selfUserid = rootState.user.userid,
                friendList = state.list

            msg.from_uid != selfUserid && (pushUserid = msg.from_uid)
            msg.to_uid != selfUserid && (pushUserid = msg.to_uid)

            for (let key in friendList) {
                let friend = friendList[key]
                if (friend.userid == pushUserid) {
                    !friend.msg && (friend.msg = []);
                    friend.msg.push(msg)
                    let targetFriend = friendList.splice(key, 1)[0]
                    friendList.unshift(targetFriend)
                    break
                }
            }

            commit("set_list", friendList)
        }


    }
}

const getters = {
    friendList: state => {
        return state.list
    },
    friendListSortByLetter: state => {
        return state.list
    },
    friendBlackList: state => {
        return state.blackList
    },
    friendBlockList: state => {
        return state.blockList
    },
    friendInited: state => {
        return state.inited
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}