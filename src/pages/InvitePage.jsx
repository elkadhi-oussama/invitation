import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { couple, events, introText, weddingDate } from "../constants/wedding";
import { useLenis } from "../hooks/useLenis";
import { findGuestByCode, loadGuests } from "../utils/guestData";
import {
  CalendarDays,
  MapPin,
  Sparkles,
  Share2,
  CalendarPlus,
} from "lucide-react";
import { BackgroundMusicToggle } from "../components/BackgroundMusicToggle";
import { BackToTop } from "../components/BackToTop";
import { ScrollProgress } from "../components/ScrollProgress";
import { HeroSection } from "../sections/HeroSection";
import { IntroSection } from "../sections/IntroSection";
import { TimelineSection } from "../sections/TimelineSection";
import { GallerySection } from "../sections/GallerySection";
import { FloatingFlowers } from "../components/FloatingFlowers";
import {
  buildInvitationLink,
  copyToClipboard,
  downloadCalendarFile,
} from "../utils/invitation";

export function InvitePage() {
  const { code } = useParams();
  useLenis();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchGuest = async () => {
      setLoading(true);
      const guests = await loadGuests();
      if (isMounted) {
        setGuest(findGuestByCode(guests, code));
        setLoading(false);
      }
    };

    fetchGuest();

    return () => {
      isMounted = false;
    };
  }, [code]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const link = buildInvitationLink(code, window.location.origin);
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="rounded-[1.5rem] border border-[#C9A227]/20 bg-white/80 px-6 py-4 text-[#2E2E2E] shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur sm:rounded-[2rem] sm:px-8 sm:py-6">
          <p className="text-base font-medium sm:text-lg">
            جارٍ تحميل الدعوة...
          </p>
        </div>
      </div>
    );
  }

  if (!guest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6 py-24 text-center">
        <div className="max-w-2xl rounded-[2rem] border border-[#C9A227]/20 bg-white/80 p-10 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur">
          <p className="mb-4 text-2xl font-semibold text-[#2E2E2E]">
            عذراً، هذه الدعوة غير موجودة.
          </p>
          <p className="mb-6 text-lg text-[#8D6E63]">
            الرجاء التحقق من الرابط أو التواصل معنا مباشرة.
          </p>
          <Link
            to="/"
            className="rounded-full border border-[#C9A227]/30 bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2E2E2E]">
      <ScrollProgress />
      <BackgroundMusicToggle />
      <BackToTop />

      <main className="relative overflow-x-hidden">
        {/* Welcome Section with Guest Name */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.14),_transparent_65%)]" />
          <FloatingFlowers />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-5xl"
          >
            {!loading && guest && (
              <>
                <p className="mb-4 text-xs tracking-[0.4em] text-[#C9A227] font-semibold sm:mb-6 sm:text-base">
                  السيد(ة)
                </p>
                <h1 className="text-[clamp(2.2rem,7vw,5.2rem)] font-bold leading-tight text-[#2E2E2E]">
                  {guest.name}
                </h1>
                <div className="my-4 flex justify-center text-[#C9A227] sm:my-6">
                  <span className="text-3xl sm:text-4xl">♡</span>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#2E2E2E] font-medium sm:mt-8 sm:text-base sm:leading-9">
                  يسرنا دعوتكم لحضور حفل زفافنا المبارك ومشاركتنا أجمل لحظات
                  حياتنا
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/80 px-4 py-2 text-sm font-bold text-[#C9A227] shadow-sm sm:px-6 sm:py-3 sm:text-base"
                  >
                    <Share2 size={16} className="sm:size-5" />{" "}
                    {copied ? "تم النسخ" : "مشاركة الدعوة"}
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
                    className="flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/80 px-4 py-2 text-sm font-bold text-[#C9A227] shadow-sm sm:px-6 sm:py-3 sm:text-base"
                  >
                    <CalendarPlus size={16} className="sm:size-5" /> إضافة إلى
                    التقويم
                  </button>
                </div>
              </>
            )}
            {loading && (
              <p className="text-lg text-[#C9A227]">جارٍ تحميل الدعوة...</p>
            )}
          </motion.div>

          {/* Scroll Down Indicator */}
          {guest && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => {
                const timeline = document.getElementById("timeline");
                if (timeline) {
                  timeline.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center cursor-pointer sm:bottom-8"
            >
              <p className="mb-2 text-lg font-bold text-[#C9A227] sm:text-xl">
                اسحب لأسفل
              </p>
              <p className="mb-4 text-sm font-semibold text-[#C9A227] sm:mb-4 sm:text-base">
                لمزيد من تفاصيل
              </p>
              <svg
                className="h-6 w-6 text-[#C9A227] sm:h-8 sm:w-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          )}
        </section>

        {guest && (
          <>
            <IntroSection />
            <HeroSection />
            <TimelineSection />
            <GallerySection />

            <section className="px-4 pb-16 text-center sm:px-6 sm:pb-24">
              <div
                className={`mx-auto max-w-3xl rounded-[1.5rem] border border-[#C9A227]/20 bg-white/80 p-6 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur transition-opacity duration-700 sm:rounded-[2rem] sm:p-8 ${isReady ? "opacity-100" : "opacity-0"}`}
              >
                <p className="text-sm leading-8 text-[#2E2E2E] font-medium sm:text-base sm:leading-9">
                  نحن سعداء بوجودكم في هذه اللحظة العزيزة، ونتطلع إلى مشاركة هذه
                  الذكريات مع أحبائكم.
                </p>
              </div>
            </section>
          </>
        )}

        {!loading && !guest && (
          <div className="flex min-h-screen items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
            <div className="max-w-2xl rounded-[1.5rem] border border-[#C9A227]/20 bg-white/80 p-6 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur sm:rounded-[2rem] sm:p-10">
              <p className="mb-4 text-base font-bold text-[#2E2E2E] sm:text-xl">
                عذراً، هذه الدعوة غير موجودة.
              </p>
              <p className="mb-6 text-sm font-medium text-[#8D6E63] sm:text-base">
                الرجاء التحقق من الرابط أو التواصل معنا مباشرة.
              </p>
              <Link
                to="/"
                className="rounded-full border border-[#C9A227]/30 bg-[#C9A227] px-4 py-2 text-xs font-bold text-white sm:px-6 sm:py-3 sm:text-sm"
              >
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
