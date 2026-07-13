import { motion } from "framer-motion";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { events } from "../constants/wedding";

export function TimelineSection() {
  return (
    <section id="timeline" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.4em] font-bold text-[#C9A227] sm:mb-3 sm:text-sm">
            البرنامج
          </p>
          <h2 className="text-2xl font-bold text-[#2E2E2E] sm:text-4xl">
            مراحل الاحتفاء
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="rounded-[1.5rem] border border-[#C9A227]/20 bg-white/80 p-5 shadow-[0_16px_80px_rgba(76,54,23,0.08)] backdrop-blur sm:rounded-[2rem] sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[#C9A227]/10 px-3 py-1 text-xs font-bold text-[#C9A227] sm:text-sm">
                  {index + 1}
                </span>
                <Sparkles size={20} className="text-[#C9A227]" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#2E2E2E] sm:text-2xl">
                {event.title}
              </h3>
              <div className="mb-4 flex items-center gap-3 text-sm font-medium text-[#8D6E63] sm:text-base">
                <CalendarDays size={18} />
                <span>{event.date}</span>
              </div>
              <p className="mb-4 text-sm font-medium text-[#2E2E2E] sm:text-base">
                {event.time}
              </p>
              <div className="mb-5 flex items-start gap-3 text-sm text-[#2E2E2E] sm:text-base">
                <MapPin size={18} className="mt-1 text-[#C9A227]" />
                <span className="font-medium">{event.venue}</span>
              </div>
              <a
                href={event.maps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-[#C9A227]/30 px-4 py-2 text-xs font-bold text-[#C9A227] transition-all hover:bg-[#C9A227] hover:text-white sm:text-sm"
              >
                فتح الموقع
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
