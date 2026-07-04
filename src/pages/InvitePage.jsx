import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { couple } from "../constants/wedding";
import { useLenis } from "../hooks/useLenis";
import { findGuestByCode, loadGuests } from "../utils/guestData";

export function InvitePage() {
  const { code } = useParams();
  useLenis();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6 py-24 text-center">
        <div className="rounded-[2rem] border border-[#C9A227]/20 bg-white/80 px-8 py-6 text-[#2E2E2E] shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur">
          <p className="text-lg">جارٍ تحميل الدعوة...</p>
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
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-24 text-right">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-4xl flex-col items-center rounded-[2.2rem] border border-[#C9A227]/20 bg-white/90 p-8 shadow-[0_30px_100px_rgba(76,54,23,0.12)] backdrop-blur sm:p-12"
      >
        <p className="mb-6 text-lg text-[#8D6E63]">السيد(ة)</p>
        <h1 className="text-center text-3xl font-semibold text-[#2E2E2E] sm:text-4xl">
          {guest.name}
        </h1>
        <p className="mt-8 max-w-2xl text-center text-xl leading-9 text-[#2E2E2E] sm:text-2xl">
          يسرنا دعوتكم لحضور حفل زفافنا المبارك ومشاركتنا أجمل لحظاتنا.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/#timeline"
            className="rounded-full border border-[#C9A227]/30 bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white"
          >
            مزيد من التفاصيل
          </a>
        </div>
      </motion.div>
    </div>
  );
}
