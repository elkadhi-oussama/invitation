import { motion } from "framer-motion";
import { useState } from "react";
import me1 from "../assets/me1.jpeg";
import me2 from "../assets/me2.jpeg";
import me3 from "../assets/me3.jpeg";

const images = [
  {
    src: me1,
    alt: "خاتم الزواج",
    cardClass: "",
    imgClass: "object-cover object-[30%_50%]",
  },
  {
    src: me2,
    alt: "العروسان من الجانب",
    cardClass: "",
    imgClass: "object-cover object-[20%_50%]",
  },
  {
    src: me3,
    alt: "العروسان وخاتم الزواج",
    cardClass: "md:col-span-2",
    imgClass: "object-cover object-[50%_20%]",
  },
];

export function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[#C9A227]">
            الألبوم
          </p>
          <h2 className="text-3xl font-semibold text-[#2E2E2E] sm:text-4xl">
            لحظات من الحب
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {images.map((image) => (
            <motion.button
              key={image.src}
              whileHover={{ y: -6, scale: 1.01 }}
              type="button"
              onClick={() => setActiveImage(image.src)}
              className={`group overflow-hidden rounded-[2rem] border border-[#C9A227]/20 bg-white/80 shadow-[0_16px_80px_rgba(76,54,23,0.08)] ${image.cardClass}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={`h-72 sm:h-[24rem] w-full transition duration-500 group-hover:scale-105 ${image.imgClass}`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2E2E2E]/80 p-4"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            alt="Preview"
            className="max-h-[90vh] max-w-full rounded-[2rem] object-contain"
          />
        </div>
      )}
    </section>
  );
}
