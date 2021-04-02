<template>
    <div class="chat">
        <div class="chat-wrap">
            <div class="left">
                <FriendList />
            </div>
            <div class="right">
                <MessageList />
                <InputBox />
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
        info: state => state.user.info,
        loading: state => state.loading.loading
    })

}
</script>
<style lang="scss" scoped>
.chat-wrap{
    display: flex;
    height: 100%;
    
}
.left{
    flex: 3;
    border-right: 1px solid #ccc;
    min-width: 250px;
}
.right{
    flex: 8;
    position: relative;
}
</style>