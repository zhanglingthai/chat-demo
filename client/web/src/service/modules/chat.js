import io from 'socket.io-client'
import Store from '@/store'

export default {
    socket: null,
    init() {
        const socket = this.socket = io("ws://localhost:3000", {
            path: "/chat/",
            auth: {
                token: Store.state.user.token
            }
        });

        socket.on("connect", () => {
            console.log('客户端发起连接')
        })

        socket.on("connected", ({ connectedMsg }) => {
            console.log(connectedMsg)
        })

        socket.on("msglist", ({ msgs }) => {
            Store.dispatch("setFriendMsgs", msgs)
        })

        socket.on("message", msg => {
            console.log(msg)
            Store.dispatch("addNewMsg", msg)
        })

        socket.on("syslist", ({ msgs }) => {
            Store.dispatch("setSysMsgs", msgs)
        })

        socket.on("sysmessage", ({ msg }) => {
            Store.dispatch("addNewSysMsg", msg)
        })

        socket.on("disconnect", () => {
            console.log('连接断开')
        })
    },
    sendMsg(msg, toUid) {
        return new Promise((reslove, reject) => {
            this.socket.emit('message', { msg, toUid }, (req) => {
                if (req == 'ok') {
                    reslove()
                } else {
                    reject()
                }
            })
        })

    }
}