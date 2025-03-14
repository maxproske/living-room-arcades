import { useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'

// Stores
import { useMultiplayerStore } from '~/stores/MultiplayerProvider'

export const useSocket = () => {
  const [messages, setMessages] = useState([])
  const [socketRef, updateSocketRef] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const { allPlayerPos, updateAllPlayerPos, removePlayerPos } = useMultiplayerStore()

  useEffect(() => {
    if (socketRef) {
      return
    }

    const initSocket = async () => {
      // Wait for the socket server to be initialized
      await fetch('/api/socket')

      const socket = io()
      updateSocketRef(socket)

      socket.on('connect', () => {
        setIsReady(true)
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

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
      })
    }

    initSocket().catch(console.error)

    // Cleanup
    return () => {
      if (socketRef) {
        setIsReady(false)
        socketRef.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    allPlayerPos && console.log({ allPlayerPos })
  }, [allPlayerPos])

  const emitMessage = useCallback(
    ({ message }) => {
      console.log('client: emitMessage', { message })

      if (!socketRef || !isReady) {
        console.error(`Socket not ready`)
        return
      }

      socketRef.emit('emitMessage', { message })
    },
    [socketRef, isReady]
  )

  const emitPlayerPos = useCallback(
    ({ pos, dir }) => {
      if (!socketRef || !isReady) {
        console.error(`Socket not ready`)
        return
      }

      console.log('client: updatePlayerPos', { socketId: socketRef.id, pos, dir })

      socketRef.emit('updatePlayerPos', { socketId: socketRef.id, pos, dir })
    },
    [socketRef, isReady]
  )

  return { socket: socketRef, messages, emitMessage, socketId: socketRef?.id, emitPlayerPos, isReady }
}
