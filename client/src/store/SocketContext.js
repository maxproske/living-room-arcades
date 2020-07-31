import React, { createContext, useContext, useEffect, useRef } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext()

export const SocketProvider = ({ url, children }) => {
  const socketRef = useRef(io(url))

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current.emit('load settings')

      socketRef.current.on('settings is here', (data) => {
        console.log('settings is here', data)
      })

      socketRef.current.on('pos updated', (data) => {
        console.log('pos updated', data)
      })
    }

    return () => {
      socketRef.current.disconnect()
      socketRef.currrent = null
    }
  }, [url])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}
