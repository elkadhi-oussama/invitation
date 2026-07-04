import { Music2, Pause, Play } from "lucide-react";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";

export function BackgroundMusicToggle() {
  const { isPlaying, toggle } = useBackgroundMusic();

  return (
    <button
      type="button"
      onClick={() => toggle()}
      className="fixed left-4 top-4 z-50 rounded-full border border-[#C9A227]/40 bg-[#FAF8F5]/80 p-3 text-[#C9A227] shadow-lg backdrop-blur"
      aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
    >
      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
    </button>
  );
}
