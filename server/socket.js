const util = require('./common/util');
const msgs = require('./controller/msg');

const wsApp = (io) => {
    io.on('connection', client => {
        const userToken = client.handshake.auth.token;
        if (!userToken) {
            client.emit("connected", {
                connectedMsg: ` 获取token失败,连接失败`
            });
            return
        }
        const userObj = util.tokenDecrypt(userToken),
            userid = userObj.userid,
            username = userObj.username;

        //连接成功
        client.emit("connected", {
            connectedMsg: `用户:${username},ID:${userid},连接成功`
        });

        //好友信息
        msgs.getMsgByUserid(userid, 200).then(msgList => {
            client.emit("msglist", {
                msgs: msgList
            });
        })

        //系统信息
        msgs.getSYSMsg(userid, 20).then(sysList => {
            client.emit("syslist", {
                msgs: sysList
            });
        })


        //用户发信息
        client.on("message", (arg, cb) => {

            arg.fromUid = userid;
            arg.toUid = arg.toUid;
            //先判断是否双方在对方好友列表
            //如果都在好友列表且双方状态正常
            //toMsg 去发消息给对方并记录数据库
            console.log(arg)
            toMsg(arg)

            if (cb) { cb('ok'); }
        });

        //发消息给某人
        function toMsg(arg) {
            if (arg.toUid == userid) {
                client.emit("message", {
                    fromUid: arg.fromUid,
                    msg: arg.msg
                });

            }

        }

        //arg
        //fromUid,toUid,callType
        client.on("call", (arg, cb) => {
            console.log(arg);
            if (cb) { cb('ok'); }
        })

        //发call给某人
        function toCall() {

        }

        client.on("video", (arg, cb) => {
            console.log(arg);
            if (cb) { cb('ok'); }
        })

        //发call给某人
        function toVideo() {

        }



        //断开操作
        client.on('disconnect', () => {
            console.log('disconnect')
        });
    });
}


module.exports = wsApp;