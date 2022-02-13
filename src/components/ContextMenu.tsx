import { useState, useEffect, memo, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

// Custom hooks
import { useContextMenu } from '~/hooks/useContextMenu';

export const ContextMenu = ({ outerRef }) => {
  const contextMenuRef = useRef(null);
  const { xPos, yPos, isContextMenuVisible } = useContextMenu(outerRef);

  return (
    <Portal>
      <StyledModal
        xPos={xPos}
        yPos={yPos}
        isContextMenuVisible={isContextMenuVisible}
      >
        <StyledOptions>
          <StyledOption>{`Examine ${1}`}</StyledOption>
          <StyledOption>Cancel</StyledOption>
        </StyledOptions>
      </StyledModal>
    </Portal>
  );
};

const Portal: React.FC = ({ children }) => {
  return (
    typeof document !== 'undefined' &&
    createPortal(children, document.querySelector('#game'))
  );
};

const StyledModal = styled.div`
  z-index: 1000;
  position: absolute;
  left: ${({ xPos }) => xPos}px;
  top: ${({ yPos }) => yPos}px;
  min-width: 8rem;
  min-height: 4rem;
  display: ${({ isContextMenuVisible }) =>
    isContextMenuVisible ? 'block' : 'none'};

  background: black;
  color: white;
  border: 1px solid white;
  padding: 0.5rem;
`;

const StyledOptions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledOption = styled.li``;
