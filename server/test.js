const http = require('http')
const app = require('express')()
const cors = require("cors");
app.use(cors())
const server = http.createServer(app)
const io = require('socket.io')(server)


io.on('connect', client => { // client 即是连接上来的一个客户端
  console.log(client.id) // id 是区分客户端的唯一标识

  client.on('disconnect', () => {
  	console.log(client.id + '--leaved')
  }) // 客户端断开连接时调用(可能是关掉页面，网络不通了等)
})

server.listen(8001)