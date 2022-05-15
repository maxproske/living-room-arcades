// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135
import { Server } from 'socket.io'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('First use, starting socket.io')

    const io = new Server(res.socket.server)

    const users = []

    io.on('connection', (socket) => {
      const socketId = socket.id
      users.push(socketId)

      // socket.broadcast.emit sends to all connected clients except the sender
      // socket.emit sends to all connected clients
      socket.broadcast.emit('userConnected', { socketId })

      socket.on('sendMessage', ({ message }) => {
        console.log('server: sendMessage', { socketId, message })

        socket.emit('messageSent', { socketId, message })
        socket.broadcast.emit('messageSent', { socketId, message })
      })

      socket.on('disconnect', () => {
        console.log('server: disconnect')

        socket.broadcast.emit('userDisconnected', { socketId })

        const userIndex = users.indexOf(socketId)
        users.splice(userIndex, 1)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ioHandler
