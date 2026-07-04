import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    toggleVisible();
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 left-4 z-40 rounded-full border border-[#C9A227]/30 bg-[#FAF8F5]/90 p-3 text-[#C9A227] shadow-lg backdrop-blur"
      aria-label="العودة إلى الأعلى"
    >
      <ArrowUp size={18} />
    </button>
  );
}
