const pool = require('../clients/mysql').pool;
const createError = require('http-errors');
const util = require('../common/util');

const Msg = {
    //获取userid相关的聊天记录
    getMsgByUserid(userid, nums) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err)
                } else {
                    conn.query(`SELECT * FROM msgs WHERE from_uid = ? OR to_uid = ?`, [userid,userid], (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                        conn.release();
                    })
                }
            });
        })
    },
    //获取userid相关的聊天记录
    getSYSMsg(userid, nums) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err)
                } else {
                    conn.query(`SELECT title,detail,update_time FROM sysmsgs WHERE status = 1`, (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                        conn.release();
                    })
                }
            });
        })
    }
}



module.exports = Msg;