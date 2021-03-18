<template>
    <div class="friend-list">
        <div class="scroll-wrap">
            <div class="friend-item" v-for="(friend,index) in friendList" :key="index">
                <div class="avatar">
                    <img src="../../assets/imgs/avatars/default.png" alt="avatar">
                </div>
                <div class="info">
                    <div style="position: relative;"><span class="name">{{friend.nickname || friend.userid}}</span><span class="lastmsgtime">{{friend.lastmsgtime}}</span></div>
                    <p class="lastmsg">{{friend.lastmsg}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
    name: 'FriendList',
    components: {

    },
    data() {
        return {
            nowShowFriendType: 0
        }
    },
    mounted() {
        this.$http.get('/friend/list', { closeAlert: true }).then(({ data }) => {
            this.set_list(data.friendList.list)
            this.set_black_list(data.friendList.black_list)
            this.set_block_list(data.friendList.block_list)
        })
    },
    methods: {
        ...mapMutations([
            'set_list',
            'set_black_list',
            'set_block_list'
        ])
    },
    computed: {
        ...mapState({
            loading: state => state.loading.loading
        }),
        ...mapGetters([
            'friendList',
            'friendBlackList',
            'friendBlockList'
        ])
    }
}
</script>
<style lang="scss" scoped>
.friend-list {
    overflow-y: scroll;
    height: 100%;
}

.scroll-wrap {
    padding: 0px 0 10px 0;
}

.friend-item {
    &:hover {
        background: #eee;
    }

    display: flex;

    padding: 10px 15px;
    line-height: 20px;
    cursor: pointer;
}

.avatar {
    height: 50px;
    width: 50px;
    min-width: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
    border: 2px solid #ccc;

    img {
        display: block;
        width: 100%;
    }
}

.info {
    flex: 8;
    line-height: 24px;
    overflow: hidden;

    span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: inline-block;
        vertical-align: top;
    }

    .name {
        width: 58%;
        font-size: 14px;
    }

    .lastmsgtime {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        color: #999;
    }

    .lastmsg {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        font-size: 12px;
        color: #999;
    }
}
</style>