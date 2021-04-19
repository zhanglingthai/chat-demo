import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import user from './modules/user'
import friends from './modules/friends'
import msgs from './modules/msgs'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loading,
        user,
        friends,
        msgs,
        chat
    }
})