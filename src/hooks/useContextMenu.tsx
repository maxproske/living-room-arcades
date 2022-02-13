import { useEffect, useCallback, useState } from 'react';

interface Props {
  ref?: any;
}

export const useContextMenu = (outerRef) => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();

      if (outerRef?.current?.contains(e.target)) {
        setXPos(e.pageX);
        setYPos(e.pageY);
        setIsContextMenuVisible(true);
        return;
      }

      setIsContextMenuVisible(false);
    },
    [setIsContextMenuVisible, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    setIsContextMenuVisible(false);
  }, [setIsContextMenuVisible]);

  return { xPos, yPos, isContextMenuVisible };
};
