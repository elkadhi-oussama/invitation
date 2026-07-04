import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-1 bg-transparent">
      <div
        className="h-full bg-[#C9A227]"
        style={{ width: `${Math.min(progress * 100, 100)}%` }}
      />
    </div>
  );
}
