import { motion } from "framer-motion";
import { introText } from "../constants/wedding";

export function IntroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl rounded-[2rem] border border-[#C9A227]/20 bg-white/70 p-10 shadow-[0_20px_90px_rgba(76,54,23,0.08)] backdrop-blur"
      >
        <p className="mb-6 text-xl text-[#8D6E63]">{introText.opening}</p>
        <p className="text-2xl leading-10 text-[#2E2E2E] sm:text-3xl">
          {introText.verse}
        </p>
      </motion.div>
    </section>
  );
}
