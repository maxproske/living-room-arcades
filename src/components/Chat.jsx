import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

export const Chat = ({ emitMessage, messages, socketId }) => {
  const [message, setMessage] = useState('')

  const handleMessageChange = (e) => {
    const messageUpdate = e.target.value

    setMessage(messageUpdate)
  }

  const handleEmitMessage = () => {
    if (message) {
      emitMessage({ message })

      setMessage('') // Clear message
    }
  }

  return (
    <StyledWrapper>
      <StyledMessages>
        {messages &&
          messages.map((message, i) => {
            return (
              <StyledMessage key={i} isCurrentSocket={socketId === message.socketId}>
                {message.message}
              </StyledMessage>
            )
          })}
      </StyledMessages>
      <StyledChat>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={() => handleEmitMessage()}>Send</button>
      </StyledChat>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 1rem;
`

const chatAnimation = keyframes`
0% {
  opacity: 0;
  top: 0.5rem;
}
100% {
  opacity: 1;
  top: 0;
}
`

const StyledMessages = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;

  width: 100%;
  height: 100%;
  max-width: 20rem;
  max-height: 20rem;
  z-index: 1000;
`

const StyledMessage = styled.article`
  color: black;
  background-color: ${({ isCurrentSocket }) =>
    isCurrentSocket ? 'rgba(125, 211, 244, 0.85)' : 'rgba(244, 125, 211, 0.85)'};
  border: 1px solid black;
  border-radius: 0.35rem;
  padding: 0.1rem 0.25rem;

  position: relative;
  animation: ${chatAnimation} 0.6s;
`

const StyledChat = styled.div``
