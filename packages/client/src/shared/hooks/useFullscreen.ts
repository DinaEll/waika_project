import { useState, useEffect } from 'react';

interface FullscreenHook {
  isFullscreen: boolean;
  enterFullscreen: (element: HTMLElement) => void;
  exitFullscreen: () => void;
}

export const useFullscreen = (): FullscreenHook => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFullscreenChange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
};

function enterFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen().catch((err) => {
      alert('Error entering fullscreen mode:' + err);
      console.error('Error entering fullscreen mode:', err);
    });
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen().catch((err) => {
      alert('Error exiting fullscreen mode:' + err);
      console.error('Error exiting fullscreen mode:', err);
    });
  }
}
