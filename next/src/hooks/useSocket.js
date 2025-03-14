import { useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'

// Stores
import { useMultiplayerStore } from '~/stores/MultiplayerProvider'

export const useSocket = () => {
  const [messages, setMessages] = useState([])
  const [socketRef, updateSocketRef] = useState(null)
  const { allPlayerPos, updateAllPlayerPos, removePlayerPos } = useMultiplayerStore()

  useEffect(() => {
    if (socketRef) {
      return
    }

    // https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135
    // has less re-renders than
    // https://github.com/iamgyz/use-socket.io-client
    fetch('/api/socket').finally(() => {
      const socket = io()
      updateSocketRef(socket)

      socket.on('connect', () => {
        socket.emit('specialConnect', { socketId: socket.id, pos: { x: 8, y: 8 }, dir: 'SE' })
      })

      socket.on('specialConnect', ({ socketId, dir }) => {
        const time = new Intl.DateTimeFormat('en-CA', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `A user has connected.`,
          time,
        }

        setMessages((prev) => [...prev, newMessage])
      })

      socket.on('userConnected', ({ socketId }) => {
        const time = new Intl.DateTimeFormat('en-CA', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `A user has connected.`,
          time,
        }

        setMessages((prev) => [...prev, newMessage])
      })

      socket.on('userDisconnected', ({ socketId }) => {
        const time = new Intl.DateTimeFormat('en-CA', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `A user has disconnected.`,
          time,
        }

        setMessages((prev) => [...prev, newMessage])

        removePlayerPos({ socketId })
      })

      socket.on('messageSent', ({ socketId, message }) => {
        console.log('client: messageSent', { socketId, message })

        const time = new Intl.DateTimeFormat('en-CA', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: message,
          time,
        }

        setMessages((prev) => [...prev, newMessage])
      })

      socket.on('playerPosUpdated', ({ socketId, pos, dir }) => {
        console.log('client: playerPosUpdated', { socketId, pos, dir })

        updateAllPlayerPos({ socketId, pos, dir })
      })
    })

    // Cleanup
    return () => {
      socketRef && socketRef.disconnect()
    }
  }, [])

  useEffect(() => {
    allPlayerPos && console.log({ allPlayerPos })
  }, [allPlayerPos])

  const emitMessage = useCallback(
    ({ message }) => {
      console.log('client: emitMessage', { message })

      if (!socketRef) {
        console.error(`Couldn't get socket ref`)
        return
      }

      socketRef.emit('emitMessage', { message })
    },
    [socketRef]
  )

  const emitPlayerPos = useCallback(
    ({ pos, dir }) => {
      if (!socketRef) {
        console.error(`Couldn't get socket ref`)
        return
      }

      console.log('client: updatePlayerPos', { socketId: socketRef.id, pos, dir })

      socketRef.emit('updatePlayerPos', { socketId: socketRef.id, pos, dir })
    },
    [socketRef]
  )

  return { socket: socketRef, messages, emitMessage, socketId: socketRef?.id, emitPlayerPos }
}
