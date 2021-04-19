<template>
    <div class="message-list">
        <div class="tit">
            <span class="name">{{nowToUser.nickname || nowToUser.userid}}</span>
        </div>
        <div class="msglist">
            <div class="scroll">
                <template v-for="(msg,index) in nowToUser.msg">
                    <div class="msg-item" :key="index">
                        <p class="time">{{msg.update_time}}</p>
                        <div class="msgdetail" :class="{right:msg.from_uid == userid}">
                            <div class="avatar"></div>
                            <div>{{msg.detail}}</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'MessageList',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: mapState({
        loading: state => state.loading.loading,
        nowToUser: state => state.chat.nowToUser,
        userid: state => state.user.userid
    })
}
</script>
<style lang="scss" scoped>
.tit {
    font-size: 14px;
    width: 100%;
    text-indent: 8px;
    padding: 10px 0 8px;
}
</style>