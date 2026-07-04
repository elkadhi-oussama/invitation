import { useEffect, useRef, useState } from "react";
import musicFile from "../assets/Music.mp3";

export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    if (!audioRef.current) {
      return false;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch (error) {
      console.warn("Background music playback blocked", error);
      setIsPlaying(false);
      return false;
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryAutoPlay = async () => {
      const played = await play();

      if (!played) {
        const startOnInteraction = async () => {
          await play();
        };

        window.addEventListener("click", startOnInteraction, {
          once: true,
          passive: true,
        });
        window.addEventListener("keydown", startOnInteraction, {
          once: true,
          passive: true,
        });
        window.addEventListener("touchstart", startOnInteraction, {
          once: true,
          passive: true,
        });
      }
    };

    tryAutoPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return { isPlaying, toggle: isPlaying ? stop : play };
}
