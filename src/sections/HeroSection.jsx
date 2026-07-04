import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { couple, heroMessage } from "../constants/wedding";
import Countdown from "../components/Countdown";

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="mb-8 text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-tight text-[#2E2E2E]">
          <div className="mb-3 text-[#C9A227]">{couple.groom}</div>
          <div className="my-4 flex justify-center text-[#C9A227]">
            <Heart size={30} />
          </div>
          <div className="text-[#2E2E2E]">{couple.bride}</div>
        </div>
        <p className="mb-10 text-xl leading-9 text-[#2E2E2E] sm:text-2xl">
          {heroMessage}
        </p>
        <Countdown />
      </motion.div>
    </section>
  );
}
