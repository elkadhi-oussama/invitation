import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingScreen({ isOpen, onComplete }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#FAF8F5]"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              initial={{ rotate: -6, scale: 0.96 }}
              animate={{ rotate: 0, scale: 1, y: [0, -8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-[2rem] border border-[#C9A227]/30 bg-white/80 p-8 shadow-[0_30px_80px_rgba(76,54,23,0.12)]"
            >
              <div className="mb-4 flex justify-center text-[#C9A227]">
                <Sparkles size={36} />
              </div>
              <p className="text-3xl font-semibold tracking-[0.3em] text-[#2E2E2E]">
                دعوة زفاف
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onComplete}
              className="rounded-full border border-[#C9A227]/40 bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              افتح الدعوة
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
