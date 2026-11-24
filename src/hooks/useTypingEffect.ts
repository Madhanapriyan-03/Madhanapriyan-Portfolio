import { useEffect, useState } from "react";

interface UseTypingEffectOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypingEffect(
  text: string,
  { speed = 45, delay = 0, onComplete }: UseTypingEffectOptions = {},
) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsComplete(false);

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let index = 0;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, onComplete]);

  return { displayed, isComplete };
}
