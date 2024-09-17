interface Options {
  duration: number;
  timing?: (t: number) => number;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

export function animate({
  duration,
  timing = (t) => t,
  onUpdate,
  onComplete,
}: Options): void {
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsedTime = currentTime - startTime;
    let progress = Math.min(elapsedTime / duration, 1);

    progress = timing(progress);

    if (onUpdate) {
      onUpdate(progress);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }

  requestAnimationFrame(update);
}
