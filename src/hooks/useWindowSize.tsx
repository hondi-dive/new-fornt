import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState<{ width: number | undefined } | undefined>(
    undefined,
  );

  useEffect(() => {
    const getSize = () => {
      return { width: isClient ? window.innerWidth : undefined };
    };

    if (!isClient) return;

    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowSize;
};

export default useWindowSize;
