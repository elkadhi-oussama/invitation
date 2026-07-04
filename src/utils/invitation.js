export const buildInvitationLink = (
  code,
  origin = typeof window !== "undefined"
    ? window.location.origin
    : "https://example.com",
) => `${origin}/invite/${code}`;

export const copyToClipboard = async (text) => {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  return false;
};

export const downloadCalendarFile = (
  eventTitle,
  eventDate,
  eventVenue,
  mapsLink,
) => {
  const start = new Date(eventDate)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.000Z$/, "Z");
  const end = new Date(new Date(eventDate).getTime() + 2 * 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.000Z$/, "Z");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${eventTitle}@wedding-invite`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${eventTitle}`,
    `LOCATION:${eventVenue} ${mapsLink}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${eventTitle.replace(/\s+/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
