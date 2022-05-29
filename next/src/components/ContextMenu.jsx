import { useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

// Custom hooks
import { useContextMenu } from '~/hooks/useContextMenu'

export const ContextMenu = ({ outerRef }) => {
  const contextMenuRef = useRef(null)
  const { xPos, yPos, isContextMenuVisible } = useContextMenu(outerRef)

  return (
    <Portal>
      <StyledModal xPos={xPos} yPos={yPos} isContextMenuVisible={isContextMenuVisible}>
        <StyledTitle>Choose Option</StyledTitle>
        <StyledOptions>
          <StyledOption>{`Examine ${1}`}</StyledOption>
          <StyledOption>Cancel</StyledOption>
        </StyledOptions>
      </StyledModal>
    </Portal>
  )
}

const Portal = ({ children }) => {
  return typeof document !== 'undefined' && createPortal(children, document.querySelector('#game'))
}

const StyledModal = styled.div`
  z-index: 1000;
  position: absolute;
  left: ${({ xPos }) => xPos}px;
  top: ${({ yPos }) => yPos}px;
  min-width: 10rem;
  min-height: 4rem;
  display: ${({ isContextMenuVisible }) => (isContextMenuVisible ? 'block' : 'none')};

  background: black;
  color: white;
  border: 1px solid white;
`

const StyledTitle = styled.h3`
  font-size: 1rem;
  background-color: black;
  padding: 0 0.5rem;
  margin: 0.25rem 0;
`

const StyledOptions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
`

const StyledOption = styled.li`
  cursor: pointer;
  padding: 0.1rem 0.5rem;

  &:hover {
    background-color: #333;
  }
`
