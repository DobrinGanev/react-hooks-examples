const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.emit('message', 'Hello World from server')
})

http.listen(5000, () => {
  console.log('listening on *:5000')
})
