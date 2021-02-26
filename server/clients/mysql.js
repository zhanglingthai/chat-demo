const mysql = require('mysql');
const conf = require('../conf').mysql;
const pool = mysql.createPool(conf);


//需要保证在同连接做一系列操作时用getConnection,query方法会随机使用一条连接
pool.getConnection((err, conn) => {
    if (err) {
        console.log('------ Mysql connection failed ------' + err)
    } else {
        console.log('------ Mysql connection succeed ------')
        conn.query({ sql: 'select * from user', timeout: 60000 }, (err, res) => {
            if (err) {
                console.log('------ Mysql select failed ------')
            } else {
                console.log('------ Mysql select succeed ------')
                //conn.release(); // 释放该链接，把该链接放回池里供其他人使用
                conn.destroy(); // 如果要关闭连接并将其从池中删除，请改用connection.destroy（）。该池将在下次需要时创建一个新的连接。
            }
        })

    }
});

// const user = 80000000;
// pool.query('SELECT * FROM user Where id > ?',[user],(err, results, fields)=>{
// 	if (err) {
//         console.log('------ Mysql select failed ------' + err)
// 	}else{
// 		console.log(results)
// 		console.log('------ Mysql select succeed ------');
// 	}

// })

//事物
// pool.getConnection((err, conn) => {
//     if (err) {
//         console.log('------ Mysql connection failed ------' + err)
//     } else {
//         conn.beginTransaction(err => {
//             if (err) { console.log(err); }
//             conn.query('SELECT username FROM user WHERE id = ?', [80000001], (err, results, fields) => {
//                 if (err) {
//                     return conn.rollback(() => {
//                         console.log(err);
//                     });
//                 }
//                 let username = results[0].username,
//                     newPassword = (Math.random() * 1000000).toFixed().toString();

//                 conn.query('UPDATE user SET password = ? WHERE username = ?', [newPassword, username], (err, results, fields) => {
//                     if (err) {
//                         return conn.rollback(() => {
//                             console.log(err);
//                         });
//                     }
//                     conn.commit(err => {
//                         if (err) {
//                             return conn.rollback(() => {
//                                 console.log(err);
//                             });
//                         }
//                         console.log('success');
//                         conn.destroy();
//                     })
//                 })
//             })
//         })
//     }
// });





//获取连接
pool.on('acquire', function(connection) {
    console.log('Connection %d acquired', connection.threadId);
});

//建立连接
pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});

//排队等待
pool.on('enqueue', function() {
    console.log('Waiting for available connection slot');
});

//释放连接
pool.on('release', function(connection) {
    console.log('Connection %d released', connection.threadId);
});


module.exports = pool