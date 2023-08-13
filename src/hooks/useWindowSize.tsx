import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState<
    { width: number | undefined; height: number | undefined } | undefined
  >();

  useEffect(() => {
    const getSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    if (!isClient) return;

    setWindowSize(getSize());

    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowSize;
};

export default useWindowSize;
