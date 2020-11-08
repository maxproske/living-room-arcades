import { useState, useEffect } from 'react';

export const useGameStatus = () => {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    // console.log(`Frame ${frames}`)
  }, [frames]);

  const tick = () => {
    setFrames(frames + 1);
  };

  return [frames, tick] as const;
};
