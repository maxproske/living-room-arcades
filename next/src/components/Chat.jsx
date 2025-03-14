'use client'

import { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

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

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 1rem;
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
  y-overflow: hidden;

  pointer-events: none;
`

const StyledMessage = styled.article`
  color: black;
  background-color: ${({ $isCurrentSocket }) =>
    $isCurrentSocket ? 'rgba(125, 211, 244, 0.85)' : 'rgba(244, 125, 211, 0.85)'};
  border: 1px solid black;
  border-radius: 0.35rem;
  padding: 0.25rem 0.35rem;
  min-height: 2.5rem;

  position: relative;
  animation: ${css`
    ${chatAnimation} 0.6s
  `};

  p {
    margin: 0;
    padding: 0;
  }
`

const StyledChat = styled.div`
  display: flex;
`

const StyledInput = styled.input`
  height: 2rem;
  border: 0;
`

const StyledButton = styled.button`
  border: 0;
  background: white;
  border-left: 1px solid lightgrey;

  height: 2rem;
`

const StyledTime = styled.span`
  display: inline-block;
  white-space: nowrap;
  font-size: 0.6875rem;
  float: right;
`

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

  const handleSubmit = (e) => {
    e.preventDefault()

    handleEmitMessage()
  }

  return (
    <StyledWrapper>
      <StyledMessages>
        {messages &&
          messages.map((message, i) => {
            return (
              <StyledMessage key={i} $isCurrentSocket={socketId === message.socketId}>
                <p>{message.message}</p>
                <StyledTime>{message.time}</StyledTime>
              </StyledMessage>
            )
          })}
      </StyledMessages>
      <StyledChat>
        <form onSubmit={handleSubmit}>
          <StyledInput type="text" value={message} onChange={handleMessageChange} />
          <StyledButton type="submit">Send</StyledButton>
        </form>
      </StyledChat>
    </StyledWrapper>
  )
}
