import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Share2, Copy, CalendarPlus } from "lucide-react";
import { BackgroundMusicToggle } from "../components/BackgroundMusicToggle";
import { BackToTop } from "../components/BackToTop";
import { ScrollProgress } from "../components/ScrollProgress";
import { HeroSection } from "../sections/HeroSection";
import { IntroSection } from "../sections/IntroSection";
import { TimelineSection } from "../sections/TimelineSection";
import { GallerySection } from "../sections/GallerySection";
import { couple, events, weddingDate } from "../constants/wedding";
import {
  buildInvitationLink,
  copyToClipboard,
  downloadCalendarFile,
} from "../utils/invitation";
import { useLenis } from "../hooks/useLenis";
import { FloatingFlowers } from "../components/FloatingFlowers";

export function HomePage() {
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useLenis();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsReady(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const link = buildInvitationLink("8FK29Q", window.location.origin);
    if (navigator.share) {
      await navigator.share({
        title: "دعوة الزفاف",
        text: "دعوة خاصة من عُسامة وسُهى",
        url: link,
      });
      return;
    }
    const copied = await copyToClipboard(link);
    if (copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2E2E2E]">
      <ScrollProgress />
      <BackgroundMusicToggle />
      <BackToTop />

      <main className="relative overflow-x-hidden">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.14),_transparent_65%)]" />
          <FloatingFlowers />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-5xl"
          >
            <p className="mb-6 text-lg tracking-[0.36em] text-[#C9A227]">
              دعوة زفاف
            </p>
            <h1 className="text-[clamp(2.8rem,7vw,5.2rem)] font-semibold leading-tight text-[#2E2E2E]">
              {couple.groom}
            </h1>
            <div className="my-6 flex justify-center text-[#C9A227]">
              <span className="text-4xl">♡</span>
            </div>
            <h2 className="text-[clamp(2.8rem,7vw,5.2rem)] font-semibold leading-tight text-[#2E2E2E]">
              {couple.bride}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#2E2E2E] sm:text-xl">
              نتشرف بحضوركم ومشاركتكم أجمل لحظات حياتنا
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#timeline"
                className="rounded-full border border-[#C9A227]/30 bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white shadow-lg"
              >
                استكشف الدعوة
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/80 px-6 py-3 text-sm font-semibold text-[#C9A227] shadow-sm"
              >
                <Share2 size={16} /> {copied ? "تم النسخ" : "مشاركة الدعوة"}
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCalendarFile(
                    "حفل زفاف أسامة وسُهى",
                    weddingDate,
                    events[0].venue,
                    events[0].maps,
                  )
                }
                className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/80 px-6 py-3 text-sm font-semibold text-[#C9A227] shadow-sm"
              >
                <CalendarPlus size={16} /> إضافة إلى التقويم
              </button>
            </div>
          </motion.div>
        </section>

        <IntroSection />
        <HeroSection />
        <TimelineSection />
        <GallerySection />

        <section className="px-6 pb-24 text-center">
          <div
            className={`mx-auto max-w-3xl rounded-[2rem] border border-[#C9A227]/20 bg-white/80 p-8 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-lg leading-8 text-[#2E2E2E]">
              نحن سعداء بوجودكم في هذه اللحظة العزيزة، ونتطلع إلى مشاركة هذه
              الذكريات مع أحبائكم.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
