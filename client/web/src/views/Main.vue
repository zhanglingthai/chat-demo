<template>
    <div class="main">
        <div class="main-wrap">
            <div class="header">
                <div class="search" :class="{on:searchFocus}">
                    <input type="text" @input="search" v-model="searchValue" @blur="toggleSearchFocus" @focus="toggleSearchFocus">
                    <i class="fa fa-search" @click="search"></i>
                </div>
                <div class="pagectrl">
                    <router-link active-class="on" @click.native="setNowPage(0)" to="/main/chat">
                        <i class="fa" :class="nowPage == 0 ? 'fa-commenting':'fa-commenting-o'"></i>
                    </router-link>
                    <router-link active-class="on" @click.native="setNowPage(1)" to="/main/friends">
                        <i class="fa" :class="nowPage == 1 ? 'fa-address-book':'fa-address-book-o'"></i>
                    </router-link>
                    <router-link active-class="on" @click.native="setNowPage(2)" to="/main/setting">
                        <i class="fa" :class="nowPage == 2 ? 'fa-plus-square':'fa-plus-square-o'"></i>
                    </router-link>
                </div>
                <div class="selfstatus">
                    <div class="avatar" @click="setAvatar">
                        <img src="../assets/imgs/avatars/default.png" alt="avatar">
                    </div>
                    <ul class="nowstatus" @click="toggleShowStatus">
                        <li :class="{on:status == 1}" class="online"></li>
                        <li :class="{on:status == 2}" class="leave"></li>
                        <li :class="{on:status == 3}" class="hidden"></li>
                    </ul>
                    <ul class="statuslist" v-if="showStatus">
                        <li @click="changeStaus(1)">在线</li>
                        <li @click="changeStaus(2)">离开</li>
                        <li @click="changeStaus(3)">隐身</li>
                        <li @click="changeStaus(4)">登出</li>
                    </ul>
                </div>
            </div>
            <router-view class="detail-router-wrap" />
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import io from 'socket.io-client'
export default {
    name: 'Main',
    data() {
        return {
            showStatus: false,
            status: 1, //1在线,2离开,3隐身,4登出
            searchValue: "",
            searchFocus: false,
            nowPage: 0
        }
    },
    created() {
        this.$http.get('/user/info', { closeAlert: true }).then(({ data, token }) => {
            this.set_user_info(data)
            this.set_user_token(token)
            this.wsControl()
        }).catch(err => {
            console.log(err)
            this.$router.push('/login')
        })
    },
    methods: {
        ...mapMutations(['set_user_token', 'set_user_info']),
        search() {
            console.log(this.searchValue)
        },
        toggleSearchFocus(val) {
            this.searchFocus = !this.searchFocus;
        },
        setNowPage(num) {
            this.nowPage = num
        },
        toggleShowStatus() {
            this.showStatus = !this.showStatus
        },
        changeStaus(status) {
            this.showStatus = false
            if (status == 4) {
                //登出操作
                this.$confirm('是否确认登出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$notice('提示', '退出成功')
                    this.$message({
                        type: 'success',
                        message: '登出成功!'
                    })
                    this.$router.push('/login')
                    this.status = status
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            } else {
                this.status = status
            }
        },
        setAvatar() {
            this.$alert('not yet');
        },
        wsControl() {
            const socket = io("ws://localhost:3000", {
                path: "/chat/",
                auth: {
                    token: this.token
                }
            });

            socket.on("connect", () => {
                console.log('客户端发起连接')
            })

            socket.on("connected", ({ connectedMsg }) => {
                console.log(connectedMsg)
            })

            socket.on("msglist", ({ msgs }) => {
                this.setFriendMsgs(msgs)
            })

            socket.on("message", ({ msg }) => {
                this.addNewMsg(msg)
            })

            socket.on("syslist", ({ msgs }) => {
                this.setSysMsgs(msgs)
            })

            socket.on("sysmessage", ({ msg }) => {
                this.addNewSysMsg(msg)
            })

            socket.on("disconnect", () => {
                console.log('连接断开')
            })
        },
        ...mapActions([
            'setFriendMsgs', 'setSysMsgs', 'addNewMsg', 'addNewSysMsg'
        ]),
    },
    computed: mapState({
        info: state => state.user.info,
        token: state => state.user.token,
        loading: state => state.loading.loading
    })
}
</script>
<style lang="scss" scoped>
.main-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 700px;
    max-width: 1100px;
    width: 90%;
    min-height: 450px;
    height: 90%;
    max-height: 700px;
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
}

.header {
    z-index: 2;
    position: relative;
    background-color: #eee;
    display: flex;
    line-height: 50px;
    padding: 10px 0;

    .search {
        flex: 3;
        min-width: 250px;
        text-align: center;
        position: relative;

        input {
            width: 66%;
            padding: 8px 7%;
            border-radius: 15px;
            color: #666;
            font-size: 13px;
            transition: width .2s;
        }

        i {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: 15%;
            transform: translate(0, -50%);
            color: #ccc;
            transition: right .2s;
        }

        &.on {
            input {
                width: 62%;
            }

            i {
                color: #999;
                right: 18%;
            }
        }
    }

    .pagectrl {
        flex: 7;
        font-size: 22px;
        line-height: 1;


        i {
            color: #666;
            line-height: 50px;
            cursor: pointer;
            padding: 0 30px;
        }

        .on {
            i {
                color: #4169E1
            }
        }
    }

    .selfstatus {
        flex: 1;
        position: relative;

        .avatar {
            cursor: pointer;
            border-radius: 50%;
            overflow: hidden;
            width: 46px;
            height: 46px;
            border: 2px solid #ccc;
        }

        img {
            display: block;
            height: 100%;
            width: 100%;
        }

        .statuslist {
            position: absolute;
            left: 0;
            top: 48px;
            background: #fff;
            font-size: 12px;
            line-height: 16px;
            border-radius: 3px;
            overflow: hidden;
            border: 1px solid #ccc;

            li {
                width: 40px;
                text-align: center;
                padding: 5px 10px;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }

        .nowstatus {
            position: absolute;
            left: 38px;
            bottom: 0;
            cursor: pointer;

            li {
                width: 12px;
                height: 12px;
                display: none;
                border-radius: 50%;
            }

            .online {
                background: green;
            }

            .leave {
                background: #ccc;
            }

            .hidden {
                background: yellow;
            }

            .on {
                display: block;
            }
        }
    }
}

.detail-router-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 70px;
}
</style>