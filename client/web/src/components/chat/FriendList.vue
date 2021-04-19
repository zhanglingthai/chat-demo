<template>
    <div class="friend-list">
        <div class="scroll-wrap">
            <template v-if="!friendInited">加载中..</template>
            <template v-else>
                <template v-if="friendList.length">
                    <template v-for="(friend,index) in friendList">
                        <div @click="set_to_user(friend)" :class="{on:friend.userid == nowToUserid}" class="friend-item" :key="index" v-if="friend.msg">
                            <div class="avatar">
                                <img src="../../assets/imgs/avatars/default.png" alt="avatar">
                            </div>
                            <div class="info">
                                <div style="position: relative;"><span class="name">{{friend.nickname || friend.userid}}</span><span class="lastmsgtime">{{friend.msg[friend.msg.length -1].create_time | formatTime}}</span></div>
                                <p class="lastmsg">{{friend.msg[friend.msg.length -1].detail}}</p>
                            </div>
                        </div>
                    </template>
                </template>
                <div v-else class="empty">暂无好友</div>
            </template>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'FriendList',
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations([
            'set_to_user',
            'clean_to_user'
        ])
    },
    computed: {
        ...mapState({
            loading: state => state.loading.loading
        }),
        ...mapGetters([
            'friendList',
            'friendBlackList',
            'friendBlockList',
            'friendInited',
            'nowToUserid'
        ])
    },
    filters: {
        formatTime(value) {
            let dateObj = moment(value),
                timeStr;

            var REFERENCE = moment(new Date);
            var TODAY = REFERENCE.clone().startOf('day');
            var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
            var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

            if (dateObj.isSame(TODAY, 'd')) {
                timeStr = dateObj.format('HH:mm')
            } else if (dateObj.isSame(YESTERDAY, 'd')) {
                timeStr = '昨天'
            } else if (dateObj.isAfter(A_WEEK_OLD)) {
                timeStr = '本周'
            } else if (REFERENCE.year() != dateObj.year()) {
                timeStr = dateObj.format('Y-MM-DD')
            } else {
                timeStr = dateObj.format('MM-DD')
            }

            return timeStr
        }
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

.empty {
    line-height: 100px;
    text-align: center;
    color: #666;
}

.friend-item {

    &.on,
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