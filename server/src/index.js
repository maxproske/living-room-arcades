const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log(`[${socket.id}] connected`)

  socket.on('disconnect', () => {
    console.log(`[${socket.id}] disconnected`)
  })

  socket.on('load settings', (data) => {
    io.emit('settings is here', 'data')
  })

  socket.on('UPDATE_POS', (data) => {
    console.log('pos updated', data)
    io.emit('pos updated', data)
  })
})

http.listen(4000, () => {
  console.log('listening on port 4000')
})
