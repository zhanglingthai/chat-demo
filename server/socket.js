const wsApp = (io) => {
    io.on('connection', client => {
        console.log('connection')

        // client.emit("message", {
        //     msg: 'hello world'
        // });

        //arg
        //fromUid,toUid,msgType,msgStatus,detail
        client.on("message", (arg, cb) => {
            console.log(arg);
            //先判断是否双方在对方好友列表
            //如果都在好友列表且双方状态正常
            //toMsg 去发消息给对方并记录数据库

            if (cb) { cb('ok'); }
        });

        //发消息给某人
        function toMsg(arg) {
            // client.emit("message", {
            //     msg: 'hello world'
            // });
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


        //断开操作
        client.on('disconnect', () => {
            console.log('disconnect')
        });
    });
}


module.exports = wsApp;