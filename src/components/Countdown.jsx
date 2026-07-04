import { useEffect, useState } from "react";
import { weddingDate } from "../constants/wedding";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="rounded-[1.4rem] border border-[#C9A227]/20 bg-white/70 p-4 shadow-sm backdrop-blur"
        >
          <div className="text-3xl font-semibold text-[#C9A227]">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-sm text-[#8D6E63]">
            {label === "days"
              ? "أيام"
              : label === "hours"
                ? "ساعات"
                : label === "minutes"
                  ? "دقائق"
                  : "ثواني"}
          </div>
        </div>
      ))}
    </div>
  );
}
