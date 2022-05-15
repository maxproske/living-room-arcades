import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export const useSocket = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135
    // has less re-renders than
    // https://github.com/iamgyz/use-socket.io-client
    fetch('/api/socket').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', (data) => {
        console.log('hello', data)
      })

      socket.on('userConnected', ({ socketId }) => {
        const message = `${socketId} connected`
        setMessages((prev) => [...prev, message])
      })

      socket.on('userDisconnected', ({ socketId }) => {
        const message = `${socketId} disconnected`
        setMessages((prev) => [...prev, message])
      })
    })
  }, [])

  return { messages }
}
