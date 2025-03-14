// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135
// https://github.com/voomp/leader-4/blob/ff992433b97d098be2e01f3c3534c1bdc23c85b9/pages/%5Bplayer%5D.tsx
import { Server } from 'socket.io'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('First use, starting socket.io')

    const io = new Server(res.socket.server)

    const players = {}

    io.on('connection', (socket) => {
      const socketId = socket.id

      // Doing this spams the servers
      // Keep specialConnect in case this black magic stops working at some point
      // socket.emit sends to all connected clients
      // socket.broadcast.emit sends to all connected clients except the sender
      // socket.emit('userConnected', { socketId })
      // socket.broadcast.emit('userConnected', { socketId })

      socket.on('specialConnect', ({ socketId, pos, dir }) => {
        console.log('server: specialConnect')

        // Add player
        players[socketId] = {
          pos,
          dir,
        }
        console.log(`${Object.keys(players).length} players online.`)

        socket.emit('specialConnect', { socketId })
        socket.broadcast.emit('specialConnect', { socketId })

        Object.keys(players).map((playerSockerId) => {
          socket.emit('playerPosUpdated', { 
            socketId: playerSockerId, 
            pos: players[playerSockerId].pos,
            dir: players[playerSockerId].dir 
          })
          socket.broadcast.emit('playerPosUpdated', { 
            socketId: playerSockerId, 
            pos: players[playerSockerId].pos,
            dir: players[playerSockerId].dir 
          })
        })
      })

      socket.on('emitMessage', ({ message }) => {
        console.log('server: emitMessage', { socketId, message })

        socket.emit('messageSent', { socketId, message })
        socket.broadcast.emit('messageSent', { socketId, message })
      })

      socket.on('disconnect', () => {
        console.log('server: disconnect')

        // Remove player
        delete players[socketId]
        console.log(`${Object.keys(players).length} players online.`)

        socket.broadcast.emit('userDisconnected', { socketId })
      })

      socket.on('updatePlayerPos', ({ socketId, pos, dir }) => {
        console.log('server: updatePlayerPos', { socketId, pos, dir })

        // Update in-memory store
        players[socketId].pos = pos
        players[socketId].dir = dir

        socket.emit('playerPosUpdated', { socketId, pos, dir })
        socket.broadcast.emit('playerPosUpdated', { socketId, pos, dir })
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ioHandler
