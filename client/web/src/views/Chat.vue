<template>
    <div class="chat">
        <div class="chat-wrap">
            <div class="left">
                <FriendList />
            </div>
            <div class="right">
                <template v-if="nowToUser.userid">
                    <div class="chat">
                        <MessageList />
                        <InputBox />
                    </div>
                </template>
                <template v-else>
                    <div class="default"><img src="@/assets/imgs/chat/chat_default_bak.png"></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import FriendList from '@/components/chat/FriendList'
import MessageList from '@/components/chat/MessageList'
import InputBox from '@/components/chat/InputBox'

export default {
    name: 'Chat',
    components: {
        FriendList,
        MessageList,
        InputBox
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: mapState({
        loading: state => state.loading.loading,
        nowToUser: state => state.chat.nowToUser
    })

}
</script>
<style lang="scss" scoped>
.chat-wrap {
    display: flex;
    height: 100%;

}

.left {
    flex: 3;
    border-right: 1px solid #ccc;
    min-width: 250px;
}

.right {
    flex: 8;
    position: relative;
}

.default {
    position: relative;
    height: 100%;

    img {
        width: 70%;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%)
    }
}
</style>