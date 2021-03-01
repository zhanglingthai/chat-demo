const cryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const secret = require('../conf').secret;


module.exports = {
    //加密
    aesEncrypt(str) {
        let encrypted = cryptoJS.AES.encrypt(str, secret, {
            mode: cryptoJS.mode.ECB,
            padding: cryptoJS.pad.Iso10126
        }).toString();
        return encrypted;
    },
    //解密
    aesDecrypt(encrypted) {
        let bytes = cryptoJS.AES.decrypt(encrypted, secret, {
            mode: cryptoJS.mode.ECB,
            padding: cryptoJS.pad.Iso10126
        });
        let decrypted = bytes.toString(cryptoJS.enc.Utf8);
        return decrypted;
    },
    tokenEncrypt(username, delay) {
        let token = jwt.sign({
            username
        }, secret, {
            expiresIn: delay || '30d'
        })
        return token;
    },
    tokenDecrypt(token) {
        let info = jwt.verify(token, secret);
        return info;
    }
}