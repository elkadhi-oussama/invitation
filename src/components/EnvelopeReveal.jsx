import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function EnvelopeReveal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] flex items-center justify-center bg-[#FAF8F5]/95 p-4 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 24 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-5xl overflow-hidden rounded-[2.4rem] border border-[#C9A227]/20 bg-white/85 p-4 shadow-[0_40px_100px_rgba(76,54,23,0.18)]"
          >
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 180 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/20 bg-[#fffaf2] p-8"
            >
              <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.12),_transparent_60%)]" />
              <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center gap-6 text-center">
                <div className="rounded-full border border-[#C9A227]/30 bg-white/80 p-3 text-[#C9A227] shadow-sm">
                  <Sparkles size={20} />
                </div>
                <p className="text-2xl text-[#8D6E63]">دعوة خاصة</p>
                <div className="flex items-center gap-4 text-4xl font-semibold text-[#2E2E2E] sm:text-5xl">
                  <span>أسامة</span>
                  <Heart className="text-[#C9A227]" size={26} />
                  <span>سُهى</span>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-[#2E2E2E]">
                  نفتح لكم قلبنا وندعوكُم إلى لحظةٍ لا تُنسى، حيث يلتقي الحب في
                  أبهى صورِه.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onClose}
                  className="rounded-full border border-[#C9A227]/40 bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  ابدأ الرحلة
                </motion.button>
              </div>
            </motion.div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
