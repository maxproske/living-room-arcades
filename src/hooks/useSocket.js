import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

export const useSocket = () => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef(null)

  useEffect(() => {
    // https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135
    // has less re-renders than
    // https://github.com/iamgyz/use-socket.io-client
    fetch('/api/socket').finally(() => {
      const socket = io()
      socketRef.current = socket

      // socket.on('connect', () => {
      //   socket.emit('specialConnect', { socketId: socket.id })
      // })

      // socket.on('specialConnect', ({ socketId }) => {
      //   const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(new Date())
      //   const newMessage = {
      //     socketId,
      //     message: `${time}: A user has specially connected.`,
      //   }

      //   setMessages((prev) => [...prev, newMessage])
      // })

      socket.on('userConnected', ({ socketId }) => {
        const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `${time}: A user has connected.`,
        }

        setMessages((prev) => [...prev, newMessage])
      })

      socket.on('userDisconnected', ({ socketId }) => {
        const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `${time}: A user has disconnected.`,
        }

        setMessages((prev) => [...prev, newMessage])
      })

      socket.on('messageSent', ({ socketId, message }) => {
        console.log('client: messageSent', { socketId, message })

        const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(new Date())
        const newMessage = {
          socketId,
          message: `${time}: ${message}`,
        }

        setMessages((prev) => [...prev, newMessage])
      })
    })
  }, [])

  const sendMessage = ({ message }) => {
    console.log('client: sendMessage', { message })

    if (socketRef.current) {
      socketRef.current.emit('sendMessage', { message })
    }
  }

  return { messages, sendMessage, socketId: socketRef.current?.id }
}
