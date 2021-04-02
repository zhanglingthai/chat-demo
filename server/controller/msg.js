const { pool, exec } = require('../clients/mysql');
const createError = require('http-errors');
const util = require('../common/util');

const Msg = {
    //获取userid相关的聊天记录
    getMsgByUserid(userid, nums) {
        let sql = `SELECT * FROM msgs WHERE from_uid = ${userid} OR to_uid = ${userid} AND status = 1 `;
        return exec(sql);
    },
    //获取userid相关的聊天记录
    getSYSMsg(userid, nums) {
        let sql = `SELECT * FROM sysmsgs WHERE status = 1 `;
        return exec(sql);
    }
}



module.exports = Msg;