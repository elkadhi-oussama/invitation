import localGuests from "../data/guests.json";

const fallbackGuests = Array.isArray(localGuests) ? localGuests : [];

function normalizeGuest(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const code =
    entry.code ??
    entry.Code ??
    entry.invitationCode ??
    entry.InvitationCode ??
    "";
  const name =
    entry.name ?? entry.Name ?? entry.guestName ?? entry.GuestName ?? "";

  if (!String(code).trim() && !String(name).trim()) {
    return null;
  }

  return {
    ...entry,
    code: String(code).trim(),
    name: String(name).trim(),
  };
}

export async function loadGuests(
  endpoint = import.meta.env.VITE_GUESTS_ENDPOINT,
) {
  if (!endpoint) {
    return fallbackGuests;
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to load guests: ${response.status}`);
    }

    const data = await response.json();
    const rows = Array.isArray(data)
      ? data
      : Array.isArray(data?.guests)
        ? data.guests
        : Array.isArray(data?.data)
          ? data.data
          : [];

    return rows.map(normalizeGuest).filter(Boolean);
  } catch (error) {
    console.warn("Falling back to local guest list.", error);
    return fallbackGuests;
  }
}

export function findGuestByCode(guests, code) {
  const normalizedCode = String(code || "")
    .trim()
    .toUpperCase();

  return (
    guests.find((entry) => {
      const guestCode = String(entry?.code || "")
        .trim()
        .toUpperCase();
      return guestCode === normalizedCode;
    }) || null
  );
}
