const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

io.on('connection', socket => {
  socket.emit('message', 'Hello World from server')
})

http.listen(5000, () => {
  console.log('listening on *:5000')
})
app.get('/getData', (req, res) => {
  setTimeout(() => {
    res.send({ data: `Random Data from the server ${Math.random()}` })
  }, 1000)
})
