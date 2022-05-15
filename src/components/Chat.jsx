import styled from 'styled-components'
import { useSocket } from '~/hooks/useSocket'

export const Chat = () => {
  const { messages } = useSocket()

  return (
    <StyledWrapper>
      <StyledChat>
        {messages &&
          messages.map((message, i) => {
            return <article key={i}>{message}</article>
          })}
      </StyledChat>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`

const StyledChat = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  gap: 0.5rem;
  margin: 1rem;

  width: 100%;
  height: 100%;
  max-width: 20rem;
  max-height: 20rem;
  z-index: 1000;
  overflow-y: hidden;

  article {
    color: black;
    background-color: white;
    border: 1px solid black;
    border-radius: 0.35rem;
    padding: 0.1rem 0.25rem;
  }
`
