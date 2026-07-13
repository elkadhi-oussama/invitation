import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { couple, heroMessage } from "../constants/wedding";
import Countdown from "../components/Countdown";

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="mb-8 text-[clamp(1.8rem,5vw,3.6rem)] font-bold leading-tight text-[#2E2E2E]">
          <div className="mb-3 text-black">{couple.groom}</div>
          <div className="my-4 flex justify-center text-[#C9A227]">
            <Heart size={32} className="sm:size-10" />
          </div>
          <div className="text-[#C9A227]">{couple.bride}</div>
        </div>
        <p className="mb-10 text-base leading-8 text-[#2E2E2E] font-medium sm:text-xl sm:leading-9">
          {heroMessage}
        </p>
        <Countdown />
      </motion.div>
    </section>
  );
}
