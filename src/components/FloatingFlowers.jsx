import { motion } from "framer-motion";

const petals = [
  { left: "8%", top: "12%", size: 18, delay: 0 },
  { left: "22%", top: "22%", size: 14, delay: 0.4 },
  { left: "78%", top: "16%", size: 20, delay: 0.8 },
  { left: "88%", top: "30%", size: 12, delay: 1.2 },
  { left: "15%", top: "80%", size: 16, delay: 1.6 },
  { left: "74%", top: "78%", size: 15, delay: 2.0 },
];

export function FloatingFlowers() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0.8, rotate: 0 }}
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: petal.delay,
          }}
          className="absolute rounded-full bg-[#C9A227]/15"
          style={{
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size,
          }}
        />
      ))}
    </div>
  );
}
