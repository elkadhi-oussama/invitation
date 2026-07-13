import { motion } from "framer-motion";
import { introText } from "../constants/wedding";

export function IntroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl rounded-[1.5rem] border border-[#C9A227]/20 bg-white/70 p-6 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur sm:rounded-[2rem] sm:p-10"
      >
        <p className="mb-4 text-base font-semibold text-[#8D6E63] sm:mb-6 sm:text-lg">
          {introText.opening}
        </p>
        <p className="text-lg leading-9 text-[#2E2E2E] font-medium sm:text-2xl sm:leading-10">
          {introText.verse}
        </p>
      </motion.div>
    </section>
  );
}
